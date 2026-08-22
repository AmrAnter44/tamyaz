import { projectsData, categoriesData } from "@/data/projects";
import { SITE_URL } from "@/lib/site";
import ar from "../../../messages/ar.json";

// ملف llms.txt بصيغة llmstxt.org — ملخص نصي للموقع مخصوص للوكلاء الذكية.
// بيتولّد من نفس داتا المشاريع، فمابيقدمش أبدًا على الموقع.
export const dynamic = "force-static";

function buildLlmsTxt() {
  const lines = [];

  lines.push("# Tamyaz — تميز");
  lines.push("");
  lines.push(
    "> " +
      "وكالة رقمية مصرية بتقدم حلول متكاملة للأعمال: أنظمة إدارة مخصصة (عيادات، أكاديميات، صالونات)، " +
      "مواقع إلكترونية، هوية بصرية وتصميمات سوشيال ميديا، وإنتاج فيديو. " +
      "A digital agency building custom management systems, websites, brand identity, social media content, and video production."
  );
  lines.push("");
  lines.push(`- الموقع / Website: ${SITE_URL}`);
  lines.push(`- اللغات / Languages: العربية (${SITE_URL}/ar) · English (${SITE_URL}/en)`);
  lines.push("");

  // الخدمات من ملف الترجمة عشان تفضل مطابقة للموقع
  const services = ar.specializations?.services;
  if (Array.isArray(services) && services.length > 0) {
    lines.push("## الخدمات / Services");
    lines.push("");
    services.forEach((s) => lines.push(`- ${typeof s === "string" ? s : s.title ?? ""}`));
    lines.push("");
  }

  lines.push("## الأعمال / Portfolio");
  lines.push("");

  for (const category of categoriesData) {
    const projects = projectsData.filter((p) => p.categoryId === category.id);
    if (projects.length === 0) continue;

    const heading = category.name.en === category.name.ar ? category.name.en : `${category.name.en} — ${category.name.ar}`;
    lines.push(`### ${heading}`);
    if (category.grouped) {
      lines.push(
        `- [${category.name.en}](${SITE_URL}/ar/portfolio/category/${category.id}): ${category.intro?.ar ?? ""}`
      );
    }
    for (const project of projects) {
      lines.push(
        `- [${project.name}](${SITE_URL}/ar/portfolio/${project.id}): ${project.description.ar}`
      );
    }
    lines.push("");
  }

  lines.push("## صفحات مهمة / Key pages");
  lines.push("");
  lines.push(`- [الأعمال / Portfolio](${SITE_URL}/ar/portfolio): كل المشاريع مقسّمة بالتصنيف.`);
  lines.push(`- [الباقات / Packages](${SITE_URL}/ar/package): حاسبة الباقات والأسعار.`);
  lines.push(`- [تواصل / Contact](${SITE_URL}/ar/form): نموذج طلب عرض سعر.`);
  lines.push("");
  lines.push("## ملاحظات للوكلاء / Notes for agents");
  lines.push("");
  lines.push(
    "- أي صفحة في الموقع ليها نسخة Markdown: ضيف `.md` في آخر الرابط، " +
      "أو ابعت `Accept: text/markdown`."
  );
  lines.push("- قواعد الوصول والزحف في /robots.txt، وخريطة الموقع في /sitemap.xml.");
  lines.push("");

  return lines.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
