// أنظمة تميز الـ٨ — محتوى صفحة كل سيستم (/[locale]/systems/[slug]) ونسخة الماركداون و llms-full.txt.
// المميزات مأخوذة من كروت SystemsDetails (messages/*.json → systemsDetails.items) ومن الأعمال المنشورة في
// src/data/projects.js — ماتضيفش ميزة مش موجودة فعلًا في السيستم. الأرقام الوحيدة المسموحة: فروع الباربر (8) والصيدليات (6).
// key = مفتاح الكارت في systemsDetails.items (ومنه بييجي رابط الديمو)

const WA = "https://wa.me/201028518754";

// أسئلة مشتركة بتتضاف لكل سيستم بعد الأسئلة الخاصة بيه
function commonFaq(s) {
  return {
    ar: [
      {
        q: `${s.ar.name} بكام؟`,
        a: `الاشتراك 2000 جنيه شهرياً للفرع، وبينزل لحد 1500 في الشهر مع الباقة السنوية (3 شهور 5400، 6 شهور 9900، سنة 18000) واحتياج شغلك. كلمنا على واتساب (+20 102 851 8754) أو سجّل طلبك من صفحة التواصل، ونبعتلك عرض سعر مناسب لحالتك.`,
      },
      {
        q: `أقدر أجرّب ${s.ar.name} قبل ما أشترك؟`,
        a: `أيوه. الديمو متاح دلوقتي من غير تسجيل على ${s.demo} وفيه داتا حقيقية بتتجدد كل يوم، فتقدر تشوف السيستم بنفسك قبل أي قرار.`,
      },
      {
        q: `هل ${s.ar.name} بيشتغل على الموبايل؟`,
        a: `أيوه. السيستم بالعربي، بيفتح من المتصفح على الموبايل والكمبيوتر، وبيتنزل كتطبيق على الجهاز.`,
      },
      {
        q: "ينفع تعدّلوا السيستم على مقاس شغلي؟",
        a: "أيوه، بنعدّل السيستم على مقاس شغلك. ولو محتاج حاجة مختلفة خالص بنعملهالك كاستم من الفكرة لحد التشغيل.",
      },
    ],
    en: [
      {
        q: `How much does ${s.en.name} cost?`,
        a: `Plans are EGP 2,000/month per branch, down to EGP 1,500/month on the yearly plan (3 months EGP 5,400, 6 months EGP 9,900, 1 year EGP 18,000) and what your business needs. Message us on WhatsApp (+20 102 851 8754) or submit a request on the contact page and we will send you a quote for your case.`,
      },
      {
        q: `Can I try ${s.en.name} before subscribing?`,
        a: `Yes. The live demo is open right now with no sign-up at ${s.demo}, running on real data that refreshes every day, so you can see the system yourself before deciding.`,
      },
      {
        q: `Does ${s.en.name} work on mobile?`,
        a: `Yes. The system is in Arabic, runs in the browser on mobile and desktop, and installs as an app on the device.`,
      },
      {
        q: "Can you customize the system for my business?",
        a: "Yes — we tailor the system to how you work, and if you need something completely different we build it custom, from idea to launch.",
      },
    ],
  };
}

// خطوات البدء — نفسها لكل الأنظمة
function howItWorks(s) {
  return {
    ar: [
      `جرّب الديمو بنفسك من غير تسجيل: ${s.demo}`,
      "كلمنا على واتساب أو سجّل طلبك، ونفهم شغلك وعدد فروعك واللي محتاجه.",
      "نجهّزلك السيستم ونعدّل عليه على مقاس شغلك.",
      "تبدأ تشتغل من الموبايل أو الكمبيوتر، وتتابع شغلك وتقاريرك من أي مكان.",
    ],
    en: [
      `Try the demo yourself, no sign-up: ${s.demo}`,
      "Message us on WhatsApp or submit a request — we learn how you work, how many branches you have, and what you need.",
      "We set up the system and tailor it to your business.",
      "You start working from mobile or desktop and follow your operations and reports from anywhere.",
    ],
  };
}

// حقول اختيارية لكل سيستم:
// - ar/en.pricing: نص تسعير خاص بالسيستم (بدل النص العام في الصفحة والماركداون و llms-full)
// - ar/en.keywords: كلمات البحث اللي الناس بتكتبها (بتروح للميتاداتا وSoftwareApplication.keywords)
// - guides: slugs مقالات إضافية (غير article) بتظهر كروت «اقرا» في صفحة السيستم
// - ownFaq: true → أسئلة السيستم كاملة من عنده ومابتتضافش الأسئلة المشتركة (عشان ماتتكررش)
function system(def) {
  const common = def.ownFaq ? { ar: [], en: [] } : commonFaq(def);
  return {
    ...def,
    productName: { ar: def.ar.name, en: def.en.name },
    h1: { ar: def.ar.h1, en: def.en.h1 },
    category: { ar: def.ar.category, en: def.en.category },
    answer: { ar: def.ar.answer, en: def.en.answer },
    title: { ar: def.ar.title, en: def.en.title },
    description: { ar: def.ar.description, en: def.en.description },
    audience: { ar: def.ar.audience, en: def.en.audience },
    features: { ar: def.ar.features, en: def.en.features },
    proof: { ar: def.ar.proof ?? null, en: def.en.proof ?? null },
    pricing: { ar: def.ar.pricing ?? null, en: def.en.pricing ?? null },
    keywords: { ar: def.ar.keywords ?? [], en: def.en.keywords ?? [] },
    guides: def.guides ?? [],
    howItWorks: howItWorks(def),
    faq: { ar: [...def.ar.faq, ...common.ar], en: [...def.en.faq, ...common.en] },
    demoUrl: def.demo,
    whatsapp: WA,
  };
}

