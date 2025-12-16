"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Home, MessageCircle, ArrowLeft, ArrowRight, Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export default function Form() {
  const t = useTranslations('form');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isRTL = locale === 'ar';

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={`relative z-10 min-h-screen bg-black text-white ${isRTL ? 'rtl font-arabic' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* شريط علوي */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-black/90 text-white shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* زرار تبديل اللغة */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-5 py-2 rounded-full border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold transition-all hover:scale-105 active:scale-95"
          >
            <Globe size={18} />
            <span>{locale === 'ar' ? 'EN' : 'AR'}</span>
          </button>

          {/* زرار العودة للرئيسية */}
          <a
            href={`/${locale}`}
            className="flex items-center gap-2 font-bold py-2 px-5 rounded-full text-sm border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all hover:scale-105 active:scale-95"
          >
            {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <Home size={16} />
            <span>{t('backToHome')}</span>
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
            {t('title')}
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* النموذج */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-3xl">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScSZa4T1yLUIQs-PpJTiKWZ5XHeAzGO4wAEBm4wgbui-zecJQ/viewform?embedded=true"
              className="w-full h-[1400px] max-w-2xl mx-auto px-4 py-6"
              title="Tamyaz Registration Form"
            >
              Loading…
            </iframe>
          </div>
        </motion.div>

        {/* زرار الواتساب */}
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
            <span>{t('contactWhatsApp')}</span>
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
              {t('whyChoose')}
            </h3>
            <p className="text-white text-sm">
              {t('whyChooseText')}
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