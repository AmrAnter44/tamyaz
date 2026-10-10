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
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 scroll-mt-24" dir={isRTL ? "rtl" : "ltr"}>
      <h2 className="text-center text-[28px] sm:text-4xl font-extrabold text-ink mb-10">
        {t('title')}
      </h2>

      {/* Grid Layout - أول ٣ كروت */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-[1200px] mx-auto">
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
      <div className="text-center mt-10">
        <Link
          href={`/${locale}/portfolio`}
          className="btn btn-secondary btn-lg"
        >
          <span>{t('viewAllProjects')}</span>
          <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} aria-hidden="true" />
        </Link>
      </div>

    </section>
  );
}