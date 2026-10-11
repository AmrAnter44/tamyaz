'use client';

// فورم الطلب (بدل جوجل فورم) — بيبعت لـ /api/lead اللي بيحفظ الطلب في
// المتابعات بتاعة كنترول (الشركة = تميز).
import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, Send, MessageCircle, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const WHATSAPP_URL = 'https://wa.me/201028518754';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

// نفس مفاتيح كروت SystemsDetails (#sys-<key>) + مخصوص + موقع/تطبيق
export const SYSTEM_KEYS = ['cafe', 'resto', 'barber', 'clinic', 'dental', 'pharma', 'bar', 'shop'];
export const TM_INTERESTS = [...SYSTEM_KEYS, 'custom', 'web_app'];

const TEXT = {
  ar: {
    title: 'سجّل طلبك',
    subtitle: 'املا البيانات دي وفريق تميز هيكلمك في أقرب وقت — من غير أي التزام.',
    name: 'الاسم',
    namePh: 'اسمك',
    phone: 'رقم الموبايل',
    phonePh: '01xxxxxxxxx',
    business: 'اسم النشاط',
    businessPh: 'مثال: كافيه الريحان',
    businessType: 'نوع النشاط',
    businessTypePh: 'مثال: كافيه، صيدلية، عيادة…',
    city: 'المدينة',
    cityPh: 'مثال: الجيزة',
    interest: 'محتاج أنهي سيستم؟',
    interestHint: 'اختار حاجة أو أكتر',
    message: 'رسالتك',
    messagePh: 'احكيلنا باختصار محتاج إيه…',
    optional: 'اختياري',
    submit: 'ابعت الطلب',
    sending: 'جاري الإرسال…',
    successTitle: 'طلبك وصلنا ✅',
    successText: 'شكراً! فريق تميز هيتواصل معاك على رقمك قريب جداً.',
    again: 'ابعت طلب تاني',
    orWhatsapp: 'أو كلمنا واتساب',
    interests: { custom: 'سيستم مخصوص', web_app: 'موقع / تطبيق' },
    businessTypes: ['كافيه', 'مطعم', 'باربر / صالون', 'عيادة', 'عيادة أسنان', 'صيدلية', 'جيم', 'محل / ستور'],
    errors: {
      invalid_name: 'اكتب اسمك (من ٢ لـ ٨٠ حرف).',
      invalid_phone: 'رقم الموبايل لازم يكون رقم مصري صحيح (مثال: 01012345678).',
      invalid_interest: 'اختيار غير صالح في الاهتمامات.',
      too_long: 'في خانة مكتوب فيها كلام أطول من المسموح.',
      message_too_long: 'الرسالة لازم تكون أقل من ١٠٠٠ حرف.',
      rate_limited: 'طلبات كتير في وقت قصير — جرّب تاني بعد شوية.',
      phone_limited: 'الرقم ده بعت طلبات النهارده بالفعل — هنكلمك قريب.',
      captcha_failed: 'التحقق فشل — حدّث الصفحة وجرّب تاني.',
      captcha_pending: 'استنى ثانية لحد ما التحقق يخلص.',
      default: 'حصلت مشكلة ومقدرناش نبعت الطلب — جرّب تاني أو كلمنا واتساب.',
    },
  },
  en: {
    title: 'Submit your request',
    subtitle: 'Fill in your details and the Tamyaz team will call you shortly — no strings attached.',
    name: 'Name',
    namePh: 'Your name',
    phone: 'Mobile number',
    phonePh: '01xxxxxxxxx',
    business: 'Business name',
    businessPh: 'e.g. Rayhan Cafe',
    businessType: 'Business type',
    businessTypePh: 'e.g. cafe, pharmacy, clinic…',
    city: 'City',
    cityPh: 'e.g. Giza',
    interest: 'Which system do you need?',
    interestHint: 'Pick one or more',
    message: 'Message',
    messagePh: 'Tell us briefly what you need…',
    optional: 'optional',
    submit: 'Send request',
    sending: 'Sending…',
    successTitle: 'Request received ✅',
    successText: 'Thank you! The Tamyaz team will contact you on your number very soon.',
    again: 'Send another request',
    orWhatsapp: 'Or chat on WhatsApp',
    interests: { custom: 'Custom system', web_app: 'Website / app' },
    businessTypes: ['Cafe', 'Restaurant', 'Barber / salon', 'Clinic', 'Dental clinic', 'Pharmacy', 'Gym', 'Shop / store'],
    errors: {
      invalid_name: 'Please enter your name (2–80 characters).',
      invalid_phone: 'Please enter a valid Egyptian mobile number (e.g. 01012345678).',
      invalid_interest: 'Invalid interest selection.',
      too_long: 'One of the fields is longer than allowed.',
      message_too_long: 'The message must be under 1000 characters.',
      rate_limited: 'Too many requests — please try again in a few minutes.',
      phone_limited: 'This number already sent requests today — we will call you soon.',
      captcha_failed: 'Verification failed — refresh the page and try again.',
      captcha_pending: 'Please wait a second for verification to finish.',
      default: 'Something went wrong and we could not send your request — try again or WhatsApp us.',
    },
  },
};

