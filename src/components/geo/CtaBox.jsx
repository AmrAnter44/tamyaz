import { MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site";

// بانر التواصل: واتساب + نموذج الطلب — بنفس شكل بانر "محتاج حاجة مخصوص؟" في الرئيسية
export default function CtaBox({ locale, title, text, waText, formQuery = "" }) {
  const isRTL = locale === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  return (
    <section
      className="t-card overflow-hidden px-5 py-8 sm:px-10 sm:py-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10"
      style={{
        background:
          "radial-gradient(520px 260px at 100% 0%, rgba(247,215,0,.12), transparent 70%), linear-gradient(180deg,#252522,#151513)",
        borderColor: "rgba(247,215,0,.28)",
      }}
    >
      <div className="flex flex-col gap-3 flex-1 min-w-0 text-center lg:text-start">
        <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-ink">{title}</h2>
        <p className="text-base text-ink-2 leading-relaxed">{text}</p>
        <p className="text-sm text-ink-4 num" dir="ltr">
          WhatsApp: {siteConfig.phoneDisplay}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end flex-shrink-0">
        <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
          <MessageCircle size={20} aria-hidden="true" />
          <span>{isRTL ? "كلمنا واتساب" : "Chat on WhatsApp"}</span>
        </a>
        <a href={`/${locale}/form${formQuery}`} className="btn btn-secondary btn-lg">
          <span>{isRTL ? "سجّل طلبك" : "Submit your request"}</span>
          <Arrow size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
