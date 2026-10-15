import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const ar = locale === "ar";
  return buildPageMetadata({
    locale,
    path: "/form",
    markdown: false,
    title: ar ? "اطلب عرض سعر — تواصل مع تميز" : "Request a Quote — Contact Tamyaz",
    description: ar
      ? "سجّل طلبك واختار السيستم اللي محتاجه، أو كلمنا على واتساب +20 102 851 8754 والاشتراك من 2000 جنيه شهرياً للفرع (1500 في الشهر مع الباقة السنوية)."
      : "Submit your request and choose the system you need, or message us on WhatsApp +20 102 851 8754 — plans from EGP 2,000/month per branch (EGP 1,500/month on the yearly plan).",
  });
}

export default function FormLayout({ children }) {
  return children;
}