const PHONE_RE = /^01[0125]\d{8}$/;
function normalizePhone(v) {
  let s = String(v || '')
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[\s().-]/g, '');
  if (s.startsWith('+20')) s = '0' + s.slice(3);
  else if (s.startsWith('0020')) s = '0' + s.slice(4);
  else if (/^20\d{10}$/.test(s)) s = '0' + s.slice(2);
  else if (/^1[0125]\d{8}$/.test(s)) s = '0' + s;
  return s;
}

// Cloudflare Turnstile (explicit render) — only when the site key is configured
function useTurnstile(containerRef, locale, active) {
  const widgetId = useRef(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!active || !TURNSTILE_SITE_KEY || !containerRef.current) return;
    let cancelled = false;

    const render = () => {
      if (cancelled || !window.turnstile || !containerRef.current || widgetId.current !== null) return;
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark',
        language: locale === 'ar' ? 'ar-eg' : 'en',
        callback: (t) => setToken(t),
        'expired-callback': () => setToken(''),
        'error-callback': () => setToken(''),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      let s = document.querySelector('script[data-turnstile]');
      if (!s) {
        s = document.createElement('script');
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        s.async = true;
        s.defer = true;
        s.dataset.turnstile = '1';
        document.head.appendChild(s);
      }
      s.addEventListener('load', render);
    }

    return () => {
      cancelled = true;
      if (widgetId.current !== null && window.turnstile) {
        try { window.turnstile.remove(widgetId.current); } catch {}
      }
      widgetId.current = null;
    };
  }, [containerRef, locale, active]);

  const reset = () => {
    setToken('');
    if (widgetId.current !== null && window.turnstile) {
      try { window.turnstile.reset(widgetId.current); } catch {}
    }
  };

  return { enabled: Boolean(TURNSTILE_SITE_KEY), token, reset };
}

const labelCls = 'block text-sm font-bold text-ink mb-2';
const fieldCls = 't-field w-full text-[15px]';

