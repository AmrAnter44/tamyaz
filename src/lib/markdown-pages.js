// نسخ Markdown من صفحات الموقع للوكلاء الذكية (ChatGPT/Claude/Perplexity...).
// بتتولّد من نفس ملفات المحتوى اللي الصفحات بترسمها، فمستحيل تختلف عنها.
// بتتطلب بإضافة .md لآخر الرابط أو بهيدر Accept: text/markdown (src/middleware.js → /api/md).

import { projectsData, categoriesData, getCategory } from "@/data/projects";
import { SITE_URL, LOCALES, siteConfig } from "@/lib/site";
import { systems, getSystem } from "@/content/systems";
import { getFaqs } from "@/content/faq";
import { getAllArticles, getArticle } from "@/content/articles";
import { buildArticleBlocks, blocksToMarkdown } from "@/lib/articles";
import { hasMarkdownTwin } from "@/lib/markdown-routes";
import ar from "../../messages/ar.json";
import en from "../../messages/en.json";

const MESSAGES = { ar, en };

const L = {
  ar: {
    contact: "التواصل",
    html: "نسخة HTML من الصفحة دي",
    other: "نفس الصفحة بالإنجليزي",
    systems: "أنظمة تميز",
    features: "المميزات",
    who: "لمين؟",
    how: "إزاي تبدأ؟",
    demo: "الديمو (من غير تسجيل)",
    branches: (n) => `شغال حاليًا في ${n} فروع.`,
    pricing: "الأسعار: الباقات تبدأ من 1500 جنيه شهرياً وبتزيد حسب عدد الفروع، كلمنا ونبعتلك عرض سعر.",
    custom: "بنعدّل السيستم على مقاس شغلك.",
    proof: "من أعمالنا",
    faq: "أسئلة شائعة",
    related: "أنظمة مرتبطة",
    guide: "دليل الاختيار",
    blog: "المدونة",
    about: "عن تميز",
    faqTitle: "الأسئلة الشائعة",
    published: "تاريخ النشر",
    updated: "آخر تحديث",
    author: "الكاتب",
    keyPages: "صفحات مهمة",
  },
  en: {
    contact: "Contact",
    html: "HTML version of this page",
    other: "Same page in Arabic",
    systems: "Tamyaz systems",
    features: "Features",
    who: "Who is it for?",
    how: "How to get started",
    demo: "Demo (no sign-up)",
    branches: (n) => `Currently running in ${n} branches.`,
    pricing: "Pricing: plans start from EGP 1,500/month and scale with the number of branches — contact us for a quote.",
    custom: "We tailor the system to how you work.",
    proof: "From our work",
    faq: "Frequently asked questions",
    related: "Related systems",
    guide: "Buyer's guide",
    blog: "Blog",
    about: "About Tamyaz",
    faqTitle: "Frequently asked questions",
    published: "Published",
    updated: "Updated",
    author: "Author",
    keyPages: "Key pages",
  },
};

const url = (locale, path = "") => `${SITE_URL}/${locale}${path}`;

function contactBlock(locale) {
  return [
    `## ${L[locale].contact}`,
    `- WhatsApp / Phone: ${siteConfig.phoneDisplay} (${siteConfig.whatsapp})`,
    `- Email: ${siteConfig.email}`,
    `- Request form: ${url(locale, "/form")}`,
    `- Facebook: ${siteConfig.socials.facebook}`,
    `- Instagram: ${siteConfig.socials.instagram}`,
  ].join("\n");
}

// غلاف موحّد: عنوان + ملخص + محتوى + التواصل + روابط النسخ التانية
function page(locale, { title, summary, path = "", body }) {
  const other = locale === "ar" ? "en" : "ar";
  return [
    `# ${title}`,
    summary ? `> ${summary}` : null,
    body || null,
    "---",
    contactBlock(locale),
    [`- ${L[locale].html}: ${url(locale, path)}`, `- ${L[locale].other}: ${url(other, path)}.md`].join("\n"),
  ]
    .filter(Boolean)
    .join("\n\n");
}

function systemsList(locale) {
  return systems
    .map((s) => `- [${s.productName[locale]} — ${s.category[locale]}](${url(locale, `/systems/${s.slug}`)}.md): ${s.description[locale]}`)
    .join("\n");
}

function homePage(locale) {
  const m = MESSAGES[locale];
  const t = L[locale];
  const pages = [
    `- [${t.systems}](${url(locale, "/systems")}.md)`,
    `- [${m.portfolio?.title ?? "Portfolio"}](${url(locale, "/portfolio")}.md)`,
    `- [${t.about}](${url(locale, "/about")}.md)`,
    `- [${t.faqTitle}](${url(locale, "/faq")}.md)`,
    `- [${t.blog}](${url(locale, "/blog")}.md)`,
  ].join("\n");

  const services = (m.specializations?.services ?? []).map((s) => `- ${s}`).join("\n");

  return page(locale, {
    title: m.metadata?.title ?? "Tamyaz",
    summary: siteConfig.tagline[locale],
    body: [
      `## ${m.orbit?.title ?? t.systems}`,
      m.systemsDetails?.subtitle ?? "",
      systemsList(locale),
      m.systemsDetails?.note ?? "",
      services ? `## ${m.specializations.title}\n\n${services}` : null,
      `## ${t.keyPages}`,
      pages,
    ]
      .filter(Boolean)
      .join("\n\n"),
  });
}

