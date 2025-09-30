import { Geist, Cairo } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Analytics } from "@vercel/analytics/react";
import FloatingWhatsAppCTA from './component/Cta';
import "../globals.css";

// تحسين تحميل الخطوط
const geist = Geist({
  subsets: ['latin'],
  display: 'swap', // إضافة
  preload: true, // إضافة
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['500', '800'],
  display: 'swap', // إضافة
  preload: true, // إضافة
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  
  return {
    title: messages.metadata?.title || 'Tamyaz',
    description: messages.metadata?.description || 'Create Your Website With One Step',
    // إضافة meta tags للأداء
    alternates: {
      canonical: `https://www.tamyaz.online/${locale}`,
    },
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
        {/* Preconnect للخطوط */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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