"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import { projectsData, getProjectLink } from "@/data/projects";
import PortfolioCard from "./PortfolioCard";

export default function ProjectsGrid() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="bg-yellow-300 py-20 px-6" dir={isRTL ? "rtl" : "ltr"}>
      <h2 className={`text-center text-4xl lg:text-5xl font-bold text-black mb-12 ${isRTL ? 'font-arabic' : ''}`}>
        {t('title')}
      </h2>

      {/* Grid Layout - Only first 3 projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projectsData.slice(0, 3).map((project) => {
          const link = getProjectLink(project, locale);
          return (
            <PortfolioCard
              key={project.id}
              href={link.href}
              external={link.external}
              title={project.name}
              thumbnail={project.thumbnail}
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