import { projectsData } from "@/data/projects";
import { buildPageMetadata } from "@/lib/metadata";

const clip = (text, max = 160) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

export async function generateMetadata({ params }) {
  const { locale, projectId } = await params;
  const project = projectsData.find((p) => p.id === projectId);
  if (!project) return {};
  return buildPageMetadata({
    locale,
    path: `/portfolio/${project.id}`,
    title: locale === "ar" ? `${project.name} — من أعمال تميز` : `${project.name} — Tamyaz Portfolio`,
    description: clip(project.description[locale] ?? project.description.en),
  });
}

export default function ProjectLayout({ children }) {
  return children;
}
