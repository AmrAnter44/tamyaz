"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Coffee,
  UtensilsCrossed,
  Scissors,
  Stethoscope,
  Smile,
  Pill,
  Dumbbell,
  ShoppingBag,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Reveal from "./Reveal";

// أنظمة تميز الـ٨ بالترتيب حوالين اللوجو — الأسامي من ملفات الترجمة (orbit.items)
const ICONS = {
  cafe: Coffee,
  restaurant: UtensilsCrossed,
  barber: Scissors,
  clinic: Stethoscope,
  dental: Smile,
  pharmacy: Pill,
  gym: Dumbbell,
  store: ShoppingBag,
};

// كل بلاطة بتلينك على الكارت بتاعها في قسم التفاصيل (SystemsDetails → #sys-<key>)
const DETAIL_IDS = {
  cafe: "cafe",
  restaurant: "resto",
  barber: "barber",
  clinic: "clinic",
  dental: "dental",
  pharmacy: "pharma",
  gym: "bar",
  store: "shop",
};

const ORDER = ["cafe", "restaurant", "barber", "clinic", "dental", "pharmacy", "gym", "store"];

// كل كام ثانية العنصر المميز بيتنقل للي بعده
const STEP_MS = 1800;

export default function Orbit() {
  const t = useTranslations("orbit");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const items = t.raw("items");
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // التبديل شغال بس والقسم ظاهر على الشاشة
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setActive((i) => (i + 1) % ORDER.length), STEP_MS);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <section
      id="systems"
      ref={sectionRef}
      className="relative py-16 sm:py-20 px-4 sm:px-6 scroll-mt-24"
      dir={isRTL ? "rtl" : "ltr"}
      aria-labelledby="systems-title"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-8 sm:gap-10">
        <Reveal className="text-center flex flex-col items-center gap-3 max-w-2xl">
          <span className="t-eyebrow">{t("eyebrow")}</span>
          <h2 id="systems-title" className="text-[28px] sm:text-4xl font-extrabold leading-tight text-ink">
            {t("title")}
          </h2>
          <p className="text-base text-ink-2 leading-relaxed">{t("subtitle")}</p>
        </Reveal>

        <div className="orbit-wrap">
          <div className="orbit">
            <div className="orbit-path" aria-hidden="true" />

            <div className="orbit-center">
              <Image
                src="/logo.svg"
                alt={isRTL ? "تميز — أنظمة إدارة البيزنس" : "Tamyaz — business management systems"}
                width={220}
                height={220}
              />
            </div>

            <ul className="orbit-ring" aria-label={t("title")}>
              {ORDER.map((key, index) => {
                const Icon = ICONS[key];
                const item = items?.[key] ?? { name: key };
                const isActive = index === active;
                return (
                  <li
                    key={key}
                    className="orbit-item"
                    style={{ "--a": `${(360 / ORDER.length) * index}deg` }}
                  >
                    <a
                      href={`#sys-${DETAIL_IDS[key]}`}
                      className={`orbit-tile no-underline ${isActive ? "is-active" : ""}`}
                      title={item.hint ? `${item.name} (${item.hint})` : item.name}
                    >
                      <Icon aria-hidden="true" strokeWidth={1.8} />
                      <span className="orbit-label">{item.name}</span>
                      {item.hint && (
                        <span className="orbit-hint">
                          <span className="sr-only"> — </span>
                          {item.hint}
                        </span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
