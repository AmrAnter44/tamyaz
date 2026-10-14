import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CalendarDays, Rss } from "lucide-react";
import { routing } from "@/i18n/routing";
import PageShell from "@/components/geo/PageShell";
import Breadcrumbs from "@/components/geo/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getAllArticles } from "@/content/articles";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, itemListSchema, ORG_ID } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const COPY = {
  ar: {
    title: "مدونة تميز — أدلة اختيار أنظمة الإدارة والكاشير في مصر",
    description:
      "أدلة عملية لاختيار سيستم كاشير الكافيه، سيستم المطاعم، سيستم حجز الباربر، برنامج العيادات وعيادات الأسنان، برنامج الصيدليات، بار الجيم، وكاشير المحلات في مصر.",
    h1: "المدونة",
    intro: "أدلة اختيار عملية لأصحاب البيزنس في مصر: إزاي تختار السيستم المناسب لشغلك، وتسأل إيه قبل ما تشتري.",
    home: "الرئيسية",
    rss: "تابع المدونة (RSS)",
  },
  en: {
    title: "Tamyaz Blog — Guides to Choosing Management and POS Systems in Egypt",
    description:
      "Practical guides to choosing a café POS, restaurant system, barbershop booking system, clinic and dental software, pharmacy system, gym-bar POS and retail POS in Egypt.",
    h1: "Blog",
    intro: "Practical buyer's guides for business owners in Egypt: how to choose the right system for your business and what to ask before you buy.",
    home: "Home",
    rss: "Follow the blog (RSS)",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] ?? COPY.en;
  return buildPageMetadata({ locale, path: "/blog", title: c.title, description: c.description });
}

function formatDate(iso, locale) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogIndexPage({ params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const c = COPY[locale];
  const posts = getAllArticles();
  const crumbs = [
    { name: c.home, path: "" },
    { name: c.h1, path: "/blog" },
  ];

  return (
    <PageShell locale={locale} width="max-w-[900px]">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${SITE_URL}/${locale}/blog#blog`,
            name: c.title,
            url: `${SITE_URL}/${locale}/blog`,
            inLanguage: locale === "ar" ? "ar-EG" : "en",
            publisher: { "@id": ORG_ID },
          },
          itemListSchema({
            name: c.title,
            url: `${SITE_URL}/${locale}/blog`,
            items: posts.map((p) => ({ name: p.title[locale], url: `${SITE_URL}/${locale}/blog/${p.slug}` })),
          }),
          breadcrumbSchema(crumbs, locale),
        ]}
      />
      <header className="flex flex-col gap-4">
        <Breadcrumbs locale={locale} items={crumbs} />
        <h1 className="text-[32px] sm:text-5xl font-extrabold text-ink">{c.h1}</h1>
        <p className="text-base sm:text-lg leading-[1.9] text-ink-3">{c.intro}</p>
        <a href={`/${locale}/feed.xml`} className="inline-flex items-center gap-2 text-sm font-semibold text-accent w-fit">
          <Rss size={16} aria-hidden="true" />
          {c.rss}
        </a>
      </header>

      <ul className="flex flex-col gap-4 list-none p-0 m-0">
        {posts.map((p) => (
          <li key={p.slug}>
            <article className="t-card t-card-hover p-5 sm:p-6 flex flex-col gap-2.5">
              <p className="flex items-center gap-2 text-sm text-ink-2">
                <CalendarDays size={15} aria-hidden="true" />
                <time dateTime={p.date}>{formatDate(p.date, locale)}</time>
              </p>
              <h2 className="text-lg sm:text-xl font-extrabold leading-snug text-ink">
                <a href={`/${locale}/blog/${p.slug}`} className="hover:text-accent transition-colors">
                  {p.title[locale]}
                </a>
              </h2>
              <p className="text-[15px] leading-relaxed text-ink-2">{p.description[locale]}</p>
            </article>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
