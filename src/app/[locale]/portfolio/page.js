"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
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
              className="block group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative w-full h-64 md:h-80">
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
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-400 via-yellow-300 to-yellow-400 flex items-center justify-center p-6 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="text-center space-y-3">
                    <h3 className={`text-black font-bold text-2xl sm:text-3xl ${isRTL ? 'font-arabic' : ''}`}>
                      {project.name}
                    </h3>
                    <p className={`text-black text-sm sm:text-base px-4 ${isRTL ? 'font-arabic' : ''}`}>
                      {project.description[locale]}
                    </p>
                  </div>
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
