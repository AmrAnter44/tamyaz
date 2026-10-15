import { SITE_URL, siteConfig } from "./site";

// ميتاداتا كاملة لأي صفحة: عنوان ووصف خاصين بيها، canonical للصفحة نفسها،
// hreflang (ar/en/x-default)، نسخة الماركداون للوكلاء، وكروت OG/Twitter.
// كل صفحة لازم تستخدمها — من غيرها الصفحة بتورث canonical الرئيسية.
export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
  type = "website",
  languages, // اختياري: لو الصفحة مش موجودة بكل اللغات
  publishedTime,
  modifiedTime,
  absoluteTitle = false,
  markdown = true, // false للصفحات اللي مالهاش نسخة .md (الباقات/التواصل)
  keywords, // اختياري: [string] — كلمات البحث الأساسية للصفحة
}) {
  const url = `${SITE_URL}/${locale}${path}`;
  const langs = languages ?? {
    ar: `${SITE_URL}/ar${path}`,
    en: `${SITE_URL}/en${path}`,
  };
  const siteName = locale === "ar" ? siteConfig.nameAr : siteConfig.name;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: { ...langs, "x-default": langs.en ?? langs.ar },
      // <link rel="alternate" type="text/markdown"> — نسخة نظيفة للوكلاء الذكية
      ...(markdown ? { types: { "text/markdown": `${url}.md` } } : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_EG"],
      images: [{ url: "/logo.svg", alt: siteConfig.name }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.svg"],
    },
  };
}
