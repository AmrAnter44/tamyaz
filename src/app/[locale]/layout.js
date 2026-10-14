import { Cairo } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Analytics } from "@vercel/analytics/react";
import FloatingWhatsAppCTA from './component/Cta';
import { SITE_URL, siteConfig } from '@/lib/site';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import "../globals.css";

// خط واحد بس في الموقع كله: Cairo (عربي + لاتيني)
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
  variable: '--font-cairo',
});

// الموقع داكن دايمًا — لون شريط المتصفح نفس خلفية الصفحة
export const viewport = {
  themeColor: '#0b0b0a',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  const title = messages.metadata?.title || 'Tamyaz';
  const description = messages.metadata?.description || siteConfig.tagline[locale];

  // ملحوظة: مفيش canonical هنا عمدًا — كل صفحة بتحط canonical و hreflang بتوعها عن طريق
  // buildPageMetadata (src/lib/metadata.js)، عشان الصفحات الفرعية ماتورثش canonical الرئيسية.
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: 'Tamyaz',
    openGraph: {
      type: 'website',
      siteName: locale === 'ar' ? 'تميز' : 'Tamyaz',
      title,
      description,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      images: [{ url: '/logo.svg', alt: 'Tamyaz' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.svg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${cairo.variable} dark`} style={{ colorScheme: 'dark' }}>
      <head>
        {/* ملفات الوكلاء الذكية + خلاصة المدونة */}
        <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms.txt`} title="llms.txt" />
        <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms-full.txt`} title="llms-full.txt" />
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`${SITE_URL}/${locale}/feed.xml`}
          title={locale === 'ar' ? 'مدونة تميز' : 'Tamyaz Blog'}
        />
        {/* Organization + WebSite على كل الصفحات؛ باقي الـschema بيتبعت من كل صفحة */}
        <JsonLd data={[organizationSchema(locale), websiteSchema(locale)]} />
      </head>
      <body className={`${cairo.className} text-ink antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <FloatingWhatsAppCTA />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
