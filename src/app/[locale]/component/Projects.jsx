"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import { projectsData } from "@/data/projects";

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
        {projectsData.slice(0, 3).map((project) => (
          <Link
            key={project.id}
            href={`/${locale}/portfolio/${project.id}`}
            className="block group rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-300/50 transition-all duration-300 shadow-xl"
          >
            <div className="h-64 bg-black flex flex-col p-4 relative">
              {/* Clickable indicator */}
              <div className="absolute top-3 right-3 bg-yellow-300 text-black px-3 py-1.5 rounded-full text-xs font-bold z-10 flex items-center gap-1.5">
                <span className={isRTL ? 'font-arabic' : ''}>{t('viewProject')}</span>
                <ArrowRight size={11} />
              </div>

              {/* Thumbnail */}
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src={project.thumbnail}
                  alt={project.name}
                  width={144}
                  height={144}
                  className="object-contain w-36 h-36 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  quality={75}
                />
              </div>

              {/* Project name bar */}
              <div className="w-full bg-white/5 p-3 rounded-lg text-center mt-2">
                <h3 className={`text-base font-bold text-white ${isRTL ? 'font-arabic' : ''}`}>
                  {project.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
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