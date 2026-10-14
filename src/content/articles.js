// مقالات المدونة — ملفات محلية (من غير قاعدة بيانات). مقال لكل سيستم، عربي وإنجليزي بنفس الـslug.
// قاعدة الأمانة: ممنوع أي معلومة عن منافس بالاسم (أسعار/مميزات/تقييمات). المقالات أدلة شراء:
// معايير الاختيار + أنواع الحلول بشكل عام + تميز كخيار بمميزاته الحقيقية (من src/content/systems.js).
// جسم المقال بيتبني في src/lib/articles.js من الحقول دي، فالـHTML والماركداون دايمًا متطابقين.
//
// لإضافة مقال: ضيف object هنا بنفس الشكل (slug فريد، system = slug سيستم من systems.js أو null)،
// والصفحة والـsitemap والـfeed و llms.txt بيلقطوه لوحدهم. التفاصيل في docs/SEO.md.

export const articles = [
  {
    slug: "best-cafe-pos-system-egypt",
    system: "cafe-pos-system",
    date: "2026-10-14",
    updated: "2026-10-14",
    title: {
      ar: "أفضل برامج إدارة الكافيهات في مصر 2026: إزاي تختار؟",
      en: "Best Café Management Software in Egypt 2026: How to Choose",
    },
    description: {
      ar: "دليل اختيار سيستم كاشير وإدارة كافيه في مصر 2026: معايير الاختيار في جدول، أنواع الحلول المتاحة، أسئلة تسألها قبل ما تشتري، وتميز كافيه كخيار مصري بديمو مجاني.",
      en: "A 2026 buyer's guide to café POS and management software in Egypt: selection criteria in a table, the types of solutions on the market, questions to ask before buying, and Tamyaz Cafe as a local option with a free demo.",
    },
    keywords: {
      ar: ["سيستم كاشير كافيه", "برنامج إدارة كافيه", "سيستم كافيهات مصر", "كاشير كوفي شوب"],
      en: ["cafe POS Egypt", "cafe management software", "coffee shop POS", "cafe cashier system"],
    },
    answer: {
      ar: "أفضل برنامج إدارة كافيه في مصر هو اللي بيجمع الكاشير السريع والطاولات والطلبات المفتوحة والمخزون بمكونات كل منتج والشيفتات والخزنة والتقارير في سيستم واحد بالعربي، بيفتح من الموبايل، وتقدر تجربه قبل ما تدفع. تميز كافيه خيار مصري بيغطي ده كله وديمو مجاني من غير تسجيل.",
      en: "The best café management software in Egypt combines a fast cashier, tables and open orders, ingredient-level inventory, shifts, the cash drawer and reports in one Arabic system that opens on mobile and that you can try before paying. Tamyaz Cafe is a local option that covers all of that, with a free demo and no sign-up.",
    },
    context: {
      ar: "الكافيه بيخسر فلوس في تفاصيل صغيرة: خامات بتخلص من غير ما حد ياخد باله، شيفت بيتقفل من غير ما مبيعاته تتطابق مع الخزنة، وطلبات طاولات بتتلخبط وقت الزحمة. السيستم الصح بيقفل الأبواب دي، وبيخليك تتابع الكافيه من موبايلك حتى لو مش موجود.",
      en: "Cafés lose money in small details: supplies running out unnoticed, a shift closing without its sales matching the drawer, and table orders getting mixed up during the rush. The right system closes those gaps and lets you follow the café from your phone even when you are not there.",
    },
    criteria: {
      ar: [
        ["سرعة الكاشير", "وقت الزحمة كل ثانية بتفرق في الطابور", "اطلب تشوف عملية بيع كاملة في الديمو"],
        ["الطاولات والطلبات المفتوحة", "الصالة محتاجة طلب مفتوح لكل طاولة لحد الحساب", "هل أقدر أفتح طلب لطاولة وأزوّد عليه؟"],
        ["المخزون بمكونات المنتج", "المشروب الواحد بيستهلك كذا خامة", "هل المخزون بيتخصم من المكونات مع كل بيعة؟"],
        ["الشيفتات والخزنة", "عشان تعرف كل شيفت باع كام ومين المسؤول", "هل كل شيفت بيتقفل بمبيعاته؟"],
        ["التقارير من الموبايل", "عشان تتابع من غير ما تكون في المكان", "أقدر أشوف تقرير اليوم من موبايلي؟"],
        ["العربي والدعم المحلي", "الموظفين لازم يفهموا الشاشة بسرعة", "السيستم بالعربي؟ والدعم بيرد إزاي؟"],
        ["ديمو قبل الشراء", "عشان تحكم بنفسك مش من الكلام", "فيه ديمو أجربه من غير تسجيل؟"],
      ],
      en: [
        ["Cashier speed", "Every second counts in the rush-hour queue", "Ask to see a full sale in the demo"],
        ["Tables and open orders", "Seating needs an open order per table until the bill", "Can I open a table order and add to it?"],
        ["Ingredient-level inventory", "One drink consumes several supplies", "Is stock drawn down by ingredients with each sale?"],
        ["Shifts and cash drawer", "To know what each shift sold and who is accountable", "Does every shift close with its own sales?"],
        ["Reports on mobile", "To follow the café without being there", "Can I see today's report on my phone?"],
        ["Arabic and local support", "Staff must understand the screen quickly", "Is it in Arabic? How does support respond?"],
        ["Demo before buying", "So you judge for yourself", "Is there a demo I can try without signing up?"],
      ],
    },
    faq: {
      ar: [
        { q: "إيه أهم ميزة في سيستم الكافيه؟", a: "ربط الكاشير بالمخزون بمكونات المنتجات وبالشيفتات والخزنة؛ ده اللي بيقفل أكبر أبواب الخسارة في الكافيه." },
        { q: "هل Excel يكفي لإدارة كافيه؟", a: "ممكن يكفي في البداية، لكنه مش مربوط بالكاشير ولا بيخصم المخزون أوتوماتيك ولا بيقفل الشيفتات، فالأخطاء اليدوية بتزيد مع الزحمة." },
        { q: "سيستم الكافيه بيتكلف كام؟", a: "بيختلف حسب الشركة والمميزات وعدد الفروع. في تميز الباقات تبدأ من 1500 جنيه شهرياً وبتزيد حسب عدد الفروع، وبنبعت عرض سعر بعد ما نفهم شغلك." },
        { q: "أقدر أجرب تميز كافيه؟", a: "أيوه، الديمو متاح من غير تسجيل على demo.cafe.tamyaz.online." },
      ],
      en: [
        { q: "What is the most important feature in café software?", a: "Linking the cashier to ingredient-level inventory, shifts and the cash drawer — that closes the biggest sources of loss in a café." },
        { q: "Is Excel enough to run a café?", a: "It can work at the very start, but it is not linked to the cashier, does not deduct stock automatically and does not close shifts, so manual errors grow with the rush." },
        { q: "How much does café software cost?", a: "It varies by vendor, features and number of branches. At Tamyaz, plans start from EGP 1,500/month and scale with the number of branches and we send a quote after learning how you work." },
        { q: "Can I try Tamyaz Cafe?", a: "Yes, the demo is open with no sign-up at demo.cafe.tamyaz.online." },
      ],
    },
  },
  {
    slug: "best-restaurant-management-system-egypt",
    system: "restaurant-system",
    date: "2026-10-14",
    updated: "2026-10-14",
    title: {
      ar: "أفضل سيستم مطاعم في مصر 2026: دليل اختيار سيستم الكاشير والمطبخ والدليفري",
      en: "Best Restaurant System in Egypt 2026: Choosing POS, Kitchen and Delivery Software",
    },
    description: {
      ar: "إزاي تختار سيستم إدارة مطعم في مصر 2026: معايير الاختيار (منيو QR، طلبات المطبخ، الدليفري، الفروع، التقارير) في جدول، أنواع الحلول، وتميز ريستورانت كخيار بديمو مجاني.",
      en: "How to choose a restaurant management system in Egypt in 2026: selection criteria (QR menu, kitchen orders, delivery, branches, reports) in a table, the types of solutions, and Tamyaz Resto as an option with a free demo.",
    },
    keywords: {
      ar: ["سيستم مطاعم", "برنامج إدارة مطاعم", "سيستم كاشير مطعم", "منيو QR"],
      en: ["restaurant system Egypt", "restaurant POS", "restaurant management software", "QR menu"],
    },
    answer: {
      ar: "أفضل سيستم مطاعم في مصر هو اللي بيربط الكاشير بالمطبخ أول بأول، وبيدير الصالة والتيك أواي والدليفري والفروع، وفيه منيو QR وتقارير بالأصناف الأكثر طلبًا، بالعربي. تميز ريستورانت بيغطي ده، وتقدر تجرّب الديمو مجانًا قبل ما تقرر.",
      en: "The best restaurant system in Egypt links the cashier to the kitchen in real time, runs dine-in, takeaway, delivery and branches, and offers a QR menu and best-seller reports, in Arabic. Tamyaz Resto covers that, and you can try the demo for free before deciding.",
    },
    context: {
      ar: "المطعم فيه تلات أماكن لازم يتكلموا مع بعض: الكاشير والمطبخ والدليفري. أي تأخير في وصول الطلب للمطبخ أو لخبطة بين طلب صالة وطلب دليفري بتتحول لزبون زعلان. ولو عندك أكتر من فرع، محتاج تشوف الكل من مكان واحد.",
      en: "A restaurant has three places that must talk to each other: the cashier, the kitchen and delivery. Any delay getting an order to the kitchen, or a mix-up between a dine-in and a delivery order, becomes an unhappy customer. With more than one branch, you need to see everything from one place.",
    },
    criteria: {
      ar: [
        ["الطلب يوصل المطبخ فورًا", "التأخير بيبوّظ تجربة الزبون", "الطلب بيظهر للمطبخ إزاي وإمتى؟"],
        ["صالة وتيك أواي ودليفري", "كل نوع طلب ليه مسار مختلف", "الأنواع التلاتة في نفس السيستم؟"],
        ["منيو QR", "الزبون يشوف المنيو من موبايله", "فيه منيو QR جاهز؟"],
        ["الفروع والكاشير", "سلاسل المطاعم محتاجة رؤية موحدة", "أقدر أدير أكتر من فرع من حساب واحد؟"],
        ["تقارير الأصناف", "عشان تعرف إيه اللي بيكسب وإيه اللي لازم يتشال", "فيه تقرير بالأصناف الأكثر طلبًا؟"],
        ["العربي والموبايل", "الإدارة بتحصل من أي مكان", "السيستم بالعربي وبيفتح من الموبايل؟"],
      ],
      en: [
        ["Orders reach the kitchen instantly", "Delays ruin the guest experience", "How and when does an order appear in the kitchen?"],
        ["Dine-in, takeaway and delivery", "Each order type follows a different path", "Are all three in the same system?"],
        ["QR menu", "Guests see the menu on their phones", "Is a QR menu included?"],
        ["Branches and cashiers", "Chains need a unified view", "Can I run several branches from one account?"],
        ["Item reports", "To know what earns and what to drop", "Is there a best-selling items report?"],
        ["Arabic and mobile", "Management happens from anywhere", "Is it in Arabic and does it open on mobile?"],
      ],
    },
    faq: {
      ar: [
        { q: "إيه الفرق بين سيستم كاشير عادي وسيستم مطاعم؟", a: "سيستم المطاعم بيربط الكاشير بالمطبخ ويفرّق بين الصالة والتيك أواي والدليفري، وبيدير الفروع؛ الكاشير العادي بيسجّل البيعة بس." },
        { q: "هل منيو QR بيغني عن المنيو الورق؟", a: "بيسهّل على الزبون يشوف المنيو من موبايله، ومعظم المطاعم بتستخدم الاتنين حسب طبيعة الصالة." },
        { q: "سيستم المطاعم بيتكلف كام؟", a: "بيختلف حسب الشركة وعدد الفروع والمميزات. في تميز الباقات تبدأ من 1500 جنيه شهرياً وبتزيد حسب عدد الفروع، كلمنا ونبعتلك عرض سعر." },
        { q: "أقدر أجرب تميز ريستورانت؟", a: "أيوه، الديمو متاح من غير تسجيل على demo.resto.tamyaz.online." },
      ],
      en: [
        { q: "What is the difference between a basic POS and a restaurant system?", a: "A restaurant system links the cashier to the kitchen, separates dine-in, takeaway and delivery, and manages branches; a basic POS only records the sale." },
        { q: "Does a QR menu replace the printed menu?", a: "It makes it easy for guests to see the menu on their phones; most restaurants use both depending on their dining room." },
        { q: "How much does a restaurant system cost?", a: "It varies by vendor, number of branches and features. At Tamyaz, plans start from EGP 1,500/month and scale with the number of branches — contact us for a quote." },
        { q: "Can I try Tamyaz Resto?", a: "Yes, the demo is open with no sign-up at demo.resto.tamyaz.online." },
      ],
    },
  },
  {
    slug: "best-barbershop-booking-system-egypt",
    system: "barber-booking-system",
    date: "2026-10-14",
    updated: "2026-10-14",
    title: {
      ar: "أفضل سيستم حجز باربر شوب وصالونات في مصر 2026: إزاي تختار؟",
      en: "Best Barbershop Booking System in Egypt 2026: How to Choose",
    },
    description: {
      ar: "دليل اختيار سيستم حجز وإدارة باربر شوب في مصر 2026: الحجوزات ومواعيد الكباتن، العمولات، الخزنة، التقارير، والفروع — في جدول معايير، مع تميز باربر الشغال في أكتر من 8 فروع.",
      en: "A 2026 guide to choosing a barbershop booking and management system in Egypt: bookings and barber schedules, commissions, cash drawer, reports and branches — in a criteria table, with Tamyaz Barber, running in 8+ branches.",
    },
    keywords: {
      ar: ["سيستم حجز باربر", "برنامج إدارة صالون", "سيستم باربر شوب", "عمولات الكباتن"],
      en: ["barbershop booking system", "barber software Egypt", "salon management system", "barber commissions"],
    },
    answer: {
      ar: "أفضل سيستم حجز باربر في مصر هو اللي بيربط الحجوزات بمواعيد الكباتن، ويحسب العمولات والشيفتات، ويتابع الخزنة والمصاريف، ويطلع تقارير بالساعة، ويشتغل مع أكتر من فرع. تميز باربر بيعمل ده وشغال حاليًا في أكتر من 8 فروع، والديمو مجاني.",
      en: "The best barbershop booking system in Egypt ties bookings to barber schedules, calculates commissions and shifts, follows the cash drawer and expenses, produces hourly reports and works across branches. Tamyaz Barber does that and currently runs in 8+ branches, with a free demo.",
    },
    context: {
      ar: "في الباربر شوب الفلوس بتتحرك بسرعة: كباتن بعمولات مختلفة، زباين بحجز وزباين من غير حجز، وخزنة بتتفتح وتتقفل كل شيفت. من غير سيستم، حساب العمولات آخر الشهر بيبقى خناقة، وصاحب المحل مايعرفش الساعات الزحمة إمتى.",
      en: "In a barbershop money moves fast: barbers on different commissions, booked and walk-in customers, and a drawer that opens and closes every shift. Without a system, month-end commissions become an argument, and the owner never knows which hours are busiest.",
    },
    criteria: {
      ar: [
        ["الحجز مربوط بالكابتن", "عشان مايحصلش تعارض مواعيد", "الحجز بيتسجل على كابتن وميعاد محدد؟"],
        ["العمولات والشيفتات", "حساب الكباتن لازم يكون واضح ومتفق عليه", "السيستم بيحسب عمولة كل كابتن؟"],
        ["الخدمات والأسعار", "الأسعار بتتغير ولازم تتعدل بسهولة", "أقدر أعدّل الأسعار من الشاشة؟"],
        ["الخزنة والمصاريف", "عشان الداخل والخارج يبقى متسجل", "فيه تقفيل خزنة ومصاريف؟"],
        ["تقارير بالساعة", "تعرف الزحمة إمتى وتوزع الكباتن", "فيه تقرير يومي بالساعة؟"],
        ["الفروع", "السلاسل محتاجة رؤية موحدة", "السيستم شغال في كام فرع فعلًا؟"],
      ],
      en: [
        ["Bookings tied to a barber", "Avoids clashing appointments", "Is each booking tied to a barber and time slot?"],
        ["Commissions and shifts", "Barber pay must be clear and agreed", "Does the system calculate each barber's commission?"],
        ["Services and prices", "Prices change and must be easy to edit", "Can I edit prices from the screen?"],
        ["Cash drawer and expenses", "So money in and out is on record", "Is there a drawer close and expenses?"],
        ["Hourly reports", "Know the busy hours and staff accordingly", "Is there an hourly daily report?"],
        ["Branches", "Chains need a unified view", "How many branches actually run on it?"],
      ],
    },
    faq: {
      ar: [
        { q: "هل سيستم الحجز بينفع للصالونات الحريمي كمان؟", a: "تميز باربر معمول للباربر شوب والصالونات؛ لو صالونك ليه طريقة شغل مختلفة بنعدّل السيستم على مقاسه." },
        { q: "إزاي أحسب عمولات الكباتن صح؟", a: "لازم كل خدمة تتسجل على الكابتن اللي عملها؛ السيستم بعد كده بيحسب العمولة والشيفت من غير حساب يدوي." },
        { q: "كام فرع شغال على تميز باربر؟", a: "تميز باربر شغال حاليًا في أكتر من 8 فروع." },
        { q: "أقدر أجرب تميز باربر؟", a: "أيوه، الديمو متاح من غير تسجيل على demo.barber.tamyaz.online." },
      ],
      en: [
        { q: "Does the booking system work for salons too?", a: "Tamyaz Barber is built for barbershops and salons; if your salon works differently we tailor the system to it." },
        { q: "How do I calculate barber commissions correctly?", a: "Every service must be recorded against the barber who did it; the system then calculates commission and shift totals with no manual math." },
        { q: "How many branches run on Tamyaz Barber?", a: "Tamyaz Barber currently runs in 8+ branches." },
        { q: "Can I try Tamyaz Barber?", a: "Yes, the demo is open with no sign-up at demo.barber.tamyaz.online." },
      ],
    },
  },
  {
    slug: "best-clinic-management-software-egypt",
    system: "clinic-management-system",
    date: "2026-10-14",
    updated: "2026-10-14",
    title: {
      ar: "أفضل برنامج إدارة عيادات في مصر 2026: دليل اختيار شامل",
      en: "Best Clinic Management Software in Egypt 2026: A Complete Buyer's Guide",
    },
    description: {
      ar: "إزاي تختار برنامج إدارة عيادة أو مركز طبي في مصر 2026: المواعيد، ملف المريض، الفواتير والباقات، حضور الفريق، والحجز أونلاين — في جدول معايير، مع تميز كلينك وديمو مجاني.",
      en: "How to choose clinic or medical center management software in Egypt in 2026: appointments, patient files, invoices and packages, staff attendance and online booking — in a criteria table, with Tamyaz Clinic and a free demo.",
    },
    keywords: {
      ar: ["برنامج إدارة عيادات", "سيستم عيادات", "برنامج مواعيد عيادة", "ملف المريض"],
      en: ["clinic management software Egypt", "clinic system", "medical center software", "patient records"],
    },
    answer: {
      ar: "أفضل برنامج إدارة عيادات في مصر هو اللي بيجمع المواعيد والاستقبال وملف المريض والجلسات والفواتير والباقات وحضور الفريق والرواتب في مكان واحد بالعربي، ويفتح من الموبايل. تميز كلينك بيعمل ده وكمان بيدّي العيادة موقع بيستقبل طلبات حجز أونلاين، والديمو مجاني.",
      en: "The best clinic management software in Egypt brings appointments, reception, patient files and sessions, invoices and packages, and staff attendance and payroll together in one Arabic system that opens on mobile. Tamyaz Clinic does that and also gives the clinic a website that receives online booking requests, with a free demo.",
    },
    context: {
      ar: "العيادة بتتعامل مع مواعيد ومرضى وفلوس وفريق في نفس الوقت. الدفتر والواتساب بيكفوا لحد ما المواعيد تتلخبط أو ملف مريض يضيع أو حساب باقة جلسات يتنسي. البرنامج الصح بيخلي كل ده في ملف واحد.",
      en: "A clinic juggles appointments, patients, money and staff at once. A notebook and WhatsApp work until appointments clash, a patient file goes missing, or a session package is forgotten. The right software keeps all of it in one place.",
    },
    criteria: {
      ar: [
        ["المواعيد والاستقبال", "أول نقطة احتكاك مع المريض", "الاستقبال بيشوف جدول المواعيد إزاي؟"],
        ["ملف المريض والجلسات", "تاريخ المريض لازم يبقى قدام الدكتور", "فيه ملف مريض بالجلسات؟"],
        ["الفواتير والباقات", "مراكز كتير بتبيع باقات جلسات", "أقدر أعمل عرض سعر وباقة وفاتورة؟"],
        ["حضور الفريق والرواتب", "عشان الحسابات تبقى في مكان واحد", "فيه حضور ورواتب للفريق؟"],
        ["الحجز أونلاين", "المرضى بيدوروا ويحجزوا من الموبايل", "فيه موقع أو صفحة حجز للعيادة؟"],
        ["العربي والموبايل", "الدكتور بيتابع من بره العيادة", "البرنامج بالعربي ويفتح من الموبايل؟"],
      ],
      en: [
        ["Appointments and front desk", "The first point of contact with patients", "How does reception see the schedule?"],
        ["Patient files and sessions", "The patient's history must be in front of the doctor", "Is there a patient file with sessions?"],
        ["Invoices and packages", "Many centers sell session packages", "Can I issue a quote, a package and an invoice?"],
        ["Staff attendance and payroll", "So the accounts live in one place", "Is staff attendance and payroll included?"],
        ["Online booking", "Patients search and book from their phones", "Is there a clinic website or booking page?"],
        ["Arabic and mobile", "Doctors follow up from outside the clinic", "Is it in Arabic and does it open on mobile?"],
      ],
    },
    faq: {
      ar: [
        { q: "إيه الفرق بين برنامج عيادات عام وبرنامج عيادة أسنان؟", a: "عيادات الأسنان شغالة بخطط علاج على كذا جلسة وتقسيط، فمحتاجة برنامج معمول لده زي تميز دنتال؛ برنامج العيادات العام مناسب للعيادات والمراكز الطبية التانية." },
        { q: "هل المرضى يقدروا يحجزوا أونلاين؟", a: "في تميز كلينك أيوه: العيادة بتاخد موقع بيستقبل طلبات الحجز أونلاين." },
        { q: "برنامج العيادة بيتكلف كام؟", a: "بيختلف حسب الشركة والمميزات. في تميز الباقات تبدأ من 1500 جنيه شهرياً وبتزيد حسب عدد الفروع، وبنبعت عرض سعر." },
        { q: "أقدر أجرب تميز كلينك؟", a: "أيوه، الديمو متاح من غير تسجيل على demo.clinc.tamyaz.online." },
      ],
      en: [
        { q: "What is the difference between general clinic software and dental software?", a: "Dental clinics work with multi-session treatment plans and installments, so they need software built for that, like Tamyaz Dental; general clinic software suits other clinics and medical centers." },
        { q: "Can patients book online?", a: "With Tamyaz Clinic, yes: the clinic gets a website that receives online booking requests." },
        { q: "How much does clinic software cost?", a: "It varies by vendor and features. At Tamyaz, plans start from EGP 1,500/month and scale with the number of branches and we send a quote." },
        { q: "Can I try Tamyaz Clinic?", a: "Yes, the demo is open with no sign-up at demo.clinc.tamyaz.online." },
      ],
    },
  },
];

