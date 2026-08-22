import { Geist, Cairo } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Analytics } from "@vercel/analytics/react";
import FloatingWhatsAppCTA from './component/Cta';
import { SITE_URL, LOCALES } from '@/lib/site';
import "../globals.css";

// تحسين تحميل الخطوط
const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['500', '800'],
  display: 'swap',
  preload: true,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  const title = messages.metadata?.title || 'Tamyaz';
  const description =
    messages.metadata?.description || 'Create Your Website With One Step';

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      // نسخ اللغات عشان محركات البحث والوكلاء يعرفوا الربط بينهم
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}`])),
    },
    openGraph: {
      type: 'website',
      siteName: 'Tamyaz',
      title,
      description,
      url: `${SITE_URL}/${locale}`,
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

// بيانات منظّمة عشان النماذج ومحركات البحث تفهم الشركة وخدماتها، مش بس تقرا نصوص
function structuredData(locale, messages) {
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Tamyaz',
    alternateName: 'تميز',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: messages.metadata?.description ?? messages.hero?.description,
    areaServed: 'EG',
    knowsLanguage: ['ar', 'en'],
    makesOffer: (messages.specializations?.services ?? []).map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service },
    })),
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}`,
    name: 'Tamyaz',
    inLanguage: locale,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  const faq = messages.faq?.items?.length
    ? {
        '@type': 'FAQPage',
        mainEntity: messages.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null;

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website, faq].filter(Boolean),
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={geist.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* نسخة الماركداون وملف llms.txt للوكلاء الذكية */}
        <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms.txt`} title="llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData(locale, messages)),
          }}
        />
      </head>
      <body className={cairo.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <FloatingWhatsAppCTA />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
