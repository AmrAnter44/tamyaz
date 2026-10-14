import { projectsData, categoriesData } from "@/data/projects";
import { SITE_URL, siteConfig } from "@/lib/site";
import { systems } from "@/content/systems";
import { getAllArticles } from "@/content/articles";

// llms.txt بصيغة llmstxt.org — ملخص الشركة للوكلاء الذكية.
// بيتولّد من نفس ملفات المحتوى (الأنظمة/المقالات/الأعمال)، فمابيقدمش أبدًا على الموقع.
export const dynamic = "force-static";

function buildLlmsTxt() {
  const lines = [];
  const push = (...l) => lines.push(...l);

  push("# Tamyaz | تميز", "");
  push(`> ${siteConfig.tagline.ar}`, "");
  push(`> ${siteConfig.tagline.en}`, "");
  push(
    "Tamyaz is based in Egypt and serves businesses across Egypt. Every system is in Arabic, opens on mobile and desktop, installs as an app, and has a live demo with no sign-up. Branches running on Tamyaz systems today: Cafe 12+, Resto 4+, Barber 8+, Clinic 16+, Dental 9+, Pharma 6+, Gym Bar 11+, Store 5+ (70+ in total). Pricing: every system starts from EGP 1,500 per month and scales with the number of branches; exact quote on request. الأسعار: كل الأنظمة تبدأ من 1500 جنيه شهرياً وبتزيد حسب عدد الفروع.",
    ""
  );

  push("## الأنظمة / Systems", "");
  for (const s of systems) {
    push(
      `- [${s.productName.ar} — ${s.category.ar} / ${s.productName.en} — ${s.category.en}](${SITE_URL}/ar/systems/${s.slug}): ${s.description.en} Demo: ${s.demoUrl} · English: ${SITE_URL}/en/systems/${s.slug}`
    );
  }
  push("");

  push("## أدلة الاختيار / Buyer's guides", "");
  for (const a of getAllArticles()) {
    push(`- [${a.title.ar}](${SITE_URL}/ar/blog/${a.slug}) | [${a.title.en}](${SITE_URL}/en/blog/${a.slug})`);
  }
  push("");

  push("## الأعمال / Portfolio", "");
  for (const category of categoriesData) {
    const projects = projectsData.filter((p) => p.categoryId === category.id);
    if (!projects.length) continue;
    for (const p of projects) {
      push(`- [${p.name}](${SITE_URL}/en/portfolio/${p.id}) (${category.name.en})${p.websiteLink ? ` — live: ${p.websiteLink}` : ""}`);
    }
  }
  push("");

  push("## صفحات مهمة / Key pages", "");
  push(`- [كل الأنظمة / All systems](${SITE_URL}/ar/systems) | [EN](${SITE_URL}/en/systems)`);
  push(`- [عن تميز / About](${SITE_URL}/ar/about) | [EN](${SITE_URL}/en/about)`);
  push(`- [الأسئلة الشائعة / FAQ](${SITE_URL}/ar/faq) | [EN](${SITE_URL}/en/faq)`);
  push(`- [المدونة / Blog](${SITE_URL}/ar/blog) | [EN](${SITE_URL}/en/blog)`);
  push(`- [الأعمال / Portfolio](${SITE_URL}/ar/portfolio) | [EN](${SITE_URL}/en/portfolio)`);
  push(`- [طلب عرض سعر / Request a quote](${SITE_URL}/ar/form)`);
  push(`- [Full details for AI assistants](${SITE_URL}/llms-full.txt)`);
  push("");

  push("## For agents", "");
  push("- Every page has a plain-markdown twin: append `.md` to the URL (e.g. " + `${SITE_URL}/ar/systems/pharmacy-system.md` + ") or send `Accept: text/markdown`.");
  push(`- New articles: RSS ${SITE_URL}/ar/feed.xml (Arabic) · ${SITE_URL}/en/feed.xml (English).`);
  push(`- Usage terms in ${SITE_URL}/robots.txt (Content Signals): search=yes, ai-input=yes, ai-train=yes.`);
  push("");

  push("## Contact", "");
  push(`- WhatsApp / Phone: ${siteConfig.phoneDisplay} (${siteConfig.whatsapp})`);
  push(`- Email: ${siteConfig.email}`);
  push(`- Website: ${SITE_URL}/ar (Arabic) | ${SITE_URL}/en (English)`);
  push(`- Facebook: ${siteConfig.socials.facebook}`);
  push(`- Instagram: ${siteConfig.socials.instagram}`);
  push("");

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
