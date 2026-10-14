"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, MessageCircle, Facebook, Instagram } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { SYSTEM_ORDER, SYSTEM_SLUGS } from '@/content/system-links';

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

// مكون الشبكة الاجتماعية محسن مع aria-label
const SocialIcon = React.memo(({ icon: Icon, link, hoverColor, index, label }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    viewport={{ once: true }}
    whileTap={{ scale: 0.95 }}
    className={`${hoverColor} w-11 h-11 inline-flex items-center justify-center rounded-full text-ink-2 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200`}
  >
    <Icon className="w-5 h-5" aria-hidden="true" />
  </motion.a>
));

SocialIcon.displayName = 'SocialIcon';

export default function OptimizedFooter() {
  const t = useTranslations('footer');
  const tNav = useTranslations('navbar');
  const tSys = useTranslations('systemsDetails');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [ref, isInView] = useInView();
  const isRTL = locale === 'ar';

  // معلومات التواصل الاجتماعي مع الـ labels
  const socialLinks = useMemo(() => [
    { 
      icon: Mail, 
      link: "mailto:tamyazcompany@gmail.com",
      hoverColor: "hover:text-[#8db4ff]",
      label: "Email Tamyaz Company"
    },
    { 
      icon: Facebook, 
      link: "https://www.facebook.com/profile.php?id=61573520164290",
      hoverColor: "hover:text-[#8db4ff]",
      label: "Visit Tamyaz on Facebook"
    },
    { 
      icon: Instagram, 
      link: "https://www.instagram.com/tamyazcompany/",
      hoverColor: "hover:text-accent",
      label: "Follow Tamyaz on Instagram"
    },
    { 
      icon: MessageCircle, 
      link: "https://wa.me/201028518754",
      hoverColor: "hover:text-[#6fd39a]",
      label: "Contact Tamyaz on WhatsApp"
    }
  ], []);

  return (
    <footer className={`px-4 sm:px-6 pt-6 pb-24 text-ink ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="max-w-[1200px] mx-auto flex flex-col gap-10"
      >
        {/* شريط الدعوة للتسجيل */}
        <section
          className="t-card p-6 sm:p-10 lg:p-11 flex flex-wrap items-center gap-6"
          style={{
            background: 'radial-gradient(600px 300px at 100% 0%, rgba(247,215,0,.12), transparent 70%), linear-gradient(180deg,#252522,#151513)',
            borderColor: 'rgba(247,215,0,.28)',
          }}
        >
          <div className="flex-[1_1_320px] min-w-0 flex flex-col gap-2">
            <h3 className="text-2xl sm:text-[32px] leading-tight font-extrabold text-ink">
              {t('decision')}
            </h3>
            <p className="text-base text-ink-3 leading-relaxed">
              {t('thankYou')}
            </p>
          </div>

          {/* زرار التسجيل */}
          <a
            href={`/${locale}/form`}
            aria-label={t('register')}
            className="btn btn-primary btn-lg w-full sm:w-auto"
          >
            {t('register')}
          </a>
        </section>

        {/* روابط داخلية: كل الأنظمة والصفحات المهمة (مهمة للزواحف ومحركات الذكاء الاصطناعي) */}
        <nav aria-label={isRTL ? 'روابط الموقع' : 'Site links'} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3 min-w-0">
            <a href={`/${locale}/systems`} className="text-base font-extrabold text-ink hover:text-accent transition-colors w-fit">
              {isRTL ? 'أنظمة تميز' : 'Tamyaz systems'}
            </a>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 list-none p-0 m-0 text-sm">
              {SYSTEM_ORDER.map((key) => (
                <li key={key} className="min-w-0">
                  <a href={`/${locale}/systems/${SYSTEM_SLUGS[key]}`} className="text-ink-2 hover:text-accent transition-colors">
                    {tSys(`items.${key}.name`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 min-w-0">
            <span className="text-base font-extrabold text-ink">{isRTL ? 'تميز' : 'Tamyaz'}</span>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 list-none p-0 m-0 text-sm">
              {[
                { href: `/${locale}/about`, label: tNav('links.about') },
                { href: `/${locale}/portfolio`, label: tNav('links.portfolio') },
                { href: `/${locale}/blog`, label: tNav('links.blog') },
                { href: `/${locale}/faq`, label: tNav('links.faq') },
                { href: `/${locale}/package`, label: tNav('links.package') },
                { href: `/${locale}/form`, label: t('register') },
              ].map((link) => (
                <li key={link.href} className="min-w-0">
                  <a href={link.href} className="text-ink-2 hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="t-rule" />

        {/* الفوتر الهادي: الحقوق والتواصل */}
        <div className="flex flex-col-reverse sm:flex-row flex-wrap items-center justify-between gap-5 text-sm text-ink-2">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <a href={`/${locale}`} className="flex items-center gap-2.5 min-h-11" aria-label="Tamyaz">
              <Image src="/logo.svg" alt="" aria-hidden="true" width={48} height={48} className="w-12 h-12 object-contain shrink-0" />
              <span className="font-extrabold text-lg text-ink">{isRTL ? 'تميز' : 'Tamyaz'}</span>
            </a>
            <p className="text-center sm:text-start">
              {t('copyright')}
            </p>
          </div>

          {/* روابط التواصل الاجتماعي */}
          <div className="flex flex-row gap-3 justify-center">
            {socialLinks.map((social, index) => (
              <SocialIcon
                key={index}
                icon={social.icon}
                link={social.link}
                hoverColor={social.hoverColor}
                index={index}
                label={social.label}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
