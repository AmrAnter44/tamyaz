import createIntlMiddleware from 'next-intl/middleware';
import { routing } from '../src/i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createIntlMiddleware(routing);

const LOCALES = routing.locales;

// أي مسار فيه امتداد ملف (صور، robots.txt، sitemap.xml...) بيعدّي زي ما هو
const HAS_EXTENSION = /\.[a-zA-Z0-9]+$/;

// بيوصّل الطلب لنسخة الماركداون بتاعة نفس الصفحة
function rewriteToMarkdown(request, pagePath) {
  const url = request.nextUrl.clone();
  url.pathname = '/api/md';
  url.search = '';
  url.searchParams.set('path', pagePath || '/');
  return NextResponse.rewrite(url);
}

export default function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  // ١) رابط منتهي بـ.md — مثال: /ar/portfolio.md
  if (pathname.endsWith('.md')) {
    return rewriteToMarkdown(request, pathname.slice(0, -3));
  }

  // ٢) ملفات الأصول والملفات الثابتة تعدّي من غير أي تدخّل
  if (HAS_EXTENSION.test(pathname)) {
    return NextResponse.next();
  }

  // ٣) الوكيل طالب ماركداون صراحةً في هيدر Accept
  const accept = request.headers.get('accept') ?? '';
  if (accept.includes('text/markdown')) {
    return rewriteToMarkdown(request, pathname);
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
  const isLocalePage = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (isLocalePage) {
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