export default function LeadForm({ locale = 'ar', defaultInterest = [], id = 'lead-form' }) {
  const isRTL = locale === 'ar';
  const T = TEXT[isRTL ? 'ar' : 'en'];
  const tSys = useTranslations('systemsDetails');
  const sysItems = tSys.raw('items') ?? {};
  const interestLabel = (k) => T.interests[k] || sysItems[k]?.name || k;

  const [form, setForm] = useState({ name: '', phone: '', businessName: '', businessType: '', city: '', message: '', website: '' });
  const [interest, setInterest] = useState(() => defaultInterest.filter((k) => TM_INTERESTS.includes(k)));
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');
  const [fieldErr, setFieldErr] = useState({});
  const tsRef = useRef(null);
  const turnstile = useTurnstile(tsRef, locale, status !== 'success');

  // ?system=barber (من كروت الأنظمة) أو ?interest=cafe,web_app
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = [params.get('system'), params.get('interest')].filter(Boolean).join(',');
      if (!q) return;
      const pre = q.split(',').map((s) => s.trim()).filter((k) => TM_INTERESTS.includes(k));
      if (pre.length) setInterest((cur) => Array.from(new Set([...cur, ...pre])));
    } catch {}
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggle = (k) => setInterest((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  async function onSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    setError('');

    const phone = normalizePhone(form.phone);
    const name = form.name.trim();
    const errs = {};
    if (name.length < 2 || name.length > 80) errs.name = T.errors.invalid_name;
    if (!PHONE_RE.test(phone)) errs.phone = T.errors.invalid_phone;
    setFieldErr(errs);
    if (Object.keys(errs).length) return;
    if (turnstile.enabled && !turnstile.token) {
      setError(T.errors.captcha_pending);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          businessName: form.businessName,
          businessType: form.businessType,
          city: form.city,
          message: form.message,
          interest,
          website: form.website,
          turnstileToken: turnstile.token,
        }),
      });
      const data = await res.json().catch(() => null);
      if (data?.ok) {
        setStatus('success');
        return;
      }
      const code = data?.error;
      if (code === 'invalid_name' || code === 'invalid_phone') {
        setFieldErr({ [code === 'invalid_name' ? 'name' : 'phone']: T.errors[code] });
        setError('');
      } else {
        setError(T.errors[code] || T.errors.default);
      }
      setStatus('error');
      turnstile.reset();
    } catch {
      setError(T.errors.default);
      setStatus('error');
      turnstile.reset();
    }
  }

  function resetForm() {
    setForm({ name: '', phone: '', businessName: '', businessType: '', city: '', message: '', website: '' });
    setInterest([]);
    setFieldErr({});
    setError('');
    setStatus('idle');
    turnstile.reset();
  }

  if (status === 'success') {
    return (
      <section id={id} className="t-card p-6 sm:p-10 text-center scroll-mt-28" dir={isRTL ? 'rtl' : 'ltr'} aria-live="polite">
        <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-4" aria-hidden="true" />
        <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-2">{T.successTitle}</h2>
        <p className="text-ink-3 mb-8 max-w-md mx-auto leading-relaxed">{T.successText}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageCircle size={18} aria-hidden="true" />
            {T.orWhatsapp}
          </a>
          <button type="button" onClick={resetForm} className="btn btn-secondary">
            {T.again}
          </button>
        </div>
      </section>
    );
  }

  const sending = status === 'sending';

  return (
    <section id={id} className="t-card p-5 sm:p-8 scroll-mt-28" dir={isRTL ? 'rtl' : 'ltr'} aria-labelledby={`${id}-title`}>
      <div className="mb-6 text-center sm:text-start">
        <h2 id={`${id}-title`} className="text-2xl sm:text-3xl font-bold text-ink mb-2">
          {T.title}
        </h2>
        <p className="text-ink-3 text-sm sm:text-base leading-relaxed">{T.subtitle}</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Honeypot — hidden from people, bots fill it */}
        <div aria-hidden="true" className="sr-only">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
          </label>
        </div>

        <div className="min-w-0">
          <label htmlFor={`${id}-name`} className={labelCls}>
            {T.name} <span className="text-accent">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            placeholder={T.namePh}
            value={form.name}
            onChange={set('name')}
            aria-invalid={Boolean(fieldErr.name)}
            aria-describedby={fieldErr.name ? `${id}-name-err` : undefined}
            className={fieldCls}
          />
          {fieldErr.name && <p id={`${id}-name-err`} className="text-[13px] text-red-400 mt-1.5">{fieldErr.name}</p>}
        </div>

        <div className="min-w-0">
          <label htmlFor={`${id}-phone`} className={labelCls}>
            {T.phone} <span className="text-accent">*</span>
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            required
            maxLength={20}
            autoComplete="tel"
            dir="ltr"
            placeholder={T.phonePh}
            value={form.phone}
            onChange={set('phone')}
            aria-invalid={Boolean(fieldErr.phone)}
            aria-describedby={fieldErr.phone ? `${id}-phone-err` : undefined}
            className={`${fieldCls} ${isRTL ? 'text-right' : ''}`}
          />
          {fieldErr.phone && <p id={`${id}-phone-err`} className="text-[13px] text-red-400 mt-1.5">{fieldErr.phone}</p>}
        </div>

        <div className="min-w-0">
          <label htmlFor={`${id}-business`} className={labelCls}>
            {T.business} <span className="text-ink-4 font-normal text-xs">({T.optional})</span>
          </label>
          <input
            id={`${id}-business`}
            name="businessName"
            type="text"
            maxLength={120}
            autoComplete="organization"
            placeholder={T.businessPh}
            value={form.businessName}
            onChange={set('businessName')}
            className={fieldCls}
          />
        </div>

        <div className="min-w-0">
          <label htmlFor={`${id}-type`} className={labelCls}>
            {T.businessType} <span className="text-ink-4 font-normal text-xs">({T.optional})</span>
          </label>
          <input
            id={`${id}-type`}
            name="businessType"
            type="text"
            maxLength={60}
            list={`${id}-types`}
            placeholder={T.businessTypePh}
            value={form.businessType}
            onChange={set('businessType')}
            className={fieldCls}
          />
          <datalist id={`${id}-types`}>
            {T.businessTypes.map((x) => (
              <option key={x} value={x} />
            ))}
          </datalist>
        </div>

        <div className="min-w-0 sm:col-span-2">
          <label htmlFor={`${id}-city`} className={labelCls}>
            {T.city} <span className="text-ink-4 font-normal text-xs">({T.optional})</span>
          </label>
          <input
            id={`${id}-city`}
            name="city"
            type="text"
            maxLength={60}
            autoComplete="address-level2"
            placeholder={T.cityPh}
            value={form.city}
            onChange={set('city')}
            className={fieldCls}
          />
        </div>

        <fieldset className="sm:col-span-2 min-w-0">
          <legend className={labelCls}>
            {T.interest} <span className="text-ink-4 font-normal text-xs">({T.interestHint})</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {TM_INTERESTS.map((k) => {
              const on = interest.includes(k);
              return (
                <button
                  key={k}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(k)}
                  className="t-option inline-flex items-center justify-center px-4 !rounded-full text-sm"
                >
                  {interestLabel(k)}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="sm:col-span-2 min-w-0">
          <label htmlFor={`${id}-message`} className={labelCls}>
            {T.message} <span className="text-ink-4 font-normal text-xs">({T.optional})</span>
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            maxLength={1000}
            placeholder={T.messagePh}
            value={form.message}
            onChange={set('message')}
            className={`${fieldCls} py-3 resize-y`}
          />
          <p className="text-[12px] text-ink-4 mt-1 tabular-nums" dir="ltr" style={{ textAlign: isRTL ? 'left' : 'right' }}>
            {form.message.length}/1000
          </p>
        </div>

        {turnstile.enabled && (
          <div className="sm:col-span-2 flex justify-center min-h-[65px]">
            <div ref={tsRef} />
          </div>
        )}

        {error && (
          <div role="alert" className="sm:col-span-2 flex items-start gap-2 rounded-2xl px-4 py-3 text-sm text-red-300 bg-red-500/10 shadow-[inset_0_0_0_1px_rgba(248,113,113,0.3)]">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 sm:items-center">
          <button type="submit" disabled={sending} className="btn btn-primary btn-lg w-full sm:w-auto disabled:opacity-70 disabled:cursor-wait">
            {sending ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Send className={`w-5 h-5 ${isRTL ? '-scale-x-100' : ''}`} aria-hidden="true" />}
            {sending ? T.sending : T.submit}
          </button>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary w-full sm:w-auto">
            <MessageCircle size={18} aria-hidden="true" />
            {T.orWhatsapp}
          </a>
        </div>
      </form>
    </section>
  );
}
