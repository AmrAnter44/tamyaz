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
            className="block group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative w-full h-92 md:h-80" style={{ background: project.thumbnailBg || '#000' }}>
              <Image
                src={project.thumbnail}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500"
                loading="lazy"
                quality={75}
              />

              {/* Overlay ذهبي ينزل من فوق عند الـ hover */}
              <div className="absolute inset-0 bg-black  flex items-center justify-center p-6 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="text-center space-y-3">
                  <h3 className={`text-yellow-300 font-bold text-2xl sm:text-3xl ${isRTL ? 'font-arabic' : ''}`}>
                    {project.name}
                  </h3>
                  <div className="flex justify-center items-center gap-2 text-yellow-300">
                    <span className={`font-semibold ${isRTL ? 'font-arabic' : ''}`}>{t('viewProject')}</span>
                    <ArrowRight size={20} />
                  </div>
                </div>
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