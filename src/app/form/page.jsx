"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Home, MessageCircle, ArrowLeft, ArrowRight, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const formContent = {
  ar: {
    title: "نموذج التسجيل",
    backToHome: "العودة للرئيسية",
    contactWhatsApp: "تواصل عبر واتساب",
    description: "املأ النموذج أدناه وسنتواصل معك قريباً"
  },
  en: {
    title: "Registration Form",
    backToHome: "Back to Home",
    contactWhatsApp: "Contact via WhatsApp",
    description: "fill out the form below and we'll contact you soon"
  }
};

export default function Form() {
  const { language, toggleLanguage } = useLanguage();
  const content = formContent[language];
  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen bg-black text-white ${isRTL ? 'rtl font-arabic' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* شريط علوي مثل الناف */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-black/90 text-white shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* زرار تبديل اللغة */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-5 py-2 rounded-full border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold transition-all hover:scale-105 active:scale-95"
          >
            <Globe size={18} />
            <span>{language === 'ar' ? 'EN' : 'AR'}</span>
          </button>

          {/* زرار العودة للرئيسية */}
          <a
            href="/"
            className="flex items-center gap-2 font-bold py-2 px-5 rounded-full text-sm border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all hover:scale-105 active:scale-95"
          >
            {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <Home size={16} />
            <span>{content.backToHome}</span>
          </a>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <div className="pt-24 pb-8 px-4">
        {/* العنوان والوصف */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl lg:text-5xl font-bold mb-4 text-yellow-400 ${isRTL ? 'font-arabic' : ''}`}>
            {content.title}
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            {content.description}
          </p>
        </motion.div>

        {/* النموذج */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScSZa4T1yLUIQs-PpJTiKWZ5XHeAzGO4wAEBm4wgbui-zecJQ/viewform?embedded=true"
              width="500"
              height="1400"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="block"
            >
              Loading…
            </iframe>
          </div>
        </motion.div>

        {/* زرار الواتساب في الأسفل */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center items-center mt-8"
        >
          <motion.a
            href="https://wa.me/201055119164"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 rounded-full font-bold transition-all duration-300"
          >
            <MessageCircle size={20} />
            <span>{content.contactWhatsApp}</span>
          </motion.a>
        </motion.div>

        {/* معلومات إضافية */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 max-w-2xl mx-auto"
        >
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30">
            <h3 className="text-yellow-400 font-bold text-lg mb-2">
              {isRTL ? 'لماذا تختار تمرير؟' : 'Why Choose Tamyaz?'}
            </h3>
            <p className="text-white text-sm">
              {isRTL 
                ? 'نحن متخصصون في تطوير المواقع والتطبيقات بأحدث التقنيات لنساعدك في تحقيق أهدافك الرقمية'
                : 'We specialize in developing websites and applications with the latest technologies to help you achieve your digital goals'
              }
            </p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
      `}</style>
    </div>
  );
} 