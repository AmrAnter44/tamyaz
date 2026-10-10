// التصنيفات — التصنيف اللي عليه grouped بيظهر في صفحة الأعمال ككارد واحد بيفتح صفحة التصنيف
export const categoriesData = [
  {
    id: "memo-group",
    // الاسم إنجليزي في اللغتين زي أسماء المشاريع نفسها
    name: { ar: "Memo Group", en: "Memo Group" },
    grouped: true,
    // أيقونة رأس صفحة التصنيف (بتتحوّل لأيقونة lucide في الصفحة)
    icon: "scissors",
    thumbnail: "/projects/categories/memo-group.png",
    intro: {
      ar: "MEMO Group منظومة مصرية للعناية والجمال الرجالي: محلات حلاقة، وأكاديمية لتعليم الحلاقة، ومحل كوزمتكس. اشتغلنا على المنظومة الرقمية بتاعتها كلها — أنظمة إدارة للأكاديمية والمحلات ومحل الكوزمتكس، وتطبيقات للطلبة والعملاء، ومواقع للمجموعة والمتجر — كلها بنفس هوية ميمو. تحت هتلاقي كل جزء بتفاصيله.",
      en: "MEMO Group is an Egyptian men's grooming and beauty group: barbershops, a barbering academy, and a cosmetics shop. We built its entire digital ecosystem — management systems for the academy, the shops, and the cosmetics store, apps for students and customers, and websites for the group and the store — all under the same Memo identity. Below you'll find each part in detail.",
    },
    // ترتيب عرض الخدمات في صفحة التصنيف
    services: [
      "barber-academy",
      "barbershop-system",
      "memo-cosmetics-system",
      "memo-academy-app",
      "memo-customer-app",
      "memo-group-website",
      "memo-cosmetics-website",
    ],
  },
  {
    id: "cafes",
    name: { ar: "كافيهات", en: "Cafes" },
    thumbnail: "/projects/categories/cafes.png",
  },
];

export const getCategory = (id) => categoriesData.find((c) => c.id === id);

export const getCategoryProjects = (id) =>
  projectsData.filter((p) => p.categoryId === id);

// كروت المستوى الأول: التصنيف المعلّم grouped بيبقى كارد واحد، والباقي مشاريع منفردة.
// بتستخدم في الصفحة الرئيسية عشان تعرض نفس كروت صفحة الأعمال.
export const getPortfolioEntries = () => {
  const entries = [];

  for (const category of categoriesData) {
    const projects = projectsData.filter((p) => p.categoryId === category.id);
    if (projects.length === 0) continue;

    if (category.grouped) {
      entries.push({ type: "category", id: category.id, category, count: projects.length });
    } else {
      projects.forEach((project) => entries.push({ type: "project", id: project.id, project }));
    }
  }

  // مشاريع من غير تصنيف بتتحط في الآخر
  projectsData
    .filter((p) => !getCategory(p.categoryId))
    .forEach((project) => entries.push({ type: "project", id: project.id, project }));

  return entries;
};

// المشروع اللي عليه cardOpensWebsite كارده بيفتح الموقع نفسه بدل صفحة المشروع
export const getProjectLink = (project, locale) =>
  project.cardOpensWebsite && project.websiteLink
    ? { href: project.websiteLink, external: true }
    : { href: `/${locale}/portfolio/${project.id}`, external: false };