articles.push(
  {
    slug: "best-dental-clinic-software-egypt",
    system: "dental-clinic-system",
    date: "2026-10-14",
    updated: "2026-10-14",
    title: {
      ar: "أفضل برنامج عيادة أسنان في مصر 2026: إزاي تختار؟",
      en: "Best Dental Clinic Software in Egypt 2026: How to Choose",
    },
    description: {
      ar: "دليل اختيار برنامج إدارة عيادة أسنان في مصر 2026: المواعيد، خطة العلاج، الفواتير والتقسيط، المصروفات والتقارير — في جدول معايير، مع تميز دنتال وديمو مجاني.",
      en: "A 2026 guide to choosing dental clinic software in Egypt: appointments, treatment plans, invoices and installments, expenses and reports — in a criteria table, with Tamyaz Dental and a free demo.",
    },
    keywords: {
      ar: ["برنامج عيادة أسنان", "سيستم عيادة أسنان", "خطة علاج الأسنان", "تقسيط علاج الأسنان"],
      en: ["dental clinic software Egypt", "dental practice management", "treatment plan software", "dental installments"],
    },
    answer: {
      ar: "أفضل برنامج عيادة أسنان في مصر هو اللي معمول لخطط العلاج مش برنامج عيادات عام: مواعيد العيادة، وملف المريض بخطة العلاج، والفواتير والتقسيط، والمصروفات والتقارير، بالعربي وعلى الموبايل. تميز دنتال معمول لده بالظبط، والديمو متاح مجانًا من غير تسجيل.",
      en: "The best dental clinic software in Egypt is built for treatment plans rather than being a generic clinic tool: clinic appointments, patient files with treatment plans, invoices and installments, and expenses and reports, in Arabic and on mobile. Tamyaz Dental is built for exactly that, with a free demo and no sign-up.",
    },
    context: {
      ar: "علاج الأسنان نادرًا ما بيخلص في زيارة واحدة: خطة علاج على كذا جلسة، ومريض بيدفع على أقساط، ومصروفات خامات ومعامل. لو الخطة والأقساط متسجلين في ورق، بيضيع مين دفع إيه وفاضل كام جلسة.",
      en: "Dental treatment rarely ends in one visit: a plan spans several sessions, patients pay in installments, and there are materials and lab expenses. If plans and installments live on paper, you lose track of who paid what and how many sessions remain.",
    },
    criteria: {
      ar: [
        ["خطة العلاج جوه ملف المريض", "عشان الدكتور يعرف الخطوة الجاية", "فيه خطة علاج مربوطة بالمريض؟"],
        ["التقسيط", "مرضى كتير بيدفعوا على دفعات", "السيستم بيتابع الأقساط والمتبقي؟"],
        ["المواعيد", "الجلسات المتتابعة محتاجة جدول منظم", "أقدر أحجز الجلسة الجاية من ملف المريض؟"],
        ["المصروفات", "خامات ومعامل بتأثر على الربح", "فيه تسجيل مصروفات؟"],
        ["التقارير", "تعرف دخل العيادة الحقيقي", "فيه تقارير للدخل والمصروفات؟"],
        ["العربي والموبايل", "الطاقم والدكتور يستخدموه بسهولة", "بالعربي ويفتح من الموبايل؟"],
      ],
      en: [
        ["Treatment plan inside the patient file", "So the dentist knows the next step", "Is there a treatment plan tied to the patient?"],
        ["Installments", "Many patients pay in stages", "Does it track installments and balances?"],
        ["Appointments", "Follow-up sessions need an organized schedule", "Can I book the next session from the patient file?"],
        ["Expenses", "Materials and labs affect profit", "Can I record expenses?"],
        ["Reports", "Know the clinic's real income", "Are there income and expense reports?"],
        ["Arabic and mobile", "Staff and dentist use it easily", "Is it in Arabic and on mobile?"],
      ],
    },
    faq: {
      ar: [
        { q: "هل ينفع أستخدم برنامج عيادات عام لعيادة أسنان؟", a: "ممكن، بس هتفتقد خطة العلاج والتقسيط اللي هما قلب شغل عيادة الأسنان؛ عشان كده تميز دنتال معمول مخصوص لعيادات الأسنان." },
        { q: "إزاي أتابع أقساط المرضى؟", a: "سجّل الفاتورة والتقسيط على ملف المريض، والبرنامج بيوضح المدفوع والمتبقي." },
        { q: "برنامج عيادة الأسنان بيتكلف كام؟", a: "بيختلف حسب الشركة. في تميز الباقات تبدأ من 1500 جنيه شهرياً وبتزيد حسب عدد الفروع، كلمنا ونبعتلك عرض سعر." },
        { q: "أقدر أجرب تميز دنتال؟", a: "أيوه، الديمو متاح من غير تسجيل على demo.dental.tamyaz.online." },
      ],
      en: [
        { q: "Can I use general clinic software for a dental clinic?", a: "You can, but you will miss treatment plans and installments, which are the core of dental work — that is why Tamyaz Dental is built specifically for dental clinics." },
        { q: "How do I track patient installments?", a: "Record the invoice and installments on the patient file, and the software shows what is paid and what remains." },
        { q: "How much does dental software cost?", a: "It varies by vendor. At Tamyaz, plans start from EGP 1,500/month and scale with the number of branches — contact us for a quote." },
        { q: "Can I try Tamyaz Dental?", a: "Yes, the demo is open with no sign-up at demo.dental.tamyaz.online." },
      ],
    },
  },
  {
    slug: "best-pharmacy-management-system-egypt",
    system: "pharmacy-system",
    date: "2026-10-14",
    updated: "2026-10-14",
    title: {
      ar: "أفضل برنامج إدارة صيدلية في مصر 2026: معايير الاختيار",
      en: "Best Pharmacy Management System in Egypt 2026: Selection Criteria",
    },
    description: {
      ar: "إزاي تختار برنامج إدارة صيدلية في مصر 2026: الكاشير، المخزون وتواريخ الصلاحية، المشتريات والموردين، فروقات الخزنة، ولينا وعلينا — في جدول، مع تميز فارما الشغال في أكتر من 6 فروع.",
      en: "How to choose a pharmacy management system in Egypt in 2026: POS, stock and expiry dates, purchases and suppliers, drawer differences, and receivables/payables — in a table, with Tamyaz Pharma, running in 6+ branches.",
    },
    keywords: {
      ar: ["برنامج إدارة صيدلية", "برنامج صيدليات", "سيستم كاشير صيدلية", "تواريخ الصلاحية"],
      en: ["pharmacy management system Egypt", "pharmacy POS", "pharmacy software", "expiry date tracking"],
    },
    answer: {
      ar: "أفضل برنامج إدارة صيدلية في مصر هو اللي بيجمع نقطة البيع والمخزون بتواريخ الصلاحية والمشتريات والموردين والشيفتات وفروقات الخزنة ولينا وعلينا في سيستم واحد بالعربي. تميز فارما بيعمل ده وشغال حاليًا في أكتر من 6 فروع صيدليات، والديمو مجاني من غير تسجيل.",
      en: "The best pharmacy management system in Egypt combines the point of sale, stock with expiry dates, purchases and suppliers, shifts, drawer differences and receivables/payables in one Arabic system. Tamyaz Pharma does that and currently runs in 6+ pharmacy branches, with a free demo and no sign-up.",
    },
    context: {
      ar: "الصيدلية فيها آلاف الأصناف، وكل صنف ليه تاريخ صلاحية. صنف بيعدّي صلاحيته على الرف خسارة مباشرة، وفرق في الخزنة آخر الشيفت من غير تفسير مشكلة ثقة. ومع الموردين والمديونيات، الحسابات بتتلخبط بسرعة من غير سيستم.",
      en: "A pharmacy carries thousands of items, each with an expiry date. An item expiring on the shelf is a direct loss, and an unexplained drawer difference at shift end is a trust problem. Add suppliers and debts, and the accounts get tangled quickly without a system.",
    },
    criteria: {
      ar: [
        ["تواريخ الصلاحية", "عشان تبيع أو ترجّع قبل ما الصنف يبوظ", "السيستم بيوضح الأصناف القريبة من الصلاحية؟"],
        ["كاشير الصيدلية", "البيع لازم يبقى سريع ودقيق", "الكاشير معمول لشغل الصيدلية؟"],
        ["المشتريات والموردين", "الشراء والحسابات مع الموردين كتير", "فيه فواتير شراء وحسابات موردين؟"],
        ["الشيفتات وفروقات الخزنة", "عشان كل شيفت يتحاسب", "فروقات الخزنة بتبان آخر الشيفت؟"],
        ["لينا وعلينا", "المديونيات لازم تتسجل", "فيه متابعة للمديونيات؟"],
        ["الفروع", "السلاسل محتاجة رؤية موحدة", "السيستم شغال في كام فرع فعلًا؟"],
      ],
      en: [
        ["Expiry dates", "Sell or return before items expire", "Does the system show items close to expiry?"],
        ["Pharmacy POS", "Sales must be fast and accurate", "Is the cashier built for pharmacy work?"],
        ["Purchases and suppliers", "Buying and supplier accounts are constant", "Are there purchase invoices and supplier accounts?"],
        ["Shifts and drawer differences", "So every shift is accountable", "Do drawer differences show at shift end?"],
        ["Receivables and payables", "Debts must be on record", "Does it track what is owed both ways?"],
        ["Branches", "Chains need a unified view", "How many branches actually run on it?"],
      ],
    },
    faq: {
      ar: [
        { q: "إيه أهم ميزة في برنامج الصيدلية؟", a: "متابعة المخزون بتواريخ الصلاحية، مع كاشير مربوط بالمخزون وتقفيل شيفتات بيوضح فروقات الخزنة." },
        { q: "هل البرنامج بينفع لسلسلة صيدليات؟", a: "أيوه. تميز فارما شغال حاليًا في أكتر من 6 فروع صيدليات." },
        { q: "برنامج الصيدلية بيتكلف كام؟", a: "بيختلف حسب الشركة وعدد الفروع. في تميز الباقات تبدأ من 1500 جنيه شهرياً وبتزيد حسب عدد الفروع، وبنبعت عرض سعر." },
        { q: "أقدر أجرب تميز فارما؟", a: "أيوه، الديمو متاح من غير تسجيل على demo.pharma.tamyaz.online." },
      ],
      en: [
        { q: "What is the most important feature in pharmacy software?", a: "Tracking stock with expiry dates, with a cashier linked to stock and shift closes that reveal drawer differences." },
        { q: "Does it work for a pharmacy chain?", a: "Yes. Tamyaz Pharma currently runs in 6+ pharmacy branches." },
        { q: "How much does pharmacy software cost?", a: "It varies by vendor and number of branches. At Tamyaz, plans start from EGP 1,500/month and scale with the number of branches and we send a quote." },
        { q: "Can I try Tamyaz Pharma?", a: "Yes, the demo is open with no sign-up at demo.pharma.tamyaz.online." },
      ],
    },
  },
  {
    slug: "gym-bar-pos-system-guide",
    system: "gym-bar-system",
    date: "2026-10-14",
    updated: "2026-10-14",
    title: {
      ar: "سيستم بار الجيم في مصر 2026: إزاي تدير بار البروتين والعصاير صح؟",
      en: "Gym Bar POS in Egypt 2026: How to Run a Protein and Juice Bar Properly",
    },
    description: {
      ar: "دليل اختيار سيستم كاشير لبار الجيم في مصر 2026: بيع البروتين والعصاير والسناكس، الإضافات، الخزنة، الفروع والتقارير — في جدول معايير، مع تميز بار وديمو مجاني.",
      en: "A 2026 guide to choosing a POS for the gym bar in Egypt: selling protein, juices and snacks, add-ons, cash drawer, branches and reports — in a criteria table, with Tamyaz Bar and a free demo.",
    },
    keywords: {
      ar: ["سيستم بار الجيم", "كاشير بار بروتين", "سيستم بار", "بار الجيم"],
      en: ["gym bar POS", "protein bar cashier", "gym juice bar system", "gym bar software"],
    },
    answer: {
      ar: "السيستم المناسب لبار الجيم هو كاشير سريع معمول للبروتين والعصاير والسناكس بإضافاتها، مع خزنة ومدفوعات، ودعم للفروع، وتقارير يومية وشهرية، بالعربي وعلى الموبايل. تميز بار معمول لبار الجيم تحديدًا، والديمو متاح مجانًا من غير تسجيل.",
      en: "The right system for a gym bar is a fast cashier built for protein, juices and snacks with add-ons, plus a cash drawer and payments, branch support and daily and monthly reports, in Arabic and on mobile. Tamyaz Bar is built specifically for the gym bar, with a free demo and no sign-up.",
    },
    context: {
      ar: "بار الجيم مصدر دخل حقيقي بس غالبًا بيتدار بالورقة أو بيتخلط بحسابات الاشتراكات. الطلبات بإضافات (سكوب زيادة، لبن بدل مية...) بتتحسب غلط، وصاحب الجيم مايعرفش البار بيكسب كام فعلًا.",
      en: "The gym bar is real income, yet it is often run on paper or mixed into membership accounts. Orders with add-ons (an extra scoop, milk instead of water...) get priced wrong, and the owner never knows what the bar actually earns.",
    },
    criteria: {
      ar: [
        ["كاشير سريع للبار", "الأعضاء بيطلبوا بسرعة بين التمارين", "البيعة بتاخد كام ضغطة؟"],
        ["الإضافات على الطلب", "الإضافات بتغيّر السعر", "السيستم بيحسب الإضافات صح؟"],
        ["الخزنة والمدفوعات", "فلوس البار لازم تبقى منفصلة وواضحة", "فيه خزنة ومدفوعات للبار؟"],
        ["الفروع", "السلاسل عندها بار في كل فرع", "أقدر أدير بار أكتر من فرع؟"],
        ["التقارير", "تعرف البار بيكسب كام", "فيه تقارير يومية وشهرية؟"],
      ],
      en: [
        ["Fast bar cashier", "Members order quickly between sets", "How many taps does a sale take?"],
        ["Add-ons on orders", "Add-ons change the price", "Does the system price add-ons correctly?"],
        ["Cash drawer and payments", "Bar money must be separate and clear", "Is there a drawer and payments for the bar?"],
        ["Branches", "Chains have a bar in every branch", "Can I run bars in several branches?"],
        ["Reports", "Know what the bar earns", "Are there daily and monthly reports?"],
      ],
    },
    faq: {
      ar: [
        { q: "ليه بار الجيم محتاج سيستم منفصل؟", a: "عشان حسابات البار ماتتخلطش بالاشتراكات، وتعرف مبيعات البار وربحه لوحدهم." },
        { q: "هل تميز بار بيدعم الإضافات؟", a: "أيوه. فيه الطلبات والإضافات." },
        { q: "سيستم البار بيتكلف كام؟", a: "في تميز الباقات تبدأ من 1500 جنيه شهرياً وبتزيد حسب عدد الفروع، كلمنا ونبعتلك عرض سعر." },
        { q: "أقدر أجرب تميز بار؟", a: "أيوه، الديمو متاح من غير تسجيل على demo.bar.tamyaz.online." },
      ],
      en: [
        { q: "Why does a gym bar need its own system?", a: "So bar accounts do not mix with memberships, and you know the bar's sales and profit on their own." },
        { q: "Does Tamyaz Bar support add-ons?", a: "Yes. It includes orders and add-ons." },
        { q: "How much does a bar system cost?", a: "At Tamyaz, plans start from EGP 1,500/month and scale with the number of branches — contact us for a quote." },
        { q: "Can I try Tamyaz Bar?", a: "Yes, the demo is open with no sign-up at demo.bar.tamyaz.online." },
      ],
    },
  },
  {
    slug: "best-retail-pos-online-store-egypt",
    system: "retail-pos-system",
    date: "2026-10-14",
    updated: "2026-10-14",
    title: {
      ar: "أفضل سيستم كاشير محل ومتجر أونلاين في مصر 2026: إزاي تختار؟",
      en: "Best Retail POS and Online Store in Egypt 2026: How to Choose",
    },
    description: {
      ar: "دليل اختيار سيستم كاشير لمحل ومتجر أونلاين في مصر 2026: مخزون واحد، المقاسات والألوان، الطلبات والشحن، الفروع، والطلب على واتساب — في جدول معايير، مع تميز ستور.",
      en: "A 2026 guide to choosing a retail POS and online store in Egypt: one inventory, sizes and colors, orders and shipping, branches, and WhatsApp ordering — in a criteria table, with Tamyaz Store.",
    },
    keywords: {
      ar: ["سيستم كاشير محل", "سيستم متجر", "متجر أونلاين", "برنامج مخزون محلات"],
      en: ["retail POS Egypt", "shop cashier system", "online store Egypt", "inventory software"],
    },
    answer: {
      ar: "لو بتبيع من المحل وأونلاين، أفضل سيستم كاشير في مصر هو اللي بيربط المتجر الأونلاين وكاشير المحل بمخزون واحد، وبيدير المقاسات والألوان والطلبات والشحن والفروع. تميز ستور بيعمل ده وكمان بيستقبل طلبات على واتساب، والديمو مجاني من غير تسجيل.",
      en: "If you sell in-store and online, the best retail POS in Egypt links your online store and shop cashier to one inventory and handles sizes, colors, orders, shipping and branches. Tamyaz Store does that and also takes orders on WhatsApp, with a free demo and no sign-up.",
    },
    context: {
      ar: "أكبر مشكلة للمحلات اللي بتبيع أونلاين هي إن المخزون في مكانين: قطعة تتباع في المحل وتفضل ظاهرة على الموقع، فالزبون يطلبها وتعتذرله. ومع المقاسات والألوان، العدّ اليدوي بيبقى مستحيل.",
      en: "The biggest problem for shops that also sell online is stock living in two places: an item sells in the shop but stays listed online, a customer orders it, and you have to apologize. With sizes and colors, manual counting becomes impossible.",
    },
    criteria: {
      ar: [
        ["مخزون واحد للمحل والأونلاين", "عشان ماتبيعش حاجة مش موجودة", "الكاشير والمتجر على نفس المخزون؟"],
        ["المقاسات والألوان", "كل مقاس ولون ليه رصيد", "المنتج بيتسجل بمقاساته وألوانه؟"],
        ["الطلبات والشحن", "الطلب الأونلاين لازم يتتابع لحد التسليم", "أقدر أتابع حالة الطلب والشحن؟"],
        ["الفروع", "كل فرع ليه مخزون", "مخزون كل فرع واضح؟"],
        ["الطلب على واتساب", "زباين كتير في مصر بيطلبوا على واتساب", "فيه طلب مباشر على واتساب؟"],
        ["متجر بإسمك", "البراند بتاعك مش اسم منصة", "المتجر بإسمي ودوميني؟"],
      ],
      en: [
        ["One inventory for shop and online", "So you never sell what you do not have", "Do the cashier and store share stock?"],
        ["Sizes and colors", "Every size and color has its own stock", "Are products recorded with sizes and colors?"],
        ["Orders and shipping", "Online orders must be tracked to delivery", "Can I follow order and shipping status?"],
        ["Branches", "Each branch has its own stock", "Is each branch's stock clear?"],
        ["WhatsApp ordering", "Many customers in Egypt order on WhatsApp", "Is there direct WhatsApp ordering?"],
        ["A store under your name", "Your brand, not a platform's", "Is the store under my name?"],
      ],
    },
    faq: {
      ar: [
        { q: "هل محتاج متجر أونلاين لو عندي محل؟", a: "لو زباينك بيدوروا أونلاين أو بيطلبوا على واتساب، المتجر بيزوّد مبيعاتك بشرط يكون على نفس مخزون المحل." },
        { q: "هل الكاشير بيشتغل بالباركود؟", a: "عملنا كاشير بالباركود وإيصالات حرارية لمحل Memo Cosmetics، ولو محتاجه لمحلك بنظبطه على مقاس شغلك." },
        { q: "السيستم بيتكلف كام؟", a: "في تميز الباقات تبدأ من 1500 جنيه شهرياً وبتزيد حسب عدد الفروع، كلمنا ونبعتلك عرض سعر." },
        { q: "أقدر أجرب تميز ستور؟", a: "أيوه، الديمو متاح من غير تسجيل على demo.shop.tamyaz.online." },
      ],
      en: [
        { q: "Do I need an online store if I have a shop?", a: "If your customers search online or order on WhatsApp, a store adds sales — as long as it runs on the same stock as the shop." },
        { q: "Does the cashier work with barcodes?", a: "We built a barcode cashier with thermal receipts for the Memo Cosmetics shop, and if you need it for your shop we set it up for how you work." },
        { q: "How much does the system cost?", a: "At Tamyaz, plans start from EGP 1,500/month and scale with the number of branches — contact us for a quote." },
        { q: "Can I try Tamyaz Store?", a: "Yes, the demo is open with no sign-up at demo.shop.tamyaz.online." },
      ],
    },
  }
);

export function getArticle(slug) {
  return articles.find((a) => a.slug === slug) ?? null;
}

// الأحدث الأول
export function getAllArticles() {
  return [...articles].sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0));
}
