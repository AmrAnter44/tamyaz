import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CalendarDays, ArrowLeft, ArrowRight } from "lucide-react";
import { routing } from "@/i18n/routing";
import PageShell from "@/components/geo/PageShell";
import Breadcrumbs from "@/components/geo/Breadcrumbs";
import ArticleBody from "@/components/geo/ArticleBody";
import CtaBox from "@/components/geo/CtaBox";
import JsonLd from "@/components/JsonLd";
import { articles, getArticle } from "@/content/articles";
import { getSystem } from "@/content/systems";
import { buildArticleBlocks, articleCriteriaList } from "@/lib/articles";
import { buildPageMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema, faqPageSchema, itemListSchema } from "@/lib/schema";
import { SITE_URL, siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: article.title[locale],
    description: article.description[locale],
    keywords: article.keywords?.[locale],
    type: "article",
    publishedTime: article.date,
    modifiedTime: article.updated ?? article.date,
  });
}

function formatDate(iso, locale) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function ArticlePage({ params }) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article || !routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const isRTL = locale === "ar";
  const Back = isRTL ? ArrowRight : ArrowLeft;
  const blocks = buildArticleBlocks(article, locale);
  const system = article.system ? getSystem(article.system) : null;
  const url = `${SITE_URL}/${locale}/blog/${slug}`;
  const crumbs = [
    { name: isRTL ? "الرئيسية" : "Home", path: "" },
    { name: isRTL ? "المدونة" : "Blog", path: "/blog" },
    { name: article.title[locale], path: `/blog/${slug}` },
  ];

  return (
    <PageShell locale={locale} width="max-w-[820px]">
      <JsonLd
        data={[
          articleSchema(article, locale),
          itemListSchema({
            name: isRTL ? `معايير اختيار — ${article.title.ar}` : `Selection criteria — ${article.title.en}`,
            url: `${url}#criteria`,
            items: articleCriteriaList(article, locale),
          }),
          faqPageSchema(article.faq[locale], url),
          breadcrumbSchema(crumbs, locale),
        ]}
      />
      <article className="flex flex-col gap-6 min-w-0">
        <header className="flex flex-col gap-4">
          <Breadcrumbs locale={locale} items={crumbs} />
          <h1 className="text-[28px] leading-[1.35] sm:text-[42px] sm:leading-[1.3] font-extrabold text-ink">
            {article.title[locale]}
          </h1>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-2">
            <CalendarDays size={15} aria-hidden="true" />
            <span>
              {isRTL ? "نُشر" : "Published"}: <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
            </span>
            {article.updated && article.updated !== article.date ? (
              <span>
                · {isRTL ? "آخر تحديث" : "Updated"}: <time dateTime={article.updated}>{formatDate(article.updated, locale)}</time>
              </span>
            ) : null}
            <span>· {isRTL ? `فريق ${siteConfig.nameAr}` : `${siteConfig.name} team`}</span>
          </p>
        </header>

        <ArticleBody blocks={blocks} />
      </article>

      {system ? (
        <CtaBox
          locale={locale}
          title={isRTL ? `جرّب ${system.productName.ar}` : `Try ${system.productName.en}`}
          text={system.answer[locale]}
          waText={isRTL ? `أهلًا، قريت مقال «${article.title.ar}» ومهتم بـ${system.productName.ar}` : `Hi, I read "${article.title.en}" and I'm interested in ${system.productName.en}`}
          formQuery={`?system=${system.key}`}
        />
      ) : null}

      <a href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-accent font-semibold w-fit">
        <Back size={16} aria-hidden="true" />
        {isRTL ? "كل المقالات" : "All articles"}
      </a>
    </PageShell>
  );
}
