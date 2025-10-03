"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';

// بيانات المشاريع (ثابتة)
const projectsList = [
  { name: "Xgym", img: "/projects/xgym.webp", link: "https://xgym.website" },
  { name: "Saif", img: "/projects/saif.webp", link: "https://coachsaif.online" },
  { name: "Wn", img: "/projects/wn.webp", link: "https://www.wnstore.website" },
  { name: "Xfit", img: "/projects/xfit.webp", link: "https://www.xfit.website" },
  { name: "Fit Boost", img: "/projects/fitboost.webp", link: "https://www.fitboost.website" },
];

export default function ProjectsSwiper() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="bg-yellow-300 py-20 px-6" dir={isRTL ? "rtl" : "ltr"}>
      <h2 className={`text-center text-4xl lg:text-5xl font-bold text-black mb-12 ${isRTL ? 'font-arabic' : ''}`}>
        {t('title')}
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        dir={isRTL ? "rtl" : "ltr"}
        className="max-w-5xl mx-auto"
      >
        {projectsList.map((project, index) => (
          <SwiperSlide key={index}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group  relative rounded-3xl overflow-hidden "
            >
              <Image
                src={project.img}
                alt={project.name}
                width={700}
                height={450}
                className="lg:h-[550px]  h-[280px] mx-auto object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                quality={75}
              />

              {/* Overlay: يظهر دايمًا في الموبايل + hover على الديسكتوب */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-6 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                <div className="text-center space-y-3">
                  <h3 className="text-white font-bold text-2xl sm:text-3xl">{project.name}</h3>
                  <div className="flex justify-center items-center gap-2 text-gray-300">
                    <span>{t('viewProject')}</span>
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* تخصيص الأزرار بالـ CSS */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #ffd058;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px !important;
          font-weight: bold;
        }
        
        .swiper-pagination-bullet {
          background: #000 !important;
          opacity: 0.4;
        }

        .swiper-pagination-bullet-active {
          background: #facc15 !important;
          opacity: 1;
        }

        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
      `}</style>
    </div>
  );
}