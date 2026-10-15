import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Check, ExternalLink, ArrowLeft, ArrowRight, Users, Building2, Wrench, BookOpen, Briefcase } from "lucide-react";
import { routing } from "@/i18n/routing";
import PageShell from "@/components/geo/PageShell";
import Breadcrumbs from "@/components/geo/Breadcrumbs";
import CtaBox from "@/components/geo/CtaBox";
import PricingCards from "@/components/geo/PricingCards";
import FaqList from "@/components/geo/FaqList";
import SystemIcon from "@/components/geo/SystemIcon";
import JsonLd from "@/components/JsonLd";
import { systems, getSystem } from "@/content/systems";
import { getArticle } from "@/content/articles";
import { buildPageMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
  softwareApplicationSchema,
} from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

const L = {
  ar: {
    home: "الرئيسية",
    systems: "الأنظمة",
    who: "السيستم ده لمين؟",
    features: "مميزات السيستم",
    how: "إزاي تبدأ؟",
    branches: (n) => `${n}+ فرع شغالين على السيستم حاليًا`,
    branchesText: (n, name) => `${name} شغال حاليًا في ${n} فروع — يعني السيستم متجرّب في تشغيل حقيقي لأكتر من فرع.`,
    demoTitle: "جرّب الديمو دلوقتي",
    demoText: "من غير تسجيل، وفيه داتا حقيقية بتتجدد كل يوم.",
    demoCta: "افتح الديمو",
    customTitle: "بنعدّل السيستم على مقاس شغلك",
    customText: "لو شغلك ليه طريقة مختلفة، بنعدّل السيستم عليها. ولو محتاج حاجة مختلفة خالص بنعملهالك كاستم من الفكرة لحد التشغيل.",
    pricingTitle: "الأسعار",
    pricingText: "الاشتراك 2000 جنيه شهرياً للفرع، وبينزل لحد 1500 في الشهر مع الباقة السنوية (3 شهور 5400، 6 شهور 9900، سنة 18000)، كلمنا ونبعتلك عرض سعر.",
    proofTitle: "من أعمالنا",
    proofLink: "شوف المشروع",
    faq: "أسئلة شائعة",
    related: "أنظمة تانية ممكن تفيدك",
    article: "اقرا دليل الاختيار",
    common: "كل أنظمة تميز بالعربي، بتفتح على الموبايل والكمبيوتر، وبتتنزل كتطبيق.",
    ctaTitle: (n) => `عايز ${n} لشغلك؟`,
    ctaText: "الاشتراك من 2000 جنيه شهرياً للفرع (1500 في الشهر مع الباقة السنوية). كلمنا على واتساب أو سجّل طلبك، ونبعتلك عرض سعر حسب عدد فروعك.",
    wa: (n) => `أهلًا، مهتم بـ${n}`,
  },
  en: {
    home: "Home",
    systems: "Systems",
    who: "Who is it for?",
    features: "Key features",
    how: "How to get started",
    branches: (n) => `${n}+ branches running on it today`,
    branchesText: (n, name) => `${name} currently runs in ${n}+ branches — proven in real multi-branch operation.`,
    demoTitle: "Try the demo now",
    demoText: "No sign-up, running on real data that refreshes every day.",
    demoCta: "Open the demo",
    customTitle: "We tailor the system to your business",
    customText: "If your business works differently, we adapt the system to it. If you need something completely different, we build it custom from idea to launch.",
    pricingTitle: "Pricing",
    pricingText: "Plans are EGP 2,000/month per branch, down to EGP 1,500/month on the yearly plan (3 months EGP 5,400, 6 months EGP 9,900, 1 year EGP 18,000) — contact us and we will send you a quote.",
    proofTitle: "From our work",
    proofLink: "See the project",
    faq: "Frequently asked questions",
    related: "Other systems you may need",
    article: "Read the buyer's guide",
    common: "Every Tamyaz system is in Arabic, opens on mobile and desktop, and installs as an app.",
    ctaTitle: (n) => `Want ${n} for your business?`,
    ctaText: "Plans from EGP 2,000/month per branch (EGP 1,500/month on the yearly plan). Message us on WhatsApp or submit a request and we will send a quote based on your number of branches.",
    wa: (n) => `Hi, I'm interested in ${n}`,
  },
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => systems.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const system = getSystem(slug);
  if (!system) return {};
  return buildPageMetadata({
    locale,
    path: `/systems/${slug}`,
    title: system.title[locale],
    description: system.description[locale],
    keywords: system.keywords?.[locale],
  });
}

