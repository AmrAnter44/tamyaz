"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ExternalLink } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const projectsData = {
  ar: {
    title: "أخر المشاريع",
    viewProject: "عرض المشروع",
    projects: [
      { name: "Xgym", img: "/projects/xgym.png", link: "https://xgym.website" },
      { name: "Saif", img: "/projects/saif.png", link: "https://coachsaif.online" },
      { name: "Wn", img: "/projects/wn.png", link: "https://wn-store-master.vercel.app/" },
      { name: "Xfit", img: "/projects/xfit.png", link: "https://www.xfit.website/" },
    ],
  },
  en: {
    title: "Latest Projects",
    viewProject: "View Project",
    projects: [
      { name: "Xgym", img: "/projects/xgym.png", link: "https://xgym.website" },
      { name: "Saif", img: "/projects/saif.png", link: "https://coachsaif.online" },
      { name: "Wn", img: "/projects/wn.png", link: "https://wn-store-master.vercel.app/" },
      { name: "Xfit", img: "/projects/xfit.png", link: "https://www.xfit.website/" },
    ],
  },
};

export default function ProjectsSwiper() {
  const { language } = useLanguage();
  const data = projectsData[language];
  const isRTL = language === "ar";

  return (
    <div className=" bg-yellow-300 py-20 px-6" dir={isRTL ? "rtl" : "ltr"}>
      <h2 className="text-center text-4xl lg:text-5xl font-bold text-black mb-12">
        {data.title}
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
        {data.projects.map((project, index) => (
          <SwiperSlide key={index}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl"
            >
              <img
                src={project.img}
                alt={project.name}
                className="lg:h-[450px] h-[280px]  mx-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay: يظهر دايمًا في الموبايل + hover على الديسكتوب */}
              <div className={`
  absolute inset-0 
  bg-gradient-to-t from-black/80 via-transparent to-transparent 
  flex items-end justify-center p-6 
  opacity-100 sm:opacity-0 sm:group-hover:opacity-100
`}
>
                <div className="text-center space-y-3">
                  <h3 className="text-white font-bold text-2xl sm:text-3xl">{project.name}</h3>
                  <div className="flex justify-center items-center gap-2 text-gray-300">
                    <span>{data.viewProject}</span>
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
          color:#ffd058; /* لون الأسهم */
 


          display: flex;
          align-items: center;
          justify-content: center;

        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px !important; /* حجم الأيقونة */
          font-weight: bold;
        }
          /* اللون العادي */
.swiper-pagination-bullet {
  background: #000 !important; /* غير اللون اللي يعجبك */
  opacity: 0.4; /* عشان الباقي يبان انه مش Active */
}

/* اللون لما يكون Active */
.swiper-pagination-bullet-active {
  background: #facc15 !important; /* هنا حط لونك الأساسي مثلاً أصفر Tailwind (yellow-400) */
  opacity: 1;
}
      `}</style>
    </div>
  );
}
