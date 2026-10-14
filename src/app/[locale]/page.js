import React from 'react';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Nav from "./component/Nav";
import SecOne from "./component/SecOne";
import SecTwo from "./component/SecTwo";
import SecThree from "./component/SecThree";
import Projects from "./component/Projects";
import Footer from "./component/Footer";
import Faq from './component/Faq';
import Orbit from './component/Orbit';
import SystemsDetails from './component/SystemsDetails';
import JsonLd from '@/components/JsonLd';
import { buildPageMetadata } from '@/lib/metadata';
import { faqPageSchema, itemListSchema } from '@/lib/schema';
import { systems } from '@/content/systems';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return buildPageMetadata({
    locale,
    path: '',
    title: messages.metadata?.title ?? 'Tamyaz',
    description: messages.metadata?.description,
    absoluteTitle: true,
  });
}

export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  // الـFAQ الموجود في الرئيسية + قايمة الأنظمة الـ٨ (الصفحات الداخلية ليها الـschema بتاعها)
  const schema = [
    itemListSchema({
      name: messages.orbit?.title ?? 'Tamyaz systems',
      url: `${SITE_URL}/${locale}`,
      items: systems.map((s) => ({
        name: s.productName[locale],
        url: `${SITE_URL}/${locale}/systems/${s.slug}`,
        description: s.category[locale],
      })),
    }),
    messages.faq?.items?.length ? faqPageSchema(messages.faq.items, `${SITE_URL}/${locale}`) : null,
  ];

  return (
    <div className="relative z-10">
      <JsonLd data={schema} />
      <Nav />
      <Orbit />
      <SystemsDetails />
      <SecOne />
      <SecTwo />
      <SecThree />
      <Projects />
      <Faq />
      <Footer />
    </div>
  );
}
