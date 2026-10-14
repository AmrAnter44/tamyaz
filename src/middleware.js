import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import { hasMarkdownTwin } from './lib/markdown-routes';

const intlMiddleware = createIntlMiddleware(routing);

const LOCALES = routing.locales;

// أي مسار فيه امتداد ملف (صور، robots.txt، sitemap.xml، feed.xml...) بيعدّي زي ما هو
const HAS_EXTENSION = /\.[a-zA-Z0-9]+$/;

// بيوصّل الطلب لنسخة الماركداون بتاعة نفس الصفحة (src/app/api/md/[...path] → src/lib/markdown-pages.js)
function rewriteToMarkdown(request, pagePath) {
  const url = request.nextUrl.clone();
  const segments = String(pagePath || '/').split('/').filter(Boolean).map(encodeURIComponent);
  // المسار جوّه الـURL نفسه (مش query) عشان الـroute ياخده من params بشكل مضمون
  url.pathname = ['/api/md', ...segments].join('/');
  url.search = '';
  const response = NextResponse.rewrite(url);
  // نفس الرابط بيرجّع HTML أو Markdown حسب Accept — الكاش لازم يفرّق بينهم
  response.headers.set('Vary', 'Accept, Accept-Language');
  return response;
}

// بيحوّل هيدر Accept لـ { mediaType: q }
function parseAccept(header) {
  const out = {};
  for (const part of header.split(',')) {
    const [type, ...params] = part.trim().split(';');
    if (!type) continue;
    const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
    const value = q ? Number.parseFloat(q.slice(2)) : 1;
    out[type.trim().toLowerCase()] = Number.isNaN(value) ? 0 : value;
  }
  return out;
}

// true بس لو الطالب عايز markdown ومافضّلش HTML عليه. المتصفحات عمرها ما بتطلب text/markdown.
function prefersMarkdown(request) {
  const header = request.headers.get('accept');
  if (!header || !header.toLowerCase().includes('text/markdown')) return false;
  const accept = parseAccept(header);
  const markdown = accept['text/markdown'] ?? 0;
  const html = accept['text/html'] ?? 0;
  return markdown > 0 && markdown >= html;
}

export default function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  // ١) رابط منتهي بـ.md — مثال: /ar/systems/cafe-pos-system.md
  if (pathname.endsWith('.md')) {
    return rewriteToMarkdown(request, pathname.slice(0, -3));
  }

  // ٢) ملفات الأصول والملفات الثابتة تعدّي من غير أي تدخّل
  if (HAS_EXTENSION.test(pathname)) {
    return NextResponse.next();
  }

  // ٣) الوكيل طالب ماركداون صراحةً في هيدر Accept، والصفحة ليها نسخة ماركداون
  if (prefersMarkdown(request)) {
    const segments = pathname.split('/').filter(Boolean);
    const locale = LOCALES.includes(segments[0]) ? segments.shift() : routing.defaultLocale;
    if (hasMarkdownTwin(segments)) {
      return rewriteToMarkdown(request, ['', locale, ...segments].join('/'));
    }
  }

  const response = intlMiddleware(request);

  // Security headers
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  // إعلان موارد الوكلاء: نسخة الماركداون من نفس الصفحة، وملف llms.txt
  const segments = pathname.split('/').filter(Boolean);
  const isLocalePage = LOCALES.includes(segments[0]);

  if (isLocalePage && hasMarkdownTwin(segments.slice(1))) {
    const clean = pathname.replace(/\/$/, '');
    response.headers.append(
      'Link',
      `<${origin}${clean}.md>; rel="alternate"; type="text/markdown"; title="Markdown version"`
    );
  }

  response.headers.append(
    'Link',
    `<${origin}/llms.txt>; rel="alternate"; type="text/plain"; title="llms.txt"`
  );

  return response;
}

export const config = {
  // الميدلوير بيشوف كل حاجة ماعدا ملفات Next الداخلية، والفلترة بتحصل جوّه
  matcher: ['/((?!api|_next|_vercel).*)']
};
