"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from 'next-intl';
import { projectsData } from "@/data/projects";
import { Instagram, ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";

export default function ProjectDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('portfolio');
  const isRTL = locale === "ar";

  const project = projectsData.find(p => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-black py-24 px-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href={`/${locale}/portfolio`}
          className={`inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-400 transition-colors mb-8 ${isRTL ? 'font-arabic' : ''}`}
        >
          {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          <span>{t('backToPortfolio')}</span>
        </Link>

        {/* Project Title */}
        <h1 className={`text-4xl lg:text-5xl font-bold text-yellow-300 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
          {project.name}
        </h1>

        {/* Project Description */}
        <p className={`text-gray-300 text-lg lg:text-xl mb-8 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
          {project.description[locale]}
        </p>

        {/* Social Links */}
        <div className="flex gap-4 mb-12">
          {project.websiteLink && (
            <a
              href={project.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 bg-yellow-300 text-black font-bold rounded-full hover:bg-yellow-400 transition-colors ${isRTL ? 'font-arabic' : ''}`}
            >
              <ExternalLink size={20} />
              <span>{t('visitWebsite')}</span>
            </a>
          )}
          {project.instagramLink && (
            <a
              href={project.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-yellow-300 text-yellow-300 font-bold rounded-full hover:bg-yellow-300 hover:text-black transition-colors ${isRTL ? 'font-arabic' : ''}`}
            >
              <Instagram size={20} />
              <span>{t('followOnInstagram')}</span>
            </a>
          )}
        </div>

        {/* Project Images Gallery */}
        <div className="flex flex-wrap justify-center gap-3">
          {project.images.map((image, index) => (
            <div key={index} className="relative w-full sm:w-80 h-[380px] shadow-xl">
              <Image
                src={image}
                alt={`${project.name} - ${index + 1}`}
                fill
                sizes="(max-width: 668px)"
                className="object-cover"
                quality={85}
              />
            </div>
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
