"use client";
import React from "react";
import {
  Coffee,
  UtensilsCrossed,
  Scissors,
  Stethoscope,
  Smile,
  Pill,
  Dumbbell,
  ShoppingBag,
  Check,
  ExternalLink,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Smartphone,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Reveal from "./Reveal";

// تفاصيل أنظمة تميز الـ٨ + روابط الديمو — النصوص والروابط من ملفات الترجمة (systemsDetails.items)
// المفاتيح هنا هي اللي في الـid بتاع كل كارت (#sys-<key>)، والـOrbit بيلينك عليها
const ICONS = {
  cafe: Coffee,
  resto: UtensilsCrossed,
  barber: Scissors,
  clinic: Stethoscope,
  dental: Smile,
  pharma: Pill,
  bar: Dumbbell,
  shop: ShoppingBag,
};

const ORDER = ["cafe", "resto", "barber", "clinic", "dental", "pharma", "bar", "shop"];

// نفس رقم الواتساب المستخدم في باقي الموقع (Nav / Footer / Cta)
const WHATSAPP_URL = "https://wa.me/201055119164";

export default function SystemsDetails() {
  const t = useTranslations("systemsDetails");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const items = t.raw("items") ?? {};
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id="systems-details"
      className="relative py-16 sm:py-20 px-4 sm:px-6 scroll-mt-24"
      dir={isRTL ? "rtl" : "ltr"}
      aria-labelledby="systems-details-title"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 sm:gap-10">
        <Reveal className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
          <span className="t-eyebrow">{t("eyebrow")}</span>
          <h2
            id="systems-details-title"
            className="text-[28px] sm:text-4xl font-extrabold leading-tight text-ink"
          >
            {t("title")}
          </h2>
          <p className="text-base text-ink-2 leading-relaxed">{t("subtitle")}</p>
        </Reveal>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 list-none p-0 m-0">
          {ORDER.map((key, index) => {
            const item = items[key];
            if (!item) return null;
            const Icon = ICONS[key];
            return (
              <li key={key} className="min-w-0">
                <Reveal delay={(index % 4) * 70} className="h-full">
                  <article
                    id={`sys-${key}`}
                    aria-labelledby={`sys-${key}-title`}
                    className="t-card t-card-hover h-full flex flex-col gap-4 p-5 sm:p-6 scroll-mt-28"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="t-icon">
                        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex flex-col items-start gap-1">
                        <h3
                          id={`sys-${key}-title`}
                          className="text-lg font-extrabold leading-snug text-ink"
                        >
                          {item.name}
                        </h3>
                        {item.hint && <span className="t-chip">{item.hint}</span>}
                      </div>
                    </div>

                    <p className="text-[15px] leading-relaxed text-ink-2">{item.desc}</p>

                    <div className="t-row p-4 flex flex-col gap-2.5">
                      <p className="text-[13px] font-bold text-ink-4">{t("demoLabel")}</p>
                      <ul className="flex flex-col gap-2 list-none p-0 m-0">
                        {(item.points ?? []).map((point) => (
                          <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-ink">
                            <Check
                              size={16}
                              strokeWidth={2.4}
                              className="text-accent mt-[3px] flex-shrink-0"
                              aria-hidden="true"
                            />
                            <span className="min-w-0">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full mt-auto"
                      aria-label={t("demoAria", { name: item.name })}
                    >
                      <span>{t("demoCta")}</span>
                      <ExternalLink size={17} aria-hidden="true" />
                    </a>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* ملحوظة مشتركة لكل الأنظمة */}
        <Reveal className="t-row flex items-center justify-center gap-2.5 px-4 py-3 text-center mx-auto w-fit max-w-full">
          <Smartphone size={18} className="text-accent flex-shrink-0" aria-hidden="true" />
          <p className="text-sm sm:text-[15px] font-semibold text-ink-3 leading-relaxed">{t("note")}</p>
        </Reveal>

        {/* بانر الطلب المخصوص */}
        <Reveal>
          <div
            className="t-card overflow-hidden px-5 py-8 sm:px-10 sm:py-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10"
            style={{
              background:
                "radial-gradient(520px 260px at 100% 0%, rgba(248,222,4,.12), transparent 70%), linear-gradient(180deg,#252522,#151513)",
              borderColor: "rgba(248,222,4,.28)",
            }}
          >
            <div className="flex flex-col gap-3 flex-1 min-w-0 text-center lg:text-start">
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight text-ink">
                {t("custom.title")}
              </h3>
              <p className="text-base text-ink-2 leading-relaxed">{t("custom.text")}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end flex-shrink-0">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <MessageCircle size={20} aria-hidden="true" />
                <span>{t("custom.whatsapp")}</span>
              </a>
              <a href={`/${locale}/form`} className="btn btn-secondary btn-lg">
                <span>{t("custom.form")}</span>
                <Arrow size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