export const systems = [
  system({
    slug: "cafe-pos-system",
    key: "cafe",
    icon: "Coffee",
    demo: "https://demo.cafe.tamyaz.online/login",
    branches: 12,
    related: ["restaurant-system", "gym-bar-system", "retail-pos-system"],
    article: "best-cafe-pos-system-egypt",
    portfolio: "/portfolio/cafe-system",
    ar: {
      name: "تميز كافيه",
      category: "سيستم كاشير وإدارة كافيهات",
      h1: "سيستم كاشير وإدارة كافيهات في مصر",
      title: "سيستم كاشير كافيه في مصر — تميز كافيه",
      description:
        "تميز كافيه: سيستم كاشير وإدارة كامل للكافيهات والكوفي شوب في مصر — كاشير سريع، طاولات وطلبات مفتوحة، مخزون بمكونات كل منتج، شيفتات وخزنة، وتقارير. جرّب الديمو مجانًا.",
      answer:
        "تميز كافيه سيستم كاشير وإدارة كامل للكافيهات والكوفي شوب في مصر، بالعربي وعلى الموبايل والكمبيوتر. بيجمع الكاشير السريع والطاولات والطلبات المفتوحة والمخزون بمكونات كل منتج والشيفتات والخزنة والتقارير اليومية والشهرية في مكان واحد. تقدر تجرّب الديمو دلوقتي من غير تسجيل، وبنعدّل السيستم على مقاس شغلك.",
      audience: [
        "الكافيهات والكوفي شوب الصغيرة والمتوسطة",
        "الكافيهات اللي فيها صالة وطاولات وطلبات مفتوحة",
        "أصحاب الكافيهات اللي عايزين يعرفوا مبيعات كل شيفت والمخزون من غير ما يكونوا موجودين",
      ],
      features: [
        { title: "كاشير سريع ونقطة بيع", text: "شاشة بيع سريعة للطلبات، معمولة لزحمة الكافيه." },
        { title: "الطاولات والطلبات المفتوحة", text: "كل طاولة ليها طلبها المفتوح لحد ما الحساب يتقفل." },
        { title: "المخزون ومكونات كل منتج", text: "بتسجّل مكونات كل منتج، فالمخزون بيتخصم مع البيع وتعرف إيه اللي قرب يخلص." },
        { title: "الشيفتات والخزنة", text: "كل شيفت بيتفتح ويتقفل بمبيعاته، وتتابع الخزنة أول بأول." },
        { title: "تقارير المبيعات اليومية والشهرية", text: "تعرف مبيعاتك يوم بيوم وشهر بشهر من الموبايل." },
      ],
      proof:
        "من أعمالنا: نظام تشغيل كافيه «كيف» — كاشير سريع، وشاشة للباريستا، ولوحة إدارة للمنيو والمخزون والمصاريف والتقارير، ومفيش بيع من غير شيفت مفتوح باسم صاحبه.",
      faq: [
        {
          q: "إيه أفضل سيستم كاشير لكافيه في مصر؟",
          a: "أفضل سيستم هو اللي بيغطي الكاشير والطاولات والمخزون بمكونات المنتجات والشيفتات والتقارير، بالعربي وعلى الموبايل، وتقدر تجربه قبل ما تدفع. تميز كافيه بيجمع ده كله، والديمو متاح مجانًا من غير تسجيل.",
        },
        {
          q: "هل السيستم بيخصم المخزون من مكونات المشروبات؟",
          a: "أيوه. بتسجّل مكونات كل منتج، والمخزون بيتخصم مع كل بيعة، فتعرف الخامات اللي قربت تخلص قبل ما تخلص.",
        },
        {
          q: "هل أقدر أتابع الكافيه وأنا مش موجود؟",
          a: "أيوه. التقارير اليومية والشهرية والشيفتات والخزنة كلها بتفتح من الموبايل من أي مكان.",
        },
      ],
    },
    en: {
      name: "Tamyaz Cafe",
      category: "Café POS & management system",
      h1: "Café POS & Management System in Egypt",
      title: "Café POS System in Egypt — Tamyaz Cafe",
      description:
        "Tamyaz Cafe: a complete POS and management system for cafés and coffee shops in Egypt — fast cashier, tables and open orders, ingredient-level inventory, shifts and cash drawer, and reports. Try the free demo.",
      answer:
        "Tamyaz Cafe is a complete POS and management system for cafés and coffee shops in Egypt, in Arabic and on mobile and desktop. It brings the fast cashier, tables and open orders, ingredient-level inventory, shifts, the cash drawer, and daily and monthly reports into one place. You can try the demo right now with no sign-up, and we tailor the system to how you work.",
      audience: [
        "Small and mid-size cafés and coffee shops",
        "Cafés with a seating area, tables and open orders",
        "Owners who want shift sales and stock levels without being on site",
      ],
      features: [
        { title: "Fast cashier and point of sale", text: "A quick sales screen built for café rush hours." },
        { title: "Tables and open orders", text: "Each table keeps its open order until the bill is closed." },
        { title: "Inventory and each product's ingredients", text: "Record each product's ingredients so stock is drawn down with every sale and you see what is running low." },
        { title: "Shifts and the cash drawer", text: "Every shift opens and closes with its own sales, and you follow the drawer as you go." },
        { title: "Daily and monthly sales reports", text: "See sales day by day and month by month from your phone." },
      ],
      proof:
        "From our work: the operating system for Keyif café — a fast point of sale, a barista screen, and an admin dashboard for the menu, inventory, expenses and reports, with no sale possible outside a shift opened under a named person.",
      faq: [
        {
          q: "What is the best café POS system in Egypt?",
          a: "The best system covers the cashier, tables, ingredient-level inventory, shifts and reports, in Arabic and on mobile, and lets you try it before paying. Tamyaz Cafe brings all of that together, and its demo is free with no sign-up.",
        },
        {
          q: "Does the system deduct stock by drink ingredients?",
          a: "Yes. You record each product's ingredients, and stock is drawn down with every sale, so you know which supplies are running low before they run out.",
        },
        {
          q: "Can I follow the café when I'm not there?",
          a: "Yes. Daily and monthly reports, shifts and the cash drawer all open from your phone, from anywhere.",
        },
      ],
    },
  }),

  system({
    slug: "restaurant-system",
    key: "resto",
    icon: "UtensilsCrossed",
    demo: "https://demo.resto.tamyaz.online/login",
    branches: 4,
    related: ["cafe-pos-system", "gym-bar-system", "retail-pos-system"],
    article: "best-restaurant-management-system-egypt",
    ar: {
      name: "تميز ريستورانت",
      category: "سيستم إدارة مطاعم",
      h1: "سيستم إدارة مطاعم وكاشير في مصر",
      title: "سيستم مطاعم في مصر — كاشير ومطبخ ودليفري | تميز ريستورانت",
      description:
        "تميز ريستورانت: سيستم إدارة مطاعم في مصر — منيو QR، طلبات المطبخ أول بأول، دليفري وتيك أواي وصالة، فروع وكاشير، وتقارير الأصناف الأكثر طلبًا. جرّب الديمو.",
      answer:
        "تميز ريستورانت سيستم إدارة مطاعم في مصر بيجمع الصالة والمطبخ والدليفري في مكان واحد. فيه منيو QR للزباين، وطلبات المطبخ أول بأول، والدليفري والتيك أواي والصالة، والفروع والكاشير، وتقارير المبيعات والأصناف الأكثر طلبًا. بالعربي، على الموبايل والكمبيوتر، والديمو متاح من غير تسجيل.",
      audience: [
        "المطاعم اللي فيها صالة ودليفري وتيك أواي",
        "سلاسل المطاعم اللي عندها أكتر من فرع",
        "المطاعم اللي عايزة منيو QR للزباين على الموبايل",
      ],
      features: [
        { title: "منيو QR للزباين", text: "الزبون يفتح المنيو من موبايله بمسح الكود." },
        { title: "طلبات المطبخ أول بأول", text: "الطلب بيوصل المطبخ أول ما يتسجل." },
        { title: "دليفري وتيك أواي وصالة", text: "أنواع الطلبات التلاتة في سيستم واحد." },
        { title: "الفروع والكاشير", text: "إدارة أكتر من فرع وكاشير من نفس المكان." },
        { title: "تقارير المبيعات والأصناف الأكثر طلبًا", text: "تعرف إيه اللي بيتباع أكتر وتخطط المنيو على أساسه." },
      ],
      faq: [
        {
          q: "إيه أفضل سيستم مطاعم في مصر؟",
          a: "أفضل سيستم مطاعم هو اللي بيربط الكاشير بالمطبخ ويدير الدليفري والتيك أواي والصالة والفروع، وبيطلع تقارير بالأصناف الأكثر طلبًا، بالعربي. تميز ريستورانت بيغطي ده، وتقدر تجرّب الديمو مجانًا.",
        },
        {
          q: "هل السيستم فيه منيو QR؟",
          a: "أيوه. فيه منيو QR بيفتحه الزبون على موبايله.",
        },
        {
          q: "هل السيستم بيدعم أكتر من فرع؟",
          a: "أيوه. تميز ريستورانت فيه إدارة الفروع والكاشير.",
        },
      ],
    },
    en: {
      name: "Tamyaz Resto",
      category: "Restaurant management system",
      h1: "Restaurant Management & POS System in Egypt",
      title: "Restaurant System in Egypt — POS, Kitchen & Delivery | Tamyaz Resto",
      description:
        "Tamyaz Resto: a restaurant management system in Egypt — QR menu, real-time kitchen orders, delivery, takeaway and dine-in, branches and cashiers, and best-seller reports. Try the demo.",
      answer:
        "Tamyaz Resto is a restaurant management system in Egypt that runs the dining room, kitchen and delivery in one place. It includes a QR menu for guests, real-time kitchen orders, delivery, takeaway and dine-in, branches and cashiers, and sales and best-seller reports. It is in Arabic, on mobile and desktop, and the demo is open with no sign-up.",
      audience: [
        "Restaurants with dine-in, delivery and takeaway",
        "Restaurant chains with more than one branch",
        "Restaurants that want a QR menu on guests' phones",
      ],
      features: [
        { title: "QR menu for guests", text: "Guests open the menu on their phones by scanning a code." },
        { title: "Kitchen orders in real time", text: "Orders reach the kitchen as soon as they are entered." },
        { title: "Delivery, takeaway and dine-in", text: "All three order types in one system." },
        { title: "Branches and cashiers", text: "Manage several branches and cashiers from one place." },
        { title: "Sales reports and best-selling items", text: "See what sells most and plan the menu around it." },
      ],
      faq: [
        {
          q: "What is the best restaurant system in Egypt?",
          a: "The best restaurant system links the cashier to the kitchen, handles delivery, takeaway, dine-in and branches, and reports best-selling items, in Arabic. Tamyaz Resto covers that, and you can try its demo for free.",
        },
        { q: "Does the system include a QR menu?", a: "Yes. It includes a QR menu guests open on their phones." },
        { q: "Does it support multiple branches?", a: "Yes. Tamyaz Resto includes branch and cashier management." },
      ],
    },
  }),

  system({
    slug: "barber-booking-system",
    key: "barber",
    icon: "Scissors",
    demo: "https://demo.barber.tamyaz.online/login",
    branches: 8,
    related: ["clinic-management-system", "retail-pos-system", "cafe-pos-system"],
    article: "barber-salon-management-system-egypt-price",
    guides: ["best-barbershop-booking-system-egypt"],
    portfolio: "/portfolio/category/memo-group",
    ownFaq: true,
    // أسعار معلنة للفرع الواحد (جنيه) — بتروح للـschema كـOffers
    plans: [
      { months: 1, price: 3000 },
      { months: 3, price: 7650 },
      { months: 6, price: 14400 },
      { months: 12, price: 27000 },
    ],
    ar: {
      name: "تميز باربر",
      category: "سيستم إدارة صالونات الحلاقة والباربر شوب",
      h1: "سيستم إدارة صالون حلاقة وباربر شوب في مصر",
      title: "سيستم إدارة صالون حلاقة في مصر — كاشير وحجز وحساب الحلاقين | تميز باربر",
      description:
        "تميز باربر: برنامج إدارة صالون حلاقة وباربر شوب في مصر — كاشير وفواتير، عمولة أو مرتب كل حلاق، الخزنة وتقفيل اليوم، المصروفات وصافي الربح، حجز أونلاين للزباين، والمخزون. شغال في أكتر من 8 فروع، وبـ 3000 جنيه شهريًا للفرع (وفيه باقات 3 و6 شهور وسنة بخصم لحد 25%).",
      keywords: [
        "سيستم إدارة صالون حلاقة",
        "برنامج إدارة صالون حلاقة",
        "سيستم صالون حلاقة في مصر",
        "سيستم كاشير للحلاق",
        "برنامج حجز مواعيد صالون رجالي",
        "سيستم باربر شوب",
        "سيستم محل حلاقة",
        "برنامج كوافير رجالي",
        "حساب عمولة الحلاقين",
      ],
      answer:
        "تميز باربر سيستم إدارة كامل لصالون الحلاقة والباربر شوب في مصر — سواء محل حلاقة فيه كرسي واحد أو سلسلة فروع. بيحسب عمولة كل حلاق (أو مرتبه الثابت) من فواتيره أوتوماتيك، وبيقفل الخزنة كل يوم مقسّمة على طرق الدفع، وبيطلعلك المصروفات وصافي الربح، وبيدير الحجوزات ومواعيد الحلاقين، ومعاه رابط حجز أونلاين للزباين، والعملاء، والمخزون. شغال حاليًا في أكتر من 8 فروع، بالعربي على الموبايل والتابلت والكمبيوتر، وبـ 3000 جنيه شهريًا للفرع (وفيه باقات 3 و6 شهور وسنة بخصم لحد 25%). جرّب الديمو دلوقتي من غير تسجيل.",
      pricing:
        "تميز باربر بـ 3000 جنيه شهريًا للفرع، أو وفّر مع الباقات: 3 شهور بـ 7650 جنيه (وفّر 15%)، 6 شهور بـ 14400 جنيه (وفّر 20%)، وسنة بـ 27000 جنيه (وفّر 25%). لأكتر من فرع كلمنا ونبعتلك عرض سعر. كلمنا على واتساب أو اطلب عرض سعر.",
      audience: [
        "صالونات الحلاقة والباربر شوب والكوافير الرجالي — من محل بحلاق واحد لصالون فيه كذا حلاق",
        "سلاسل محلات الحلاقة اللي عندها أكتر من فرع وعايزة تتابعهم من مكان واحد",
        "أصحاب المحلات اللي عايزين يعرفوا حساب كل حلاق وصافي الربح من غير ما يكونوا موجودين",
      ],
      features: [
        { title: "حساب كل حلاق: عمولته أو مرتبه", text: "كل فاتورة بتتسجل على الحلاق (الكابتن) اللي عملها، والعمولة بتتحسب أوتوماتيك بنسبته — أو بمرتب ثابت لو محلك شغال كده. وكل حلاق يشوف حسابه بس." },
        { title: "كاشير وفواتير للحلاق", text: "كل خدمة ليها فاتورة باسم الحلاق، وكل فاتورة على درج مفتوح باسم المسؤول عنه." },
        { title: "الخزنة وتقفيل اليوم", text: "الدرج بيتفتح ويتقفل كل يوم أو شيفت، والتقفيل بيطلع مقسّم على طرق الدفع." },
        { title: "المصروفات وصافي الربح", text: "بتسجّل مصروفات الفرع، والسيستم يطلعلك صافي الربح: الإيراد ناقص عمولات الحلاقين والمصروفات والمرتجعات." },
        { title: "الحجوزات ومواعيد الحلاقين", text: "كل حجز مربوط بالحلاق وميعاده، ولوحة دور لحظية بتوضّح مين عليه الدور." },
        { title: "رابط حجز أونلاين للزباين", text: "رابط حجز خاص بمحلك، الزبون يحجز منه من الموبايل وتحطه على صفحتك أو واتساب." },
        { title: "العملاء ومتابعتهم", text: "تعرف الزبون اللي بقاله فترة ماجاش عشان تكلمه، وأعياد ميلاد العملاء، وتقييمهم لكل حلاق." },
        { title: "المخزون (المخزن)", text: "الخامات والأدوات اللي الحلاقين بيستخدموها: الوارد، والصرف لكل حلاق، والجرد، وتنبيه لما صنف يقرب يخلص، وتكلفة الخامات على كل زبون." },
        { title: "الشيفتات والحضور", text: "جدول شيفتات الحلاقين، والحضور والتأخير والغياب لكل حلاق." },
        { title: "الخدمات والأسعار", text: "قايمة الخدمات والأسعار بتتعدل من الشاشة." },
        { title: "الفروع والصلاحيات", text: "كل الفروع في سيستم واحد، وكل واحد (صاحب المحل، المدير، الريسبشن، الحلاق) يشوف اللي يخصه بس." },
        { title: "تقارير يومية بالساعة", text: "تعرف الزحمة بتبقى إمتى خلال اليوم، ومبيعات كل حلاق وكل فرع." },
      ],
      proof:
        "من أعمالنا: منظومة Memo Group — سيستم تشغيل لسلسلة محلات حلاقة على قاعدة بيانات واحدة، مع موقع وتطبيق موبايل للعميل بيحجز دوره ويتابع ترتيبه في الدور. ولو عايز تطبيق حجز للعملاء بإسم محلك، بنعمله زي ما عملناه لـ Memo.",
      faq: [
        {
          q: "إيه أفضل سيستم لإدارة صالون حلاقة في مصر؟",
          a: "أفضل سيستم لصالون الحلاقة هو اللي بيحسب عمولة كل حلاق من فواتيره، ويقفل الخزنة كل يوم، ويطلعلك المصروفات وصافي الربح، وفيه حجوزات وحجز أونلاين للزباين، وبيشتغل بالعربي على الموبايل، ومع أكتر من فرع. تميز باربر بيعمل ده وشغال حاليًا في أكتر من 8 فروع، والديمو مفتوح من غير تسجيل.",
        },
        {
          q: "سيستم صالون الحلاقة بكام؟",
          a: "تميز باربر بـ 3000 جنيه شهريًا للفرع، أو وفّر مع الباقات: 3 شهور بـ 7650 جنيه (وفّر 15%)، 6 شهور بـ 14400 جنيه (وفّر 20%)، وسنة بـ 27000 جنيه (وفّر 25%). لأكتر من فرع كلمنا ونبعتلك عرض سعر. واتساب: +20 102 851 8754.",
        },
        {
          q: "ينفع لمحل حلاقة فيه حلاق واحد؟",
          a: "أيوه، السيستم بيشتغل لمحل بكرسي واحد وبيكبر معاك لحد سلسلة فروع. بس خليك عارف إن السعر 3000 جنيه شهريًا للفرع (أو 27000 في السنة)، فهو مناسب أكتر لو هتستفيد من الخزنة والمصروفات والحجز الأونلاين والمخزون — لو محتاج مواعيد بس، ممكن تطبيق أبسط يكفيك في الأول.",
        },
        {
          q: "السيستم بيحسب عمولة كل حلاق؟",
          a: "أيوه. كل فاتورة بتتسجل على الحلاق اللي عملها، والعمولة بتتحسب أوتوماتيك بالنسبة المتسجلة له. ولو محلك شغال بمرتب ثابت بدل النسبة، السيستم بيدعم ده كمان. وكل حلاق بيشوف حسابه هو بس.",
        },
        {
          q: "فيه حجز أونلاين للزباين؟",
          a: "أيوه. كل محل ليه رابط حجز أونلاين، الزبون بيفتحه من الموبايل ويحجز، والحجز بيوصل للسيستم مربوط بالحلاق والميعاد. ولو عايز تطبيق حجز بإسم محلك بنعملهولك.",
        },
        {
          q: "فيه سيستم كاشير للحلاق؟",
          a: "أيوه. تميز باربر فيه كاشير وفواتير: كل خدمة بفاتورة باسم الحلاق، والدرج بيتفتح ويتقفل باسم المسؤول عنه، والتقفيل بيطلع مقسّم على طرق الدفع.",
        },
        {
          q: "السيستم بيشتغل على الموبايل؟",
          a: "أيوه. السيستم بالعربي وبيفتح من المتصفح على الموبايل والتابلت والكمبيوتر، وبيتنزل كتطبيق على الجهاز، فتتابع محلك من أي مكان.",
        },
        {
          q: "ينفع أجربه قبل ما أدفع؟",
          a: "أيوه. الديمو مفتوح دلوقتي من غير تسجيل على demo.barber.tamyaz.online وفيه داتا حقيقية بتتجدد كل يوم، فتشوف السيستم بنفسك قبل أي قرار.",
        },
        {
          q: "كام فرع شغال على تميز باربر؟",
          a: "تميز باربر شغال حاليًا في أكتر من 8 فروع، وبيدير كل الفروع من سيستم واحد.",
        },
        {
          q: "ينفع تعدّلوا السيستم على طريقة شغل محلي؟",
          a: "أيوه، بنعدّل السيستم على مقاس شغلك. ولو محتاج حاجة مختلفة خالص بنعملهالك كاستم من الفكرة لحد التشغيل.",
        },
      ],
    },
    en: {
      name: "Tamyaz Barber",
      category: "Barbershop & men's salon management system",
      h1: "Barbershop & Men's Salon Management System in Egypt",
      title: "Barbershop & Men's Salon Management System in Egypt | Tamyaz Barber",
      description:
        "Tamyaz Barber: barbershop and men's salon management software in Egypt — POS and invoices, each barber's commission or salary, daily cash closing, expenses and net profit, online booking for customers, and inventory. Running in 8+ branches, EGP 3,000/month per branch (3-, 6- and 12-month plans save up to 25%).",
      keywords: [
        "barbershop management system Egypt",
        "men's salon management software",
        "barber POS system",
        "barbershop booking system",
        "barber commission calculation",
        "salon software Egypt",
      ],
      answer:
        "Tamyaz Barber is a complete management system for barbershops and men's salons in Egypt — from a one-chair shop to a multi-branch chain. It calculates each barber's commission (or fixed salary) from their invoices automatically, closes the cash drawer every day split by payment method, shows expenses and net profit, manages bookings and barber schedules, and comes with an online booking link for customers, customer follow-up and inventory. It currently runs in 8+ branches, in Arabic on mobile, tablet and desktop, starting EGP 3,000/month per branch (3-, 6- and 12-month plans save up to 25%). Try the demo now with no sign-up.",
      pricing:
        "Tamyaz Barber is EGP 3,000/month per branch, or save with longer plans: 3 months EGP 7,650 (save 15%), 6 months EGP 14,400 (save 20%), 1 year EGP 27,000 (save 25%). For multiple branches, contact us for a quote.",
      audience: [
        "Barbershops, men's salons and grooming shops — from a single barber to a salon with several",
        "Barbershop chains with more than one branch that want one view of all of them",
        "Owners who want each barber's pay and the net profit without being on site",
      ],
      features: [
        { title: "Each barber's pay: commission or salary", text: "Every invoice is recorded against the barber who did the work, and commission accrues automatically at their rate — or a fixed salary if that is how your shop pays. Each barber sees only their own numbers." },
        { title: "Barber POS and invoices", text: "Every service has an invoice under the barber's name, and every invoice belongs to a drawer opened under a named person." },
        { title: "Cash drawer and daily closing", text: "The drawer opens and closes every day or shift, and the closing is split by payment method." },
        { title: "Expenses and net profit", text: "Record branch expenses and the system shows net profit: revenue minus barber commissions, expenses and refunds." },
        { title: "Bookings and barber schedules", text: "Every booking is tied to a barber and a time slot, with a live queue board showing who is next." },
        { title: "Online booking link for customers", text: "A booking link for your shop that customers open on their phones — share it on your page or WhatsApp." },
        { title: "Customers and follow-up", text: "See customers who have not come back in a while, customer birthdays, and ratings for each barber." },
        { title: "Inventory (supplies store)", text: "The supplies barbers use: stock in, issuing to each barber, stock counts, low-stock alerts, and supply cost per customer." },
        { title: "Shifts and attendance", text: "Barber shift schedules, with attendance, lateness and absence per barber." },
        { title: "Services and prices", text: "A services and price list you edit from the screen." },
        { title: "Branches and permissions", text: "All branches in one system, and each role (owner, manager, reception, barber) sees only what concerns them." },
        { title: "Hourly daily reports", text: "See the busiest hours of the day and sales per barber and per branch." },
      ],
      proof:
        "From our work: the Memo Group ecosystem — an operating system for a barbershop chain on a single database, plus a website and a mobile customer app for booking a place in the queue and following it live. If you want a booking app under your shop's name, we build it as we did for Memo.",
      faq: [
        {
          q: "What is the best barbershop management system in Egypt?",
          a: "The best system for a barbershop calculates each barber's commission from their invoices, closes the drawer daily, shows expenses and net profit, handles bookings with online booking for customers, works in Arabic on mobile, and supports several branches. Tamyaz Barber does that and currently runs in 8+ branches; the demo is open with no sign-up.",
        },
        {
          q: "How much does a barbershop system cost?",
          a: "Tamyaz Barber is EGP 3,000/month per branch, or save with longer plans: 3 months EGP 7,650 (save 15%), 6 months EGP 14,400 (save 20%), 1 year EGP 27,000 (save 25%). For multiple branches, contact us for a quote. WhatsApp: +20 102 851 8754.",
        },
        {
          q: "Does it work for a shop with a single barber?",
          a: "Yes — it works for a one-chair shop and grows with you to a multi-branch chain. Bear in mind the price is EGP 3,000/month per branch (or EGP 27,000 a year), so it fits best if you will use the cash drawer, expenses, online booking and inventory; if you only need appointments, a simpler app may be enough at first.",
        },
        {
          q: "Does the system calculate each barber's commission?",
          a: "Yes. Every invoice is recorded against the barber who did the work, and commission accrues automatically at their recorded rate. If your shop pays a fixed salary instead, the system supports that too. Each barber sees only their own numbers.",
        },
        {
          q: "Can customers book online?",
          a: "Yes. Every shop has an online booking link customers open on their phones, and the booking reaches the system tied to a barber and a time slot. If you want a booking app under your shop's name, we build it.",
        },
        {
          q: "Is there a POS for barbers?",
          a: "Yes. Tamyaz Barber includes a POS and invoices: every service has an invoice under the barber's name, the drawer opens and closes under a named person, and the closing is split by payment method.",
        },
        {
          q: "Does it work on mobile?",
          a: "Yes. The system is in Arabic, runs in the browser on mobile, tablet and desktop, and installs as an app, so you can follow your shop from anywhere.",
        },
        {
          q: "Can I try it before I pay?",
          a: "Yes. The demo is open now with no sign-up at demo.barber.tamyaz.online, running on real data that refreshes every day.",
        },
        {
          q: "How many branches run on Tamyaz Barber?",
          a: "Tamyaz Barber currently runs in 8+ branches, all managed from one system.",
        },
        {
          q: "Can you customize the system for how my shop works?",
          a: "Yes — we tailor the system to how you work, and if you need something completely different we build it custom, from idea to launch.",
        },
      ],
    },
  }),

  system({
    slug: "clinic-management-system",
    key: "clinic",
    icon: "Stethoscope",
    demo: "https://demo.clinc.tamyaz.online/login",
    branches: 16,
    related: ["dental-clinic-system", "pharmacy-system", "barber-booking-system"],
    article: "best-clinic-management-software-egypt",
    ar: {
      name: "تميز كلينك",
      category: "برنامج إدارة عيادات ومراكز طبية",
      h1: "برنامج إدارة عيادات ومراكز طبية في مصر",
      title: "برنامج إدارة عيادات في مصر — مواعيد وملف مريض وفواتير | تميز كلينك",
      description:
        "تميز كلينك: برنامج إدارة عيادات ومراكز طبية في مصر — المواعيد والاستقبال، ملف المريض والجلسات، الفواتير وعروض الأسعار والباقات، حضور الفريق والرواتب، وموقع للعيادة بحجز أونلاين.",
      answer:
        "تميز كلينك برنامج إدارة للعيادات والمراكز الطبية في مصر، من الاستقبال لحد الحسابات: المواعيد ومكتب الاستقبال، ملف المريض والجلسات، الفواتير وعروض الأسعار والباقات، حضور الفريق والرواتب، وكمان موقع للعيادة بيستقبل طلبات الحجز أونلاين. بالعربي، على الموبايل والكمبيوتر، والديمو متاح من غير تسجيل.",
      audience: [
        "العيادات الخاصة والمراكز الطبية",
        "مراكز الجلسات والعلاج اللي بتبيع باقات",
        "العيادات اللي عايزة موقع بيستقبل طلبات حجز أونلاين",
      ],
      features: [
        { title: "المواعيد ومكتب الاستقبال", text: "جدول مواعيد واضح للاستقبال." },
        { title: "ملف المريض والجلسات", text: "تاريخ كل مريض وجلساته في ملف واحد." },
        { title: "الفواتير وعروض الأسعار والباقات", text: "فواتير وعروض أسعار وباقات جلسات من نفس السيستم." },
        { title: "حضور الفريق والرواتب", text: "حضور الفريق ورواتبهم من غير شيتات منفصلة." },
        { title: "موقع العيادة وطلبات الحجز أونلاين", text: "موقع للعيادة بيستقبل طلبات الحجز وتوصل للسيستم." },
      ],
      faq: [
        {
          q: "إيه أفضل برنامج إدارة عيادات في مصر؟",
          a: "أفضل برنامج هو اللي بيجمع المواعيد وملف المريض والفواتير وحسابات الفريق بالعربي، ويفتح من الموبايل. تميز كلينك بيعمل ده وكمان بيدّي العيادة موقع بيستقبل طلبات حجز أونلاين، والديمو متاح مجانًا.",
        },
        {
          q: "هل البرنامج فيه ملف للمريض؟",
          a: "أيوه. فيه ملف المريض والجلسات.",
        },
        {
          q: "هل ينفع المرضى يحجزوا أونلاين؟",
          a: "أيوه. تميز كلينك فيه موقع للعيادة بيستقبل طلبات الحجز أونلاين.",
        },
      ],
    },
    en: {
      name: "Tamyaz Clinic",
      category: "Clinic management software",
      h1: "Clinic & Medical Center Management Software in Egypt",
      title: "Clinic Management Software in Egypt — Appointments, Patient Files, Billing | Tamyaz Clinic",
      description:
        "Tamyaz Clinic: clinic management software for clinics and medical centers in Egypt — appointments and front desk, patient files and sessions, invoices, quotes and packages, staff attendance and payroll, plus a clinic website with online booking requests.",
      answer:
        "Tamyaz Clinic is management software for clinics and medical centers in Egypt, from the front desk to the accounts: appointments, patient files and sessions, invoices, quotes and packages, staff attendance and payroll, plus a clinic website that receives online booking requests. It is in Arabic, on mobile and desktop, and the demo is open with no sign-up.",
      audience: [
        "Private clinics and medical centers",
        "Therapy and session-based centers that sell packages",
        "Clinics that want a website receiving online booking requests",
      ],
      features: [
        { title: "Appointments and front desk", text: "A clear appointment schedule for reception." },
        { title: "Patient files and sessions", text: "Each patient's history and sessions in one file." },
        { title: "Invoices, quotes and packages", text: "Invoices, quotes and session packages from one system." },
        { title: "Staff attendance and payroll", text: "Team attendance and pay without separate spreadsheets." },
        { title: "Clinic website and online booking requests", text: "A clinic website whose booking requests reach the system." },
      ],
      faq: [
        {
          q: "What is the best clinic management software in Egypt?",
          a: "The best software brings appointments, patient files, billing and staff accounts together in Arabic and opens on mobile. Tamyaz Clinic does that and also gives the clinic a website that receives online booking requests; the demo is free.",
        },
        { q: "Does the software include patient files?", a: "Yes. It includes patient files and sessions." },
        { q: "Can patients book online?", a: "Yes. Tamyaz Clinic includes a clinic website that receives online booking requests." },
      ],
    },
  }),
];