function systemsIndex(locale) {
  const body = systems
    .map((s) =>
      [
        `## ${s.productName[locale]} — ${s.category[locale]}`,
        s.answer[locale],
        s.branches ? L[locale].branches(s.branches) : null,
        `- ${L[locale].demo}: ${s.demoUrl}`,
        `- ${url(locale, `/systems/${s.slug}`)}.md`,
      ]
        .filter(Boolean)
        .join("\n\n")
    )
    .join("\n\n");
  return page(locale, { title: L[locale].systems, summary: siteConfig.tagline[locale], path: "/systems", body });
}

function systemPage(locale, slug) {
  const s = getSystem(slug);
  if (!s) return null;
  const t = L[locale];
  const body = [
    `## ${t.who}`,
    s.audience[locale].map((a) => `- ${a}`).join("\n"),
    `## ${t.features}`,
    s.features[locale].map((f) => `- **${f.title}** — ${f.text}`).join("\n"),
    s.branches ? t.branches(s.branches) : null,
    s.proof[locale] ? `## ${t.proof}\n\n${s.proof[locale]}` : null,
    `## ${t.how}`,
    s.howItWorks[locale].map((x, i) => `${i + 1}. ${x}`).join("\n"),
    `- ${t.demo}: ${s.demoUrl}`,
    `- ${t.custom}`,
    `- ${t.pricing}`,
    `## ${t.faq}`,
    s.faq[locale].map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n"),
    s.article ? `## ${t.guide}\n\n${url(locale, `/blog/${s.article}`)}.md` : null,
    `## ${t.related}`,
    s.related
      .map(getSystem)
      .filter(Boolean)
      .map((r) => `- [${r.productName[locale]}](${url(locale, `/systems/${r.slug}`)}.md)`)
      .join("\n"),
  ]
    .filter(Boolean)
    .join("\n\n");
  return page(locale, { title: s.h1[locale], summary: s.answer[locale], path: `/systems/${slug}`, body });
}

function faqPage(locale) {
  const body = getFaqs(locale)
    .map((f) => `### ${f.q}\n\n${f.a}`)
    .join("\n\n");
  return page(locale, { title: L[locale].faqTitle, path: "/faq", body });
}

function aboutPage(locale) {
  const body =
    locale === "ar"
      ? [
          "تميز (Tamyaz) شركة برمجيات مصرية بدأت في 2023. بنبني أنظمة إدارة وكاشير جاهزة لأنواع البيزنس اللي بتقابلها كل يوم في مصر، وبنعدّلها على مقاس شغل كل عميل.",
          "كل سيستم بالعربي، بيفتح على الموبايل والكمبيوتر، وبيتنزل كتطبيق، وليه ديمو مفتوح من غير تسجيل. الفروع الشغالة على أنظمة تميز حاليًا: كافيه +12، مطاعم +4، باربر +8، كلينك +16، أسنان +9، فارما +6، بار الجيم +11، متجر +5 — أكتر من 70 فرع إجمالًا.",
          `## ${L.ar.systems}`,
          systemsList("ar"),
          "## من أعمالنا",
          `- Memo Group: ${url("ar", "/portfolio/category/memo-group")}.md\n- دوّر صح: ${url("ar", "/portfolio/dawr-sa7")}.md\n- كافيه «كيف»: ${url("ar", "/portfolio/cafe-system")}.md`,
        ]
      : [
          "Tamyaz (تميز) is an Egyptian software company that started in 2023. We build ready-made management and POS systems for the kinds of businesses you meet every day in Egypt, and tailor them to how each client works.",
          "Every system is in Arabic, opens on mobile and desktop, installs as an app, and has an open demo with no sign-up. Branches running on Tamyaz systems today: Cafe 12+, Resto 4+, Barber 8+, Clinic 16+, Dental 9+, Pharma 6+, Gym Bar 11+, Store 5+ (70+ in total).",
          `## ${L.en.systems}`,
          systemsList("en"),
          "## From our work",
          `- Memo Group: ${url("en", "/portfolio/category/memo-group")}.md\n- Dawr Sa7: ${url("en", "/portfolio/dawr-sa7")}.md\n- Keyif café: ${url("en", "/portfolio/cafe-system")}.md`,
        ];
  return page(locale, { title: L[locale].about, summary: siteConfig.tagline[locale], path: "/about", body: body.join("\n\n") });
}

