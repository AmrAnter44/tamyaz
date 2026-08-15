"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import { getPortfolioEntries, getProjectLink } from "@/data/projects";
import PortfolioCard from "./PortfolioCard";

export default function ProjectsGrid() {
  const t = useTranslations('projects');
  const tPortfolio = useTranslations('portfolio');
  const locale = useLocale();
  const isRTL = locale === "ar";

  // نفس كروت صفحة الأعمال: تصنيف العيادات كارد واحد، وأول ٣ كروت بس هنا
  const entries = getPortfolioEntries().slice(0, 3);

  return (
    <div className="bg-yellow-300 py-20 px-6" dir={isRTL ? "rtl" : "ltr"}>
      <h2 className={`text-center text-4xl lg:text-5xl font-bold text-black mb-12 ${isRTL ? 'font-arabic' : ''}`}>
        {t('title')}
      </h2>

      {/* Grid Layout - أول ٣ كروت */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {entries.map((entry) => {
          if (entry.type === "category") {
            return (
              <PortfolioCard
                key={entry.id}
                href={`/${locale}/portfolio/category/${entry.category.id}`}
                title={entry.category.name[locale]}
                thumbnail={entry.category.thumbnail}
                badge={tPortfolio('viewWorks')}
                subtitle={tPortfolio('worksCount', { count: entry.count })}
              />
            );
          }

          const link = getProjectLink(entry.project, locale);
          return (
            <PortfolioCard
              key={entry.id}
              href={link.href}
              external={link.external}
              title={entry.project.name}
              thumbnail={entry.project.thumbnail}
              badge={link.external ? t('visitWebsite') : t('viewProject')}
            />
          );
        })}
      </div>

      {/* View All Projects Button */}
      <div className="text-center mt-12">
        <Link
          href={`/${locale}/portfolio`}
          className={`inline-flex items-center gap-2 px-8 py-4 bg-black text-yellow-300 border-2 border-yellow-300 font-bold text-lg rounded-full hover:bg-yellow-300 hover:text-black transition-all ${isRTL ? 'font-arabic' : ''}`}
        >
          <span>{t('viewAllProjects')}</span>
          <ArrowRight size={20} />
        </Link>
      </div>

      <style jsx>{`
        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
      `}</style>
    </div>
  );
}