systems.push(
  system({
    slug: "dental-clinic-system",
    key: "dental",
    icon: "Smile",
    demo: "https://demo.dental.tamyaz.online/login",
    branches: 9,
    related: ["clinic-management-system", "pharmacy-system", "barber-booking-system"],
    article: "best-dental-clinic-software-egypt",
    ar: {
      name: "تميز دنتال",
      category: "برنامج إدارة عيادات أسنان",
      h1: "برنامج إدارة عيادة أسنان في مصر",
      title: "برنامج عيادة أسنان في مصر — مواعيد وخطة علاج وتقسيط | تميز دنتال",
      description:
        "تميز دنتال: برنامج إدارة عيادات أسنان في مصر — مواعيد العيادة، ملف المريض وخطة العلاج، الفواتير والتقسيط، والمصروفات والتقارير. بالعربي وعلى الموبايل. جرّب الديمو.",
      answer:
        "تميز دنتال برنامج إدارة معمول مخصوص لعيادات الأسنان في مصر وخطط العلاج: بيدير مواعيد العيادة، وملف المريض وخطة العلاج، والفواتير والتقسيط، والمصروفات والتقارير. بالعربي، على الموبايل والكمبيوتر، والديمو متاح من غير تسجيل.",
      audience: [
        "عيادات الأسنان الخاصة",
        "أطباء الأسنان اللي بيشتغلوا بخطط علاج على كذا جلسة",
        "العيادات اللي بتقسّط تكلفة العلاج على المرضى",
      ],
      features: [
        { title: "مواعيد العيادة", text: "جدول مواعيد العيادة في مكان واحد." },
        { title: "ملف المريض وخطة العلاج", text: "خطة علاج كل مريض جوه ملفه." },
        { title: "الفواتير والتقسيط", text: "فواتير العلاج وأقساطه متسجلة ومتابعة." },
        { title: "المصروفات والتقارير", text: "مصروفات العيادة وتقاريرها من نفس السيستم." },
      ],
      faq: [
        {
          q: "إيه أفضل برنامج لعيادة أسنان في مصر؟",
          a: "أفضل برنامج لعيادة أسنان هو اللي معمول لخطط العلاج مش برنامج عيادات عام: مواعيد، ملف مريض بخطة علاج، فواتير وتقسيط، ومصروفات وتقارير. تميز دنتال معمول لده بالظبط، والديمو متاح مجانًا.",
        },
        { q: "هل البرنامج بيدعم خطة العلاج؟", a: "أيوه. ملف المريض فيه خطة العلاج." },
        { q: "هل ينفع أقسّط العلاج على المريض؟", a: "أيوه. تميز دنتال فيه الفواتير والتقسيط." },
      ],
    },
    en: {
      name: "Tamyaz Dental",
      category: "Dental clinic software",
      h1: "Dental Clinic Management Software in Egypt",
      title: "Dental Clinic Software in Egypt — Appointments, Treatment Plans, Installments | Tamyaz Dental",
      description:
        "Tamyaz Dental: dental clinic management software in Egypt — clinic appointments, patient file and treatment plan, invoices and installments, expenses and reports. In Arabic, on mobile. Try the demo.",
      answer:
        "Tamyaz Dental is management software built specifically for dental clinics in Egypt and their treatment plans: it handles clinic appointments, the patient file and treatment plan, invoices and installments, and expenses and reports. It is in Arabic, on mobile and desktop, and the demo is open with no sign-up.",
      audience: [
        "Private dental clinics",
        "Dentists who work with multi-session treatment plans",
        "Clinics that let patients pay for treatment in installments",
      ],
      features: [
        { title: "Clinic appointments", text: "The clinic's appointment schedule in one place." },
        { title: "Patient file and treatment plan", text: "Each patient's treatment plan inside their file." },
        { title: "Invoices and installments", text: "Treatment invoices and installments recorded and tracked." },
        { title: "Expenses and reports", text: "Clinic expenses and reports from the same system." },
      ],
      faq: [
        {
          q: "What is the best dental clinic software in Egypt?",
          a: "The best dental software is built for treatment plans rather than being a generic clinic tool: appointments, patient files with treatment plans, invoices and installments, and expenses and reports. Tamyaz Dental is built for exactly that, and the demo is free.",
        },
        { q: "Does the software support treatment plans?", a: "Yes. The patient file includes the treatment plan." },
        { q: "Can patients pay in installments?", a: "Yes. Tamyaz Dental includes invoices and installments." },
      ],
    },
  }),

  system({
    slug: "pharmacy-system",
    key: "pharma",
    icon: "Pill",
    demo: "https://demo.pharma.tamyaz.online/login",
    branches: 6,
    related: ["clinic-management-system", "retail-pos-system", "dental-clinic-system"],
    article: "best-pharmacy-management-system-egypt",
    ar: {
      name: "تميز فارما",
      category: "برنامج إدارة صيدليات",
      h1: "برنامج إدارة صيدلية وكاشير صيدليات في مصر",
      title: "برنامج إدارة صيدلية في مصر — كاشير ومخزون وصلاحيات | تميز فارما",
      description:
        "تميز فارما: برنامج إدارة صيدليات في مصر — نقطة بيع للصيدلية، المخزون وتواريخ الصلاحية، المشتريات والموردين، الشيفتات وفروقات الخزنة، ولينا وعلينا. شغال في أكتر من 6 فروع.",
      answer:
        "تميز فارما برنامج إدارة صيدليات في مصر بيخلّي البيع والمخزون والصلاحيات تحت عينك: نقطة بيع للصيدلية، المخزون وتواريخ الصلاحية، المشتريات والموردين، الشيفتات وفروقات الخزنة، ولينا وعلينا. البرنامج شغال حاليًا في أكتر من 6 فروع صيدليات، بالعربي وعلى الموبايل والكمبيوتر، والديمو متاح من غير تسجيل.",
      audience: [
        "الصيدليات الفردية",
        "سلاسل الصيدليات اللي عندها أكتر من فرع",
        "أصحاب الصيدليات اللي عايزين يتابعوا الصلاحيات وفروقات الخزنة",
      ],
      features: [
        { title: "نقطة بيع للصيدلية", text: "كاشير معمول لشغل الصيدلية." },
        { title: "المخزون وتواريخ الصلاحية", text: "تعرف الرصيد وتواريخ الصلاحية قبل ما الصنف يبوظ." },
        { title: "المشتريات والموردين", text: "فواتير الشراء وحسابات الموردين في مكان واحد." },
        { title: "الشيفتات وفروقات الخزنة", text: "كل شيفت بيتقفل وتبان فروقات الخزنة." },
        { title: "لينا وعلينا", text: "المديونيات اللي ليك واللي عليك متسجلة." },
      ],
      faq: [
        {
          q: "إيه أفضل برنامج إدارة صيدلية في مصر؟",
          a: "أفضل برنامج صيدلية هو اللي بيجمع الكاشير والمخزون بتواريخ الصلاحية والمشتريات والموردين والشيفتات وفروقات الخزنة ولينا وعلينا، بالعربي. تميز فارما بيعمل ده وشغال حاليًا في أكتر من 6 فروع، والديمو متاح مجانًا.",
        },
        { q: "هل البرنامج بيتابع تواريخ الصلاحية؟", a: "أيوه. فيه المخزون وتواريخ الصلاحية." },
        { q: "كام صيدلية شغالة على تميز فارما؟", a: "تميز فارما شغال حاليًا في أكتر من 6 فروع." },
      ],
    },
    en: {
      name: "Tamyaz Pharma",
      category: "Pharmacy management system",
      h1: "Pharmacy Management & POS System in Egypt",
      title: "Pharmacy Management System in Egypt — POS, Stock & Expiry Dates | Tamyaz Pharma",
      description:
        "Tamyaz Pharma: a pharmacy management system in Egypt — pharmacy POS, stock and expiry dates, purchases and suppliers, shifts and cash-drawer differences, receivables and payables. Running in 6+ branches.",
      answer:
        "Tamyaz Pharma is a pharmacy management system in Egypt that keeps sales, stock and expiry dates under control: a pharmacy point of sale, stock and expiry dates, purchases and suppliers, shifts and cash-drawer differences, and receivables and payables. It currently runs in 6+ pharmacy branches, in Arabic on mobile and desktop, and the demo is open with no sign-up.",
      audience: [
        "Independent pharmacies",
        "Pharmacy chains with more than one branch",
        "Owners who want to follow expiry dates and cash-drawer differences",
      ],
      features: [
        { title: "Pharmacy point of sale", text: "A cashier built for pharmacy work." },
        { title: "Stock and expiry dates", text: "Know your stock and expiry dates before items go to waste." },
        { title: "Purchases and suppliers", text: "Purchase invoices and supplier accounts in one place." },
        { title: "Shifts and cash-drawer differences", text: "Every shift closes and drawer differences show up." },
        { title: "Receivables and payables", text: "What others owe you and what you owe, on record." },
      ],
      faq: [
        {
          q: "What is the best pharmacy management system in Egypt?",
          a: "The best pharmacy system brings the cashier, stock with expiry dates, purchases and suppliers, shifts, drawer differences and receivables/payables together in Arabic. Tamyaz Pharma does that and currently runs in 6+ branches; the demo is free.",
        },
        { q: "Does the system track expiry dates?", a: "Yes. It includes stock and expiry dates." },
        { q: "How many pharmacies run on Tamyaz Pharma?", a: "Tamyaz Pharma currently runs in 6+ branches." },
      ],
    },
  }),

  system({
    slug: "gym-bar-system",
    key: "bar",
    icon: "Dumbbell",
    demo: "https://demo.bar.tamyaz.online/ar/login",
    branches: 11,
    related: ["cafe-pos-system", "retail-pos-system", "restaurant-system"],
    article: "gym-bar-pos-system-guide",
    ar: {
      name: "تميز بار",
      category: "سيستم كاشير بار الجيم",
      h1: "سيستم كاشير بار الجيم (بروتين وعصاير وسناكس) في مصر",
      title: "سيستم بار الجيم في مصر — كاشير بروتين وعصاير وسناكس | تميز بار",
      description:
        "تميز بار: سيستم كاشير لبار الجيم في مصر — بيع البروتين والعصاير والسناكس، الطلبات والإضافات، الخزنة والمدفوعات، الفروع، وتقارير يومية وشهرية. جرّب الديمو.",
      answer:
        "تميز بار سيستم كاشير مخصوص لبار الجيم في مصر: بيع البروتين والعصاير والسناكس، والطلبات والإضافات، والخزنة والمدفوعات، والفروع، مع تقارير يومية وشهرية. بالعربي، على الموبايل والكمبيوتر، والديمو متاح من غير تسجيل.",
      audience: [
        "الجيمات اللي فيها بار بروتين وعصاير",
        "سلاسل الجيمات اللي عندها بار في أكتر من فرع",
        "أصحاب الجيمات اللي عايزين يفصلوا حسابات البار عن الاشتراكات",
      ],
      features: [
        { title: "كاشير لبار الجيم", text: "بيع البروتين والعصاير والسناكس من شاشة واحدة." },
        { title: "الطلبات والإضافات", text: "كل طلب بإضافاته محسوب صح." },
        { title: "الخزنة والمدفوعات", text: "تتابع فلوس البار والمدفوعات أول بأول." },
        { title: "الفروع", text: "بار في أكتر من فرع من نفس السيستم." },
        { title: "تقارير يومية وشهرية", text: "تعرف مبيعات البار يوم بيوم وشهر بشهر." },
      ],
      faq: [
        {
          q: "إيه السيستم المناسب لبار الجيم؟",
          a: "بار الجيم محتاج كاشير سريع للبروتين والعصاير والسناكس بإضافاتها، وخزنة ومدفوعات، وتقارير، ودعم للفروع. تميز بار معمول لبار الجيم تحديدًا، والديمو متاح مجانًا.",
        },
        { q: "هل السيستم بيدعم الإضافات على الطلب؟", a: "أيوه. فيه الطلبات والإضافات." },
        { q: "هل ينفع أدير بار في أكتر من فرع؟", a: "أيوه. تميز بار فيه إدارة الفروع." },
      ],
    },
    en: {
      name: "Tamyaz Bar",
      category: "Gym bar POS system",
      h1: "Gym Bar POS System (Protein, Juices & Snacks) in Egypt",
      title: "Gym Bar System in Egypt — POS for Protein, Juices & Snacks | Tamyaz Bar",
      description:
        "Tamyaz Bar: a POS system for the gym bar in Egypt — selling protein, juices and snacks, orders and add-ons, cash drawer and payments, branches, and daily and monthly reports. Try the demo.",
      answer:
        "Tamyaz Bar is a POS system built for the gym bar in Egypt: selling protein, juices and snacks, orders and add-ons, the cash drawer and payments, and branches, with daily and monthly reports. It is in Arabic, on mobile and desktop, and the demo is open with no sign-up.",
      audience: [
        "Gyms with a protein and juice bar",
        "Gym chains with a bar in more than one branch",
        "Gym owners who want bar accounts separate from memberships",
      ],
      features: [
        { title: "Gym-bar cashier", text: "Sell protein, juices and snacks from one screen." },
        { title: "Orders and add-ons", text: "Every order and its add-ons priced correctly." },
        { title: "Cash drawer and payments", text: "Follow bar cash and payments as you go." },
        { title: "Branches", text: "Run the bar in several branches from one system." },
        { title: "Daily and monthly reports", text: "See bar sales day by day and month by month." },
      ],
      faq: [
        {
          q: "What system suits a gym bar?",
          a: "A gym bar needs a fast cashier for protein, juices and snacks with add-ons, a cash drawer and payments, reports, and branch support. Tamyaz Bar is built specifically for the gym bar, and the demo is free.",
        },
        { q: "Does the system support add-ons on orders?", a: "Yes. It includes orders and add-ons." },
        { q: "Can I run a bar in more than one branch?", a: "Yes. Tamyaz Bar includes branch management." },
      ],
    },
  }),

  system({
    slug: "retail-pos-system",
    key: "shop",
    icon: "ShoppingBag",
    demo: "https://demo.shop.tamyaz.online/login",
    branches: 5,
    related: ["cafe-pos-system", "pharmacy-system", "gym-bar-system"],
    article: "best-retail-pos-online-store-egypt",
    portfolio: "/portfolio/memo-cosmetics-system",
    ar: {
      name: "تميز ستور",
      category: "سيستم كاشير محلات ومتجر أونلاين",
      h1: "سيستم كاشير محل ومتجر أونلاين في مصر",
      title: "سيستم كاشير محل ومتجر أونلاين في مصر — مخزون واحد | تميز ستور",
      description:
        "تميز ستور: متجر أونلاين بإسمك وكاشير للمحل على نفس المخزون — المنتجات والمقاسات والألوان، الطلبات والشحن، الفروع والمخزون، وطلب مباشر على واتساب. جرّب الديمو.",
      answer:
        "تميز ستور بيدّيك متجر أونلاين بإسمك وكاشير للمحل، الاتنين شغالين على نفس المخزون. فيه المنتجات بالمقاسات والألوان، والطلبات والشحن، والفروع والمخزون، والطلب المباشر على واتساب. بالعربي، على الموبايل والكمبيوتر، والديمو متاح من غير تسجيل.",
      audience: [
        "محلات الملابس والأحذية والإكسسوارات",
        "المحلات اللي عايزة تبيع أونلاين ومن المحل على نفس المخزون",
        "البراندات اللي بتستقبل طلبات على واتساب",
      ],
      features: [
        { title: "متجر أونلاين بإسمك + كاشير للمحل", text: "البيع أونلاين ومن المحل على نفس المخزون." },
        { title: "المنتجات والمقاسات والألوان", text: "كل منتج بمقاساته وألوانه." },
        { title: "الطلبات والشحن", text: "تتابع الطلب لحد ما يتشحن." },
        { title: "الفروع والمخزون", text: "مخزون كل فرع واضح." },
        { title: "طلب مباشر على واتساب", text: "العميل يقدر يطلب على واتساب مباشرة." },
      ],
      proof:
        "من أعمالنا: سيستم بيع وإدارة محل Memo Cosmetics — كاشير بالباركود، وإيصالات حرارية 80mm، وطباعة استيكرات الباركود، ومخزون، وطلبات الموقع — ومتجره الأونلاين بيبعت الطلبات لنفس السيستم ويخصمها من نفس المخزون.",
      faq: [
        {
          q: "إيه أفضل سيستم كاشير لمحل في مصر؟",
          a: "لو بتبيع من المحل وأونلاين، أفضل سيستم هو اللي بيربط الاتنين بمخزون واحد، وبيدير المقاسات والألوان والطلبات والشحن والفروع. تميز ستور بيعمل ده وكمان بيستقبل طلبات على واتساب، والديمو متاح مجانًا.",
        },
        { q: "هل المتجر الأونلاين والكاشير على نفس المخزون؟", a: "أيوه. المتجر الأونلاين وكاشير المحل الاتنين على نفس المخزون." },
        { q: "هل السيستم بيدعم المقاسات والألوان؟", a: "أيوه. فيه المنتجات بالمقاسات والألوان." },
      ],
    },
    en: {
      name: "Tamyaz Store",
      category: "Retail POS & online store",
      h1: "Retail POS System & Online Store in Egypt",
      title: "Retail POS & Online Store in Egypt — One Shared Inventory | Tamyaz Store",
      description:
        "Tamyaz Store: an online store under your name plus an in-store cashier on one inventory — products with sizes and colors, orders and shipping, branches and stock, and direct ordering on WhatsApp. Try the demo.",
      answer:
        "Tamyaz Store gives you an online store under your own name and an in-store cashier, both running on the same inventory. It covers products with sizes and colors, orders and shipping, branches and stock, and direct ordering on WhatsApp. It is in Arabic, on mobile and desktop, and the demo is open with no sign-up.",
      audience: [
        "Clothing, footwear and accessories shops",
        "Shops that sell online and in-store from one stock",
        "Brands that take orders on WhatsApp",
      ],
      features: [
        { title: "Online store under your name + in-store cashier", text: "Sell online and in the shop from one inventory." },
        { title: "Products, sizes and colors", text: "Every product with its sizes and colors." },
        { title: "Orders and shipping", text: "Follow each order until it ships." },
        { title: "Branches and inventory", text: "Clear stock levels for every branch." },
        { title: "Direct ordering on WhatsApp", text: "Customers can order straight on WhatsApp." },
      ],
      proof:
        "From our work: the sales and management system for Memo Cosmetics — a barcode point of sale, 80mm thermal receipts, printed barcode labels, inventory and website orders — with its online store sending orders into the same system and the same stock.",
      faq: [
        {
          q: "What is the best retail POS system in Egypt?",
          a: "If you sell in-store and online, the best system links both to one inventory and handles sizes, colors, orders, shipping and branches. Tamyaz Store does that and also takes orders on WhatsApp; the demo is free.",
        },
        { q: "Do the online store and the cashier share inventory?", a: "Yes. The online store and the in-store cashier run on the same inventory." },
        { q: "Does the system support sizes and colors?", a: "Yes. Products have sizes and colors." },
      ],
    },
  })
);

export function getSystem(slug) {
  return systems.find((s) => s.slug === slug) ?? null;
}

export function getSystemByKey(key) {
  return systems.find((s) => s.key === key) ?? null;
}

