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

  const relatedProjects = projectsData.filter(p => p.id !== project.id);

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-black py-24 px-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href={`/${locale}/portfolio`}
          className={`inline-flex items-center gap-2 px-4 py-2 border border-yellow-300/40 text-yellow-300 hover:bg-yellow-300 hover:text-black rounded-full font-bold text-sm transition-all mb-8 ${isRTL ? 'font-arabic' : ''}`}
        >
          {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
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
            <div key={index} className="relative w-full sm:w-80 h-[420px] shadow-xl">
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

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-20">
            <h2 className={`text-2xl font-bold text-yellow-300 mb-8 ${isRTL ? 'font-arabic' : ''}`}>
              {t('relatedProjects')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
              {relatedProjects.map((related) => (
                <Link
                  key={related.id}
                  href={`/${locale}/portfolio/${related.id}`}
                  className="flex-1 block group rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-300/50 transition-all duration-300 shadow-xl"
                >
                  <div className="h-52 bg-black flex flex-col p-4 relative">
                    <div className="absolute top-3 right-3 bg-yellow-300 text-black px-3 py-1.5 rounded-full text-xs font-bold z-10 flex items-center gap-1.5">
                      <span className={isRTL ? 'font-arabic' : ''}>{t('viewProject')}</span>
                      <ArrowRight size={11} />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <Image
                        src={related.thumbnail}
                        alt={related.name}
                        width={120}
                        height={120}
                        className="object-contain w-28 h-28 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        quality={75}
                      />
                    </div>
                    <div className="w-full bg-white/5 rounded-lg text-center mt-2" style={{ padding: '10px' }}>
                      <h3 className={`text-sm font-bold text-white ${isRTL ? 'font-arabic' : ''}`}>
                        {related.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
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