function blogIndex(locale) {
  const body = getAllArticles()
    .map((a) => `- [${a.title[locale]}](${url(locale, `/blog/${a.slug}`)}.md) — ${a.date}\n  ${a.description[locale]}`)
    .join("\n");
  return page(locale, {
    title: L[locale].blog,
    path: "/blog",
    body: `${body}\n\nRSS: ${url(locale, "/feed.xml")}`,
  });
}

function blogPost(locale, slug) {
  const a = getArticle(slug);
  if (!a) return null;
  const t = L[locale];
  const meta = [
    `${t.published}: ${a.date}`,
    a.updated && a.updated !== a.date ? `${t.updated}: ${a.updated}` : null,
    `${t.author}: ${siteConfig.legalName}`,
  ]
    .filter(Boolean)
    .join(" · ");
  return page(locale, {
    title: a.title[locale],
    summary: a.description[locale],
    path: `/blog/${slug}`,
    body: [meta, blocksToMarkdown(buildArticleBlocks(a, locale))].join("\n\n"),
  });
}

// ---------- الأعمال (portfolio) — نفس المنطق اللي كان في /api/md ----------
function projectMarkdown(project, locale) {
  const t = MESSAGES[locale].portfolio ?? {};
  const out = [project.description[locale]];
  if (project.highlights?.[locale]?.length) out.push(project.highlights[locale].join(" · "));
  if (project.websiteLink) out.push(`- ${t.visitWebsite}: ${project.websiteLink}`);
  if (project.features?.[locale]?.length) out.push(`## ${t.features}\n\n${project.features[locale].map((f) => `- ${f}`).join("\n")}`);
  if (project.benefits?.[locale]?.length) out.push(`## ${t.benefits}\n\n${project.benefits[locale].map((b) => `- ${b}`).join("\n")}`);
  return page(locale, { title: project.name, path: `/portfolio/${project.id}`, body: out.join("\n\n") });
}

function categoryMarkdown(category, locale) {
  const t = MESSAGES[locale].portfolio ?? {};
  const order = category.services ?? [];
  const rank = (p) => (order.includes(p.id) ? order.indexOf(p.id) : order.length);
  const projects = projectsData.filter((p) => p.categoryId === category.id).sort((a, b) => rank(a) - rank(b));
  const out = [];
  if (category.intro) out.push(category.intro[locale]);
  out.push(`## ${t.services}`);
  for (const p of projects) {
    out.push(`### ${p.name}`);
    out.push(p.description[locale]);
    if (p.benefits?.[locale]?.length) out.push(p.benefits[locale].slice(0, 6).map((b) => `- ${b}`).join("\n"));
    out.push(`[${t.fullDetails}](${url(locale, `/portfolio/${p.id}`)})`);
  }
  return page(locale, { title: category.name[locale], path: `/portfolio/category/${category.id}`, body: out.join("\n\n") });
}

function portfolioMarkdown(locale) {
  const t = MESSAGES[locale].portfolio ?? {};
  const out = [];
  for (const category of categoriesData) {
    const projects = projectsData.filter((p) => p.categoryId === category.id);
    if (!projects.length) continue;
    out.push(`## ${category.name[locale]}`);
    out.push(projects.map((p) => `- [${p.name}](${url(locale, `/portfolio/${p.id}`)}.md): ${p.description[locale]}`).join("\n"));
  }
  return page(locale, { title: t.title ?? "Portfolio", path: "/portfolio", body: out.join("\n\n") });
}

/**
 * بيرجّع الماركداون لمسار كامل زي "/ar/systems/cafe-pos-system" أو null لو مفيش نسخة.
 */
export function buildMarkdown(path) {
  const segments = String(path || "/").split("/").filter(Boolean);
  const locale = LOCALES.includes(segments[0]) ? segments.shift() : "en";
  if (!hasMarkdownTwin(segments)) return null;

  const [first, second, third] = segments;
  if (!first) return homePage(locale);

  switch (first) {
    case "systems":
      return second ? systemPage(locale, second) : systemsIndex(locale);
    case "faq":
      return faqPage(locale);
    case "about":
      return aboutPage(locale);
    case "blog":
      return second ? blogPost(locale, second) : blogIndex(locale);
    case "portfolio": {
      if (!second) return portfolioMarkdown(locale);
      if (second === "category") {
        const category = getCategory(third);
        return category ? categoryMarkdown(category, locale) : null;
      }
      const project = projectsData.find((p) => p.id === second);
      return project ? projectMarkdown(project, locale) : null;
    }
    default:
      return null;
  }
}

/** كل المسارات اللي ليها نسخة ماركداون (للتوثيق و llms-full) */
export function markdownPaths() {
  return [
    "",
    "/systems",
    ...systems.map((s) => `/systems/${s.slug}`),
    "/about",
    "/faq",
    "/blog",
    ...getAllArticles().map((a) => `/blog/${a.slug}`),
    "/portfolio",
  ];
}
