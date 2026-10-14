import { projectsData, categoriesData } from "@/data/projects";
import { SITE_URL, LOCALES, CONTENT_UPDATED } from "@/lib/site";
import { systems } from "@/content/systems";
import { getAllArticles } from "@/content/articles";

// خريطة الموقع بتتولّد من الداتا نفسها، فأي سيستم أو مقال أو مشروع جديد بيدخلها لوحده.
// كل مسار بيتكرر لكل لغة، وكل نسخة بتشاور على النسخ التانية بـalternates (hreflang + x-default).

function entries(path, { priority = 0.7, changeFrequency = "monthly", lastModified = CONTENT_UPDATED } = {}) {
  const languages = {
    ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
    "x-default": `${SITE_URL}/en${path}`,
  };
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap() {
  return [
    ...entries("", { priority: 1, changeFrequency: "weekly" }),
    ...entries("/systems", { priority: 0.95, changeFrequency: "weekly" }),
    ...systems.flatMap((s) => entries(`/systems/${s.slug}`, { priority: 0.9 })),
    ...entries("/about", { priority: 0.8 }),
    ...entries("/faq", { priority: 0.8 }),
    ...entries("/blog", { priority: 0.8, changeFrequency: "weekly" }),
    ...getAllArticles().flatMap((a) =>
      entries(`/blog/${a.slug}`, { priority: 0.75, lastModified: a.updated ?? a.date })
    ),
    ...entries("/portfolio", { priority: 0.85 }),
    ...categoriesData
      .filter((category) => category.grouped)
      .flatMap((category) => entries(`/portfolio/category/${category.id}`)),
    ...projectsData.flatMap((project) => entries(`/portfolio/${project.id}`)),
    ...entries("/package", { priority: 0.6 }),
    ...entries("/form", { priority: 0.6 }),
  ];
}
