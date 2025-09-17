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
  }, []);

  return [targetRef, isInView];
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
    ]
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
    ]
  }
};

// متغيرات الأنيميشن
const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function OriginalSpecializations({ language = 'ar' }) {
  const [ref, isInView] = useInView();
  const data = specializationsData[language];
  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen bg-black text-white ${isRTL ? 'rtl font-arabic' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="py-20 px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          className="container mx-auto"
        >
          {/* العنوان */}
          <motion.h2 
            className={`text-center text-4xl lg:text-5xl font-bold p-4 m-4 text-white ${isRTL ? 'font-arabic' : ''}`}
            variants={fadeInUp}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            {data.title}
          </motion.h2>
          
          {/* شبكة التخصصات */}
          <div className="flex flex-row flex-wrap justify-center items-center gap-6">
            {data.items.map((item, index) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={
                  isInView 
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 100, scale: 0.8 }
                }
                transition={{ 
                  delay: 0.2 + index * 0.1, 
                  duration: 0.7,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 0,
                  y: -10
                }}
                className="relative flex flex-col justify-center items-center 
                          h-60 w-60 m-5 border-amber-300 overflow-hidden 
                          bg-gradient-to-br from-gray-900 to-black 
                          rounded-2xl border-2 hover:border-amber-300 
                          transition-all duration-300 cursor-pointer group
                          shadow-lg hover:shadow-2xl"
              >
                {/* خلفية العنوان */}
                <h4
                  className="absolute inset-0 flex items-center justify-center 
                           text-white text-2xl lg:text-3xl font-extrabold opacity-60 
                           pointer-events-none text-center px-2 z-10"
                >
                  {item.jobTitle}
                </h4>

                {/* الأيقونة */}
                <motion.div
                  whileHover={{ 
                     
                    scale: 1.2 
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative z-20 mb-4"
                >
                  <div className="p-4  rounded-2xl">
                    <item.icon className="w-16 h-16 text-white mb-18" />
                  </div>
                </motion.div>

                {/* تأثير الهوفر */}
                <div className="absolute inset-0 bg-amber-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl" />
                
                {/* تأثير الإضاءة */}
                <motion.div
                  className="absolute top-4 -right-4 w-8 h-8 bg-amber-300/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={isInView ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3]
                  } : {}}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />

                {/* خط سفلي */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-300 transform scale-x-0  transition-transform duration-300 origin-center" />
              </motion.div>
            ))}
          </div>

          {/* خط فاصل في الأسفل */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-16 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto max-w-md rounded-full"
          />

          {/* نص تشجيعي */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-amber-300 text-xl font-bold">
              {isRTL 
                ? "فريق متميز من الخبراء في خدمتك"
                : "An outstanding team of experts at your service"
              }
            </p>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}
 
