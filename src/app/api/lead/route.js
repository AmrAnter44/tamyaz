// POST /api/lead — native lead form → FitBoost Control leads (company = tamyaz) (tech_leads).
//
// Security model:
//  - Only the PUBLIC anon key is used (no service-role key on this site).
//  - The anon role can do exactly one thing: call submit_website_lead(), which
//    rejects any call whose p_form_key doesn't match the hashed key stored in the DB.
//  - WEBSITE_FORM_KEY is a server-only env var — never sent to the browser.
//  - Honeypot + Cloudflare Turnstile + a light in-memory rate limit here; the
//    authoritative validation and rate limits live in the SQL function.
import { NextResponse } from 'next/server';
import { isIP } from 'node:net';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// The lead's company ('tamyaz') is derived in the DB from the key this server holds.
const MAX_BODY = 8_000;

// ── light per-instance rate limit (the DB has the real one) ──
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map();
function lightLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

let warnedTurnstile = false;
function warnOnce(msg) {
  if (warnedTurnstile) return;
  warnedTurnstile = true;
  process.emitWarning(msg);
}

function normalizeIp(raw) {
  if (!raw) return null;
  let ip = String(raw).split(',')[0].trim();
  if (ip.startsWith('[')) ip = ip.slice(1, ip.indexOf(']')); // [v6]:port
  else if (/^\d+\.\d+\.\d+\.\d+:\d+$/.test(ip)) ip = ip.split(':')[0]; // v4:port
  if (ip.startsWith('::ffff:') && isIP(ip.slice(7)) === 4) ip = ip.slice(7);
  return isIP(ip) ? ip : null;
}

function clientIp(req) {
  const h = req.headers;
  return (
    normalizeIp(h.get('x-vercel-forwarded-for')) ||
    normalizeIp(h.get('x-real-ip')) ||
    normalizeIp(h.get('x-forwarded-for'))
  );
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    warnOnce('[lead-form] TURNSTILE_SECRET_KEY is not set — skipping Turnstile verification.');
    return true;
  }
  if (typeof token !== 'string' || !token || token.length > 2048) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    const data = await res.json();
    return data?.success === true;
  } catch {
    return false;
  }
}

function str(v, max) {
  if (typeof v !== 'string') return null;
  const s = v.trim();
  return s ? s.slice(0, max) : null;
}

function fail(error, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req) {
  // Same-origin only (browsers always send Origin on POST fetch)
  const origin = req.headers.get('origin');
  if (origin) {
    try {
      const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
      if (new URL(origin).host !== host) return fail('forbidden', 403);
    } catch {
      return fail('forbidden', 403);
    }
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) return fail('invalid_payload', 413);
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail('invalid_payload');
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return fail('invalid_payload');

  // Honeypot: bots fill every field — pretend success, store nothing
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  let ip = clientIp(req);
  if (!ip) {
    if (process.env.NODE_ENV === 'production') return fail('invalid_ip');
    ip = '127.0.0.1';
  }
  if (lightLimited(ip)) return fail('rate_limited', 429);

  if (!(await verifyTurnstile(body.turnstileToken, ip))) return fail('captcha_failed', 403);

  const url = process.env.FB_SUPABASE_URL;
  const anon = process.env.FB_SUPABASE_ANON_KEY;
  const formKey = process.env.WEBSITE_FORM_KEY;
  if (!url || !anon || !formKey) {
    process.emitWarning('[lead-form] FB_SUPABASE_URL / FB_SUPABASE_ANON_KEY / WEBSITE_FORM_KEY missing.');
    return fail('not_configured', 503);
  }

  const interest = Array.isArray(body.interest)
    ? body.interest.filter((x) => typeof x === 'string').slice(0, 12)
    : [];

  const p = {
    name: str(body.name, 200),
    phone: str(body.phone, 32),
    business_name: str(body.businessName, 300),
    business_type: str(body.businessType, 200),
    city: str(body.city, 200),
    interest,
    message: str(body.message, 2000),
  };

  const headers = { apikey: anon, 'Content-Type': 'application/json' };
  // Legacy anon keys are JWTs; new publishable keys go in `apikey` only.
  if (anon.startsWith('eyJ')) headers.Authorization = `Bearer ${anon}`;

  let result;
  try {
    const res = await fetch(`${url.replace(/\/+$/, '')}/rest/v1/rpc/submit_website_lead`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ p, p_form_key: formKey, p_client_ip: ip }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    result = await res.json().catch(() => null);
    if (!res.ok) return fail('server_error', 502);
  } catch {
    return fail('server_error', 502);
  }

  if (result?.ok === true) return NextResponse.json({ ok: true });
  const error = typeof result?.error === 'string' ? result.error : 'server_error';
  const status = error === 'rate_limited' || error === 'phone_limited' ? 429 : error === 'server_error' || error === 'unauthorized' ? 502 : 400;
  // Don't leak key problems to the browser
  return fail(error === 'unauthorized' ? 'server_error' : error, status);
}
