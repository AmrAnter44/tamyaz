"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useLocale } from "next-intl";

// كارد واحد في شبكة الأعمال — بيستخدم للمشروع وللتصنيف المجمّع
// external = الكارد بيفتح موقع خارجي في تاب جديد بدل صفحة جوّه الموقع
// compact = المقاس الأصغر المستخدم في "مشاريع ذات صلة"
export default function PortfolioCard({ href, title, thumbnail, badge, subtitle, external, compact }) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const Wrapper = external ? "a" : Link;
  const wrapperProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <Wrapper
      {...wrapperProps}
      className={`t-card t-card-hover block group overflow-hidden min-w-0 ${compact ? 'flex-1' : ''}`}
    >
      <div className={`${compact ? 'h-52' : 'h-64'} flex flex-col p-4 relative`}>
        {/* Clickable indicator */}
        <div className="absolute top-3 end-3 bg-accent text-on-accent px-3 py-1.5 rounded-full text-xs font-bold z-10 flex items-center gap-1.5 shadow-[0_8px_20px_-10px_rgba(248,222,4,0.6)]">
          <span>{badge}</span>
          <span className={`transition-transform duration-300 ${isRTL ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`}>
            {external ? <ExternalLink size={11} /> : <ArrowRight size={11} className={isRTL ? "rotate-180" : ""} />}
          </span>
        </div>

        {/* Thumbnail */}
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={thumbnail}
            alt={title}
            width={compact ? 120 : 144}
            height={compact ? 120 : 144}
            className={`object-contain group-hover:scale-105 transition-transform duration-300 ${compact ? 'w-28 h-28' : 'w-36 h-36'}`}
            loading="lazy"
            quality={75}
          />
        </div>

        {/* Title bar */}
        <div className={`w-full t-row text-center mt-2 ${compact ? 'p-2.5' : 'p-3'}`}>
          <h3 className={`font-bold text-ink ${compact ? 'text-sm' : 'text-base'}`}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-ink-2 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

    </Wrapper>
  );
}
