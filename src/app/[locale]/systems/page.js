import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { routing } from "@/i18n/routing";
import PageShell from "@/components/geo/PageShell";
import Breadcrumbs from "@/components/geo/Breadcrumbs";
import CtaBox from "@/components/geo/CtaBox";
import PricingCards from "@/components/geo/PricingCards";
import SystemIcon from "@/components/geo/SystemIcon";
import JsonLd from "@/components/JsonLd";
import { systems } from "@/content/systems";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const COPY = {
  ar: {
    title: "أنظمة تميز: 8 أنظمة إدارة وكاشير للبيزنس في مصر",
    description:
      "كل أنظمة تميز في صفحة واحدة: سيستم كاشير كافيه، سيستم مطاعم، سيستم حجز باربر، برنامج عيادات، برنامج عيادة أسنان، برنامج صيدلية، كاشير بار الجيم، وكاشير محل مع متجر أونلاين — بديمو مجاني.",
    h1: "8 أنظمة إدارة وكاشير للبيزنس في مصر",
    intro:
      "تميز بتقدّم 8 أنظمة جاهزة، كل واحد معمول لنوع بيزنس معيّن: الكافيهات، المطاعم، الباربر شوب، العيادات، عيادات الأسنان، الصيدليات، بار الجيم، والمحلات. كل سيستم بالعربي، بيفتح على الموبايل والكمبيوتر، بيتنزل كتطبيق، وليه ديمو تقدر تجربه دلوقتي من غير تسجيل.",
    details: "تفاصيل السيستم",
    demo: "الديمو",
    branches: (n) => `شغال في ${n}+ فرع`,
    home: "الرئيسية",
    crumb: "الأنظمة",
    ctaTitle: "مش لاقي السيستم المناسب؟",
    ctaText: "بنعدّل أي سيستم على مقاس شغلك، أو بنعملك سيستم كاستم من الفكرة لحد التشغيل. الاشتراك 2000 جنيه شهرياً للفرع، وبينزل لحد 1500 في الشهر مع الباقة السنوية (3 شهور 5400، 6 شهور 9900، سنة 18000) — كلمنا ونبعتلك عرض سعر.",
  },
  en: {
    title: "Tamyaz Systems: 8 Management & POS Systems for Businesses in Egypt",
    description:
      "All Tamyaz systems on one page: café POS, restaurant system, barbershop booking, clinic software, dental clinic software, pharmacy system, gym-bar POS, and retail POS with an online store — with free demos.",
    h1: "8 management & POS systems for businesses in Egypt",
    intro:
      "Tamyaz offers 8 ready-made systems, each built for one type of business: cafés, restaurants, barbershops, clinics, dental clinics, pharmacies, gym bars and retail shops. Every system is in Arabic, opens on mobile and desktop, installs as an app, and has a demo you can try right now with no sign-up.",
    details: "System details",
    demo: "Demo",
    branches: (n) => `Running in ${n}+ branches`,
    home: "Home",
    crumb: "Systems",
    ctaTitle: "Can't find the right system?",
    ctaText: "We tailor any system to how you work, or build you a custom one from idea to launch. Plans are EGP 2,000/month per branch, down to EGP 1,500/month on the yearly plan (3 months EGP 5,400, 6 months EGP 9,900, 1 year EGP 18,000) — contact us for a quote.",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] ?? COPY.en;
  return buildPageMetadata({ locale, path: "/systems", title: c.title, description: c.description });
}

export default async function SystemsIndexPage({ params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const c = COPY[locale];
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  const crumbs = [
    { name: c.home, path: "" },
    { name: c.crumb, path: "/systems" },
  ];

  return (
    <PageShell locale={locale}>
      <JsonLd
        data={[
          itemListSchema({
            name: c.title,
            url: `${SITE_URL}/${locale}/systems`,
            items: systems.map((s) => ({
              name: s.h1[locale],
              url: `${SITE_URL}/${locale}/systems/${s.slug}`,
              description: s.description[locale],
            })),
          }),
          breadcrumbSchema(crumbs, locale),
        ]}
      />

      <header className="flex flex-col gap-4">
        <Breadcrumbs locale={locale} items={crumbs} />
        <h1 className="text-[30px] leading-[1.25] sm:text-5xl font-extrabold text-ink">{c.h1}</h1>
        <p className="text-base sm:text-lg leading-[1.9] text-ink-3 max-w-3xl">{c.intro}</p>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 list-none p-0 m-0">
        {systems.map((s) => (
          <li key={s.slug} className="min-w-0">
            <article className="t-card t-card-hover h-full flex flex-col gap-4 p-5 sm:p-6">
              <div className="flex items-center gap-3 min-w-0">
                <SystemIcon name={s.icon} />
                <div className="min-w-0 flex flex-col items-start gap-1">
                  <h2 className="text-lg font-extrabold leading-snug text-ink">
                    <a href={`/${locale}/systems/${s.slug}`} className="hover:text-accent transition-colors">
                      {s.productName[locale]}
                    </a>
                  </h2>
                  <span className="t-chip">{s.category[locale]}</span>
                  {s.branches ? <span className="t-chip num">{c.branches(s.branches)}</span> : null}
                </div>
              </div>
              <p className="text-[15px] leading-relaxed text-ink-2">{s.answer[locale]}</p>
              <div className="mt-auto flex flex-col sm:flex-row gap-2.5">
                <a href={`/${locale}/systems/${s.slug}`} className="btn btn-primary flex-1">
                  <span>{c.details}</span>
                  <Arrow size={17} aria-hidden="true" />
                </a>
                <a
                  href={s.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary flex-1"
                  aria-label={`${c.demo} — ${s.productName[locale]}`}
                >
                  <span>{c.demo}</span>
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <section id="pricing" className="flex flex-col gap-6 scroll-mt-28">
        <h2 className="text-2xl sm:text-[28px] font-extrabold leading-snug text-ink">
          {locale === "ar" ? "الباقات والأسعار" : "Plans and pricing"}
        </h2>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-ink-2">
            {locale === "ar" ? "كافيه · مطاعم · عيادات · أسنان · صيدليات · بار الجيم · متاجر" : "Cafe · Restaurant · Clinic · Dental · Pharmacy · Gym bar · Store"}
          </h3>
          <PricingCards system={null} systemName={locale === "ar" ? "أنظمة تميز" : "Tamyaz systems"} locale={locale} />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-ink-2">{locale === "ar" ? "تميز باربر — صالونات الحلاقة" : "Tamyaz Barber — barbershops"}</h3>
          <PricingCards
            system={systems.find((s) => s.key === "barber")}
            systemName={locale === "ar" ? "تميز باربر" : "Tamyaz Barber"}
            locale={locale}
          />
        </div>
      </section>

      <CtaBox locale={locale} title={c.ctaTitle} text={c.ctaText} formQuery="?system=custom" />
    </PageShell>
  );
}
