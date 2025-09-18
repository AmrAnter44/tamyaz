"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Hook محسن للIntersection Observer
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

// محتوى القسم
const content = {
  ar: {
    title: "في تميز هنساعدك انك تبقي مميز رقميا",
    subtitle: "هنقدر نقدملك حلول تقنيه تساعدك في:",
    points: [
      "العملاء تعرف عنك اكتر و عن اللي بتقدمة",
      "موقع احترافي مبني علي الهوية البصرية الخاصة بيك بأحدث الادوات",
      "تصميم مميز مع كل التعديلات اللي هتطلبها",
      "هنقدر نحدث اجهزة شركتك"
    ],
    cta: "ابدأ رحلتك معنا",
    experience: "+ سنوات خبرة",
    experienceNumber: "4"
  },
  en: {
    title: "At Tamyaz, We'll Help You Excel Digitally",
    subtitle: "We can provide you with technical solutions that help you with:",
    points: [
      "Customers know more about you and what you offer",
      "Professional website built on your visual identity with latest tools",
      "Unique design with all the modifications you'll request",
      "We can upgrade your company's devices"
    ],
    cta: "Start Your Journey With Us",
    experience: "+ Years Experience",
    experienceNumber: "4"
  }
};

// مكون النقطة محسن
const PointItem = React.memo(({ point, index, isRTL }) => (
  <motion.div
    initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    viewport={{ once: true }}
    className="p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default group"
  >
    <div className={`grid grid-cols-[auto_1fr] gap-4 items-start ${isRTL ? 'grid-cols-[1fr_auto]' : ''}`}>
      {isRTL && (
        <>
          <div className="text-right" style={{ direction: 'rtl' }}>
            <p className="group-hover:text-gray-700 transition-colors font-medium font-arabic">
              {point}
            </p>
          </div>
          <div className="flex-shrink-0 mt-1">
            <CheckCircle className="text-grey-700 group-hover:text-gray-700" size={24} />
          </div>
        </>
      )}
      {!isRTL && (
        <>
          <div className="flex-shrink-0 mt-1">
            <CheckCircle className="text-grey-700 group-hover:text-gray-700" size={24} />
          </div>
          <div className="text-left">
            <p className="group-hover:text-gray-700 transition-colors font-medium">
              {point}
            </p>
          </div>
        </>
      )}
    </div>
  </motion.div>
));

export default function OptimizedAboutSection() {
  const { language } = useLanguage();
  const [ref, isInView] = useInView();
  const t = useMemo(() => content[language], [language]);
  const isRTL = language === 'ar';

  return (
    <section 
      className={`py-20 px-6 bg-yellow-300 relative overflow-hidden text-black ${isRTL ? 'rtl' : 'ltr'}`} 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* خلفية متحركة مبسطة */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-300/10 rounded-full"
            style={{
              width: 150 + Math.random() * 100,
              height: 150 + Math.random() * 100,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* الجانب الأيسر - النصوص */}
          <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`} style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            {/* العنوان الرئيسي */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 
                className={`text-4xl lg:text-5xl font-bold leading-tight ${isRTL ? 'font-arabic' : ''}`}
                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
              >
                {t.title}
              </h2>
              
              <p 
                className="text-xl font-medium"
                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
              >
                {t.subtitle}
              </p>
            </motion.div>

            {/* النقاط */}
            <div className="space-y-4" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
              {t.points.map((point, index) => (
                <PointItem
                  key={index}
                  point={point}
                  index={index}
                  isRTL={isRTL}
                />
              ))}
            </div>

            {/* زرار الإجراء */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/form"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-fit"
              >
                <span>{t.cta}</span>
                <motion.div
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                </motion.div>
              </motion.a>
            </motion.div>
          </div>

          {/* الجانب الأيمن - العنصر البصري */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            {/* بطاقة الخبرة */}
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 2 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative bg-black text-white p-12 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* النجوم المتحركة مبسطة */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: 20 + Math.random() * 60 + '%',
                      top: 20 + Math.random() * 60 + '%',
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [0.5, 1, 0.5],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  >
                    <Star className="text-white" size={12} />
                  </motion.div>
                ))}
              </div>

              {/* محتوى البطاقة */}
              <div className="relative z-10 text-center text-white">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-6xl font-bold mb-4"
                >
                  {t.experienceNumber}
                </motion.div>
                <div className="text-xl font-bold">
                  {t.experience}
                </div>
              </div>
            </motion.div>

            {/* عناصر زخرفية مبسطة */}
            <motion.div
              className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full opacity-20 blur-xl"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}