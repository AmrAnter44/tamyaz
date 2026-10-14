// RSS 2.0 للمدونة — الطريقة القياسية إن الزواحف والوكلاء يعرفوا الجديد من غير ما يلفّوا الموقع كله.
import { SITE_URL, siteConfig } from "@/lib/site";
import { getAllArticles } from "@/content/articles";

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const rfc822 = (iso) => new Date(`${iso}T08:00:00Z`).toUTCString();

export function buildFeed(locale) {
  const posts = getAllArticles();
  const self = `${SITE_URL}/${locale}/feed.xml`;
  const title = locale === "ar" ? `${siteConfig.nameAr} — المدونة` : `${siteConfig.name} — Blog`;

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/${locale}/blog/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.title[locale])}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <description>${escapeXml(post.description[locale])}</description>`,
        `      <pubDate>${rfc822(post.updated ?? post.date)}</pubDate>`,
        `      <author>${escapeXml(`${siteConfig.email} (${siteConfig.legalName})`)}</author>`,
        // نسخة الماركداون النظيفة من المقال للوكلاء
        `      <atom:link rel="alternate" type="text/markdown" href="${escapeXml(`${link}.md`)}" />`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const lastBuild = posts[0] ? rfc822(posts[0].updated ?? posts[0].date) : null;

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(title)}</title>`,
    `    <link>${SITE_URL}/${locale}/blog</link>`,
    `    <description>${escapeXml(siteConfig.tagline[locale])}</description>`,
    `    <language>${locale === "ar" ? "ar-EG" : "en"}</language>`,
    lastBuild ? `    <lastBuildDate>${lastBuild}</lastBuildDate>` : null,
    `    <atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
  ]
    .filter(Boolean)
    .join("\n");

  return new Response(`${xml}\n`, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
