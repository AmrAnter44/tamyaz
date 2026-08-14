"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from 'next-intl';
import { projectsData } from "@/data/projects";
import { Instagram, ExternalLink, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X, Maximize2, Check } from "lucide-react";
import { notFound } from "next/navigation";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";

export default function ProjectDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('portfolio');
  const isRTL = locale === "ar";

  // نسبة أبعاد كل صورة تتقرأ من الصورة نفسها عشان الطولي والعرضي يظهروا كاملين من غير قص
  const [ratios, setRatios] = useState({});
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const project = projectsData.find(p => p.id === params.projectId);

  // المشروع ممكن يقسّم صوره لمجموعات (نظام / تطبيق) بدل معرض واحد مخلوط
  const groups = project?.imageGroups;
  const [group, setGroup] = useState(0);
  const images = groups ? (groups[group]?.images ?? []) : (project?.images ?? []);
  const count = images.length;

  const go = useCallback((step) => {
    setCurrent((i) => (i + step + count) % count);
  }, [count]);

  // الرجوع لأول صورة عند الانتقال لمشروع تاني من "مشاريع ذات صلة"
  useEffect(() => {
    setCurrent(0);
    setGroup(0);
    setZoomed(false);
  }, [params.projectId]);

  // تبديل المجموعة يرجّع المعرض لأول صورة فيها
  useEffect(() => {
    setCurrent(0);
  }, [group]);

  // أسهم الكيبورد و Esc — تشتغل في وضع التكبير وفي السلايدر العادي
  useEffect(() => {
    if (count < 2 && !zoomed) return;
    const onKey = (e) => {
      if (e.key === "Escape") setZoomed(false);
      if (e.key === "ArrowRight") go(isRTL ? -1 : 1);
      if (e.key === "ArrowLeft") go(isRTL ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, zoomed, isRTL, go]);


  // منع تمرير الصفحة خلف طبقة التكبير
  useEffect(() => {
    document.body.style.overflow = zoomed ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [zoomed]);

  if (!project) {
    notFound();
  }

  const relatedProjects = projectsData.filter(p => p.id !== project.id);

  // نسبة الصورة الحالية، وإلا آخر نسبة معروفة، وإلا 16/9 لحد ما تحمّل
  const ratio = ratios[current] ?? Object.values(ratios)[0] ?? 16 / 9;
  // العرض محكوم بالاتنين: عرض الحاوية وارتفاع الشاشة — عشان الطولي مايطولش والعريض ياخد راحته
  // --cap بيتغيّر حسب حجم الشاشة من الـCSS تحت: أوسع على الموبايل عشان الصور الطولية ماتطلعش ضيقة
  const slideStyle = { aspectRatio: String(ratio), "--r": ratio };

  const onTouchStart = (e) => setTouchStartX(e.changedTouches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX === null || count < 2) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) go(delta > 0 ? (isRTL ? 1 : -1) : (isRTL ? -1 : 1));
    setTouchStartX(null);
  };

  const rememberRatio = (i) => (e) =>
    setRatios((prev) => ({
      ...prev,
      [i]: e.currentTarget.naturalWidth / e.currentTarget.naturalHeight,
    }));

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

        {/* Project Images Gallery — سلايدر بصورة واحدة كبيرة + مصغرات + تكبير */}
        {count > 0 && (
          <div className="max-w-4xl mx-auto">
            {/* تبويبات فصل المجموعات — عرض كامل ومتقسّمة بالتساوي عشان تتدوس بسهولة على الموبايل */}
            {groups?.length > 1 && (
              <div className="flex gap-2 p-1 mb-5 rounded-full border border-white/10 bg-white/5">
                {groups.map((g, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setGroup(i)}
                    aria-current={i === group}
                    className={`flex-1 min-w-0 px-3 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-colors ${isRTL ? 'font-arabic' : ''} ${
                      i === group
                        ? 'bg-yellow-300 text-black'
                        : 'text-yellow-300/80 hover:text-yellow-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="block truncate">{g.label[locale]}</span>
                    <span className="block text-[10px] font-normal opacity-70" dir="ltr">{g.images.length}</span>
                  </button>
                ))}
              </div>
            )}

            {/* الصورة الحالية */}
            <div
              className="slide relative mx-auto rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-xl group"
              style={slideStyle}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${project.name} - ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className={`object-contain transition-opacity duration-300 ${index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  quality={85}
                  priority={index === 0}
                  onLoad={rememberRatio(index)}
                />
              ))}

              {/* زرار التكبير */}
              <button
                type="button"
                onClick={() => setZoomed(true)}
                aria-label={isRTL ? "تكبير الصورة" : "Zoom image"}
                className="absolute top-3 start-3 z-10 p-2 rounded-full bg-black/60 text-yellow-300 border border-white/10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity"
              >
                <Maximize2 size={16} />
              </button>

              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(isRTL ? 1 : -1)}
                    aria-label={isRTL ? "السابق" : "Previous"}
                    className="absolute top-1/2 -translate-y-1/2 start-3 z-10 p-2 rounded-full bg-black/60 hover:bg-yellow-300 text-yellow-300 hover:text-black border border-white/10 transition-colors"
                  >
                    {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => go(isRTL ? -1 : 1)}
                    aria-label={isRTL ? "التالي" : "Next"}
                    className="absolute top-1/2 -translate-y-1/2 end-3 z-10 p-2 rounded-full bg-black/60 hover:bg-yellow-300 text-yellow-300 hover:text-black border border-white/10 transition-colors"
                  >
                    {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                  </button>
                  <div dir="ltr" className="absolute bottom-3 end-3 z-10 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-bold text-white">
                    {current + 1} / {count}
                  </div>
                </>
              )}
            </div>

          </div>
        )}

        {/* طبقة التكبير */}
        {zoomed && (
          <div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setZoomed(false)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setZoomed(false)}
              aria-label={isRTL ? "إغلاق" : "Close"}
              className="absolute top-5 end-5 p-2 rounded-full bg-white/10 hover:bg-yellow-300 text-yellow-300 hover:text-black transition-colors"
            >
              <X size={22} />
            </button>

            <div
              className="relative w-full h-full max-w-[95vw] max-h-[88vh]"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <Image
                src={images[current]}
                alt={`${project.name} - ${current + 1}`}
                fill
                sizes="95vw"
                className="object-contain"
                quality={90}
              />
            </div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); go(isRTL ? 1 : -1); }}
                  aria-label={isRTL ? "السابق" : "Previous"}
                  className="absolute top-1/2 -translate-y-1/2 start-4 p-3 rounded-full bg-white/10 hover:bg-yellow-300 text-yellow-300 hover:text-black transition-colors"
                >
                  {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); go(isRTL ? -1 : 1); }}
                  aria-label={isRTL ? "التالي" : "Next"}
                  className="absolute top-1/2 -translate-y-1/2 end-4 p-3 rounded-full bg-white/10 hover:bg-yellow-300 text-yellow-300 hover:text-black transition-colors"
                >
                  {isRTL ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                </button>
                <div dir="ltr" className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 text-sm font-bold text-white">
                  {current + 1} / {count}
                </div>
              </>
            )}
          </div>
        )}

        {/* Project Video */}
        {project.video && (
          <div className="mt-12">
            <video
              src={project.video}
              controls
              className="w-full rounded-2xl shadow-xl max-h-screen"
              preload="metadata"
            />
          </div>
        )}

        {/* تفاصيل المشروع ومكاسبه — تظهر بس لو المشروع فيه المعلومات دي */}
        {(project.features?.[locale]?.length || project.benefits?.[locale]?.length) && (
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {project.features?.[locale]?.length > 0 && (
              <section>
                <h2 className={`text-2xl font-bold text-yellow-300 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                  {t('features')}
                </h2>
                <ul className="space-y-3">
                  {project.features[locale].map((item, i) => (
                    <li
                      key={i}
                      className={`flex gap-3 text-gray-300 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}
                    >
                      <span aria-hidden="true" className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-yellow-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.benefits?.[locale]?.length > 0 && (
              <section>
                <h2 className={`text-2xl font-bold text-yellow-300 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                  {t('benefits')}
                </h2>
                <ul className="space-y-3">
                  {project.benefits[locale].map((item, i) => (
                    <li
                      key={i}
                      className={`flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-gray-200 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}
                    >
                      <Check size={18} className="shrink-0 mt-1 text-yellow-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

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
        /* عرض الصورة محكوم بعرض الحاوية وارتفاع الشاشة مع بعض.
           على الموبايل بنسمح بارتفاع أكبر عشان لقطات الموبايل الطولية تاخد عرض الشاشة */
        .slide {
          /* لازم يفضل مكان تحت الصورة للنقط، فالسقف أقل من ارتفاع الشاشة */
          --cap: 62vh;
          width: min(100%, calc(var(--cap) * var(--r)));
        }
        @media (min-width: 640px) {
          .slide {
            --cap: 70vh;
          }
        }
      `}</style>
    </div>
    <Footer />
    </>
  );
}
