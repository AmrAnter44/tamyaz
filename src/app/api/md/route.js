import { projectsData, categoriesData, getCategory } from "@/data/projects";
import { SITE_URL, LOCALES } from "@/lib/site";
import ar from "../../../../messages/ar.json";
import en from "../../../../messages/en.json";

// نسخة Markdown من صفحات الموقع للوكلاء الذكية.
// بتتنده من الميدلوير في حالتين: الرابط منتهي بـ.md، أو الطلب فيه Accept: text/markdown
const MESSAGES = { ar, en };

const line = (parts) => parts.filter(Boolean).join("\n");

function projectMarkdown(project, locale, t) {
  const out = [];
  out.push(`# ${project.name}`);
  out.push("");
  out.push(project.description[locale]);
  out.push("");

  if (project.highlights?.[locale]?.length) {
    out.push(project.highlights[locale].join(" · "));
    out.push("");
  }

  if (project.websiteLink) {
    out.push(`- ${t.visitWebsite}: ${project.websiteLink}`);
    out.push("");
  }

  if (project.features?.[locale]?.length) {
    out.push(`## ${t.features}`);
    out.push("");
    project.features[locale].forEach((f) => out.push(`- ${f}`));
    out.push("");
  }

  if (project.benefits?.[locale]?.length) {
    out.push(`## ${t.benefits}`);
    out.push("");
    project.benefits[locale].forEach((b) => out.push(`- ${b}`));
    out.push("");
  }

  return line(out);
}

function categoryMarkdown(category, locale, t) {
  const projects = projectsData.filter((p) => p.categoryId === category.id);
  const out = [];

  out.push(`# ${category.name[locale]}`);
  out.push("");
  if (category.intro) {
    out.push(category.intro[locale]);
    out.push("");
  }

  out.push(`## ${t.services}`);
  out.push("");
  for (const project of projects) {
    out.push(`### ${project.name}`);
    out.push("");
    out.push(project.description[locale]);
    out.push("");
    if (project.benefits?.[locale]?.length) {
      project.benefits[locale].slice(0, 6).forEach((b) => out.push(`- ${b}`));
      out.push("");
    }
    out.push(`[${t.fullDetails}](${SITE_URL}/${locale}/portfolio/${project.id})`);
    out.push("");
  }

  return line(out);
}

function portfolioMarkdown(locale, t) {
  const out = [];
  out.push(`# ${t.title}`);
  out.push("");

  for (const category of categoriesData) {
    const projects = projectsData.filter((p) => p.categoryId === category.id);
    if (projects.length === 0) continue;

    out.push(`## ${category.name[locale]}`);
    out.push("");
    for (const project of projects) {
      out.push(
        `- [${project.name}](${SITE_URL}/${locale}/portfolio/${project.id}): ${project.description[locale]}`
      );
    }
    out.push("");
  }

  return line(out);
}

function homeMarkdown(locale, messages) {
  const out = [];
  out.push(`# ${messages.metadata?.title ?? "Tamyaz"}`);
  out.push("");
  out.push(messages.hero?.description ?? "");
  out.push("");

  if (messages.specializations?.services?.length) {
    out.push(`## ${messages.specializations.title}`);
    out.push("");
    messages.specializations.services.forEach((s) => out.push(`- ${s}`));
    out.push("");
  }

  if (messages.about?.points?.length) {
    out.push(`## ${messages.about.title}`);
    out.push("");
    messages.about.points.forEach((p) => out.push(`- ${p}`));
    out.push("");
  }

  out.push(`## ${messages.portfolio?.title ?? "Portfolio"}`);
  out.push("");
  out.push(`${SITE_URL}/${locale}/portfolio`);
  out.push("");

  if (messages.faq?.items?.length) {
    out.push(`## ${messages.faq.title}`);
    out.push("");
    messages.faq.items.forEach((item) => {
      out.push(`**${item.question}**`);
      out.push("");
      out.push(item.answer);
      out.push("");
    });
  }

  return line(out);
}

function render(path) {
  const segments = path.split("/").filter(Boolean);
  const locale = LOCALES.includes(segments[0]) ? segments[0] : "en";
  const messages = MESSAGES[locale];
  const t = messages.portfolio ?? {};
  const rest = segments.slice(1);

  if (rest.length === 0) return homeMarkdown(locale, messages);

  if (rest[0] === "portfolio") {
    if (rest.length === 1) return portfolioMarkdown(locale, t);

    if (rest[1] === "category" && rest[2]) {
      const category = getCategory(rest[2]);
      return category ? categoryMarkdown(category, locale, t) : null;
    }

    const project = projectsData.find((p) => p.id === rest[1]);
    return project ? projectMarkdown(project, locale, t) : null;
  }

  return null;
}

export function GET(request) {
  const path = request.nextUrl.searchParams.get("path") ?? "/";
  const body = render(path);

  if (!body) {
    return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain" } });
  }

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Robots-Tag": "all",
    },
  });
}
