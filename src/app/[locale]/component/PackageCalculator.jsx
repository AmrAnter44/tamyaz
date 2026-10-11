"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Sparkles, Package, CreditCard, Receipt, Plus, Minus } from 'lucide-react';

export default function PackageCalculator() {
  const t = useTranslations('calculator');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Marketing Services (cash only)
  const [reels, setReels] = useState(0);
  const [reelsType, setReelsType] = useState('mobile'); // mobile or camera
  const [photos, setPhotos] = useState(0);
  const [photosType, setPhotosType] = useState('mobile'); // mobile or camera
  const [designs, setDesigns] = useState(0);
  const [videos, setVideos] = useState(0);
  const [videosType, setVideosType] = useState('mobile'); // mobile or camera
  const [scheduling, setScheduling] = useState(false);
  const [messaging, setMessaging] = useState(false);

  // Packages
  const [websitePackage, setWebsitePackage] = useState('none');
  const [websitePayment, setWebsitePayment] = useState('cash');
  const [managementPackage, setManagementPackage] = useState('none');
  const [managementPayment, setManagementPayment] = useState('cash');

  // Pricing logic
  const reelsPrice = reelsType === 'mobile' ? 1000 : 2000;
  const photosPrice = photosType === 'mobile' ? 1000 : 1500;
  const designsPrice = 200;
  const videosPrice = videosType === 'mobile' ? 2000 : 3000;

  // Apply 10% discount for reels > 6 or designs > 6
  const reelsDiscount = reels > 6 ? 0.1 : 0;
  const designsDiscount = designs > 6 ? 0.1 : 0;

  const marketingTotal = Math.round(
    (reels * reelsPrice * (1 - reelsDiscount)) +
    (photos * photosPrice) +
    (designs * designsPrice * (1 - designsDiscount)) +
    (videos * videosPrice) +
    (scheduling ? 2000 : 0) +
    (messaging ? 2000 : 0)
  );

  // Website packages
  const websitePrices = { none: 0, standard: 15000, plus: 25000 };
  const websiteBasePrice = websitePrices[websitePackage] || 0;
  const websiteCashDiscount = websitePayment === 'cash' && websitePackage !== 'none' ? 5000 : 0;
  const websiteFinalPrice = websiteBasePrice - websiteCashDiscount;
  const websiteMonthly = Math.round(websitePayment === 'cash'
    ? websiteFinalPrice
    : websitePayment === '3months'
    ? websiteFinalPrice / 3
    : websiteFinalPrice / 6);

  // Management packages
  const managementPrices = { none: 0, basic: 8000, plus: 20000, pro: 45000 };
  const managementBasePrice = managementPrices[managementPackage] || 0;
  const managementCashDiscount = managementPayment === 'cash' && managementPackage !== 'none' ? 5000 : 0;
  const managementFinalPrice = managementBasePrice - managementCashDiscount;
  const managementMonthly = Math.round(managementPayment === 'cash'
    ? managementFinalPrice
    : managementPayment === '3months'
    ? managementFinalPrice / 3
    : managementFinalPrice / 6);

  // Total monthly payment (marketing is always cash, added as is)
  const monthlyPayment = Math.round(marketingTotal + websiteMonthly + managementMonthly);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      className={`text-ink pt-16 sm:pt-20 pb-28 px-4 sm:px-6 ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-[1200px] mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-[0_14px_30px_-12px_rgba(247,215,0,0.6)]">
              <Sparkles className="w-8 h-8 text-on-accent" />
            </div>
          </div>
          <h2 className="text-[28px] sm:text-4xl md:text-5xl font-extrabold mb-4 text-ink">
            {t('title')}
          </h2>
          <p className="text-ink-2 text-base sm:text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-8">
          {/* Left Column - Services */}
          <div className="space-y-6">
            {/* Marketing Services */}
            <motion.div
              variants={itemVariants}
              className="t-card p-5 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-accent" />
                <h3 className={`text-2xl font-bold`}>
                  {t('marketing.title')}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className={`block text-sm font-semibold mb-3 text-ink-3`}>
                    {t('marketing.reels')}
                    {reels > 6 && (
                      <span className="text-accent text-xs ms-2">(-10%)</span>
                    )}
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setReels(4)}
                      className={`t-option flex-1 px-2 text-sm ${
                        reels === 4
                          ? 'is-selected'
                          : ''
                      }`}
                    >
                      4
                    </button>
                    <button
                      onClick={() => setReels(6)}
                      className={`t-option flex-1 px-2 text-sm ${
                        reels === 6
                          ? 'is-selected'
                          : ''
                      }`}
                    >
                      6
                    </button>
                    <button
                      onClick={() => setReels(8)}
                      className={`t-option flex-1 px-2 text-sm ${
                        reels === 8
                          ? 'is-selected'
                          : ''
                      }`}
                    >
                      8
                    </button>
                    <button
                      onClick={() => setReels(12)}
                      className={`t-option flex-1 px-2 text-sm ${
                        reels === 12
                          ? 'is-selected'
                          : ''
                      }`}
                    >
                      12
                    </button>
                  </div>
                  {reels > 0 && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setReelsType('mobile')}
                        className={`t-option flex-1 px-2 text-sm ${
                          reelsType === 'mobile'
                            ? 'is-selected'
                            : ''
                        }`}
                      >
                        {t('marketing.mobile')}
                      </button>
                      <button
                        onClick={() => setReelsType('camera')}
                        className={`t-option flex-1 px-2 text-sm ${
                          reelsType === 'camera'
                            ? 'is-selected'
                            : ''
                        }`}
                      >
                        {t('marketing.camera')}
                      </button>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <InputGroup
                    label={t('marketing.photos')}
                    value={photos}
                    onChange={setPhotos}
                    isRTL={isRTL}
                  />
                  {photos > 0 && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPhotosType('mobile')}
                        className={`t-option flex-1 px-2 text-sm ${
                          photosType === 'mobile'
                            ? 'is-selected'
                            : ''
                        }`}
                      >
                        {t('marketing.mobile')}
                      </button>
                      <button
                        onClick={() => setPhotosType('camera')}
                        className={`t-option flex-1 px-2 text-sm ${
                          photosType === 'camera'
                            ? 'is-selected'
                            : ''
                        }`}
                      >
                        {t('marketing.camera')}
                      </button>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <label className={`block text-sm font-semibold mb-3 text-ink-3`}>
                    {t('marketing.designs')}
                    {designs > 6 && (
                      <span className="text-accent text-xs ms-2">(-10%)</span>
                    )}
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDesigns(4)}
                      className={`t-option flex-1 px-2 text-sm ${
                        designs === 4
                          ? 'is-selected'
                          : ''
                      }`}
                    >
                      4
                    </button>
                    <button
                      onClick={() => setDesigns(8)}
                      className={`t-option flex-1 px-2 text-sm ${
                        designs === 8
                          ? 'is-selected'
                          : ''
                      }`}
                    >
                      8
                    </button>
                    <button
                      onClick={() => setDesigns(12)}
                      className={`t-option flex-1 px-2 text-sm ${
                        designs === 12
                          ? 'is-selected'
                          : ''
                      }`}
                    >
                      12
                    </button>
                    <button
                      onClick={() => setDesigns(16)}
                      className={`t-option flex-1 px-2 text-sm ${
                        designs === 16
                          ? 'is-selected'
                          : ''
                      }`}
                    >
                      16
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <InputGroup
                    label={t('marketing.videos')}
                    value={videos}
                    onChange={setVideos}
                    isRTL={isRTL}
                  />
                  {videos > 0 && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setVideosType('mobile')}
                        className={`t-option flex-1 px-2 text-sm ${
                          videosType === 'mobile'
                            ? 'is-selected'
                            : ''
                        }`}
                      >
                        {t('marketing.mobile')}
                      </button>
                      <button
                        onClick={() => setVideosType('camera')}
                        className={`t-option flex-1 px-2 text-sm ${
                          videosType === 'camera'
                            ? 'is-selected'
                            : ''
                        }`}
                      >
                        {t('marketing.camera')}
                      </button>
                    </div>
                  )}
                </div>
                <ToggleGroup
                  label={t('marketing.scheduling')}
                  checked={scheduling}
                  onChange={setScheduling}
                  isRTL={isRTL}
                />
                <ToggleGroup
                  label={t('marketing.messaging')}
                  checked={messaging}
                  onChange={setMessaging}
                  isRTL={isRTL}
                />
              </div>
            </motion.div>

            {/* Website Package */}
            <motion.div
              variants={itemVariants}
              className="t-card p-5 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-accent" />
                <h3 className={`text-2xl font-bold`}>
                  {t('website.title')}
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <SystemOption
                  label={t('website.none')}
                  selected={websitePackage === 'none'}
                  onClick={() => setWebsitePackage('none')}
                  isRTL={isRTL}
                />
                <SystemOption
                  label={t('website.standard')}
                  selected={websitePackage === 'standard'}
                  onClick={() => setWebsitePackage('standard')}
                  isRTL={isRTL}
                />
                <SystemOption
                  label={t('website.plus')}
                  selected={websitePackage === 'plus'}
                  onClick={() => setWebsitePackage('plus')}
                  isRTL={isRTL}
                />
              </div>

              {websitePackage !== 'none' && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex gap-2 mb-4">
                    <PaymentOption
                      label={t('summary.cash')}
                      selected={websitePayment === 'cash'}
                      onClick={() => setWebsitePayment('cash')}
                      disabled={false}
                      isRTL={isRTL}
                    />
                    <PaymentOption
                      label={t('summary.3months')}
                      selected={websitePayment === '3months'}
                      onClick={() => setWebsitePayment('3months')}
                      disabled={false}
                      isRTL={isRTL}
                    />
                    <PaymentOption
                      label={t('summary.6months')}
                      selected={websitePayment === '6months'}
                      onClick={() => setWebsitePayment('6months')}
                      disabled={false}
                      isRTL={isRTL}
                    />
                  </div>
                  <div className="t-row p-4 space-y-2">
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="text-ink-2">{t('summary.basePrice')}</span>
                      <span className="num text-ink font-semibold">{websiteBasePrice.toLocaleString('en-US')} {t('summary.egp')}</span>
                    </div>
                    {websiteCashDiscount > 0 && (
                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-ink-2">{t('summary.cashDiscount')}</span>
                        <span className="num text-[#6fd39a] font-semibold">-{websiteCashDiscount.toLocaleString('en-US')} {t('summary.egp')}</span>
                      </div>
                    )}
                    <div className="flex justify-between gap-3 text-base pt-2 border-t border-white/10">
                      <span className="text-accent font-bold">{websitePayment === 'cash' ? t('summary.total') : t('summary.monthly')}</span>
                      <span className="num text-accent font-bold text-xl">{websiteMonthly.toLocaleString('en-US')} {t('summary.egp')}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Management Package */}
            <motion.div
              variants={itemVariants}
              className="t-card p-5 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Receipt className="w-6 h-6 text-accent" />
                <h3 className={`text-2xl font-bold`}>
                  {t('management.title')}
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <SystemOption
                  label={t('management.none')}
                  selected={managementPackage === 'none'}
                  onClick={() => setManagementPackage('none')}
                  isRTL={isRTL}
                />
                <SystemOption
                  label={t('management.basic')}
                  selected={managementPackage === 'basic'}
                  onClick={() => setManagementPackage('basic')}
                  isRTL={isRTL}
                />
                <SystemOption
                  label={t('management.plus')}
                  selected={managementPackage === 'plus'}
                  onClick={() => setManagementPackage('plus')}
                  isRTL={isRTL}
                />
                <SystemOption
                  label={t('management.pro')}
                  selected={managementPackage === 'pro'}
                  onClick={() => setManagementPackage('pro')}
                  isRTL={isRTL}
                />
              </div>

              {managementPackage !== 'none' && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex gap-2 mb-4">
                    <PaymentOption
                      label={t('summary.cash')}
                      selected={managementPayment === 'cash'}
                      onClick={() => setManagementPayment('cash')}
                      disabled={false}
                      isRTL={isRTL}
                    />
                    <PaymentOption
                      label={t('summary.3months')}
                      selected={managementPayment === '3months'}
                      onClick={() => setManagementPayment('3months')}
                      disabled={false}
                      isRTL={isRTL}
                    />
                    <PaymentOption
                      label={t('summary.6months')}
                      selected={managementPayment === '6months'}
                      onClick={() => setManagementPayment('6months')}
                      disabled={false}
                      isRTL={isRTL}
                    />
                  </div>
                  <div className="t-row p-4 space-y-2">
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="text-ink-2">{t('summary.basePrice')}</span>
                      <span className="num text-ink font-semibold">{managementBasePrice.toLocaleString('en-US')} {t('summary.egp')}</span>
                    </div>
                    {managementCashDiscount > 0 && (
                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-ink-2">{t('summary.cashDiscount')}</span>
                        <span className="num text-[#6fd39a] font-semibold">-{managementCashDiscount.toLocaleString('en-US')} {t('summary.egp')}</span>
                      </div>
                    )}
                    <div className="flex justify-between gap-3 text-base pt-2 border-t border-white/10">
                      <span className="text-accent font-bold">{managementPayment === 'cash' ? t('summary.total') : t('summary.monthly')}</span>
                      <span className="num text-accent font-bold text-xl">{managementMonthly.toLocaleString('en-US')} {t('summary.egp')}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Summary */}
          <motion.div
            variants={itemVariants}
            className="lg:sticky lg:top-8 h-fit"
          >
            <div className="t-card p-6 sm:p-8 text-ink" style={{ background: 'radial-gradient(500px 260px at 100% 0%, rgba(247,215,0,.14), transparent 70%), linear-gradient(180deg,#252522,#151513)', borderColor: 'rgba(247,215,0,.28)' }}>
              <h3 className={`text-2xl font-bold mb-6`}>
                {t('summary.title')}
              </h3>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                {marketingTotal > 0 && (
                  <PriceRow label={t('summary.marketing')} amount={marketingTotal} isRTL={isRTL} />
                )}
                {websitePackage !== 'none' && (
                  <>
                    <PriceRow label={t(`website.${websitePackage}`)} amount={websiteMonthly} isRTL={isRTL} />
                    {websiteCashDiscount > 0 && (
                      <PriceRow label={t('summary.cashDiscount')} amount={-websiteCashDiscount} isRTL={isRTL} isDiscount />
                    )}
                  </>
                )}
                {managementPackage !== 'none' && (
                  <>
                    <PriceRow label={t(`management.${managementPackage}`)} amount={managementMonthly} isRTL={isRTL} />
                    {managementCashDiscount > 0 && (
                      <PriceRow label={t('summary.cashDiscount')} amount={-managementCashDiscount} isRTL={isRTL} isDiscount />
                    )}
                  </>
                )}
              </div>

              {/* Total */}
              <div className="space-y-2">
                <div className={`flex flex-wrap justify-between items-baseline gap-x-3 gap-y-1`}>
                  <span className="text-lg font-semibold text-ink-3">{t('summary.monthly')}</span>
                  <span className="num text-4xl font-extrabold text-accent" dir="ltr">{monthlyPayment.toLocaleString('en-US')}</span>
                </div>
                <div className={`text-sm text-ink-2 ${isRTL ? 'text-left' : 'text-right'}`}>
                  {t('summary.egp')}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}

// Helper Components
function InputGroup({ label, value, onChange, isRTL, showDiscount = false }) {
  return (
    <div>
      <label className={`block text-sm font-semibold mb-3 text-ink-3`}>
        {label}
        {showDiscount && (
          <span className="text-accent text-xs ms-2">(-10%)</span>
        )}
      </label>
      <div className="t-field flex items-center gap-3 !px-1 !min-h-[52px]">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-11 h-11 rounded-[11px] t-raised hover:brightness-125 active:scale-95 transition-all flex items-center justify-center group"
        >
          <Minus className="w-5 h-5 text-ink group-hover:text-accent transition-colors" />
        </button>
        <div className="flex-1 text-center">
          <span className="num text-2xl font-bold text-ink" dir="ltr">{value}</span>
        </div>
        <button
          onClick={() => onChange(value + 1)}
          className="w-11 h-11 rounded-[11px] t-raised hover:brightness-125 active:scale-95 transition-all flex items-center justify-center group"
        >
          <Plus className="w-5 h-5 text-ink group-hover:text-accent transition-colors" />
        </button>
      </div>
    </div>
  );
}

function ToggleGroup({ label, checked, onChange, isRTL }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange(!checked); } }}
      className={`t-option flex items-center gap-3 px-4 py-3 min-h-[52px] cursor-pointer ${checked ? 'is-selected' : ''}`}
    >
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
        checked
          ? 'bg-accent border-accent'
          : 'bg-white/5 border-white/25'
      }`}>
        {checked && (
          <svg
            className="w-3 h-3 text-on-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`text-sm font-semibold flex-1 ${checked ? 'text-accent' : 'text-ink-3'}`}>
        {label}
      </span>
    </div>
  );
}

function PriceRow({ label, amount, isRTL, isDiscount = false }) {
  return (
    <div className={`flex justify-between items-center text-sm`}>
      <span className="text-ink-3">{label}</span>
      <span className={`font-semibold num ${isDiscount ? 'text-[#6fd39a]' : 'text-ink'}`}>
        {isDiscount && '- '}
        {Math.abs(amount).toLocaleString('en-US')}
      </span>
    </div>
  );
}

function PaymentOption({ label, selected, onClick, disabled, isRTL }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`t-option relative w-full flex items-center justify-center text-center px-2 py-3 min-h-[52px] ${selected ? 'is-selected' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className="font-bold text-sm sm:text-base">
        {label}
      </span>
    </button>
  );
}

function SystemOption({ label, selected, onClick, isRTL }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`t-option relative w-full flex items-center justify-center text-center px-2 py-4 min-h-[72px] sm:min-h-[88px] ${selected ? 'is-selected' : ''}`}
    >
      <span className="font-bold text-sm">
        {label}
      </span>
    </button>
  );
}
