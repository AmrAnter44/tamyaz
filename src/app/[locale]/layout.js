import { Geist, Cairo } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Analytics } from "@vercel/analytics/react";
import FloatingWhatsAppCTA from './component/Cta';
import "../globals.css";

const geist = Geist({
  subsets: ['latin'],
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['500', '800'],
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
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // تحقق من صحة اللغة
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={geist.className}>
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