import { getCategory } from "@/data/projects";
import { buildPageMetadata } from "@/lib/metadata";

const clip = (text, max = 160) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

export async function generateMetadata({ params }) {
  const { locale, categoryId } = await params;
  const category = getCategory(categoryId);
  if (!category) return {};
  const name = category.name[locale] ?? category.name.en;
  return buildPageMetadata({
    locale,
    path: `/portfolio/category/${category.id}`,
    title: locale === "ar" ? `${name} — من أعمال تميز` : `${name} — Tamyaz Portfolio`,
    description: clip(category.intro?.[locale] ?? name),
  });
}

export default function CategoryLayout({ children }) {
  return children;
}
