"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import Image from 'next/image';

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

export default function EnhancedNavbar() {
  const [language, setLanguage] = useState('ar');
  const [scrolled, setScrolled] = useState(false);
  const t = content[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={`${language === 'ar' ? 'rtl font-arabic' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* شريط التنقل */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled ? "bg-black/90 text-white shadow-lg backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* زرار تبديل اللغة */}
          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 font-bold transition-all hover:scale-105 active:scale-95 ${
              scrolled 
                ? "border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black" 
                : "border-white text-white hover:bg-yellow-300 hover:text-black"
            }`}
          >
            <Globe size={18} />
            <span>{language === 'ar' ? 'EN' : 'AR'}</span>
          </button>

          {/* زرار البدء */}
          <a
            href="https://wa.me/201028418754"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-bold py-2 px-5 rounded-full text-sm border-2 transition-all hover:scale-105 active:scale-95 ${
              scrolled 
                ? "border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black" 
                : "border-white text-white hover:bg-yellow-300 hover:text-black"
            }`}
          >
            {t.startNow}
          </a>
        </div>
      </nav>

      {/* قسم البطل */}
      <section className="relative w-full h-screen bg-[url('/imgBg.png')] bg-cover bg-center md:bg-top flex items-center justify-center">
        {/* خلفية متدرجة */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/50 to-black/50" />
        
        {/* المحتوى */}
        <div className="relative z-10 text-center px-4 w-full max-w-4xl">
          {/* اللوجو */}
          <div className="mb-8">
            <div className="w-[120px] h-[120px] mx-auto mb-6">
              <Image src="/logo.svg" alt="Logo" width={120} height={120} />
            </div>
          </div>
          
          {/* النص */}
          <div className="space-y-8">
            <h1 
              className={`text-2xl lg:text-3xl font-bold text-yellow-300 typing-effect ${
                language === 'ar' ? 'font-arabic' : ''
              }`}
            >
              {t.heroText}
            </h1>
            
            <div className="text-yellow-300 text-2xl animate-bounce">
              ↓
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .typing-effect {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3s steps(20, end) forwards, blink 0.7s 4;

          padding-right: 10px;
          display: inline-block;
          animation-fill-mode: forwards;
        }



        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {

        }

        .typing-effect::after {
          content: '';
          animation: hide-cursor 0s 3s forwards;
        }

        @keyframes hide-cursor {
          to {
            border-color: transparent;
          }
        }

        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }

        /* منع السكرول الأفقي */
        html, body {
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        /* تحسين الأداء */
        * {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </main>
  );
}