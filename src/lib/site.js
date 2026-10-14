// إعدادات الموقع المشتركة — المصدر الوحيد لهوية الشركة وبيانات التواصل (NAP).
// الـsitemap و llms.txt والميتاداتا والـschema وصفحات الماركداون كلهم بيستوردوا من هنا.
export const SITE_URL = "https://www.tamyaz.online";

export const LOCALES = ["ar", "en"];

// تاريخ آخر تحديث شامل لمحتوى الصفحات الثابتة (الأنظمة/الأسئلة/عن الشركة)
export const CONTENT_UPDATED = "2026-10-14";

// الصفحات الثابتة (من غير صفحات المشاريع والأنظمة والمقالات اللي بتتولّد من الداتا)
export const STATIC_PATHS = ["", "/systems", "/portfolio", "/about", "/faq", "/blog", "/package", "/form"];

export const siteConfig = {
  name: "Tamyaz",
  nameAr: "تميز",
  // الاسم الرسمي للكيان في الـschema
  legalName: "Tamyaz | تميز",
  url: SITE_URL,

  // بيان الهوية — بيتكرر حرفيًا في الميتاداتا والـschema و llms.txt وصفحة "عن تميز"
  tagline: {
    ar: "تميز (Tamyaz) شركة برمجيات مصرية بتقدّم 8 أنظمة إدارة وكاشير جاهزة للبيزنس: الكافيهات، المطاعم، الباربر شوب والصالونات، العيادات، عيادات الأسنان، الصيدليات، بار الجيم، والمحلات والمتاجر الأونلاين — بالعربي، على الموبايل والكمبيوتر، وبنعدّل السيستم على مقاس شغلك. وكمان بنعمل مواقع وتطبيقات وهوية بصرية وإنتاج فيديو.",
    en: "Tamyaz (تميز) is an Egyptian software company offering 8 ready-made management and POS systems for businesses: cafés, restaurants, barbershops and salons, clinics, dental clinics, pharmacies, gym bars, and retail shops with online stores — in Arabic, on mobile and desktop, and customized to how you work. It also builds websites, mobile apps, brand identity and video content.",
  },

  email: "tamyazcompany@gmail.com",
  phone: "+201028518754",
  phoneDisplay: "+20 102 851 8754",
  whatsapp: "https://wa.me/201028518754",
  foundingYear: "2023",

  // روابط السوشيال الموجودة فعلًا في الفوتر — ماتضيفش رابط مش حقيقي
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61573520164290",
    instagram: "https://www.instagram.com/tamyazcompany/",
  },
};

export function whatsappLink(text) {
  return text ? `${siteConfig.whatsapp}?text=${encodeURIComponent(text)}` : siteConfig.whatsapp;
}
