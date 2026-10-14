// الأسئلة الشائعة على مستوى الشركة — بتغذّي /[locale]/faq ونسختها الماركداون و llms-full.txt.
// كل إجابة لازم تكون مدعومة بمحتوى الموقع (messages/*.json, src/content/systems.js, src/data/projects.js).
// السعر: يبدأ من 1500 جنيه شهرياً (قرار عمرو) وبيزيد حسب عدد الفروع، والنهائي بعرض سعر.

const faqs = {
  ar: [
    {
      id: "what-is-tamyaz",
      q: "يعني إيه تميز (Tamyaz)؟",
      a: "تميز شركة برمجيات مصرية بدأت في 2023، بتقدّم 8 أنظمة إدارة وكاشير جاهزة للبيزنس: تميز كافيه، تميز ريستورانت، تميز باربر، تميز كلينك، تميز دنتال، تميز فارما، تميز بار (بار الجيم)، وتميز ستور. وكمان بتعمل مواقع وتطبيقات موبايل وهوية بصرية وإنتاج فيديو.",
    },
    {
      id: "which-systems",
      q: "إيه الأنظمة اللي تميز بتقدمها؟",
      a: "8 أنظمة: سيستم كاشير وإدارة كافيهات، سيستم إدارة مطاعم (صالة ومطبخ ودليفري ومنيو QR)، سيستم حجز وإدارة باربر شوب وصالونات، برنامج إدارة عيادات ومراكز طبية، برنامج إدارة عيادات أسنان بخطط العلاج والتقسيط، برنامج إدارة صيدليات بالمخزون وتواريخ الصلاحية، سيستم كاشير بار الجيم، وسيستم كاشير محل مع متجر أونلاين على نفس المخزون. كل سيستم ليه صفحة وديمو على tamyaz.online/ar/systems.",
    },
    {
      id: "demo",
      q: "أقدر أجرّب السيستم قبل ما أشترك؟",
      a: "أيوه. كل سيستم من الـ8 ليه ديمو متاح دلوقتي من غير تسجيل، وفيه داتا حقيقية بتتجدد كل يوم. الروابط في صفحة كل سيستم.",
    },
    {
      id: "arabic",
      q: "هل الأنظمة بالعربي؟",
      a: "أيوه. كل الأنظمة بالعربي ومعمولة لأصحاب البيزنس في مصر.",
    },
    {
      id: "devices",
      q: "الأنظمة بتشتغل على إيه؟ ومحتاجة نت؟",
      a: "الأنظمة بتفتح من المتصفح على الموبايل والكمبيوتر وبتتنزل كتطبيق على الجهاز، وبتشتغل أونلاين عشان تتابع شغلك وتقاريرك من أي مكان. لو شغلك محتاج ترتيب خاص وقت انقطاع النت، كلمنا ونشوف الحل المناسب لحالتك.",
    },
    {
      id: "branches",
      q: "هل الأنظمة بتدعم أكتر من فرع؟",
      a: "أيوه. أنظمة الباربر والصيدليات والمطاعم وبار الجيم والمتجر فيها إدارة فروع. الفروع الشغالة على أنظمة تميز حاليًا: كافيه +12، مطاعم +4، باربر +8، كلينك +16، أسنان +9، فارما +6، بار الجيم +11، متجر +5 — أكتر من 70 فرع إجمالًا. كلمنا عن عدد فروعك ونظبط السيستم عليه.",
    },
    {
      id: "customization",
      q: "ينفع تعدّلوا السيستم على مقاس شغلي؟",
      a: "أيوه. بنعدّل أي سيستم من الـ8 على مقاس شغلك، ولو محتاج سيستم مختلف خالص بنعملهولك كاستم من الفكرة لحد التشغيل.",
    },
    {
      id: "pricing",
      q: "الأسعار بكام؟",
      a: "الباقات تبدأ من 1500 جنيه شهرياً وبتزيد حسب عدد الفروع واحتياج شغلك. كلمنا على واتساب (+20 102 851 8754) أو سجّل طلبك على tamyaz.online/ar/form ونبعتلك عرض سعر.",
    },
    {
      id: "how-to-start",
      q: "أبدأ إزاي؟",
      a: "جرّب ديمو السيستم المناسب لشغلك، وبعدين كلمنا على واتساب أو سجّل طلبك من صفحة التواصل. بنفهم شغلك وعدد فروعك، ونجهّز السيستم ونعدّل عليه، وتبدأ تشتغل من الموبايل أو الكمبيوتر.",
    },
    {
      id: "support",
      q: "إزاي أتواصل معاكم أو أطلب دعم؟",
      a: "على واتساب +20 102 851 8754، أو الإيميل tamyazcompany@gmail.com، أو من نموذج الطلب على tamyaz.online/ar/form. بنرد بالعربي والإنجليزي.",
    },
    {
      id: "other-services",
      q: "هل تميز بتعمل حاجات غير الأنظمة؟",
      a: "أيوه. بنعمل مواقع إلكترونية وتطبيقات موبايل، وهوية بصرية وتصميمات سوشيال ميديا، وإنتاج فيديو. من أعمالنا منظومة Memo Group كاملة (أنظمة وتطبيقات ومواقع) وموقع وسيستم «دوّر صح» لبيع وشراء العربيات المستعملة.",
    },
    {
      id: "where",
      q: "تميز بتخدم فين؟",
      a: "تميز شركة مصرية بتخدم البيزنس في مصر، والأنظمة سحابية فبتشتغل في أي محافظة.",
    },
  ],
  en: [
    {
      id: "what-is-tamyaz",
      q: "What is Tamyaz (تميز)?",
      a: "Tamyaz is an Egyptian software company, started in 2023, that offers 8 ready-made management and POS systems for businesses: Tamyaz Cafe, Tamyaz Resto, Tamyaz Barber, Tamyaz Clinic, Tamyaz Dental, Tamyaz Pharma, Tamyaz Bar (gym bar) and Tamyaz Store. It also builds websites, mobile apps, brand identity and video content.",
    },
    {
      id: "which-systems",
      q: "Which systems does Tamyaz offer?",
      a: "Eight: a café POS and management system, a restaurant management system (dining room, kitchen, delivery and QR menu), a barbershop and salon booking system, clinic management software, dental clinic software with treatment plans and installments, a pharmacy management system with stock and expiry dates, a gym-bar POS, and a retail POS with an online store on the same inventory. Each system has its own page and demo at tamyaz.online/en/systems.",
    },
    {
      id: "demo",
      q: "Can I try a system before subscribing?",
      a: "Yes. Each of the 8 systems has a live demo open right now with no sign-up, running on real data that refreshes every day. The links are on each system's page.",
    },
    { id: "arabic", q: "Are the systems in Arabic?", a: "Yes. All the systems are in Arabic and built for business owners in Egypt." },
    {
      id: "devices",
      q: "What do the systems run on? Do they need internet?",
      a: "The systems open in the browser on mobile and desktop and install as an app on the device. They run online so you can follow your business and reports from anywhere. If your business needs special arrangements for internet outages, talk to us and we will find the right setup for your case.",
    },
    {
      id: "branches",
      q: "Do the systems support multiple branches?",
      a: "Yes. The barber, pharmacy, restaurant, gym-bar and store systems include branch management. Branches running on Tamyaz systems today: Cafe 12+, Resto 4+, Barber 8+, Clinic 16+, Dental 9+, Pharma 6+, Gym Bar 11+, Store 5+ (70+ in total). Tell us how many branches you have and we will set it up accordingly.",
    },
    {
      id: "customization",
      q: "Can you customize a system for my business?",
      a: "Yes. We tailor any of the 8 systems to how you work, and if you need something completely different we build it custom, from idea to launch.",
    },
    {
      id: "pricing",
      q: "How much does it cost?",
      a: "Plans start from EGP 1,500/month and scale with the number of branches and what your business needs. Message us on WhatsApp (+20 102 851 8754) or submit a request at tamyaz.online/en/form and we will send you a quote.",
    },
    {
      id: "how-to-start",
      q: "How do I get started?",
      a: "Try the demo of the system that fits your business, then message us on WhatsApp or submit a request on the contact page. We learn how you work and how many branches you have, set up and tailor the system, and you start working from mobile or desktop.",
    },
    {
      id: "support",
      q: "How do I contact you or get support?",
      a: "On WhatsApp at +20 102 851 8754, by email at tamyazcompany@gmail.com, or through the request form at tamyaz.online/en/form. We reply in Arabic and English.",
    },
    {
      id: "other-services",
      q: "Does Tamyaz do more than systems?",
      a: "Yes. We build websites and mobile apps, brand identity and social media designs, and video content. Our work includes the full Memo Group ecosystem (systems, apps and websites) and both the website and the system for Dawr Sa7, a used-car brokerage.",
    },
    {
      id: "where",
      q: "Where does Tamyaz operate?",
      a: "Tamyaz is an Egyptian company serving businesses in Egypt, and the systems are cloud-based, so they work in any governorate.",
    },
  ],
};

export function getFaqs(locale) {
  return faqs[locale] ?? faqs.en;
}
