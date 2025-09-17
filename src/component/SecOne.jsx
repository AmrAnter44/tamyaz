"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, CheckSquare, Lightbulb } from 'lucide-react';

// Hook للتحقق من ظهور العنصر
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.2,
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

export default function CircularStatsSection({ language = 'ar' }) {
  const [ref, isInView] = useInView();
  const stats = statsData[language];
  const isRTL = language === 'ar';

  return (
    <section className={`bg-black text-white py-16 px-6 ${isRTL ? 'rtl font-arabic' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        {/* التخطيط الدائري */}
        <div className="relative w-full h-96 flex items-center justify-center">
          {stats.map((stat, index) => {
            const angle = (index * 360) / stats.length;
            const radius = 140;
            const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
            const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

            return (
              <motion.div
                key={stat.id}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: 0,
                  y: 0,
                  rotate: -180
                }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1,
                  x: x,
                  y: y,
                  rotate: 0
                } : { 
                  opacity: 0, 
                  scale: 0,
                  x: 0,
                  y: 0,
                  rotate: -180
                }}
                transition={{ 
                  delay: 0.3 + index * 0.15, 
                  duration: 1,
                  type: "spring",
                  stiffness: 120,
                  damping: 12
                }}
                whileHover={{ 
                  scale: 1.15,
                  rotate: 5,
                  transition: { 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300
                  }
                }}
                className="absolute w-28 h-28 bg-amber-300 rounded-full flex flex-col items-center justify-center text-black cursor-pointer shadow-2xl hover:shadow-amber-300/50 transition-all duration-300 group"
              >
                {/* الأيقونة خارج الدائرة */}
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-black rounded-full flex items-center justify-center z-10 shadow-lg"
                  whileHover={{ 
                    scale: 1.3,
                    rotate: 360,
                    y: -2
                  }}
                  transition={{ 
                    duration: 0.6,
                    type: "spring"
                  }}
                >
                  <stat.icon className="w-4 h-4 text-amber-300" />
                </motion.div>
                <div className="text-2xl font-bold mt-2">
                  {isInView && (
                    <CountUp 
                      end={stat.mid} 
                      duration={2.5}
                      suffix={stat.id !== 1 ? "+" : ""}
                    />
                  )}
                </div>
                <div className={`text-xs text-center font-bold px-1 ${isRTL ? 'font-arabic' : ''}`}>
                  {stat.head.split(' ').slice(0, 2).join(' ')}
                </div>

                {/* tooltip عند الهوفر */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: { duration: 0.2 }
                  }}
                  className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap border border-amber-300/30"
                >
                  {stat.description}
                </motion.div>
              </motion.div>
            );
          })}

          {/* خطوط الربط */}
          {stats.map((_, index) => {
            const angle = (index * 360) / stats.length;
            const startRadius = 40;
            const endRadius = 100;
            const x1 = Math.cos((angle - 90) * (Math.PI / 180)) * startRadius;
            const y1 = Math.sin((angle - 90) * (Math.PI / 180)) * startRadius;
            const x2 = Math.cos((angle - 90) * (Math.PI / 180)) * endRadius;
            const y2 = Math.sin((angle - 90) * (Math.PI / 180)) * endRadius;

            return (
              <motion.svg
                key={index}
                className="absolute inset-0 w-full h-full pointer-events-none"
                initial={{ 
                  opacity: 0,
                  pathLength: 0
                }}
                animate={isInView ? { 
                  opacity: 0.3,
                  pathLength: 1
                } : { 
                  opacity: 0,
                  pathLength: 0
                }}
                transition={{ 
                  delay: 1.8 + index * 0.08, 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              >
                <motion.line
                  x1={200 + x1}
                  y1={192 + y1}
                  x2={200 + x2}
                  y2={192 + y2}
                  stroke="#fcd34d"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isInView ? 1 : 0 }}
                  transition={{ 
                    delay: 1.8 + index * 0.08,
                    duration: 1,
                    ease: "easeInOut"
                  }}
                />
              </motion.svg>
            );
          })}
        </div>

        {/* إحصائية إضافية */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            scale: 1
          } : { 
            opacity: 0, 
            y: 80,
            scale: 0.8
          }}
          transition={{ 
            delay: 2.5, 
            duration: 1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-amber-300/10 backdrop-blur-sm px-8 py-4 rounded-full border border-amber-300/30">
            <div className="text-center">
              <motion.div 
                className="text-2xl font-bold text-amber-300"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ 
                  delay: 3,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200
                }}
              >
                100%
              </motion.div>
              <div className="text-sm text-gray-300">
                {isRTL ? 'رضا العملاء' : 'Client Satisfaction'}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* الموجة في الأسفل */}

      <style jsx>{`
        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
        
        .wave-container svg {
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
}