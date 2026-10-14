import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import PageShell from "@/components/geo/PageShell";
import Breadcrumbs from "@/components/geo/Breadcrumbs";
import CtaBox from "@/components/geo/CtaBox";
import FaqList from "@/components/geo/FaqList";
import JsonLd from "@/components/JsonLd";
import { getFaqs } from "@/content/faq";
import { systems } from "@/content/systems";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const COPY = {
  ar: {
    title: "الأسئلة الشائعة عن تميز وأنظمتها",
    description:
      "إجابات مباشرة: يعني إيه تميز، أنظمتها الـ8، الديمو، الموبايل، الفروع، التعديل على مقاس شغلك، طريقة التسعير، وإزاي تبدأ.",
    h1: "الأسئلة الشائعة",
    intro: "إجابات مباشرة عن أكتر الأسئلة اللي بتوصلنا عن تميز وأنظمتها. ولكل سيستم أسئلة خاصة بيه في صفحته.",
    home: "الرئيسية",
    perSystem: "أسئلة كل سيستم",
    ctaTitle: "سؤالك مش موجود؟",
    ctaText: "كلمنا على واتساب وهنرد عليك بالعربي أو الإنجليزي.",
  },
  en: {
    title: "Frequently Asked Questions about Tamyaz and Its Systems",
    description:
      "Direct answers: what Tamyaz is, its 8 systems, demos, mobile, branches, customization, the pricing approach, and how to get started.",
    h1: "Frequently asked questions",
    intro: "Direct answers to the questions we hear most about Tamyaz and its systems. Each system also has its own questions on its page.",
    home: "Home",
    perSystem: "Questions about each system",
    ctaTitle: "Question not answered?",
    ctaText: "Message us on WhatsApp and we will reply in Arabic or English.",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] ?? COPY.en;
  return buildPageMetadata({ locale, path: "/faq", title: c.title, description: c.description });
}

export default async function FaqPage({ params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const c = COPY[locale];
  const faqs = getFaqs(locale);
  const crumbs = [
    { name: c.home, path: "" },
    { name: c.h1, path: "/faq" },
  ];

  return (
    <PageShell locale={locale} width="max-w-[860px]">
      <JsonLd data={[faqPageSchema(faqs, `${SITE_URL}/${locale}/faq`), breadcrumbSchema(crumbs, locale)]} />
      <header className="flex flex-col gap-4">
        <Breadcrumbs locale={locale} items={crumbs} />
        <h1 className="text-[32px] sm:text-5xl font-extrabold text-ink">{c.h1}</h1>
        <p className="text-base sm:text-lg leading-[1.9] text-ink-3">{c.intro}</p>
      </header>

      <FaqList items={faqs} headingLevel="h2" />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-extrabold text-ink">{c.perSystem}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
          {systems.map((s) => (
            <li key={s.slug}>
              <a href={`/${locale}/systems/${s.slug}#faq`} className="t-row p-4 flex flex-col gap-1 hover:border-accent/30 transition-colors">
                <span className="font-bold text-ink">{s.productName[locale]}</span>
                <span className="text-sm text-ink-2">{s.category[locale]}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <CtaBox locale={locale} title={c.ctaTitle} text={c.ctaText} />
    </PageShell>
  );
}
