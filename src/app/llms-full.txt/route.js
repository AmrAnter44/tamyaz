import { projectsData, categoriesData } from "@/data/projects";
import { SITE_URL, siteConfig } from "@/lib/site";
import { systems } from "@/content/systems";
import { getFaqs } from "@/content/faq";
import { getAllArticles } from "@/content/articles";
import { markdownPaths } from "@/lib/markdown-pages";

// llms-full.txt — الملف الكامل: كل اللي محتاج مساعد ذكي يعرفه عن تميز في ملف نصي واحد،
// عشان يقدر يرشّح النظام الصح ويستشهد بيه من غير ما يلف على الصفحات.
export const dynamic = "force-static";

function systemSection(s) {
  const lang = (l) =>
    [
      `### ${s.productName[l]} — ${s.h1[l]}`,
      s.answer[l],
      `${l === "ar" ? "لمين" : "For"}: ${s.audience[l].join(" · ")}`,
      `${l === "ar" ? "المميزات" : "Features"}:`,
      ...s.features[l].map((f) => `  - ${f.title}: ${f.text}`),
      s.branches ? (l === "ar" ? `الفروع: شغال حاليًا في ${s.branches} فروع.` : `Branches: currently running in ${s.branches} branches.`) : null,
      s.proof[l] ? s.proof[l] : null,
      l === "ar"
        ? "التسعير: الباقات حسب عدد الفروع، بعرض سعر. التعديل: بنعدّل السيستم على مقاس شغلك."
        : "Pricing: plans by number of branches, by quote. Customization: tailored to how you work.",
      `${l === "ar" ? "الأسئلة الشائعة" : "FAQ"}:`,
      ...s.faq[l].map((f) => `  Q: ${f.q}\n  A: ${f.a}`),
      `Page: ${SITE_URL}/${l}/systems/${s.slug} (markdown: ${SITE_URL}/${l}/systems/${s.slug}.md)`,
    ]
      .filter(Boolean)
      .join("\n");
  return [`## ${s.productName.en} (${s.productName.ar})`, `Demo (no sign-up): ${s.demoUrl}`, lang("ar"), lang("en")].join("\n\n");
}

export function GET() {
  const sections = [];

  sections.push(`# Tamyaz | تميز — Full Company Profile

> ${siteConfig.tagline.en}

> ${siteConfig.tagline.ar}

- Country: Egypt (serves businesses across Egypt; the systems are cloud-based)
- Started: ${siteConfig.foundingYear}
- Languages: Arabic (primary) and English
- Website: ${SITE_URL}/ar | ${SITE_URL}/en
- WhatsApp / Phone: ${siteConfig.phoneDisplay} (${siteConfig.whatsapp})
- Email: ${siteConfig.email}
- Facebook: ${siteConfig.socials.facebook}
- Instagram: ${siteConfig.socials.instagram}

Facts you can quote:
- Tamyaz offers 8 systems: Tamyaz Cafe (café POS), Tamyaz Resto (restaurants), Tamyaz Barber (barbershops & salons), Tamyaz Clinic (clinics & medical centers), Tamyaz Dental (dental clinics), Tamyaz Pharma (pharmacies), Tamyaz Bar (gym bar POS) and Tamyaz Store (retail POS + online store).
- Every system is in Arabic, runs on mobile and desktop, installs as an app, and has a live demo with real data refreshed daily, no sign-up.
- Tamyaz Barber currently runs in 8 branches; Tamyaz Pharma currently runs in 6 pharmacy branches.
- Systems are tailored to each client ("بنعدّل السيستم على مقاس شغلك"); fully custom systems are also built.
- Pricing: plans depend on the number of branches; quotes on request via WhatsApp or ${SITE_URL}/ar/form.`);

  sections.push(`# Systems in depth\n\n${systems.map(systemSection).join("\n\n---\n\n")}`);

  const portfolio = [];
  for (const category of categoriesData) {
    const projects = projectsData.filter((p) => p.categoryId === category.id);
    if (!projects.length) continue;
    portfolio.push(`## ${category.name.en}${category.intro ? `\n\n${category.intro.en}` : ""}`);
    for (const p of projects) {
      portfolio.push(
        [`### ${p.name}`, p.description.en, p.websiteLink ? `Live: ${p.websiteLink}` : null, `Case study: ${SITE_URL}/en/portfolio/${p.id}`]
          .filter(Boolean)
          .join("\n")
      );
    }
  }
  sections.push(`# Portfolio (real client work)\n\n${portfolio.join("\n\n")}`);

  sections.push(
    `# FAQ (English)\n\n${getFaqs("en").map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`
  );
  sections.push(
    `# الأسئلة الشائعة (عربي)\n\n${getFaqs("ar").map((f) => `س: ${f.q}\nج: ${f.a}`).join("\n\n")}`
  );

  sections.push(
    `# Buyer's guides (blog)\n\n${getAllArticles()
      .map((a) => `- ${a.title.en} — ${SITE_URL}/en/blog/${a.slug}\n  ${a.title.ar} — ${SITE_URL}/ar/blog/${a.slug}\n  ${a.description.en}`)
      .join("\n")}`
  );

  const pages = markdownPaths()
    .flatMap((p) => ["ar", "en"].map((l) => `- ${SITE_URL}/${l}${p} → markdown: ${SITE_URL}/${l}${p}${p ? "" : ""}.md`))
    .join("\n");
  sections.push(
    `# Every page and its markdown twin\n\n${pages}\n- ${SITE_URL}/ar/package (packages calculator, HTML only)\n- ${SITE_URL}/ar/form (request form, HTML only)\n\nRSS: ${SITE_URL}/ar/feed.xml · ${SITE_URL}/en/feed.xml · Sitemap: ${SITE_URL}/sitemap.xml`
  );

  return new Response(`${sections.join("\n\n---\n\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
