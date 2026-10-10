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
  {
    id: "automotive",
    name: { ar: "عربيات", en: "Automotive" },
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
      ar: "نظام إدارة متكامل لأكاديمية حلاقة بثلاثة فروع، بيغطي دورة الطالب كاملة من أول ما يبقى مهتم لحد ما يتخرّج وياخد شهادة موثّقة. تسعتاشر موديول بيدير الطلاب والمجموعات والحضور بالباركود والإيصالات والمصروفات والمرتبات والشهادات والتقارير المالية. عربي بالكامل بتخطيط من اليمين لليسار، وبيتثبّت على الموبايل كتطبيق، وبحماية على طبقتين مستقلتين تخلّي الأرقام المالية محجوبة عن الموظفين على مستوى قاعدة البيانات مش الشاشة. وكورسات الأكاديمية أونلاين ليها تطبيق ومنصة مستقلين — تفاصيلهم في «Memo Online Courses — App & Platform».",
      en: "A complete management system for a three-branch barber academy, covering the student journey from first inquiry to graduation with a verified certificate. Nineteen modules handle students, groups, barcode attendance, receipts, expenses, payroll, certificates, and financial reports. Fully Arabic with a right-to-left layout, installable on mobile as an app, and protected by two independent security layers that hide financial figures from staff at the database level rather than the screen. The academy's online courses have their own app and platform — see \"Memo Online Courses — App & Platform\"."
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
    id: "memo-cosmetics-system",
    name: "Memo Cosmetics System",
    categoryId: "memo-group",
    icon: "system",
    highlights: {
      ar: ["كاشير بالباركود", "3 مستويات سعر", "إيصال حراري 80mm", "استيراد من Excel", "PWA"],
      en: ["Barcode POS", "3 price levels", "80mm thermal receipts", "Excel import", "PWA"],
    },
    thumbnail: "/projects/memo-cosmetics-system/logo.png",
    description: {
      ar: "سيستم بيع وإدارة لمحل ميمو كوزمتكس: كاشير بالباركود، وإيصالات حرارية 80mm، وتكويد الأصناف وطباعة استيكرات الباركود، ومخزون، وطلبات الموقع، والعملاء والتجار، والتقارير. كل صنف ليه تلات أسعار — تكلفة وتاجر وزبون — والفاتورة بتاخد السعر الصح حسب نوع العميل، وسعر التكلفة والربح محجوبين عن الكاشير على مستوى قاعدة البيانات. بيتثبّت كتطبيق على الموبايل والكمبيوتر، ومعمول بنفس هوية أنظمة ميمو.",
      en: "A sales and management system for the Memo Cosmetics shop: a barcode point of sale, 80mm thermal receipts, product coding with printed barcode labels, inventory, website orders, customers and traders, and reports. Every product carries three prices — cost, trader, and customer — the invoice picks the right one for the type of buyer, and cost and profit are hidden from the cashier at the database level. It installs as an app on phone and desktop, and shares the same identity as the other Memo systems."
    },
    features: {
      ar: [
        "كاشير بمسح الباركود أو البحث بالاسم والكود، وكروت أصناف متقسّمة بالتبويبات، وصوت تنبيه لو الباركود مش موجود.",
        "تلات أسعار لكل صنف: التكلفة، وسعر التاجر (الجملة)، وسعر الزبون — والفاتورة بتتحوّل لسعر التاجر لوحدها أول ما تختار عميل تاجر.",
        "خصم على الفاتورة، والمبلغ المستلم والباقي أو المتبقّي على العميل، والدفع كاش أو إنستاباي أو محفظة أو فيزا.",
        "تعديل سعر الصنف جوه الفاتورة بصلاحية بس، والتعديل بيتسجّل.",
        "إيصال حراري 80mm بيتطبع بعد الفاتورة، مع إمكانية الطباعة على طول من غير نافذة الطباعة.",
        "تكويد الأصناف وطباعة استيكرات باركود على رول 38×25مم أو ورق A4، بسعر الزبون أو التاجر أو من غير سعر، وعدد الاستيكرات ممكن يساوي المخزون.",
        "استيراد الأصناف وأسعارها ورصيدها الافتتاحي من ملف Excel.",
        "مخزون في مكان واحد: فواتير شراء، وتوريد سريع، وتالف، وجرد، وسجل لكل حركة بالكمية والرصيد بعدها.",
        "تنبيه بالأصناف اللي وصلت للحد الأدنى أو خلصت، وقيمة المخزون بالتكلفة وبسعر البيع والربح المتوقّع منه.",
        "طلبات الموقع بتوصل السيستم بتنبيه صوتي، وبتمشي بمراحل من «جديد» لحد «اتسلّم» — التأكيد بيخصم من المخزون والإلغاء بسبب بيرجّعه.",
        "إلغاء فاتورة البيع بيرجّع البضاعة للمخزون.",
        "ملف لكل عميل وتاجر بتتجمّع فيه فواتيره.",
        "تقارير بأي فترة: صافي المبيعات، والربح والهامش، وتكلفة البضاعة المباعة، ومتوسط الفاتورة، ورسم للمبيعات اليومية، وتوزيع حسب طريقة الدفع والمصدر، وأعلى 20 صنف — مع تصدير الفواتير CSV.",
        "تلات أدوار — مالك، أدمن، كاشير — وصلاحيات لكل مستخدم بتتعدّل من الإعدادات. الكاشير مايشوفش التكلفة ولا الربح، والقيود متطبّقة في قاعدة البيانات نفسها مش في الشاشة بس.",
        "سجل عمليات بيوضّح مين عمل إيه.",
        "بيانات المحل ومصاريف التوصيل والتبويبات بتتعدّل من الإعدادات.",
        "تطبيق PWA بيتثبّت على الموبايل والكمبيوتر، وصفحات الفلوس والعملاء مابتتخزّنش على الجهاز."
      ],
      en: [
        "A point of sale driven by barcode scans or search by name and code, product cards grouped into tabs, and an alert sound when a barcode is not found.",
        "Three prices per product: cost, trader (wholesale), and customer — and the invoice switches to trader pricing on its own as soon as a trader customer is selected.",
        "Invoice discount, amount received with change or balance owed, and payment by cash, InstaPay, mobile wallet, or card.",
        "Changing an item's price inside the invoice requires a permission, and the change is logged.",
        "An 80mm thermal receipt printed after the sale, with the option to print directly without the print dialog.",
        "Product coding with barcode labels printed on 38×25mm rolls or A4 sheets, showing the customer price, the trader price, or no price, with label count optionally matching stock.",
        "Products, prices, and opening stock imported from an Excel file.",
        "Inventory in a single location: purchase invoices, quick restock, damaged goods, stocktakes, and a log of every movement with quantity and resulting balance.",
        "Alerts for products at minimum level or out of stock, plus inventory value at cost and at selling price, and the expected profit in stock.",
        "Website orders arrive with a sound alert and move through stages from \"new\" to \"delivered\" — confirming deducts stock, and cancelling with a reason returns it.",
        "Cancelling a sales invoice returns the goods to stock.",
        "A file per customer and trader where their invoices accumulate.",
        "Reports over any period: net sales, profit and margin, cost of goods sold, average invoice, a daily sales chart, breakdown by payment method and source, and the top 20 products — with invoice export to CSV.",
        "Three roles — owner, admin, cashier — and per-user permissions edited from settings. Cashiers never see cost or profit, and the restrictions are enforced in the database itself, not only on screen.",
        "An activity log showing who did what.",
        "Shop details, delivery fees, and product tabs edited from settings.",
        "An installable PWA for phone and desktop, with money and customer pages never cached on the device."
      ]
    },
    benefits: {
      ar: [
        "البيع بقى بالمسح مش بالذاكرة: الكاشير مش محتاج يحفظ أسعار مئات الأصناف، والسعر بيطلع صح حسب الزبون أو التاجر.",
        "سعر الجملة مابيتدّاش بالغلط: الفاتورة بتتحوّل لسعر التاجر لما تختار تاجر بس، وأي تعديل يدوي في السعر محتاج صلاحية ومتسجّل.",
        "تكلفتك وربحك سر: الكاشير بيشتغل على السيستم كله من غير ما يشوف سعر التكلفة ولا الربح.",
        "بتعرف ربحك الحقيقي مش مبيعاتك بس: الربح محسوب على تكلفة الصنف وقت البيع.",
        "البضاعة مابتخلصش فجأة: تنبيه الحد الأدنى بيقولك تطلب إيه قبل ما يخلص.",
        "كل قطعة ليها أثر: أي توريد أو تالف أو جرد أو بيع متسجّل في حركة المخزون، فالعجز بيبان ومعروف حصل فين.",
        "استيكر الباركود بيتطبع من السيستم نفسه، فالمنتج بيتكوّد مرة واحدة وبعدها البيع كله بالمسح.",
        "المحل والموقع على مخزون واحد وأسعار واحدة، فمفيش طلب أونلاين لحاجة خلصانة في المحل.",
        "قرارات الشراء مبنية على أرقام: الأصناف الأكثر مبيعًا والإيراد حسب طريقة الدفع قدامك.",
        "بيشتغل من الموبايل أو الكمبيوتر كتطبيق، من غير برامج تتسطّب."
      ],
      en: [
        "Selling by scan, not by memory: the cashier doesn't need to remember hundreds of prices, and the right price appears for a customer or a trader.",
        "Wholesale prices aren't handed out by mistake: the invoice switches to trader pricing only when a trader is selected, and any manual price change needs a permission and is logged.",
        "Your cost and profit stay private: the cashier runs the whole system without seeing cost price or profit.",
        "You see real profit, not just sales: profit is calculated on each item's cost at the time of sale.",
        "Stock doesn't run out by surprise: the minimum-level alert tells you what to reorder before it's gone.",
        "Every piece leaves a trace: every restock, damage, stocktake, or sale is recorded as a stock movement, so shortages surface and you know where they happened.",
        "Barcode labels print from the system itself, so each product is coded once and every sale after that is a scan.",
        "The shop and the website share one stock and one price list, so nobody orders online something that's sold out in the shop.",
        "Purchasing decisions rest on numbers: best-selling products and revenue by payment method are in front of you.",
        "Runs on phone or desktop as an app, with no software to install."
      ]
    },
    websiteLink: "",
  },
  {
    id: "memo-academy-app",
    // كورسات ميمو أونلاين: تطبيق الطالب + منصة الإدارة (Memo-onlinecourses: apps/mobile + apps/admin)
    name: "Memo Online Courses — App & Platform",
    categoryId: "memo-group",
    icon: "app",
    highlights: {
      ar: ["تطبيق أندرويد وآيفون", "منصة إدارة شغّالة", "امتحانات MCQ وعملية", "شهادة بكود تحقق", "جهاز واحد لكل حساب"],
      en: ["Android & iOS app", "Live admin platform", "MCQ & practical exams", "Verifiable certificate", "One device per account"],
    },
    thumbnail: "/projects/memo-academy-app/logo.png",
    description: {
      ar: "كورسات ميمو أونلاين: تطبيق للطلبة على أندرويد وآيفون، ومنصة إدارة شغّالة بتدير الكورسات والحلقات والامتحانات وأكواد الفتح والطلبة. في التطبيق الطالب بيتعلّم الحلاقة والصبغة والشبكية والدقن بفيديوهات مترتبة خطوة بخطوة، وكل حلقة بتفتح اللي بعدها. الامتحانات اختيار من متعدد بيتصحح على السيرفر، أو عملية بصورة بيراجعها الأدمن، ولما الطالب يخلّص الكورس بياخد شهادة باسمه بكود تحقق. الكورسات بتتفتح بأكواد من الإدارة، والحساب مربوط بجهاز واحد عشان المحتوى مايتشيّرش. ومن المنصة الأكاديمية بتنزّل الكورسات وترفع الفيديوهات وتولّد الأكواد وتراجع امتحانات الصور وتتابع الطلبة وأجهزتهم.",
      en: "Memo's online courses: a student app on Android and iOS, plus a live admin platform that runs the courses, lessons, exams, unlock codes, and students. In the app, students learn cutting, colouring, fades, and beard work through step-by-step videos, with each lesson unlocking the next. Exams are either multiple choice, graded on the server, or practical with a photo reviewed by the admin, and finishing a course earns a certificate in the student's name with a verification code. Courses unlock with codes issued by the academy, each account is bound to one device so content isn't shared. From the platform, the academy publishes courses, uploads videos, generates codes, reviews photo exams, and follows students and their devices."
    },
    features: {
      ar: [
        "قائمة بالكورسات المنشورة، بتوضّح المفتوح والمقفول وتقدّم الطالب في كل كورس.",
        "كل كورس متقسّم حلقات وامتحانات، بشريط تقدّم بيوري الطالب أنجز كام من كام.",
        "مشغّل فيديو بيكمّل من آخر لحظة وقف عندها الطالب، وبيحفظ مكانه أثناء المشاهدة.",
        "تعلّم بالترتيب: الحلقة المقفولة مابتشتغلش أصلًا، والتحقق من القفل بيحصل على السيرفر مش في التطبيق.",
        "امتحانات اختيار من متعدد بتتصحح على السيرفر بنسبة نجاح محددة (60% افتراضيًا)، ومفتاح الإجابة مابيوصلش للموبايل.",
        "امتحانات عملية: الطالب بيرفع صورة شغله، والأدمن بيقبلها أو يرفضها من شاشة المراجعة.",
        "شهادة إتمام بإطار ذهبي باسم الطالب وكود تحقق، بتتصدر بس لما كل الحلقات تخلص وكل الامتحانات تنجح — وصفحة تحقق عامة بالكود.",
        "فتح الكورسات بكود من الإدارة بيتقفل على أول حساب يستخدمه، والكود الواحد ممكن يفتح باقة كورسات وممكن يبقى ليه تاريخ انتهاء.",
        "على الآيفون الكورس بيتفعّل على حساب الطالب من الإدارة مباشرة بدل الكود.",
        "الحساب مربوط بجهاز واحد؛ لو اتفتح من جهاز تاني الطالب بيشوف إن جهازه مش متسجّل، والأدمن بس اللي يفك الربط.",
        "إشعارات للطلبة لما كورس أو حلقة جديدة تنزل.",
        "منصة الكورسات أونلاين شغّالة وبتدير كل حاجة: الكورسات والحلقات ورفع الفيديو ونشرها، والامتحانات، وأكواد الفتح، والطلاب وأجهزتهم، ومراجعة امتحانات الصور، والشهادات.",
        "حساب بالإيميل مع استرجاع كلمة المرور، وصفحات الخصوصية والشروط والدعم وطلب حذف البيانات اللي المتاجر بتطلبها.",
        "التطبيق منشور على جوجل بلاي وآب ستور.",
        "عربي بالكامل من اليمين لليسار، بثيم غامق وذهبي من لوجو ميمو."
      ],
      en: [
        "A catalogue of published courses showing which are unlocked, which are locked, and the student's progress in each.",
        "Each course is split into lessons and exams, with a progress bar showing how much is done.",
        "A video player that resumes from the exact moment the student stopped, saving their position while they watch.",
        "Sequential learning: a locked lesson simply won't play, and the lock is checked on the server, not in the app.",
        "Multiple-choice exams graded on the server with a set pass mark (60% by default), and the answer key never reaches the phone.",
        "Practical exams: the student uploads a photo of their work, and the admin approves or rejects it from the review screen.",
        "A gold-framed completion certificate with the student's name and a verification code, issued only once every lesson is done and every exam passed — plus a public verification page by code.",
        "Courses unlock with a code from the academy that locks to the first account that uses it; one code can unlock a bundle of courses and can carry an expiry date.",
        "On iPhone, the course is activated on the student's account directly by the academy instead of by code.",
        "Each account is bound to one device; opening it on another device shows the student that the device isn't registered, and only the admin can release the binding.",
        "Notifications to students when a new course or lesson is published.",
        "The online courses platform is live and runs everything: courses, lessons, video upload and publishing, exams, unlock codes, students and their devices, photo-exam reviews, and certificates.",
        "Email accounts with password recovery, plus the privacy, terms, support, and data-deletion pages the app stores require.",
        "The app is published on Google Play and the App Store.",
        "Fully Arabic, right to left, in a dark and gold theme taken from the Memo logo."
      ]
    },
    benefits: {
      ar: [
        "مصدر دخل تاني من غير قاعة ولا كابتن: الكورسات المصوّرة بتتباع بكود، فبتوصل لطلاب برة فروعك ومن غير سقف لعدد المقاعد.",
        "محتواك محمي: الكود بيتقفل على حساب الطالب بعد أول استخدام، والحساب نفسه مربوط بجهاز واحد — فمينفعش كود ولا حساب يتداول بين عشرة.",
        "الامتحان قبل ما الطالب يكمّل بيضمن إنه فاهم فعلًا — فالخريج بتاعك بيطلع بمستوى، وده اللي بيحافظ على سمعة الأكاديمية.",
        "الامتحان العملي بالصورة بيخليك تحكم على شغل حقيقي مش على الحفظ، من غير ما الطالب ييجي الفرع.",
        "الطالب بيكمّل من حيث وقف في أي وقت، وشريط التقدّم بيحفّزه يخلّص — يعني نسبة إكمال أعلى وشكاوى أقل.",
        "الشهادة بكود تحقق، فأي حد يقدر يتأكد منها — وده بيدّي الكورس الأونلاين وزن قدام صاحب الشغل.",
        "أول ما تنزّل كورس جديد الطلبة بيعرفوا بإشعار، من غير ما تعتمد على بوستات وجروبات.",
        "الأكاديمية بتدير الكورسات أونلاين بنفسها من المنصة: تنزّل كورس، تولّد أكواد، تتابع الطلبة، تفك ربط جهاز، وتراجع الامتحانات — من غير مبرمج."
      ],
      en: [
        "A second revenue stream with no room and no trainer: recorded courses sell by code, reaching students beyond your branches with no cap on seats.",
        "Your content stays protected: the code locks to the student's account after first use, and the account itself is bound to one device — so neither a code nor an account can circulate among ten people.",
        "The exam gate before progressing ensures the student actually understood — your graduates leave with a real standard, which is what protects the academy's reputation.",
        "Photo-based practical exams let you judge real work rather than memorisation, without the student coming to a branch.",
        "Students resume from where they stopped at any time, and the progress bar pushes them to finish — higher completion rates and fewer complaints.",
        "The certificate carries a verification code anyone can check — which gives an online course real weight with an employer.",
        "Students learn about a new course the moment it's published through a notification, without relying on posts and groups.",
        "The academy runs its online courses itself from the platform: publish a course, generate codes, follow students, release a device, and review exams — no developer needed."
      ]
    },
    imageGroups: [
      {
        label: { ar: "تطبيق الطالب", en: "Student app" },
        images: Array.from({ length: 7 }, (_, i) => `/projects/memo-academy/app-${i + 1}.jpeg`),
      },
    ],
    // روابط المتاجر بتظهر كزراير Google Play / App Store في صفحة المشروع
    appLinks: {
      android: "https://play.google.com/store/apps/details?id=com.memo.barber",
      ios: "https://apps.apple.com/app/id6782357346",
    },
    websiteLink: "",
  },
  {
    id: "memo-customer-app",
    name: "MEMO Customer App",
    categoryId: "memo-group",
    icon: "app",
    highlights: {
      ar: ["أندرويد وآيفون", "اختيار الفرع والكابتن", "الدور لحظيًا", "نقاط ولاء"],
      en: ["Android & iOS", "Choose branch & barber", "Live queue", "Loyalty points"],
    },
    thumbnail: "/projects/memo-customer-app/logo.png",
    description: {
      ar: "تطبيق لعملاء محلات ميمو على أندرويد وآيفون باسم «MEMO — ميمو»: العميل بيختار الفرع والكابتن ويحجز دوره، ويتابع ترتيبه في الدور لحظة بلحظة من مكانه، وبيجمع نقاط ولاء على كل فاتورة. التطبيق على نفس قاعدة بيانات سيستم المحلات، فالحجز بيوصل للريسبشن والكابتن فورًا. التصفّح متاح من غير حساب، والموقع بيُستخدم بس لعرض أقرب فرع.",
      en: "An Android and iOS app for Memo barbershop customers, published as \"MEMO — ميمو\": the customer picks a branch and a barber, books a place in the queue, follows their position live from wherever they are, and earns loyalty points on every invoice. It runs on the same database as the shop system, so a booking reaches reception and the barber instantly. Browsing works without an account, and location is used only to show the nearest branch."
    },
    features: {
      ar: [
        "حجز في خطوات: اختيار الفرع، وبعده الكابتن بالاسم أو «أي كابتن» والنظام يختار الأقل ازدحامًا.",
        "حالة كل كابتن ظاهرة (متاح، مشغول، مش موجود) وبتتحدّث لحظيًا.",
        "شاشة «الدور» بترتيبك والوقت المتوقع، وبتتحدّث لوحدها من غير ما تعمل تحديث.",
        "بدون عربون — الدفع في المحل.",
        "نقاط ولاء بتتحسب تلقائيًا على الفاتورة — نقطة على كل عشرة جنيه — وظاهرة في حسابك مع سجل حجوزاتك.",
        "تقييم بالنجوم وتعليق بعد الخدمة، وبيتحسب في تقييم الكابتن.",
        "إشعارات بتحديثات الدور والحجز.",
        "تسجيل دخول برقم الموبايل، وتصفّح الفروع والكباتن كضيف من غير حساب.",
        "الموقع بيتطلب أثناء الاستخدام بس لعرض أقرب فرع، ومش بيتشارك مع أي جهة.",
        "حذف الحساب وكل بياناته من جوه التطبيق، وسياسة خصوصية منشورة — وهو منشور على جوجل بلاي وآب ستور.",
        "عربي بالكامل بهوية ميمو الأسود والذهبي."
      ],
      en: [
        "Booking in steps: choose a branch, then a barber by name or \"any barber\" and the system picks the least busy.",
        "Each barber's status (available, busy, away) is shown and updates live.",
        "A \"queue\" screen with your position and estimated time that refreshes on its own.",
        "No deposit — payment happens in the shop.",
        "Loyalty points accrue automatically on each invoice — one point per ten pounds — shown in your account alongside your booking history.",
        "Star ratings and a comment after service, feeding into the barber's rating.",
        "Notifications for queue and booking updates.",
        "Sign-in with a phone number, and guest browsing of branches and barbers without an account.",
        "Location is requested only while the app is in use, to show the nearest branch, and is not shared with anyone.",
        "Account and data deletion from inside the app, with a published privacy policy; the app is live on Google Play and the App Store.",
        "Fully Arabic in Memo's black and gold identity."
      ]
    },
    benefits: {
      ar: [
        "الريسبشن بيتفضّى من الرد على التليفون: العميل بيحجز من التطبيق بنفسه، فالموظف يرجع للكاشير وللعملاء اللي قدامه.",
        "كل حجز بيدخل النظام مظبوط من أول ثانية — مفيش نقل يدوي من الواتساب ولا حجز بينسى ولا يتكرر ومحدش مسؤول عنه.",
        "العميل مابيمشيش من الزحمة: شايف دوره لحظيًا من بيته فبييجي في وقته، والزحمة بتتوزّع لما يشوف الفرع الفاضي قبل ما يتحرك.",
        "نقاط الولاء بترجّع العميل من غير خصومات بتاكل من هامشك.",
        "التقييم بيوصلك بعد كل خدمة، فتعرف رأي العميل قبل ما يختفي.",
        "التطبيق أرخص موظف ريسبشن عندك: شغال 24 ساعة وبيدخّل البيانات صح من المصدر."
      ],
      en: [
        "Reception is freed from answering the phone: customers book themselves in the app, so staff return to the register and the people in front of them.",
        "Every booking enters the system correctly from the first second — no manual transfer from WhatsApp, no forgotten or duplicated booking with nobody accountable.",
        "Customers stop walking out over crowding: they watch their place in the queue from home and arrive on time, and crowds spread out once they can see which branch is free.",
        "Loyalty points bring customers back without discounts eating into your margin.",
        "A rating arrives after every service, so you hear the customer's opinion before they disappear.",
        "The app is the cheapest receptionist you have: it works 24 hours and enters the data correctly at the source."
      ]
    },
    imageGroups: [
      {
        label: { ar: "تطبيق العميل", en: "Customer app" },
        images: Array.from({ length: 6 }, (_, i) => `/projects/memo-barbershop/mobile-${i + 1}.jpeg`),
      },
    ],
    appLinks: {
      android: "https://play.google.com/store/apps/details?id=com.memo.customer",
      ios: "https://apps.apple.com/app/id6783862323",
    },
    websiteLink: "",
  },
  {
    id: "memo-group-website",
    name: "Memo Group Website",
    categoryId: "memo-group",
    icon: "website",
    highlights: {
      ar: ["6 أنشطة", "الفروع بالمسافة", "عربي RTL", "شغال على أي شاشة"],
      en: ["6 businesses", "Branches by distance", "Arabic RTL", "Works on any screen"],
    },
    thumbnail: "/projects/memo-group-site/logo.png",
    description: {
      ar: "الموقع الرسمي لـ MEMO Group على memobarber.com: بيعرّف بالمجموعة وأنشطتها الستة — Memo Barbershop وMemo Hair Unit وMemo Skincare وMemo Academy وMemo Cosmetics وEl Monafes — وبيحكي قصة المؤسس والرؤية والاعتمادات، وبيوصّل الزائر لأقرب فرع ولتطبيقات ميمو. الفروع والخدمات بتتقري من نفس قاعدة بيانات سيستم المحلات، فأي تعديل في الداشبورد بيظهر على الموقع.",
      en: "The official MEMO Group website at memobarber.com: it introduces the group and its six businesses — Memo Barbershop, Memo Hair Unit, Memo Skincare, Memo Academy, Memo Cosmetics, and El Monafes — tells the founder's story, vision, and accreditations, and points visitors to the nearest branch and to Memo's apps. Branches and services are read from the same database as the shop system, so any change in the dashboard shows up on the site."
    },
    features: {
      ar: [
        "صفحة رئيسية بتعرض المنظومة، والمؤسس، والحضور التشغيلي، والاعتمادات، والرؤية.",
        "صفحة لكل نشاط من الأنشطة الستة بتفاصيله وفريقه، مع تنقّل بين الأنشطة.",
        "صفحة «من نحن» بقصة المجموعة: المؤسس، الرؤية والثقافة، الجودة، القيادة والفريق، والاعتمادات.",
        "الفروع مترتبة حسب المسافة من الزائر لو سمح بموقعه، ولو رفض بتظهر من غير مسافة.",
        "صفحة لكل فرع فيها فيديوهات ومعرض صور ولينك مباشر على خرايط جوجل.",
        "صفحة خدمات متغذية من نفس قاعدة بيانات الداشبورد.",
        "دعوة لتحميل تطبيق ميمو، وصفحة روابط بتجمع التطبيقات وحسابات السوشيال في مكان واحد.",
        "صفحة QR جاهزة للطباعة بتوصّل للتطبيق والحسابات.",
        "صفحات الخصوصية والشروط وحذف الحساب اللي متاجر التطبيقات بتطلبها لتطبيق العملاء.",
        "بيانات منظّمة لمحركات البحث، وخريطة موقع، وصور مشاركة للسوشيال — عشان الموقع يظهر صح على جوجل ولما يتشيّر.",
        "عربي بالكامل من اليمين لليسار بهوية ميمو الغامقة والذهبي، وشغال على أي شاشة."
      ],
      en: [
        "A homepage presenting the ecosystem, the founder, the operational presence, accreditations, and the vision.",
        "A page for each of the six businesses with its details and team, with navigation between them.",
        "An \"About\" page with the group's story: the founder, vision and culture, quality, leadership and team, and accreditations.",
        "Branches sorted by distance from the visitor when they share their location, and listed without distance when they don't.",
        "A page per branch with videos, a photo gallery, and a direct Google Maps link.",
        "A services page fed from the same database as the dashboard.",
        "Calls to download the Memo app, and a links page gathering the apps and social accounts in one place.",
        "A print-ready QR page leading to the app and the accounts.",
        "The privacy, terms, and account-deletion pages the app stores require for the customer app.",
        "Structured data for search engines, a sitemap, and social share images — so the site shows up properly on Google and when shared.",
        "Fully Arabic, right to left, in Memo's dark and gold identity, working on any screen."
      ]
    },
    benefits: {
      ar: [
        "المجموعة بقى ليها بيت رسمي على دومين باسمها، بيعرض كل أنشطتها في مكان واحد بدل صفحات سوشيال متفرقة.",
        "الزائر بيوصل لأقرب فرع في ثواني: الفروع مترتبة بالمسافة ومعاها لينك الخرايط.",
        "الموقع بيشتغل لصالح التطبيق: كل صفحة بتدفع الزائر يحمّل تطبيق ميمو ويحجز منه.",
        "مفيش تحديث مزدوج: الفروع والخدمات بتتعدّل من الداشبورد وتظهر على الموقع لوحدها.",
        "قصة المؤسس والاعتمادات مكتوبة قدام العميل والمتدرب والشريك، وده بيبني ثقة قبل أول زيارة.",
        "متطلبات المتاجر جاهزة: صفحات الخصوصية والشروط وحذف الحساب منشورة على نفس الدومين."
      ],
      en: [
        "The group now has an official home on its own domain, showing all its businesses in one place instead of scattered social pages.",
        "Visitors reach the nearest branch in seconds: branches are sorted by distance with a map link.",
        "The site works for the app: every page pushes the visitor to download the Memo app and book from it.",
        "No double updates: branches and services are edited in the dashboard and appear on the site on their own.",
        "The founder's story and accreditations are in front of customers, trainees, and partners, building trust before the first visit.",
        "App-store requirements are covered: privacy, terms, and account-deletion pages live on the same domain."
      ]
    },
    websiteLink: "https://memobarber.com",
  },
  {
    id: "memo-cosmetics-website",
    name: "Memo Cosmetics Website",
    categoryId: "memo-group",
    icon: "website",
    highlights: {
      ar: ["متجر أونلاين", "الدفع عند الاستلام", "توصيل لكل المحافظات", "سعر المستهلك"],
      en: ["Online store", "Cash on delivery", "Delivery nationwide", "Retail prices"],
    },
    thumbnail: "/projects/memo-cosmetics-site/logo.png",
    description: {
      ar: "متجر أونلاين لميمو كوزمتكس على memocosmetic.com: كتالوج بالأقسام والبحث، وسلة، وطلب بالدفع عند الاستلام لكل المحافظات. الموقع بيعرض سعر المستهلك بس — والجملة بتتم في المحل — والطلب بيوصل على طول لسيستم المحل، ومنه بيتأكد ويتجهّز ويتشحن ويتخصم من نفس المخزون.",
      en: "An online store for Memo Cosmetics at memocosmetic.com: a catalogue with categories and search, a cart, and cash-on-delivery ordering to every governorate. The site shows the customer price only — wholesale is handled in the shop — and each order goes straight into the shop system, where it is confirmed, prepared, shipped, and deducted from the same stock."
    },
    features: {
      ar: [
        "صفحة رئيسية، ومتجر بكل المنتجات، وصفحة لكل قسم، وصفحة لكل منتج بصوره.",
        "بحث بالاسم أو الكود، وفلترة بالقسم، وترتيب بالأحدث أو بالسعر، واختيار «المتوفر بس».",
        "سلة وطلب في خطوتين — البيانات وعنوان التوصيل — من غير تسجيل حساب.",
        "الدفع كاش عند الاستلام بس، والطلب بيتأكد بمكالمة قبل الشحن.",
        "مصاريف التوصيل حسب المحافظة، ومعاها حد للتوصيل المجاني بيتحدد من السيستم.",
        "بيعرض سعر المستهلك بس؛ سعر التاجر والتكلفة مابيظهروش على الموقع.",
        "المحل بيتحكم من السيستم في المنتجات اللي بتظهر على الموقع، والمخزون واحد للمحل والموقع.",
        "التحقق من رقم الموبايل المصري قبل إرسال الطلب، وحماية من طلبات البوتات.",
        "زرار واتساب للاستفسار من أي صفحة.",
        "خريطة موقع وملف robots عشان المنتجات تظهر على جوجل."
      ],
      en: [
        "A homepage, a shop with every product, a page per category, and a page per product with its images.",
        "Search by name or code, filter by category, sort by newest or price, and an \"in stock only\" option.",
        "A cart and a two-step checkout — details and delivery address — with no account required.",
        "Cash on delivery only, with the order confirmed by phone before shipping.",
        "Delivery fees by governorate, plus a free-delivery threshold set from the system.",
        "Customer prices only; trader and cost prices never appear on the site.",
        "The shop controls from the system which products appear online, and the shop and the site share one stock.",
        "Egyptian mobile number validation before an order is sent, and protection against bot orders.",
        "A WhatsApp button for questions on every page.",
        "A sitemap and robots file so products can show up on Google."
      ]
    },
    benefits: {
      ar: [
        "المحل بقى بيبيع لكل المحافظات 24 ساعة من غير فرع تاني ولا إيجار.",
        "مفيش مخاطرة دفع أونلاين ولا عمولات بوابات دفع: الزبون بيدفع لما يستلم، والطلب بيتأكد بمكالمة قبل الشحن.",
        "أسعار الجملة محمية: الموقع بيعرض سعر الزبون بس، والتاجر بيتعامل معاك في المحل.",
        "الطلب مابيتوهش في الواتساب: بيدخل السيستم برقم، ويوصل بتنبيه صوتي، ويتتابع لحد التسليم.",
        "مفيش بيع لحاجة خلصانة: الموقع والمحل على نفس المخزون.",
        "السعر اللي تغيّره في السيستم بيتغيّر على الموقع في نفس اللحظة — من غير مبرمج."
      ],
      en: [
        "The shop now sells to every governorate around the clock, with no second branch and no rent.",
        "No online-payment risk and no gateway fees: the customer pays on delivery, and every order is confirmed by phone before shipping.",
        "Wholesale prices stay protected: the site shows the customer price only, and traders deal with you in the shop.",
        "Orders don't get lost in WhatsApp: each one enters the system with a number, arrives with a sound alert, and is tracked to delivery.",
        "Nothing sold that's out of stock: the site and the shop run on the same inventory.",
        "A price you change in the system changes on the site at the same moment — no developer needed."
      ]
    },
    websiteLink: "https://memocosmetic.com",
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

  {
    id: "dawr-sa7",
    name: "Dawr Sa7",
    categoryId: "automotive",
    icon: "system",
    highlights: {
      ar: ["سيستم + موقع", "تقرير فحص لكل عربية", "بحث بالعربي والإنجليزي", "عربي RTL"],
      en: ["System + website", "An inspection report per car", "Arabic & English search", "Arabic RTL"],
    },
    thumbnail: "/projects/dawr-sa7/logo.png",
    description: {
      ar: "«دوّر صح» وسيط لبيع وشراء العربيات المستعملة في مصر، وعملناله الحاجتين: الموقع اللي بيشوفه الزبون على dawarsah.com، والسيستم اللي بيدير منه الشغل. على الموقع الزبون بيتصفّح العربيات بالفلاتر، ويفتح صفحة كل عربية بصورها وفيديوهاتها وتقرير فحصها الفني، ويكلّم الفريق على واتساب برسالة جاهزة فيها العربية؛ واللي عايز يبيع عربيته بيقدّم طلب بالبيانات والصور. ومن الداشبورد صاحب الشغل بيضيف العربيات ويحدّث حالتها، ويتابع طلبات البيع لحد القبول أو الرفض، ويدير المستخدمين، ويشوف زيارات الموقع.",
      en: "Dawr Sa7 is a used-car brokerage in Egypt, and we built both sides of it: the public website customers see at dawarsah.com, and the system the business runs on. On the site, visitors browse cars with filters, open each car's page with its photos, videos, and technical inspection report, and reach the team on WhatsApp with a ready message naming the car; anyone selling their car submits a request with its details and photos. From the dashboard, the owner adds cars and updates their status, follows sell requests through to acceptance or rejection, manages users, and sees the site's traffic.",
    },
    features: {
      ar: [
        "الموقع: صفحة رئيسية بتشرح الخدمة وخطوات الشغل، وبتعرض العربيات المميزة وأحدث العربيات.",
        "الموقع: صفحة عربيات بفلاتر بالحالة وناقل الحركة والسنة والسعر، وترتيب بالأحدث أو السعر أو الكيلومترات أو السنة، واختيار «المتاحة بس».",
        "الموقع: بحث بيفهم اللي الناس بتكتبه فعلًا — اسم الماركة بالعربي أو بالإنجليزي، والسنة، والأرقام العربي.",
        "الموقع: صفحة لكل عربية برابط مقروء باسمها وسنتها (حتى لو الاسم عربي)، فيها معرض صور بتنزيل، وفيديوهات، وفيديو يوتيوب.",
        "الموقع: بيانات العربية كاملة — السنة، الكيلومترات، ناقل الحركة، اللون، الفئة، سعة الموتور، مكان الرخصة وانتهاؤها.",
        "الموقع: تقرير فحص فني لكل عربية — الدهان برّه وجوّه، الفتيس، المحرك، العفشة، التكييف، الإطارات وسنة إنتاج كل كاوتش لوحده — مع ملاحظات الفحص وتنويه واضح عن حدود الفحص.",
        "الموقع: شارات على العربية زي «اتفحصت من دور صح» و«بها دواخل»، وحالة واضحة: متاحة، محجوزة، اتباعت، أو غير متاحة.",
        "الموقع: العربية المحجوزة بتفضل معروضة ومتاح التواصل عليها، عشان لو الحجز اتلغى الزبون يبقى الأول في الدور.",
        "الموقع: زرار واتساب برسالة جاهزة فيها موديل العربية وسنتها، ورقم للشراء ورقم للبيع، وبار ثابت تحت على الموبايل، وزرار نسخ لينك العربية.",
        "الموقع: صفحة «بيع عربيتك» يقدّم منها صاحب العربية طلب ببياناته وبيانات العربية وصورها، والصور بتتضغط قبل الرفع.",
        "الموقع: معاينة لينك بصورة العربية لما يتشيّر على واتساب وفيسبوك، وعناوين ووصف لمحركات البحث في كل صفحة.",
        "السيستم: نظرة عامة بإجمالي العربيات والمتاحة والمحجوزة واللي اتباعت والطلبات المعلّقة.",
        "السيستم: إضافة وتعديل العربيات — اختيار الماركة من قايمة بلوجوهاتها، والموديل، والسعر، والحالة، وعلامة «مميزة»، والصور والفيديوهات، ولينك يوتيوب، وتقرير الفحص كله.",
        "السيستم: سنين إنتاج الإطارات الأربعة مع زرار «طبّق على الكل» لو كلهم نفس السنة.",
        "السيستم: حذف العربية بيمسح صورها من التخزين كمان.",
        "السيستم: طلبات البيع بحالاتها — معلّق، تمت المراجعة، مقبول، مرفوض — مع بحث بالاسم أو الموبايل أو الموديل، وصفحة لكل طلب بصوره وبياناته.",
        "السيستم: مستخدمين بأدوار — مشرف بيضيف ويعدّل العربيات ويشوف الطلبات، ومشرف أعلى بصلاحيات كاملة.",
        "السيستم: تحليلات للمشرف الأعلى — زيارات وزوار النهارده وآخر ٧ أيام، ورسم للزيارات اليومية، وأكتر الصفحات زيارة — من غير ما زيارات الداشبورد نفسها تتحسب.",
        "عربي بالكامل من اليمين لليسار، وشغال على أي شاشة.",
      ],
      en: [
        "Website: a homepage explaining the service and how it works, showing featured and latest cars.",
        "Website: a cars page with filters by status, transmission, year, and price, sorting by newest, price, mileage, or year, and an \"available only\" option.",
        "Website: search that understands what people actually type — brand names in Arabic or English, the year, and Arabic digits.",
        "Website: a page per car with a readable link built from its name and year (even Arabic names), a photo gallery with downloads, videos, and a YouTube video.",
        "Website: full car details — year, mileage, transmission, color, trim level, engine size, licence location and expiry.",
        "Website: a technical inspection report per car — exterior and interior paint, gearbox, engine, suspension, A/C, tyres, and the production year of each tyre — with inspection notes and a clear disclaimer on the inspection's limits.",
        "Website: badges such as \"Inspected by Dawr Sa7\" and \"Has interior\", and a clear status: available, reserved, sold, or unavailable.",
        "Website: a reserved car stays listed and contactable, so if the reservation falls through the customer is first in line.",
        "Website: a WhatsApp button with a ready message naming the car's model and year, separate buy and sell numbers, a sticky bar on mobile, and a copy-link button.",
        "Website: a \"Sell your car\" page where owners submit their details, the car's details, and photos — compressed before upload.",
        "Website: link previews with the car's photo when shared on WhatsApp and Facebook, and titles and descriptions for search engines on every page.",
        "System: an overview with total cars, available, reserved, sold, and pending requests.",
        "System: adding and editing cars — brand picked from a list with logos, model, price, status, a \"featured\" flag, photos and videos, a YouTube link, and the full inspection report.",
        "System: the four tyres' production years, with an \"apply to all\" button when they match.",
        "System: deleting a car also removes its photos from storage.",
        "System: sell requests with statuses — pending, reviewed, accepted, rejected — searchable by name, mobile, or model, with a page per request showing its photos and details.",
        "System: users with roles — admins add and edit cars and see requests, super admins have full control.",
        "System: analytics for the super admin — today's and last 7 days' visits and visitors, a daily visits chart, and the most visited pages — with dashboard visits left out of the count.",
        "Fully Arabic, right to left, working on any screen.",
      ],
    },
    benefits: {
      ar: [
        "البيزنس بقى ليه موقع باسمه بيشتغل 24 ساعة بدل ما العربيات تتعرض في بوستات وجروبات وتضيع.",
        "الزبون بيعرف حالة العربية قبل ما يتحرّك: الصور والفيديو وتقرير الفحص قدامه، فالمعاينة بتبقى للجادين بس.",
        "المصداقية مكتوبة مش كلام: كل عربية بفحصها وملاحظاتها وتنويه واضح، وده بالظبط اللي «دوّر صح» قايم عليه.",
        "التواصل أسرع ومنظّم: رسالة الواتساب بتوصل فيها العربية اللي الزبون عايزها، والشراء والبيع كل واحد على رقمه.",
        "عربيات البيع بتيجي لوحدها: صاحب العربية بيقدّم طلبه بالصور، والطلب بيتتابع في السيستم لحد القرار بدل ما يتوه في الشات.",
        "تحديث واحد بيظهر في كل مكان: تغيّر سعر أو حالة عربية من الداشبورد يظهر على الموقع، من غير مبرمج.",
        "العربية المحجوزة مابتضيعش زبون: بتفضل معروضة، ولو الحجز اتلغى فيه حد مستني.",
        "اللينك اللي بيتشيّر بيبيع: بيظهر بصورة العربية واسمها، والصفحات متجهّزة لجوجل عشان اللي بيدوّر على عربية مستعملة يلاقيك.",
        "بتعرف الموقع شغال ولا لأ: أرقام الزيارات وأكتر الصفحات طلبًا قدامك في الداشبورد.",
      ],
      en: [
        "The business now has a website under its own name working around the clock, instead of cars posted in groups and lost in feeds.",
        "Customers know a car's condition before they move: photos, video, and the inspection report are in front of them, so viewings are for serious buyers only.",
        "Credibility is written down, not just said: every car comes with its inspection, notes, and a clear disclaimer — exactly what Dawr Sa7 is built on.",
        "Faster, organised contact: the WhatsApp message arrives naming the car the customer wants, and buying and selling each have their own number.",
        "Cars to sell come in on their own: owners submit requests with photos, and each request is tracked in the system to a decision instead of getting lost in chat.",
        "One update shows everywhere: change a car's price or status in the dashboard and it appears on the site — no developer needed.",
        "A reserved car doesn't lose a buyer: it stays listed, and if the reservation falls through someone is already waiting.",
        "Shared links sell: they show the car's photo and name, and pages are ready for Google so people searching for a used car can find you.",
        "You know whether the site is working: visit numbers and the most requested pages are right there in the dashboard.",
      ],
    },
    websiteLink: "https://www.dawarsah.com/",
  },
];
