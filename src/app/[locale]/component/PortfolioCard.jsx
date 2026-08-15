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
      className={`block group rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-300/50 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(253,224,71,0.55)] transition duration-300 shadow-xl ${compact ? 'flex-1' : ''}`}
    >
      <div className={`${compact ? 'h-52' : 'h-64'} bg-black flex flex-col p-4 relative`}>
        {/* Clickable indicator */}
        <div className="absolute top-3 right-3 bg-yellow-300 text-black px-3 py-1.5 rounded-full text-xs font-bold z-10 flex items-center gap-1.5">
          <span className={isRTL ? "font-arabic" : ""}>{badge}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            {external ? <ExternalLink size={11} /> : <ArrowRight size={11} />}
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
        <div className={`w-full bg-white/5 rounded-lg text-center mt-2 ${compact ? 'p-2.5' : 'p-3'}`}>
          <h3 className={`font-bold text-white ${compact ? 'text-sm' : 'text-base'} ${isRTL ? "font-arabic" : ""}`}>
            {title}
          </h3>
          {subtitle && (
            <p className={`text-xs text-white/50 mt-1 ${isRTL ? "font-arabic" : ""}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
      `}</style>
    </Wrapper>
  );
}