function Section({ icon: Icon, title, children, id }) {
  return (
    <section id={id} className="flex flex-col gap-5 scroll-mt-28">
      <h2 className="flex items-center gap-3 text-2xl sm:text-[28px] font-extrabold leading-snug text-ink">
        {Icon ? <Icon size={24} className="text-accent shrink-0" aria-hidden="true" /> : null}
        <span>{title}</span>
      </h2>
      {children}
    </section>
  );
}

export default async function SystemPage({ params }) {
  const { locale, slug } = await params;
  const system = getSystem(slug);
  if (!system || !routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const t = L[locale];
  const name = system.productName[locale];
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  const pageUrl = `${SITE_URL}/${locale}/systems/${slug}`;
  // دليل الاختيار الأساسي + أي مقالات إضافية (guides) — كلهم كروت «اقرا» تحت الأسئلة
  const guides = [system.article, ...(system.guides ?? [])].filter(Boolean).map(getArticle).filter(Boolean);
  const pricingText = system.pricing?.[locale] ?? t.pricingText;
  const related = system.related.map(getSystem).filter(Boolean);
  const crumbs = [
    { name: t.home, path: "" },
    { name: t.systems, path: "/systems" },
    { name: system.h1[locale], path: `/systems/${slug}` },
  ];

  return (
    <PageShell locale={locale}>
      <JsonLd
        data={[
          softwareApplicationSchema(system, locale),
          serviceSchema(system, locale),
          faqPageSchema(system.faq[locale], pageUrl),
          breadcrumbSchema(crumbs, locale),
        ]}
      />

      {/* الهيدر + الإجابة المباشرة */}
      <header className="flex flex-col gap-5">
        <Breadcrumbs locale={locale} items={crumbs} />
        <div className="flex items-center gap-3 flex-wrap">
          <SystemIcon name={system.icon} />
          <span className="t-chip">{name}</span>
          {system.branches ? <span className="t-chip num">{t.branches(system.branches)}</span> : null}
        </div>
        <h1 className="text-[30px] leading-[1.25] sm:text-5xl sm:leading-[1.2] font-extrabold text-ink">
          {system.h1[locale]}
        </h1>
        <p className="text-[17px] sm:text-xl leading-[1.9] text-ink-3 max-w-3xl">{system.answer[locale]}</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <a href={system.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            <span>{t.demoCta}</span>
            <ExternalLink size={18} aria-hidden="true" />
          </a>
          <a href={`/${locale}/form?system=${system.key}`} className="btn btn-secondary btn-lg">
            <span>{locale === "ar" ? "اطلب عرض سعر" : "Request a quote"}</span>
            <Arrow size={18} aria-hidden="true" />
          </a>
        </div>
      </header>

      <Section icon={Users} title={t.who}>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 list-none p-0 m-0">
          {system.audience[locale].map((a) => (
            <li key={a} className="t-row p-4 text-[15px] leading-relaxed text-ink">
              {a}
            </li>
          ))}
        </ul>
      </Section>

      <Section icon={Check} title={t.features}>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 list-none p-0 m-0">
          {system.features[locale].map((f) => (
            <li key={f.title} className="t-card p-5 flex gap-3 items-start">
              <Check size={20} strokeWidth={2.4} className="text-accent mt-1 shrink-0" aria-hidden="true" />
              <div className="min-w-0 flex flex-col gap-1">
                <h3 className="text-base sm:text-lg font-bold text-ink leading-snug">{f.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink-2">{f.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-sm sm:text-[15px] text-ink-3 leading-relaxed">{t.common}</p>
      </Section>

      {system.branches ? (
        <section className="t-row p-5 sm:p-6 flex items-start gap-3">
          <Building2 size={22} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-base leading-relaxed text-ink">{t.branchesText(system.branches, name)}</p>
        </section>
      ) : null}

      {system.proof[locale] ? (
        <Section icon={Briefcase} title={t.proofTitle}>
          <p className="text-base leading-[1.9] text-ink-3">{system.proof[locale]}</p>
          {system.portfolio ? (
            <a href={`/${locale}${system.portfolio}`} className="text-accent font-semibold underline underline-offset-4 w-fit">
              {t.proofLink}
            </a>
          ) : null}
        </Section>
      ) : null}

      <Section icon={Wrench} title={t.how}>
        <ol className="flex flex-col gap-3 list-none p-0 m-0">
          {system.howItWorks[locale].map((step, i) => (
            <li key={i} className="t-row p-4 flex items-start gap-3">
              <span className="w-8 h-8 shrink-0 rounded-full bg-accent text-on-accent font-extrabold flex items-center justify-center num">
                {i + 1}
              </span>
              <span className="text-[15px] sm:text-base leading-relaxed text-ink min-w-0 break-words">{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* ديمو + تعديل + تسعير */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="t-card p-5 sm:p-6 flex flex-col gap-3">
          <h2 className="text-lg font-extrabold text-ink">{t.demoTitle}</h2>
          <p className="text-[15px] leading-relaxed text-ink-2">{t.demoText}</p>
          <a href={system.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full mt-auto">
            <span>{t.demoCta}</span>
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="t-card p-5 sm:p-6 flex flex-col gap-3">
          <h2 className="text-lg font-extrabold text-ink">{t.customTitle}</h2>
          <p className="text-[15px] leading-relaxed text-ink-2">{t.customText}</p>
        </div>
      </div>

      <Section id="pricing" title={t.pricingTitle}>
        <p className="text-[15px] leading-relaxed text-ink-2">{pricingText}</p>
        <PricingCards system={system} systemName={system.productName[locale]} locale={locale} />
      </Section>

      <Section id="faq" title={t.faq}>
        <FaqList items={system.faq[locale]} />
      </Section>

      {guides.map((article) => (
        <a
          key={article.slug}
          href={`/${locale}/blog/${article.slug}`}
          className="t-card t-card-hover p-5 sm:p-6 flex items-center gap-4"
        >
          <BookOpen size={24} className="text-accent shrink-0" aria-hidden="true" />
          <span className="flex flex-col gap-1 min-w-0">
            <span className="text-sm font-bold text-ink-2">{t.article}</span>
            <span className="text-base sm:text-lg font-extrabold text-ink leading-snug">{article.title[locale]}</span>
          </span>
          <Arrow size={20} className="text-accent shrink-0 ms-auto" aria-hidden="true" />
        </a>
      ))}

      <Section title={t.related}>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 list-none p-0 m-0">
          {related.map((r) => (
            <li key={r.slug} className="min-w-0">
              <a href={`/${locale}/systems/${r.slug}`} className="t-card t-card-hover h-full p-5 flex flex-col gap-2">
                <span className="text-base font-extrabold text-ink">{r.productName[locale]}</span>
                <span className="text-sm text-ink-2 leading-relaxed">{r.category[locale]}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBox
        locale={locale}
        title={t.ctaTitle(name)}
        text={system.pricing?.[locale] ?? t.ctaText}
        waText={t.wa(name)}
        formQuery={`?system=${system.key}`}
      />
    </PageShell>
  );
}
