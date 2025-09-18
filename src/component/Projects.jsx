"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Hook للتحقق من ظهور العنصر
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.1,
      ...options
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [options]);

  return [targetRef, isInView];
};

// بيانات المشاريع
const projectsData = {
  ar: {
    title: "أخر المشاريع",
    viewProject: "عرض المشروع",
    projects: [
      { name: "Xgym", img: "/projects/xgym.png", link: "https://xgym.website" },
      { name: "Saif", img: "/projects/saif.png", link: "https://coachsaif.online" },
      { name: "Wn", img: "/projects/wn.png", link: "https://wn-store-master.vercel.app/" },
      { name: "Xfit", img: "/projects/xfit.png", link: "https://www.xfit.website/" },
    ]
  },
  en: {
    title: "Latest Projects",
    viewProject: "View Project",
    projects: [
      { name: "Xgym", img: "/projects/xgym.png", link: "https://xgym.website" },
      { name: "Saif", img: "/projects/saif.png", link: "https://coachsaif.online" },
      { name: "Wn", img: "/projects/wn.png", link: "https://wn-store-master.vercel.app/" },
      { name: "Xfit", img: "/projects/xfit.png", link: "https://www.xfit.website/" },
    ]
  }
};

export default function ProjectsWithRealImages() {
  const { language } = useLanguage();
  const [ref, isInView] = useInView();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState({});
  const data = projectsData[language];
  const isRTL = language === 'ar';

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.projects.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [data.projects.length]);

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.projects.length);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? data.projects.length - 1 : prevIndex - 1
    );
  };

  const handleImageError = (index) => {
    setImgErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className={`min-h-screen bg-yellow-300 text-white ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="py-20 px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* العنوان */}
          <motion.h2 
            className={`text-center text-4xl lg:text-5xl font-bold p-4 m-4 text-black mb-8 ${isRTL ? 'font-arabic' : ''}`}
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {data.title}
          </motion.h2>

          {/* المشروع الرئيسي */}
          <div className="relative max-w-4xl mx-auto mb-12">
            {/* أزرار التنقل */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(252, 211, 77, 0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className={`absolute top-1/2 ${isRTL ? 'right-4' : 'left-4'} transform -translate-y-1/2 z-10 
                bg-black/50 hover:bg-black/20 text-gray-300 p-3 rounded-full 
                transition-all duration-300 backdrop-blur-sm`}
            >
              {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(252, 211, 77, 0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className={`absolute top-1/2 ${isRTL ? 'left-4' : 'right-4'} transform -translate-y-1/2 z-10 
                bg-black/50 hover:bg-black/20 text-gray-300 p-3 rounded-full 
                transition-all duration-300 backdrop-blur-sm`}
            >
              {isRTL ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </motion.button>

            {/* المشروع المعروض */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                <motion.a
                  href={data.projects[currentIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="block group"
                >
                  <div className="relative w-96 mx-auto  overflow-hidden rounded-3xl 
                    transition-all duration-300 shadow-xl hover:shadow-2xl">
                    
                    {/* الصورة أو fallback */}
                    {!imgErrors[currentIndex] ? (
                      <img 
                        src={data.projects[currentIndex].img}
                        alt={data.projects[currentIndex].name}
                        className="w-96 mt-auto object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={() => handleImageError(currentIndex)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-8xl font-bold text-gray-300/30">
                          {data.projects[currentIndex].name.charAt(0)}
                        </div>
                      </div>
                    )}

                    {/* Overlay مع معلومات المشروع */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
                      opacity-0 group-hover:opacity-100 transition-all duration-300 
                      flex items-end justify-center p-8">
                      
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-center space-y-4"
                      >
                        <h3 className={`text-white font-bold text-3xl ${isRTL ? 'font-arabic' : ''}`}>
                          {data.projects[currentIndex].name}
                        </h3>
                        <div className="flex items-center justify-center gap-2 text-gray-300">
                          <span className={`text-lg ${isRTL ? 'font-arabic' : ''}`}>
                            {data.viewProject}
                          </span>
                          <ExternalLink size={20} />
                        </div>
                      </motion.div>
                    </div>

                    {/* أيقونة الرابط */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute top-6 right-6 bg-black/60 p-3 rounded-full text-gray-300 
                        backdrop-blur-sm"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.div>

                    {/* شريط التقدم */}
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-black/30">
                      <motion.div 
                        className="h-full bg-black"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "linear" }}
                        key={currentIndex}
                      />
                    </div>
                  </div>
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* مؤشرات المشاريع */}
          <div className="flex justify-center gap-4 mb-12">
            {data.projects.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-black scale-125 shadow-lg shadow-gray-300/50' 
                    : 'bg-black hover:bg-black/50'
                }`}
              />
            ))}
          </div>

          {/* عرض مصغر للمشاريع الأخرى */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {data.projects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setCurrentIndex(index)}
                className="cursor-pointer rounded-xl overflow-hidden transition-all duration-300"
              >
                <div className="relative w-full h-24">
                  {!imgErrors[index] ? (
                    <img 
                      src={project.img}
                      alt={project.name}
                      className="w-32  rounded-lg"
                      loading="lazy"
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className="w-72  bg-gray-800 flex items-center justify-center rounded-lg">
                      <span className="text-amber-300 font-bold text-xl">
                        {project.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {index === currentIndex && (
                    <div className="absolute inset-0  rounded-lg"></div>
                  )}
                </div>
                
                <div className="p-2 bg-black">
                  <h4 className={`text-white text-sm font-bold text-center ${isRTL ? 'font-arabic' : ''}`}>
                    {project.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>


    </div>
  );
}