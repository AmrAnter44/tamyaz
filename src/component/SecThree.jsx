"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Code, 
  Server, 
  Headphones, 
  Bug, 
  Shield 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Hook بسيط للIntersection Observer (مرة واحدة فقط)
const useInView = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) { // ✅ مرة واحدة بس
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isInView]);

  return [ref, isInView];
};

// بيانات التخصصات
const specializationsData = {
  ar: {
    title: "متخصصين في",
    items: [
      { jobTitle: "مصمم UI/UX", index: 1, icon: Palette },
      { jobTitle: "مطور واجهات أمامية", index: 2, icon: Code },
      { jobTitle: "مطور خلفيات", index: 3, icon: Server },
      { jobTitle: "أخصائي دعم فني", index: 4, icon: Headphones },
      { jobTitle: "مهندس اختبارات", index: 5, icon: Bug },
      { jobTitle: "أخصائي أمن سيبراني", index: 6, icon: Shield }
    ],
    teamText: "فريق متميز من الخبراء في خدمتك"
  },
  en: {
    title: "We Specialize In",
    items: [
      { jobTitle: "UI/UX Designer", index: 1, icon: Palette },
      { jobTitle: "Frontend Developer", index: 2, icon: Code },
      { jobTitle: "Backend Developer", index: 3, icon: Server },
      { jobTitle: "Technical Support Specialist", index: 4, icon: Headphones },
      { jobTitle: "QA Engineer", index: 5, icon: Bug },
      { jobTitle: "Cybersecurity Specialist", index: 6, icon: Shield }
    ],
    teamText: "An outstanding team of experts at your service"
  }
};

export default function OptimizedSpecializations() {
  const { language } = useLanguage();
  const [ref, isInView] = useInView();
  const data = specializationsData[language];
  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen bg-black text-white ${isRTL ? 'rtl font-arabic' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="py-20 px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="container mx-auto"
        >
          {/* العنوان */}
          <motion.h2 
            className={`text-center text-4xl lg:text-5xl font-bold p-4 m-4 text-white ${isRTL ? 'font-arabic' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {data.title}
          </motion.h2>
          
          {/* شبكة التخصصات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.items.map((item, index) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  delay: 0.1 + index * 0.1, 
                  duration: 0.5,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative flex flex-col justify-center items-center 
                          h-60 border-yellow-300 overflow-visible 
                          bg-gradient-to-br from-gray-900 to-black 
                          rounded-2xl border-2 hover:border-yellow-300 
                          transition-all duration-300 cursor-pointer group
                          shadow-lg hover:shadow-2xl"
              >
                {/* الأيقونة خارج المربع في الأعلى */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20"
                >
                  <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg border-4 border-black group-hover:border-yellow-300 transition-all duration-300">
                    <item.icon className="w-8 h-8 text-black" />
                  </div>
                </motion.div>

                {/* النص داخل المربع */}
                <div className="flex flex-col items-center justify-center h-full pt-8">
                  <h4 className={`text-white text-xl lg:text-2xl font-bold text-center px-4 leading-tight ${isRTL ? 'font-arabic' : ''}`}>
                    {item.jobTitle}
                  </h4>
                </div>

                {/* تأثير الهوفر */}
                <div className="absolute inset-0 bg-yellow-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl" />
              </motion.div>
            ))}
          </div>

          {/* خط فاصل في الأسفل */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent mx-auto max-w-md rounded-full"
          />

          {/* نص تشجيعي */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-yellow-300 text-xl font-bold">
              {data.teamText}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}