"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { projectsData } from "@/data/projects";
import Nav from "../component/Nav";
import Footer from "../component/Footer";

export default function PortfolioPage() {
  const locale = useLocale();
  const t = useTranslations('portfolio');
  const isRTL = locale === "ar";

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-black py-24 px-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-center text-4xl lg:text-5xl font-bold text-yellow-300 mb-12 ${isRTL ? 'font-arabic' : ''}`}>
          {t('title')}
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
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
      </div>

      <style jsx>{`
        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
      `}</style>
    </div>
    <Footer />
    </>
  );
}
