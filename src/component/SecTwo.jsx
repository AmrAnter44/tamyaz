"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, ArrowRight, ArrowLeft } from 'lucide-react';

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

// متغيرات الأنيميشن
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const pointVariants = {
  hidden: { 
    opacity: 0, 
    x: -50,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10
    }
  }
};

// كومبوننت قسم "عن تميز"
export default function AboutSection({ language = 'ar' }) {
  const [ref, isInView] = useInView();
  const t = content[language];
  const isRTL = language === 'ar';

  return (
    <section className={`py-20 px-6  bg-yellow-300 to-black relative overflow-hidden text-black ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* خلفية متحركة */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-300/5 rounded-full"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* الجانب الأيسر - النصوص */}
          <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* العنوان الرئيسي */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h2 
                className={`text-4xl lg:text-5xl font-bold  leading-tight ${isRTL ? 'font-arabic' : ''}`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {t.title}
              </motion.h2>
              
              <motion.p 
                className="text-xl  font-medium"
                variants={itemVariants}
              >
                {t.subtitle}
              </motion.p>
            </motion.div>

            {/* النقاط */}
            <motion.div variants={itemVariants} className="space-y-4">
              {t.points.map((point, index) => (
                <motion.div
                  key={index}
                  variants={pointVariants}
                  whileHover={{ 
                    x: isRTL ? -10 : 10, 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default group"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <CheckCircle className="text-grey-700 group-hover:text-gray-700" size={24} />
                  </motion.div>
                  <p className=" group-hover:text-gray-700 transition-colors font-medium">
                    {point}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* زرار الإجراء */}
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 208, 88, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span>{t.cta}</span>
                <motion.div
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                </motion.div>
              </motion.button>
            </motion.div>
          </div>

          {/* الجانب الأيمن - العنصر البصري */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            {/* بطاقة الخبرة */}
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative bg-black text-white p-12 rounded-3xl shadow-2xl hover:shadow-black-300/20"
            >
              {/* النجوم المتحركة */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [0.5, 1, 0.5],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  >
                    <Star className="text-white" size={16} />
                  </motion.div>
                ))}
              </div>

              {/* محتوى البطاقة */}
              <div className="relative z-10 text-center text-white">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl font-bold mb-4"
                >
                  {t.experienceNumber}
                </motion.div>
                <div className="text-xl font-bold">
                  {t.experience}
                </div>
              </div>

              {/* تأثير الإضاءة */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>

            {/* عناصر زخرفية إضافية */}
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full opacity-20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-30 blur-lg"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* خط فاصل متحرك */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="mt-20 h-1 bg-gradient-to-r from-transparent via-blackww to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}