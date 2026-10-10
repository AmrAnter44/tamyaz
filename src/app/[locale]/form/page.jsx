"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Home, MessageCircle, ArrowLeft, ArrowRight, Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import Image from 'next/image';

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
    <div className={`relative z-10 min-h-screen text-ink ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* شريط علوي */}
      <nav className="fixed top-0 inset-x-0 z-40 px-4 sm:px-6 pt-3 sm:pt-4">
        <div className="t-glass max-w-[1200px] mx-auto rounded-full ps-3 pe-2 sm:ps-4 py-2 flex items-center gap-2 sm:gap-3">
          <a href={`/${locale}`} className="flex items-center gap-2.5 me-auto min-h-11 min-w-0" aria-label="Tamyaz">
            <Image src="/logo.svg" alt="Tamyaz" width={36} height={36} priority className="w-9 h-9 shrink-0 object-contain" />
            <span className="hidden min-[400px]:inline font-extrabold text-lg truncate">{isRTL ? 'تميز' : 'Tamyaz'}</span>
          </a>
          {/* زرار تبديل اللغة */}
          <button
            onClick={toggleLanguage}
            aria-label={isRTL ? 'English' : 'العربية'}
            className="btn btn-secondary !px-4"
          >
            <Globe size={18} />
            <span>{locale === 'ar' ? 'EN' : 'AR'}</span>
          </button>

          {/* زرار العودة للرئيسية */}
          <a
            href={`/${locale}`}
            className="btn btn-primary !px-4"
          >
            {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <Home size={16} />
            <span className="hidden sm:inline">{t('backToHome')}</span>
          </a>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <div className="pt-28 sm:pt-32 pb-28 px-4 sm:px-6">
        {/* العنوان والوصف */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8 flex flex-col items-center gap-3"
        >
          <h1 className="text-[32px] sm:text-5xl font-extrabold text-ink leading-tight">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-ink-3 max-w-2xl mx-auto leading-relaxed">
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
          <div className="t-card p-2 sm:p-3 w-full max-w-3xl">
            <div className="bg-white rounded-[16px] overflow-hidden">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScSZa4T1yLUIQs-PpJTiKWZ5XHeAzGO4wAEBm4wgbui-zecJQ/viewform?embedded=true"
              className="block w-full h-[1400px] max-w-2xl mx-auto px-1 sm:px-4 py-4 sm:py-6"
              title="Tamyaz Registration Form"
            >
              Loading…
            </iframe>
            </div>
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
            href="https://wa.me/201028518754"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-secondary btn-lg"
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
          <div className="t-card p-6 sm:p-8">
            <h3 className="text-accent font-bold text-lg mb-2">
              {t('whyChoose')}
            </h3>
            <p className="text-ink-3 text-sm sm:text-base leading-relaxed">
              {t('whyChooseText')}
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  );
}