export const projectsData = [
  {
    id: "barber-academy",
    name: "Memo Barber Academy System",
    categoryId: "memo-group",
    icon: "system",
    highlights: {
      ar: ["3 فروع", "19 موديول", "4 أدوار", "عربي RTL"],
      en: ["3 branches", "19 modules", "4 roles", "Arabic RTL"],
    },
    thumbnail: "/projects/memo-academy/logo-white.png",
    description: {
      ar: "نظام إدارة متكامل لأكاديمية حلاقة بثلاثة فروع، بيغطي دورة الطالب كاملة من أول ما يبقى مهتم لحد ما يتخرّج وياخد شهادة موثّقة. تسعتاشر موديول بيدير الطلاب والمجموعات والحضور بالباركود والإيصالات والمصروفات والمرتبات والشهادات والتقارير المالية. عربي بالكامل بتخطيط من اليمين لليسار، وبيتثبّت على الموبايل كتطبيق، وبحماية على طبقتين مستقلتين تخلّي الأرقام المالية محجوبة عن الموظفين على مستوى قاعدة البيانات مش الشاشة.",
      en: "A complete management system for a three-branch barber academy, covering the student journey from first inquiry to graduation with a verified certificate. Nineteen modules handle students, groups, barcode attendance, receipts, expenses, payroll, certificates, and financial reports. Fully Arabic with a right-to-left layout, installable on mobile as an app, and protected by two independent security layers that hide financial figures from staff at the database level rather than the screen."
    },
    features: {
      ar: [
        "تسعتاشر موديول و34 صفحة بتغطي دورة الطالب كاملة: من «مهتم» في قائمة الليدز، لطالب مسجّل بمجموعة، لخرّيج بشهادة موثّقة.",
        "حضور بمسح الباركود أو بكاميرا الموبايل، والحصة بتتخصم تلقائيًا — وفيه قفل على صف الطالب يمنع الخصم المزدوج لو الكود اتمسح مرتين في نفس اللحظة.",
        "ملف طالب كامل: البيانات، الصور، الدفعات، الحضور، الملاحظات، السكن، والحصص المتبقية — كلها في شاشة واحدة.",
        "إيصالات بترقيم متسلسل بدون تكرار، طباعة مباشرة، إرسال واتساب، وإمكانية الإلغاء بسبب مسجّل.",
        "شهادات بكود تحقق فريد و QR، وصفحة تحقق عامة يفتحها أي حد بالكود من غير ما يوصل لبيانات الأكاديمية.",
        "إقفال يومي للخزنة: جرد الكاش وحساب الفرق بين المتوقع والفعلي.",
        "أربعة أدوار — أونر، أدمن، رسبشن، كابتن — والرسبشن مقيّد بفرعه، والكابتن يشوف طلاب مجموعاته بس.",
        "الحماية على طبقتين: 52 سياسة أمان على 21 جدول في قاعدة البيانات، وفحص للدور قبل أي كتابة حسّاسة على السيرفر. إخفاء الأزرار في الواجهة راحة استخدام مش حماية.",
        "إخفاء الإيرادات متعمول صح: الاستعلامات نفسها مابتتنفذش للرسبشن، فالأرقام مش موجودة في الصفحة أصلًا حتى لو حد فتح أدوات المطوّر.",
        "سجل عمليات للحذف والإلغاء بنسخة من البيانات قبل الحذف وسبب إلزامي.",
        "منطق شغّال جوّه قاعدة البيانات نفسها — خصم الحصص، التحقق من الشهادات، ترقيم الطلاب — فمايتحايلش عليه من المتصفح.",
        "جدول أسبوعي لمواعيد المجموعات، وكتالوج مهارات بمحتوى أسبوعي لكل مجموعة.",
        "موظفين وكباتن بمرتبات وعمولات وخصومات وحضور بالباركود.",
        "تقارير مالية: أرباح وخسائر، إيراد حسب طريقة الدفع، وعمولات المدربين.",
        "حالة «حجز» للطالب اللي دفع مقدّم من غير مجموعة — أول ما تتحدد له مجموعة بيتفعّل تلقائيًا وياخد سعرها وحصصها.",
        "تحذير فوري لو رقم الموبايل مكرر أو موجود قبل كده في قائمة المهتمين، فمفيش طالب مسجّل مرتين.",
      ],
      en: [
        "Nineteen modules and 34 screens covering the full student journey: from a lead, to an enrolled student in a group, to a graduate with a verified certificate.",
        "Attendance by barcode scanner or phone camera, with the session deducted automatically — and a row-level lock that prevents a double deduction if the code is scanned twice at once.",
        "Complete student file: details, photos, payments, attendance, notes, housing, and remaining sessions on a single screen.",
        "Receipts with gapless sequential numbering, direct printing, WhatsApp delivery, and cancellation with a recorded reason.",
        "Certificates with a unique verification code and QR, plus a public verification page anyone can open by code without reaching academy data.",
        "Daily cash closing: count the drawer and compute the gap between expected and actual.",
        "Four roles — owner, admin, reception, captain — with reception restricted to its branch and captains seeing only their own groups' students.",
        "Two security layers: 52 policies across 21 database tables, plus a role check before every sensitive write on the server. Hiding buttons in the interface is convenience, not protection.",
        "Revenue hiding done properly: the queries themselves never run for reception, so the numbers are absent from the page entirely — even with developer tools open.",
        "An audit log for deletions and cancellations, storing a copy of the data before deletion along with a mandatory reason.",
        "Core logic runs inside the database itself — session deduction, certificate verification, student numbering — so it cannot be bypassed from the browser.",
        "A weekly schedule for group sessions, and a skills catalogue with weekly content per group.",
        "Staff and captains with salaries, commissions, deductions, and barcode attendance.",
        "Financial reports: profit and loss, revenue by payment method, and trainer commissions.",
        "A \"reserved\" state for a student who paid a deposit without a group — assigned to a group, they activate automatically and inherit its price and session count.",
        "An instant warning when a phone number is duplicated or already exists in the leads list, so no student is registered twice.",
      ]
    },
    benefits: {
      ar: [
        "الأكاديمية كلها بفروعها التلاتة في نظام واحد — بدل دفاتر وإكسيل وجروبات واتساب متفرقة، وكل فرع بياناته مفصولة لكن الأونر شايف الصورة كاملة.",
        "مفيش حصة بتضيع: الحصة بتتخصم أول ما الطالب يمسح كوده، ومحدش بيعتمد على ذاكرة الرسبشن. ده بيوقف التسريب اللي بيحصل لما طالب يحضر من غير ما حد يسجّله.",
        "ومفيش حصة بتتخصم مرتين: النظام بيقفل صف الطالب أثناء التسجيل، فحتى لو الكود اتمسح مرتين في نفس اللحظة الخصم بيحصل مرة واحدة. ده بيمنع شكاوى الطلاب اللي بتاكل وقت وتوتّر العلاقة.",
        "بتعرف مين قرب يخلص حصصه قبل ما يمشي — الداشبورد بيوريك «حصص قاربت تخلص»، فالتجديد بيتعرض في وقته بدل ما الطالب يختفي.",
        "التحصيل واضح: تعرف مين عليه باقي وكام، بدل ما المبالغ الصغيرة تتنسى وتتراكم.",
        "الخزنة مضبوطة: الإقفال اليومي بيجرد الكاش ويحسب الفرق بين المتوقع والفعلي، فأي نقص يبان في يومه مش آخر الشهر.",
        "موظفينك مايشوفوش إيراداتك: الرسبشن بيشتغل على النظام كله من غير ما يوصل لرقم إيراد واحد، والمنع في قاعدة البيانات نفسها مش إخفاء من الشاشة.",
        "أي حذف أو إلغاء بيتسجل باسم صاحبه وسببه ونسخة من البيانات قبل ما تتمسح — فلو حصلت مشكلة تعرف مين وإمتى وليه.",
        "شهاداتك ليها قيمة حقيقية: كل شهادة بكود و QR وصفحة تحقق عامة، فأي صاحب صالون يتأكد من الشهادة بنفسه في ثانية. ده بيحمي سمعة الأكاديمية من الشهادات المزوّرة وبيدي الخريج ورقة بتفرق معاه فعلًا.",
        "الطالب بيستلم إيصاله على واتساب فورًا — احترافية بتفرق في الانطباع، وبتقلل الخلاف على «أنا دفعت كام».",
        "بتعرف فروعك بتكسب كام فعلًا: قائمة أرباح وخسائر وإيراد حسب طريقة الدفع وعمولات المدربين محسوبة، فالقرار مبني على رقم مش على إحساس.",
        "عمولات المدربين ومرتبات الموظفين بتتحسب من النظام، فمفيش خلاف آخر الشهر ولا وقت ضايع في المراجعة.",
        "الطالب اللي دفع مقدّم مايضيعش: بيتسجل كـ«حجز» ويتفعّل لوحده أول ما تتحدد له مجموعة بسعرها وحصصها.",
        "مفيش طالب مكرر: النظام بيحذّرك فورًا لو الرقم متسجل قبل كده أو موجود في قائمة المهتمين.",
        "الليدز مابتضيعش: المهتم بيتسجل بحالته ومتابعاته، وبيتحوّل لطالب بضغطة لما يقرر.",
        "شغّال على الموبايل كتطبيق يتثبّت على الشاشة الرئيسية — الرسبشن يسجّل حضور من التليفون من غير أجهزة إضافية.",
        "عربي بالكامل بتخطيط من اليمين لليسار، فالفريق بيتدرب عليه في يوم مش في أسبوع.",
      ],
      en: [
        "The whole academy and its three branches in one system — instead of notebooks, spreadsheets, and scattered WhatsApp groups — with branch data separated while the owner still sees the full picture.",
        "No session goes uncounted: it is deducted the moment the student scans their code, with nothing left to reception's memory. That stops the leakage that happens when a student attends and nobody records it.",
        "And no session is deducted twice: the system locks the student's row during check-in, so even a double scan in the same instant deducts once. That prevents the disputes that cost time and goodwill.",
        "You know who is about to run out of sessions before they disappear — the dashboard surfaces \"sessions running low\", so renewal is offered at the right moment.",
        "Collection is clear: you know who owes what, instead of small balances being forgotten and piling up.",
        "The cash drawer is controlled: the daily closing counts cash and computes the gap between expected and actual, so any shortfall surfaces the same day rather than at month end.",
        "Your staff never see your revenue: reception can run the entire system without reaching a single revenue figure, and the block lives in the database, not in hidden screen elements.",
        "Every deletion or cancellation is logged with its author, reason, and a copy of the data beforehand — so if something goes wrong you know who, when, and why.",
        "Your certificates carry real weight: each one has a code, a QR, and a public verification page, so any salon owner can confirm it in seconds. That protects the academy's reputation from forged certificates and gives graduates a credential that actually counts.",
        "Students receive their receipt on WhatsApp instantly — a professional touch that also reduces arguments over what was paid.",
        "You know what your branches actually earn: profit and loss, revenue by payment method, and trainer commissions are all calculated, so decisions rest on numbers rather than instinct.",
        "Trainer commissions and staff salaries are computed by the system, so there is no month-end dispute and no time lost reconciling.",
        "A student who paid a deposit is never lost: they are held as \"reserved\" and activate automatically once assigned to a group, inheriting its price and sessions.",
        "No duplicate students: the system warns immediately if the phone number already exists or sits in the leads list.",
        "Leads do not slip away: an inquiry is recorded with its status and follow-ups, and converts to a student in one click.",
        "Runs on mobile as an installable app — reception can take attendance from a phone with no extra hardware.",
        "Fully Arabic with a right-to-left layout, so the team learns it in a day rather than a week.",
      ]
    },
    imageGroups: [
      {
        label: { ar: "لوحة الإدارة", en: "Admin dashboard" },
        images: Array.from({ length: 21 }, (_, i) => `/projects/memo-academy/${i + 1}.png`),
      },
    ],
    websiteLink: "",
    instagramLink: "/"
  },
  {
    id: "barbershop-system",
    name: "Memo Barbershop System",
    categoryId: "memo-group",
    icon: "system",
    highlights: {
      ar: ["17 قسم", "5 أدوار", "16 صلاحية", "4 طرق دفع"],
      en: ["17 sections", "5 roles", "16 permissions", "4 payment methods"],
    },
    thumbnail: "/projects/memo-barbershop/logo-mark.png",
    description: {
      ar: "نظام تشغيل كامل لسلسلة محلات حلاقة على قاعدة بيانات واحدة: لوحة تحكم بسبعتاشر قسم، وموقع، وتطبيق للعميل. كل جنيه بيدخل له فاتورة، وكل فاتورة مربوطة بدرج مفتوح باسم صاحبه، والتقفيل بيطلع مقسّم على طرق الدفع الأربعة. خمس أدوار بصلاحيات مفروضة جوّه قاعدة البيانات نفسها، وستاشر صلاحية بتتعدّل من الشاشة من غير مبرمج، والفروع بتتفتح بإضافة صف في جدول من غير إعداد تقني.",
      en: "A complete operating system for a barber shop chain on a single database: a seventeen-section dashboard, a website, and a customer app. Every pound collected has an invoice, every invoice is bound to a drawer opened under a named person, and the closing breaks down across all four payment methods. Five roles with permissions enforced inside the database itself, sixteen permissions editable from the screen without a developer, and new branches opened by adding a row with no technical setup."
    },
    features: {
      ar: [
        "ثلاث واجهات على قاعدة بيانات واحدة: لوحة تحكم بسبعتاشر قسم، وموقع، وتطبيق موبايل للعميل.",
        "سلسلة الفلوس مقفولة من الفتح للتقفيل: الريسبشن بيفتح الدرج باسمه، وكل فاتورة بتترّبط بالدرج المفتوح تلقائيًا — والدرج مقفول؟ النظام بيرفض إصدار الفاتورة من أصله.",
        "فرع واحد = درج مفتوح واحد بس، مستحيل يتكرر.",
        "التقفيل بيطلع باسم اللي قفل وبمدة الشيفت وبإجمالي صافي مقسوم على كاش وفيزا وإنستاباي وفودافون كاش.",
        "المرتجع بيتسجّل باسم طالبه وبيقف «قيد المراجعة» لحد ما الأدمن يعتمده، وبيتخصم من الصافي — مفيش مرتجع شفهي.",
        "صافي الربح محسوب بمعادلة مطبّقة في النظام: الإيراد ناقص عمولات الكباتن ناقص مصاريف الفرع ناقص المرتجعات المعتمدة.",
        "عمولة كل كابتن بتتجمّع تلقائيًا من فواتيره الفعلية بنسبته المسجّلة، والكابتن بيشوف عمولته هو بس.",
        "اليوم المحاسبي بيمتد مع الشيفت — من 8 مساءً لـ4 فجرًا يتحسب يوم واحد مش يومين.",
        "جدولة شيفتات شهر كامل دفعة واحدة، والحضور الفعلي بيتقارن بالمجدول: حاضر، متأخر وكام دقيقة، غايب — مجمّع شهريًا لكل كابتن.",
        "إدارة الطابور لحظيًا: بدء الخدمة، إنهاء، إلغاء، تسجيل عدم حضور، وحجز فوري لعميل داخل من غير موعد.",
        "خمس أدوار — صاحب السلسلة، المدير، الريسبشن، الكابتن، العميل — كل واحد بيشوف حتته بس.",
        "الصلاحيات مفروضة على مستوى الصف في قاعدة البيانات مش في الواجهة، فالبيانات اللي مش من حقك مابتوصلكش حتى لو فتحت الرابط المباشر.",
        "ستاشر صلاحية مخزّنة في جدول وبتتعدّل من شاشة الصلاحيات — من غير كود ولا نشر جديد.",
        "كل الشاشات شغالة على مستوى الفرع من الأساس، ففتح فرع جديد بيتم في نفس اليوم من غير نسخة تانية من النظام.",
        "تقييم بالنجوم وتعليق بعد الخدمة، وتقييم كل كابتن بيتحدّث تلقائيًا من تقييمات العملاء.",
        "كل سلسلة محلات = نسخة مستقلة تمامًا ببياناتها ومخزنها الخاص، وعربي بالكامل بدعم RTL في الأجزاء الثلاثة."
      ],
      en: [
        "Three interfaces on one database: a seventeen-section dashboard, a website, and a customer mobile app.",
        "The money chain is sealed from opening to closing: reception opens the drawer under their name, every invoice binds to the open drawer automatically — and if the drawer is closed, the system refuses to issue the invoice at all.",
        "One branch means exactly one open drawer; duplication is impossible.",
        "The closing is stamped with who closed it, the shift duration, and a net total split across cash, card, InstaPay, and Vodafone Cash.",
        "Refunds are logged under the requester and held \"pending review\" until an admin approves, then deducted from net — no verbal refunds.",
        "Net profit is computed by a formula enforced in the system: revenue minus barber commissions minus branch expenses minus approved refunds.",
        "Each barber's commission accrues automatically from their actual invoices at their recorded rate, and each barber sees only their own.",
        "The accounting day follows the shift — 8pm to 4am counts as one day, not two.",
        "Schedule a full month of shifts at once, with actual attendance compared to the schedule: present, late by the minute, absent — aggregated monthly per barber.",
        "Live queue management: start service, finish, cancel, mark no-show, and instant booking for a walk-in.",
        "Five roles — chain owner, manager, reception, barber, customer — each seeing only their own slice.",
        "Permissions are enforced at row level in the database rather than the interface, so data outside your scope never reaches you even via a direct link.",
        "Sixteen permissions stored in a table and edited from the permissions screen — no code, no redeployment.",
        "Every screen is branch-aware by design, so a new branch goes live the same day without a second copy of the system.",
        "Star ratings and comments after service, with each barber's rating updating automatically from customer reviews.",
        "Each chain is a fully independent instance with its own data and storage, fully Arabic with RTL across all three parts."
      ]
    },
    benefits: {
      ar: [
        "إيرادك بيتقفل بالجنيه: مفيش فاتورة تتصدر والدرج مقفول، ومفيش مبلغ بيتحرك من غير اسم عليه — فالفرق بين الدرج والدفتر بيبقى ليه مصدر معروف بدل «محدش يعرف راحت فين».",
        "بتعرف صافيك مش إيرادك: الإيراد رقم بيخدع، والنظام بيخصم العمولات والمصاريف والمرتجعات المعتمدة ويوصّلك للرقم الحقيقي يومي وشهري وسنوي.",
        "خلاف آخر الشهر على العمولات بينتهي: نسبة كل كابتن متسجلة والعمولة بتتجمّع من فواتيره لحظة بلحظة، والكابتن شايف رقمه بنفسه.",
        "المرتب بيتحسب على واقع مش على كلام: الشيفت المجدول بيتقارن بالحضور الفعلي بالدقيقة، فالتأخير والغياب موثّقين.",
        "الشيفت اللي بيمتد لبعد نص الليل مابيتقسمش على يومين في الحسابات — اليوم المحاسبي بيمتد معاه، وده بيمنع أرقام غلط في التقارير.",
        "المرتجع مابيبقاش ثغرة: لازم يعتمد من الأدمن، ومتسجّل مين طلبه ومين قرر، وبيتخصم من الصافي.",
        "فرع جديد = صف في جدول: تفتحه وتشغّله بنفس اليوم من غير نسخة تانية من النظام ولا إعداد من الصفر — فالتوسّع مش بيوقف على مبرمج.",
        "الصلاحيات بتتعدّل من الشاشة: تدّي أو تسحب صلاحية من أي دور من غير ما تستنى تعديل كود ولا نشر.",
        "موظفك مايشوفش غير حتته: الحماية في قاعدة البيانات نفسها، فحتى لو حد فتح الرابط المباشر مش هيوصل لبيانات مش من حقه.",
        "قاعدة عملاء حقيقية ملكك: أرقام وسجل زيارات وتقييمات، مش محادثات واتساب ضايعة.",
        "التقييمات بتوصلك مباشرة فتعرف أنهي كابتن بيكرّر العملاء وأنهي واحد محتاج تدخّل — بدل ما تكتشف المشكلة لما العميل يختفي.",
      ],
      en: [
        "Revenue closes to the pound: no invoice is issued while the drawer is shut, and no amount moves without a name on it — so any gap between drawer and book has a traceable source instead of vanishing.",
        "You see net, not gross: revenue is a deceptive number, and the system subtracts commissions, expenses, and approved refunds to give you the real figure daily, monthly, and yearly.",
        "Month-end commission arguments end: each barber's rate is recorded, commission accrues from their invoices in real time, and the barber sees their own number.",
        "Pay is computed on reality, not claims: scheduled shifts are compared against actual attendance to the minute, so lateness and absence are documented.",
        "A shift running past midnight is not split across two days in the books — the accounting day extends with it, preventing wrong numbers in reports.",
        "Refunds stop being a loophole: they require admin approval, record who asked and who decided, and are deducted from net.",
        "A new branch is a row in a table: open it and run it the same day with no second copy of the system and no setup from scratch — expansion no longer waits on a developer.",
        "Permissions are edited on screen: grant or revoke for any role without waiting for a code change or a deployment.",
        "Staff see only their slice: protection lives in the database, so even a direct link will not surface data outside their scope.",
        "A real customer base that belongs to you: numbers, visit history, and ratings — not scattered WhatsApp threads.",
        "Ratings reach you directly, so you know which barber brings customers back and which needs attention — instead of discovering the problem when the customer disappears.",
      ]
    },
    imageGroups: [
      {
        label: { ar: "لوحة التحكم", en: "Dashboard" },
        images: Array.from({ length: 18 }, (_, i) => `/projects/memo-barbershop/${i + 1}.png`),
      },
    ],
    websiteLink: "",
    instagramLink: "/"
  },
  {
    id: "cafe-system",
    name: "Cafe System",
    categoryId: "cafes",
    thumbnail: "/projects/keyif/logo.png",
    description: {
      ar: "نظام تشغيل كامل لكافيه «كيف»: كاشير سريع، وشاشة للباريستا، ولوحة إدارة بتلم المنيو والمخزون والمصاريف والتقارير في مكان واحد. مفيش بيع من غير شيفت مفتوح باسم صاحبه، وكل شيفت بيتقفل بمبيعاته ومصاريفه وصافيه، والمخزون بيتخصم من الأصناف اللي بتتباع فتعرف إيه اللي قرب يخلص قبل ما يخلص.",
      en: "A complete operating system for Keyif café: a fast point of sale, a barista screen, and an admin dashboard that brings the menu, inventory, expenses, and reports into one place. Nothing is sold without a shift opened under a named person, every shift closes with its own sales, expenses, and net, and inventory is drawn down by what is actually sold — so you know what is running low before it runs out."
    },
    features: {
      ar: [
        "كاشير مصمم للسرعة: الأقسام تابات فوق، الأصناف بضغطة، والأوردر بيتأكد ويتطبع من نفس الشاشة.",
        "مفيش بيع من غير شيفت: الكاشير مقفول لحد ما حد يفتح شيفت باسمه.",
        "نوع الأوردر «تيك أواي» أو «في المحل»، والدفع كاش أو إنستاباي أو محفظة أو فيزا.",
        "بحث عن أي أوردر قديم وتسجيل مصروف من الكاشير نفسه من غير ما تخرج للوحة الإدارة.",
        "شاشة خاصة للباريستا وتذكرة تحضير بتتطبع تلقائيًا مع كل أوردر.",
        "إدارة المنيو بالكامل: اسم عربي وإنجليزي، سعر، ترتيب، أيقونة، وحجم سنجل ودبل للصنف الواحد.",
        "كل صنف تتحكم فيه: يظهر في الكاشير، يظهر في الموقع، أو الاتنين.",
        "إضافات بأسعارها (شوت إسبرسو زيادة مثلًا)، وكل إضافة مربوطة بالمخزون اللي بتستهلكه.",
        "مخزون بالكيلو والجرام والقطعة، متقسم على تصنيفات، ومربوط بأصناف المنيو.",
        "حد تنبيه لكل خامة: النظام بيعلّم اللي «قرب يخلص» واللي «خلص»، وبيعرض أكتر 3 خامات اتصرفت في الشهر.",
        "سجل حركة المخزون: كل كمية دخلت أو اتصرفت متسجلة.",
        "مصاريف متقسمة على أنواع — طلبيات تشغيل، سلف، فواتير، إيجار، صيانة — ومصاريف اليوم والشهر قدامك، وتدخل على أي نوع تشوف اتصرف في إيه.",
        "تقارير يومية وشهرية: عدد الأوردرات، المبيعات، المصاريف، والصافي بعد المصاريف — واضغط على أي يوم تشوف تفاصيله.",
        "تراك المبيعات: اختار مدة (النهارده، آخر 7 أيام، الشهر ده…) وشوف كل صنف اتباع منه كام وجاب كام ونسبته من الإيراد.",
        "الأصناف اللي ما اتباعتش في المدة دي بتظهر لوحدها، فتعرف إيه اللي واخد مكان في المنيو من غير فايدة.",
        "مراجعة الشيفتات: كل شيفت لوحده بمين فتحه وإمتى ومدته ومبيعاته ومصاريفه وصافيه ومتوسط الأوردر والأوردرات الملغية.",
        "تقفيل الدرج: نقدية البداية + مبيعات الكاش − مصاريف الدرج، فتعرف الدرج المفروض يكون فيه كام.",
        "خدمة الدايين إن بتتحسب على أوردرات «في المحل» بس، بمبلغ ثابت أو بطريقة الحساب اللي تختارها.",
        "طباعة من المتصفح أو طابعة حرارية بلوتوث، بعرض ورق 58mm، وطباعة الفاتورة تلقائيًا.",
        "مستخدمين بصلاحيات، والنظام عربي وإنجليزي بالكامل."
      ],
      en: [
        "A point of sale built for speed: categories as tabs on top, items in one tap, and the order confirmed and printed from the same screen.",
        "No selling without a shift: the register stays locked until someone opens a shift under their name.",
        "Orders are takeaway or dine-in, paid by cash, InstaPay, mobile wallet, or card.",
        "Search any past order and log an expense right from the register, without leaving for the dashboard.",
        "A dedicated barista screen, with a preparation ticket printed automatically for every order.",
        "Full menu management: Arabic and English names, price, sort order, icon, and single/double sizes for the same item.",
        "Control each item: shown on the register, shown on the website, or both.",
        "Add-ons with their own prices (an extra espresso shot, for example), each linked to the inventory it consumes.",
        "Inventory tracked by kilo, gram, and piece, grouped into categories and linked to menu items.",
        "An alert threshold for every ingredient: the system flags what is running low and what is out, and shows the top three consumed this month.",
        "An inventory movement log: every quantity added or used is recorded.",
        "Expenses split by type — operating supplies, staff advances, bills, rent, maintenance — with today's and this month's totals in view, and a drill-down into any type.",
        "Daily and monthly reports: orders, sales, expenses, and net after expenses — tap any day to see its details.",
        "Sales tracking: pick a period (today, last 7 days, this month…) and see how many of each item sold, what it brought in, and its share of revenue.",
        "Items that did not sell in the period surface on their own, so you see what is taking space on the menu for nothing.",
        "Shift review: each shift on its own — who opened it, when, how long, its sales, expenses, net, average order, and cancelled orders.",
        "Drawer closing: opening cash plus cash sales minus drawer expenses, so you know exactly what the drawer should hold.",
        "A dine-in service charge applied to dine-in orders only, as a fixed amount or the calculation method you choose.",
        "Printing from the browser or a Bluetooth thermal printer, 58mm paper, with automatic receipt printing.",
        "Users with permissions, and the system is fully Arabic and English."
      ]
    },
    benefits: {
      ar: [
        "كل جنيه ليه صاحب: البيع مقفول من غير شيفت مفتوح باسم حد، فأي فرق في الدرج بيبقى معروف حصل في شيفت مين.",
        "تقفيل الدرج بقى حساب مش تخمين: النظام بيقولك الدرج المفروض فيه كام، فتعدّ وتقارن في دقيقة.",
        "بتعرف صافيك مش مبيعاتك بس: المصاريف بتتخصم يومي وشهري، فتشوف الكافيه كسبان فعلًا ولا لأ.",
        "البن مايخلصش فجأة في نص الشيفت: التنبيه بيوصلك قبلها، فتطلب في وقتك بدل ما تقفل صنف أو تشتري بالغالي.",
        "الهالك والسرقة بيبانوا: المخزون بيتخصم من المبيعات الفعلية، فلو الخامة خلصت أسرع من المبيعات تعرف إن فيه حاجة غلط.",
        "المنيو بيتظبط بالأرقام: تعرف الصنف اللي شايل الكافيه والصنف اللي محدش بيطلبه، فتشيل وتضيف وتسعّر على بيانات.",
        "المصاريف مابتضيعش في الورق: كل مصروف متسجل بنوعه، فتعرف فلوسك بتروح فين وتقلل اللي ينفع يتقلل.",
        "الكاشير أسرع والطابور أقصر: أوردر بضغطات قليلة وفاتورة بتطلع لوحدها، وتذكرة التحضير بتوصل للباريستا من غير زعيق.",
        "خدمة الدايين إن بتتحسب صح كل مرة، على اللي قاعد بس، من غير ما الكاشير يفتكر يضيفها.",
        "تغيّر سعر أو تضيف صنف من الشاشة ويتطبق في الكاشير فورًا — من غير مبرمج."
      ],
      en: [
        "Every pound has an owner: selling is locked without a shift opened under a name, so any drawer gap is traced to a specific shift.",
        "Closing the drawer becomes arithmetic, not guesswork: the system tells you what the drawer should hold, so you count and compare in a minute.",
        "You see net, not just sales: expenses are subtracted daily and monthly, so you know whether the café is actually profitable.",
        "Coffee never runs out mid-shift: the alert reaches you first, so you reorder on time instead of dropping an item or buying at a premium.",
        "Waste and theft show up: inventory is drawn down by actual sales, so if an ingredient depletes faster than sales explain, you know something is off.",
        "The menu is tuned by numbers: you see which items carry the café and which nobody orders, so you cut, add, and price on data.",
        "Expenses stop getting lost on paper: each one is logged by type, so you know where your money goes and what can be trimmed.",
        "A faster register and a shorter line: orders in a few taps, the receipt prints itself, and the prep ticket reaches the barista without shouting.",
        "The dine-in service charge is applied correctly every time, only to seated customers, without the cashier having to remember it.",
        "Change a price or add an item on screen and it applies at the register instantly — no developer needed."
      ]
    },
    imageGroups: [
      {
        label: { ar: "الكاشير", en: "Point of sale" },
        images: ["/projects/keyif/1.jpg"],
      },
      {
        label: { ar: "لوحة الإدارة", en: "Dashboard" },
        // 8 و 9 png (نسخ الأرقام فيها متشوّشة)
        images: Array.from({ length: 11 }, (_, i) =>
          `/projects/keyif/${i + 2}.${i + 2 === 8 || i + 2 === 9 ? "png" : "jpg"}`
        ),
      },
    ],
    websiteLink: "",
    instagramLink: "/"
  },

];

