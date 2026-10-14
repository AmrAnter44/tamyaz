import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import PageShell from "@/components/geo/PageShell";
import Breadcrumbs from "@/components/geo/Breadcrumbs";
import CtaBox from "@/components/geo/CtaBox";
import JsonLd from "@/components/JsonLd";
import { systems } from "@/content/systems";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, ORG_ID } from "@/lib/schema";
import { SITE_URL, siteConfig } from "@/lib/site";

const COPY = {
  ar: {
    title: "عن تميز — شركة برمجيات مصرية بـ8 أنظمة إدارة للبيزنس",
    h1: "عن تميز",
    home: "الرئيسية",
    whatTitle: "إحنا مين؟",
    what: [
      "تميز (Tamyaz) شركة برمجيات مصرية بدأت في 2023. بنبني أنظمة إدارة وكاشير جاهزة لأنواع البيزنس اللي بتقابلها كل يوم في مصر، وبنعدّلها على مقاس شغل كل عميل.",
      "كل سيستم بالعربي، بيفتح على الموبايل والكمبيوتر، وبيتنزل كتطبيق، وليه ديمو مفتوح من غير تسجيل فيه داتا حقيقية بتتجدد كل يوم. تميز باربر شغال حاليًا في 8 فروع، وتميز فارما في 6 فروع صيدليات.",
      "وجنب الأنظمة بنعمل مواقع إلكترونية وتطبيقات موبايل وهوية بصرية وتصميمات سوشيال ميديا وإنتاج فيديو.",
    ],
    systemsTitle: "أنظمتنا الـ8",
    workTitle: "من أعمالنا",
    work: [
      ["Memo Group", "منظومة رقمية كاملة لمجموعة عناية رجالي: أنظمة لمحلات الحلاقة والأكاديمية ومحل الكوزمتكس، وتطبيقات للعملاء والطلبة، ومواقع.", "/portfolio/category/memo-group"],
      ["دوّر صح", "موقع وسيستم إدارة لوسيط بيع وشراء العربيات المستعملة.", "/portfolio/dawr-sa7"],
      ["كافيه «كيف»", "نظام تشغيل كامل للكافيه: كاشير، شاشة باريستا، ولوحة إدارة.", "/portfolio/cafe-system"],
    ],
    allWork: "كل الأعمال",
    contactTitle: "التواصل",
    ctaTitle: "خلينا نشتغل سوا",
    ctaText: "كلمنا على واتساب أو سجّل طلبك، ونرشحلك السيستم المناسب لشغلك.",
  },
  en: {
    title: "About Tamyaz — Egyptian Software Company with 8 Business Systems",
    h1: "About Tamyaz",
    home: "Home",
    whatTitle: "Who we are",
    what: [
      "Tamyaz (تميز) is an Egyptian software company that started in 2023. We build ready-made management and POS systems for the kinds of businesses you meet every day in Egypt, and we tailor them to how each client works.",
      "Every system is in Arabic, opens on mobile and desktop, installs as an app, and has an open demo with no sign-up running on real data that refreshes daily. Tamyaz Barber currently runs in 8 branches and Tamyaz Pharma in 6 pharmacy branches.",
      "Alongside the systems, we build websites, mobile apps, brand identity, social media designs and video content.",
    ],
    systemsTitle: "Our 8 systems",
    workTitle: "From our work",
    work: [
      ["Memo Group", "A full digital ecosystem for a men's grooming group: systems for the barbershops, the academy and the cosmetics shop, apps for customers and students, and websites.", "/portfolio/category/memo-group"],
      ["Dawr Sa7", "The website and management system for a used-car brokerage.", "/portfolio/dawr-sa7"],
      ["Keyif café", "A complete café operating system: cashier, barista screen and admin dashboard.", "/portfolio/cafe-system"],
    ],
    allWork: "All work",
    contactTitle: "Contact",
    ctaTitle: "Let's work together",
    ctaText: "Message us on WhatsApp or submit a request, and we will recommend the right system for your business.",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] ?? COPY.en;
  return buildPageMetadata({ locale, path: "/about", title: c.title, description: siteConfig.tagline[locale] });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const c = COPY[locale];
  const crumbs = [
    { name: c.home, path: "" },
    { name: c.h1, path: "/about" },
  ];

  return (
    <PageShell locale={locale} width="max-w-[900px]">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: `${SITE_URL}/${locale}/about`,
            name: c.title,
            inLanguage: locale === "ar" ? "ar-EG" : "en",
            mainEntity: { "@id": ORG_ID },
          },
          breadcrumbSchema(crumbs, locale),
        ]}
      />
      <header className="flex flex-col gap-4">
        <Breadcrumbs locale={locale} items={crumbs} />
        <h1 className="text-[32px] sm:text-5xl font-extrabold text-ink">{c.h1}</h1>
        <p className="text-[17px] sm:text-xl leading-[1.9] text-ink-3">{siteConfig.tagline[locale]}</p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl sm:text-[28px] font-extrabold text-ink">{c.whatTitle}</h2>
        {c.what.map((p) => (
          <p key={p} className="text-base sm:text-[17px] leading-[1.95] text-ink-3">
            {p}
          </p>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl sm:text-[28px] font-extrabold text-ink">{c.systemsTitle}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
          {systems.map((s) => (
            <li key={s.slug}>
              <a href={`/${locale}/systems/${s.slug}`} className="t-row p-4 flex flex-col gap-1 hover:border-accent/30 transition-colors">
                <span className="font-bold text-ink">{s.productName[locale]}</span>
                <span className="text-sm text-ink-2">{s.category[locale]}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl sm:text-[28px] font-extrabold text-ink">{c.workTitle}</h2>
        <ul className="flex flex-col gap-3 list-none p-0 m-0">
          {c.work.map(([name, text, path]) => (
            <li key={name}>
              <a href={`/${locale}${path}`} className="t-card t-card-hover p-5 flex flex-col gap-1.5">
                <span className="text-lg font-extrabold text-ink">{name}</span>
                <span className="text-[15px] leading-relaxed text-ink-2">{text}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href={`/${locale}/portfolio`} className="text-accent font-semibold underline underline-offset-4 w-fit">
          {c.allWork}
        </a>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl sm:text-[28px] font-extrabold text-ink">{c.contactTitle}</h2>
        <ul className="flex flex-col gap-2 list-none p-0 m-0 text-base text-ink-3">
          <li>
            WhatsApp:{" "}
            <a href={siteConfig.whatsapp} className="text-accent num" dir="ltr" target="_blank" rel="noopener noreferrer">
              {siteConfig.phoneDisplay}
            </a>
          </li>
          <li>
            Email:{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-accent">
              {siteConfig.email}
            </a>
          </li>
          <li>
            Facebook:{" "}
            <a href={siteConfig.socials.facebook} className="text-accent" target="_blank" rel="noopener noreferrer">
              Tamyaz
            </a>
            {" · "}Instagram:{" "}
            <a href={siteConfig.socials.instagram} className="text-accent" target="_blank" rel="noopener noreferrer">
              @tamyazcompany
            </a>
          </li>
        </ul>
      </section>

      <CtaBox locale={locale} title={c.ctaTitle} text={c.ctaText} />
    </PageShell>
  );
}
