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
      ? "سجّل طلبك واختار السيستم اللي محتاجه، أو كلمنا على واتساب +20 102 851 8754 ونبعتلك عرض سعر حسب عدد فروعك."
      : "Submit your request and choose the system you need, or message us on WhatsApp +20 102 851 8754 for a quote based on your number of branches.",
  });
}

export default function FormLayout({ children }) {
  return children;
}
