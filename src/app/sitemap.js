import { projectsData, categoriesData } from "@/data/projects";
import { SITE_URL, LOCALES, STATIC_PATHS } from "@/lib/site";

// خريطة الموقع بتتولّد من الداتا نفسها، فأي مشروع أو تصنيف جديد بيدخلها لوحده
export default function sitemap() {
  const lastModified = new Date();

  // كل مسار بيتكرر لكل لغة، وكل نسخة بتشاور على النسخ التانية بـalternates
  const paths = [
    ...STATIC_PATHS,
    ...categoriesData
      .filter((category) => category.grouped)
      .map((category) => `/portfolio/category/${category.id}`),
    ...projectsData.map((project) => `/portfolio/${project.id}`),
  ];

  const entries = [];

  for (const path of paths) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/portfolio" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
          ),
        },
      });
    }
  }

  return entries;
}
