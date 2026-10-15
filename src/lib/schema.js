import { plansFor } from "@/lib/pricing";
import { SITE_URL, siteConfig } from "./site";

// كل دوال الـJSON-LD (schema.org) في مكان واحد.
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

const pick = (obj, locale) => (obj ? obj[locale] ?? obj.en : undefined);
const inLanguage = (locale) => (locale === "ar" ? "ar-EG" : "en");

export function organizationSchema(locale = "ar") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.legalName,
    alternateName: [siteConfig.name, siteConfig.nameAr],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/logo.svg`,
    description: pick(siteConfig.tagline, locale),
    foundingDate: siteConfig.foundingYear,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: { "@type": "PostalAddress", addressCountry: "EG" },
    areaServed: { "@type": "Country", name: "Egypt" },
    knowsLanguage: ["ar", "en"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        url: siteConfig.whatsapp,
        areaServed: "EG",
        availableLanguage: ["ar", "en"],
      },
    ],
    knowsAbout: [
      "Cafe POS system",
      "Restaurant management system",
      "Barbershop booking system",
      "Barbershop and men's salon management system",
      "Clinic management software",
      "Dental clinic software",
      "Pharmacy management system",
      "Gym bar POS",
      "Retail POS and online store",
      "سيستم كاشير كافيه",
      "سيستم مطاعم",
      "سيستم حجز باربر",
      "سيستم إدارة صالون حلاقة",
      "سيستم كاشير للحلاق",
      "برنامج إدارة عيادات",
      "برنامج عيادة أسنان",
      "برنامج إدارة صيدلية",
      "سيستم كاشير محل",
    ],
    sameAs: [siteConfig.socials.facebook, siteConfig.socials.instagram],
  };
}

export function websiteSchema(locale = "ar") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: `${SITE_URL}/${locale}`,
    name: locale === "ar" ? siteConfig.nameAr : siteConfig.name,
    alternateName: locale === "ar" ? siteConfig.name : siteConfig.nameAr,
    description: pick(siteConfig.tagline, locale),
    inLanguage: ["ar", "en"],
    publisher: { "@id": ORG_ID },
  };
}

// صفحة كل سيستم: المنتج نفسه كـSoftwareApplication + Offers بالأسعار (من غير تقييمات)
export function softwareApplicationSchema(system, locale = "ar") {
  const url = `${SITE_URL}/${locale}/systems/${system.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: pick(system.productName, locale),
    alternateName: pick(system.productName, locale === "ar" ? "en" : "ar"),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: pick(system.category, "en"),
    operatingSystem: "Web, Android, iOS, Windows, macOS",
    inLanguage: ["ar", "en"],
    url,
    description: pick(system.answer, locale),
    featureList: (pick(system.features, locale) ?? []).map((f) => f.title),
    ...(pick(system.keywords, locale)?.length ? { keywords: pick(system.keywords, locale).join(", ") } : {}),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    offers: plansFor(system).length
      ? plansFor(system).map((pl) => ({
          "@type": "Offer",
          name:
            locale === "ar"
              ? (pl.months === 1 ? "اشتراك شهري للفرع" : pl.months === 12 ? "اشتراك سنة للفرع" : `اشتراك ${pl.months} شهور للفرع`)
              : (pl.months === 1 ? "Monthly, per branch" : pl.months === 12 ? "1 year, per branch" : `${pl.months} months, per branch`),
          price: String(pl.price),
          priceCurrency: "EGP",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(pl.price),
            priceCurrency: "EGP",
            billingDuration: { "@type": "QuantitativeValue", value: pl.months, unitCode: "MON" },
          },
          availability: "https://schema.org/InStock",
          areaServed: { "@type": "Country", name: "Egypt" },
          seller: { "@id": ORG_ID },
        }))
      : {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: "1500",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "1500",
        priceCurrency: "EGP",
        unitCode: "MON",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        description:
          pick(system.pricing, locale) ??
          (locale === "ar" ? "يبدأ من 1500 جنيه شهرياً وبيزيد حسب عدد الفروع" : "From EGP 1,500 per month, scaling with the number of branches"),
      },
      availability: "https://schema.org/InStock",
      areaServed: { "@type": "Country", name: "Egypt" },
      seller: { "@id": ORG_ID },
    },
  };
}

export function serviceSchema(system, locale = "ar") {
  const url = `${SITE_URL}/${locale}/systems/${system.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: pick(system.h1, locale),
    serviceType: pick(system.category, locale),
    description: pick(system.answer, locale),
    url,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Egypt" },
    availableLanguage: ["ar", "en"],
    audience: {
      "@type": "BusinessAudience",
      audienceType: pick(system.category, locale),
    },
  };
}

// items: [{ name, path }] — path من غير اللغة، مثال '/systems/cafe-pos-system'
export function breadcrumbSchema(items, locale = "ar") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path}`,
    })),
  };
}

// faqs: [{ q, a }] أو [{ question, answer }]
export function faqPageSchema(faqs, url) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(url ? { url } : {}),
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q ?? f.question,
      acceptedAnswer: { "@type": "Answer", text: f.a ?? f.answer },
    })),
  };
}

// items: [{ name, url, description? }]
export function itemListSchema({ name, url, items }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function articleSchema(article, locale = "ar") {
  const url = `${SITE_URL}/${locale}/blog/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: pick(article.title, locale),
    description: pick(article.description, locale),
    url,
    mainEntityOfPage: url,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    inLanguage: inLanguage(locale),
    image: `${SITE_URL}/logo.svg`,
    keywords: (pick(article.keywords, locale) ?? []).join(", "),
    author: { "@id": ORG_ID, "@type": "Organization", name: siteConfig.legalName, url: SITE_URL },
    publisher: { "@id": ORG_ID },
    about: article.system ? { "@id": `${SITE_URL}/${locale}/systems/${article.system}#software` } : undefined,
  };
}
