import { getSystem } from "@/content/systems";
import { SITE_URL, siteConfig } from "@/lib/site";

// بيبني جسم المقال كـ"بلوكات" من بيانات src/content/articles.js + src/content/systems.js.
// نفس البلوكات بتترسم HTML في صفحة المقال وماركداون في نسخة .md، فالاتنين مايختلفوش أبدًا.
// أنواع البلوكات: h2, p (نص فيه **bold** و [رابط](url)), ul, ol, table {head, rows}

const T = {
  ar: {
    short: "الإجابة المختصرة",
    why: (s) => `ليه ${s} محتاج سيستم؟`,
    how: (c) => `إزاي تختار ${c}؟ معايير الاختيار`,
    howIntro: "استخدم الجدول ده وإنت بتقارن بين أي عروض قدامك — واسأل كل شركة نفس الأسئلة:",
    head: ["المعيار", "ليه مهم", "اسأل الشركة"],
    types: "أنواع الحلول المتاحة في السوق",
    typesIntro: "بعيدًا عن أسماء الشركات، الحلول اللي هتقابلها غالبًا من تلات أنواع:",
    typeRows: [
      [
        "برامج عامة أو أجنبية",
        "مجرّبة وفيها مميزات كتير.",
        "ممكن ماتكونش بالعربي بالكامل أو معمولة على طريقة الشغل في مصر، والدعم ممكن يكون بعيد.",
      ],
      [
        "Excel أو الدفتر",
        "مجاني وسهل في الأول.",
        "مش مربوط بالكاشير ولا بالمخزون، الأخطاء اليدوية بتزيد مع الزحمة، وصعب تتابع وإنت مش موجود أو مع أكتر من فرع.",
      ],
      [
        "أنظمة محلية متخصصة في نشاطك",
        "بالعربي، معمولة للسوق المصري، دعم قريب، وممكن تتعدّل على شغلك.",
        "لازم تتأكد إنها متخصصة فعلًا في نشاطك وتجرّب الديمو قبل ما تدفع.",
      ],
    ],
    typesHead: ["نوع الحل", "المميزات", "خلي بالك من"],
    option: (n) => `${n}: خيار مصري معمول للنشاط ده`,
    branches: (n) => `السيستم شغال حاليًا في ${n} فروع.`,
    demo: (u) => `جرّب الديمو دلوقتي من غير تسجيل: [${u.replace("https://", "")}](${u}) — فيه داتا حقيقية بتتجدد كل يوم.`,
    page: (n, url) => `كل التفاصيل في صفحة [${n}](${url}).`,
    custom: "وبنعدّل السيستم على مقاس شغلك، والباقات تبدأ من 1500 جنيه شهرياً وبتزيد حسب عدد الفروع — كلمنا ونبعتلك عرض سعر.",
    checklist: "Checklist قبل ما تقرر",
    checklistItems: (c) => [
      ...c.map((r) => `${r[0]}: ${r[2]}`),
      "جرّبت الديمو بنفسك؟",
      "عرفت التسعير هيتحسب إزاي مع زيادة الفروع؟",
    ],
    faq: "أسئلة شائعة",
    cta: "عايز تبدأ؟",
    ctaText: `كلمنا على [واتساب ${siteConfig.phoneDisplay}](${siteConfig.whatsapp}) أو [سجّل طلبك](${SITE_URL}/ar/form)، وشوف [كل أنظمة تميز](${SITE_URL}/ar/systems).`,
    disclaimer: "ملحوظة: المقال ده من فريق تميز. حاولنا نخليه دليل محايد لمعايير الاختيار، ومن غير ما نتكلم عن شركات تانية بالاسم — اطلب ديمو من أكتر من جهة وقارن بنفسك.",
  },
  en: {
    short: "Short answer",
    why: (s) => `Why does ${s} need a system?`,
    how: (c) => `How to choose ${c}: selection criteria`,
    howIntro: "Use this table when comparing any offers you have — and ask every vendor the same questions:",
    head: ["Criterion", "Why it matters", "Ask the vendor"],
    types: "Types of solutions on the market",
    typesIntro: "Setting vendor names aside, the solutions you will meet usually fall into three types:",
    typeRows: [
      [
        "Generic or foreign software",
        "Proven and feature-rich.",
        "May not be fully Arabic or built around how business runs in Egypt, and support can be far away.",
      ],
      [
        "Excel or a notebook",
        "Free and easy at first.",
        "Not linked to the cashier or stock, manual errors grow with volume, and it is hard to follow remotely or across branches.",
      ],
      [
        "Local systems specialized in your business",
        "In Arabic, built for the Egyptian market, nearby support, and can be tailored.",
        "Make sure it is truly specialized in your business and try the demo before paying.",
      ],
    ],
    typesHead: ["Type", "Strengths", "Watch out for"],
    option: (n) => `${n}: a local option built for this business`,
    branches: (n) => `The system currently runs in ${n} branches.`,
    demo: (u) => `Try the demo now with no sign-up: [${u.replace("https://", "")}](${u}) — it runs on real data that refreshes daily.`,
    page: (n, url) => `Full details on the [${n}](${url}) page.`,
    custom: "We tailor the system to how you work, and plans start from EGP 1,500/month and scale with the number of branches — contact us for a quote.",
    checklist: "Checklist before you decide",
    checklistItems: (c) => [
      ...c.map((r) => `${r[0]}: ${r[2]}`),
      "Have you tried the demo yourself?",
      "Do you know how pricing changes as you add branches?",
    ],
    faq: "Frequently asked questions",
    cta: "Ready to start?",
    ctaText: `Message us on [WhatsApp ${siteConfig.phoneDisplay}](${siteConfig.whatsapp}) or [submit a request](${SITE_URL}/en/form), and see [all Tamyaz systems](${SITE_URL}/en/systems).`,
    disclaimer: "Note: this article is written by the Tamyaz team. We aimed for a neutral guide to selection criteria without discussing other companies by name — request demos from several vendors and compare for yourself.",
  },
};

