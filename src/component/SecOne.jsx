"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, CheckSquare, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Hook للتحقق من ظهور العنصر (مرة واحدة فقط)
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView) { // ✅ يحصل مرة واحدة بس
        setIsInView(true);
      }
    }, {
      threshold: 0.2,
      ...options
    });

    const currentTarget = targetRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, [isInView]); // ✅ متابعة الـ state

  return [targetRef, isInView];
};

// كومبوننت العد التصاعدي
const CountUp = ({ end, duration = 2, suffix = "", start = 1 }) => {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    const startCount = start;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - startCount) + startCount);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted, start]);

  useEffect(() => {
    setHasStarted(true);
  }, []);

  return <span>{count}{suffix}</span>;
};

// بيانات الإحصائيات
const statsData = {
  ar: [
    { 
      icon: Clock, 
      head: "تميز بدأت في", 
      mid: 2023, 
      id: 1, 
      description: "بداية قوية في عالم التكنولوجيا"
    },
    { 
      icon: User, 
      head: "شخص قرر التميز", 
      mid: 62, 
      id: 2, 
      description: "عملاء راضيين عن خدماتنا"
    },
    { 
      icon: CheckSquare, 
      head: "مشاريع قيد التطوير", 
      mid: 8, 
      id: 3, 
      description: "مشاريع مبتكرة في طور الإنجاز"
    },
    { 
      icon: Lightbulb, 
      head: "شركات تم خدمتها", 
      mid: 35, 
      id: 4, 
      description: "شراكات ناجحة وطويلة المدى"
    }
  ],
  en: [
    { 
      icon: Clock, 
      head: "Tamyaz Started In", 
      mid: 2023, 
      id: 1, 
      description: "Strong start in the technology world"
    },
    { 
      icon: User, 
      head: "People Chose Excellence", 
      mid: 62, 
      id: 2, 
      description: "Satisfied clients with our services"
    },
    { 
      icon: CheckSquare, 
      head: "Projects In Development", 
      mid: 8, 
      id: 3, 
      description: "Innovative projects in progress"
    },
    { 
      icon: Lightbulb, 
      head: "Companies We Served", 
      mid: 35, 
      id: 4, 
      description: "Successful long-term partnerships"
    }
  ]
};

export default function ResponsiveStatsSection() {
  const { language } = useLanguage();
  const [ref, isInView] = useInView();
  const stats = statsData[language];
  const isRTL = language === 'ar';

  return (
    <section className={`bg-black text-white py-16 px-6 ${isRTL ? 'rtl font-arabic' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        {/* عنوان القسم */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-yellow-300 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL ? 'إحصائياتنا' : 'Our Statistics'}
          </h2>
          <p className={`text-gray-300 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL 
              ? 'أرقام تعكس رحلتنا في التميز والإبداع'
              : 'Numbers that reflect our journey of excellence and innovation'
            }
          </p>
        </motion.div>

        {/* Grid Layout للكل */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ 
                opacity: 0, 
                scale: 0.8,
                y: 50
              }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1,
                y: 0
              } : { 
                opacity: 0, 
                scale: 0.8,
                y: 50
              }}
              transition={{ 
                delay: 0.2 + index * 0.1, 
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-yellow-300 rounded-2xl p-6 text-black shadow-xl hover:shadow-yellow-300/20 transition-all duration-300"
            >
              {/* الأيقونة */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-yellow-300" />
                </div>
              </div>

              {/* المحتوى */}
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold mb-2">
                  {isInView && (
                    <CountUp 
                      end={stat.mid} 
                      duration={2}
                      suffix={stat.id !== 1 ? "+" : ""}
                    />
                  )}
                </div>
                <div className={`text-sm lg:text-base font-bold leading-tight mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                  {stat.head}
                </div>
                <div className={`text-xs lg:text-sm opacity-70 ${isRTL ? 'font-arabic' : ''}`}>
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
      `}</style>
    </section>
  );
}