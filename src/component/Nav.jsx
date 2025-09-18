"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

// محتوى اللغات
const content = {
  ar: {
    startNow: "ابدأ الأن",
    heroText: "التميز يبدأ بخطوة"
  },
  en: {
    startNow: "Start Now",
    heroText: "Excellence Starts With One Step"
  }
};

// Hook محسن للسكرول
const useOptimizedScroll = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrolled;
};

export default function EnhancedNavbar() {
  const { language, toggleLanguage } = useLanguage();
  const scrolled = useOptimizedScroll();
  const t = useMemo(() => content[language], [language]);

  const navbarClasses = useMemo(() => 
    `fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      scrolled ? "bg-black/90 text-white shadow-lg backdrop-blur-sm" : "bg-transparent"
    }`, [scrolled]
  );

  const buttonClasses = useCallback((isScrolled) => 
    `flex items-center gap-2 px-5 py-2 rounded-full border-2 font-bold transition-all hover:scale-105 active:scale-95 ${
      isScrolled 
        ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black" 
        : "border-white text-white hover:bg-yellow-400 hover:text-black"
    }`, []
  );

  return (
    <main className={`${language === 'ar' ? 'rtl font-arabic' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* شريط التنقل محسن */}
      <nav className={navbarClasses} style={{ willChange: scrolled ? 'auto' : 'background-color, backdrop-filter' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* زرار تبديل اللغة */}
          <motion.button
            onClick={toggleLanguage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={buttonClasses(scrolled)}
          >
            <Globe size={18} />
            <span>{language === 'ar' ? 'EN' : 'AR'}</span>
          </motion.button>

          {/* زرار البدء */}
          <motion.a
            href="/form"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`font-bold py-2 px-5 rounded-full text-sm border-2 transition-all ${buttonClasses(scrolled)}`}
          >
            {t.startNow}
          </motion.a>
        </div>
      </nav>

      {/* قسم البطل محسن */}
      <section className="relative w-full h-screen bg-[url('/imgBg.png')] bg-cover bg-center md:bg-top flex items-center justify-center">
        {/* خلفية متدرجة */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/50 to-black/50" />
        
        {/* المحتوى */}
        <div className="relative z-10 text-center px-4 w-full max-w-4xl">
          {/* اللوجو */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-[120px] h-[120px] mx-auto mb-6">
              <Image src="/logo.svg" alt="Logo" width={120} height={120} priority />
            </div>
          </motion.div>
          
          {/* النص */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className={`text-2xl lg:text-3xl font-bold text-yellow-400 typing-effect ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t.heroText}
            </h1>
            
            <motion.div 
              className="text-yellow-400 text-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .typing-effect {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3s steps(20, end) forwards;
          border-right: 2px solid transparent;
          padding-right: 10px;
          display: inline-block;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }

        /* تحسين الأداء */
        html, body {
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        * {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </main>
  );
}