const SECTOR = {
  ar: {
    "cafe-pos-system": ["الكافيه", "سيستم كاشير وإدارة كافيه"],
    "restaurant-system": ["المطعم", "سيستم مطاعم"],
    "barber-booking-system": ["الباربر شوب", "سيستم حجز وإدارة باربر"],
    "clinic-management-system": ["العيادة", "برنامج إدارة عيادات"],
    "dental-clinic-system": ["عيادة الأسنان", "برنامج عيادة أسنان"],
    "pharmacy-system": ["الصيدلية", "برنامج إدارة صيدلية"],
    "gym-bar-system": ["بار الجيم", "سيستم كاشير لبار الجيم"],
    "retail-pos-system": ["المحل", "سيستم كاشير ومتجر أونلاين"],
  },
  en: {
    "cafe-pos-system": ["a café", "a café POS and management system"],
    "restaurant-system": ["a restaurant", "a restaurant system"],
    "barber-booking-system": ["a barbershop", "a barbershop booking system"],
    "clinic-management-system": ["a clinic", "clinic management software"],
    "dental-clinic-system": ["a dental clinic", "dental clinic software"],
    "pharmacy-system": ["a pharmacy", "a pharmacy management system"],
    "gym-bar-system": ["a gym bar", "a gym-bar POS"],
    "retail-pos-system": ["a shop", "a retail POS and online store"],
  },
};

export function buildArticleBlocks(article, locale) {
  const t = T[locale] ?? T.en;
  const system = article.system ? getSystem(article.system) : null;
  const [sector, category] = SECTOR[locale]?.[article.system] ?? ["", ""];
  const criteria = article.criteria[locale];
  const blocks = [];

  blocks.push({ type: "p", text: `**${t.short}:** ${article.answer[locale]}` });
  blocks.push({ type: "h2", text: t.why(sector) });
  blocks.push({ type: "p", text: article.context[locale] });

  blocks.push({ type: "h2", text: t.how(category) });
  blocks.push({ type: "p", text: t.howIntro });
  blocks.push({ type: "table", head: t.head, rows: criteria });

  blocks.push({ type: "h2", text: t.types });
  blocks.push({ type: "p", text: t.typesIntro });
  blocks.push({ type: "table", head: t.typesHead, rows: t.typeRows });

  if (system) {
    const url = `${SITE_URL}/${locale}/systems/${system.slug}`;
    blocks.push({ type: "h2", text: t.option(system.productName[locale]) });
    blocks.push({ type: "p", text: system.answer[locale] });
    blocks.push({
      type: "ul",
      items: system.features[locale].map((f) => `**${f.title}** — ${f.text}`),
    });
    if (system.branches) blocks.push({ type: "p", text: t.branches(system.branches) });
    if (system.proof[locale]) blocks.push({ type: "p", text: system.proof[locale] });
    blocks.push({ type: "p", text: t.demo(system.demoUrl) });
    blocks.push({ type: "p", text: `${t.page(system.productName[locale], url)} ${t.custom}` });
  }

  blocks.push({ type: "h2", text: t.checklist });
  blocks.push({ type: "ol", items: t.checklistItems(criteria) });

  blocks.push({ type: "h2", text: t.faq });
  for (const f of article.faq[locale]) {
    blocks.push({ type: "h3", text: f.q });
    blocks.push({ type: "p", text: f.a });
  }

  blocks.push({ type: "h2", text: t.cta });
  blocks.push({ type: "p", text: t.ctaText });
  blocks.push({ type: "note", text: t.disclaimer });

  return blocks;
}

// معايير الاختيار كـItemList (للـschema)
export function articleCriteriaList(article, locale) {
  return article.criteria[locale].map((r) => ({ name: r[0], description: r[1] }));
}

// ---------- ماركداون ----------
const cell = (s) => String(s).replace(/\|/g, "\\|");

export function blocksToMarkdown(blocks) {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "h2":
          return `## ${b.text}`;
        case "h3":
          return `### ${b.text}`;
        case "ul":
          return b.items.map((i) => `- ${i}`).join("\n");
        case "ol":
          return b.items.map((i, n) => `${n + 1}. ${i}`).join("\n");
        case "table":
          return [
            `| ${b.head.map(cell).join(" | ")} |`,
            `| ${b.head.map(() => "---").join(" | ")} |`,
            ...b.rows.map((r) => `| ${r.map(cell).join(" | ")} |`),
          ].join("\n");
        case "note":
          return `> ${b.text}`;
        default:
          return b.text;
      }
    })
    .join("\n\n");
}
