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
      className={`bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-6 ${isRTL ? 'rtl font-arabic' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-300 rounded-2xl flex items-center justify-center rotate-3 shadow-lg shadow-yellow-300/20">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {t('title')}
          </h2>
          <p className={`text-gray-400 text-lg max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          {/* Left Column - Services */}
          <div className="space-y-6">
            {/* Marketing Services */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-yellow-300/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-yellow-300" />
                <h3 className={`text-2xl font-bold ${isRTL ? 'font-arabic' : ''}`}>
                  {t('marketing.title')}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className={`block text-sm font-semibold mb-3 text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
                    {t('marketing.reels')}
                    {reels > 6 && (
                      <span className="text-yellow-300 text-xs ml-2">(-10%)</span>
                    )}
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setReels(4)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all border-2 ${
                        reels === 4
                          ? 'bg-yellow-300 text-black border-white'
                          : 'bg-white/10 text-white hover:bg-white/20 border-white'
                      }`}
                    >
                      4
                    </button>
                    <button
                      onClick={() => setReels(6)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all border-2 ${
                        reels === 6
                          ? 'bg-yellow-300 text-black border-white'
                          : 'bg-white/10 text-white hover:bg-white/20 border-white'
                      }`}
                    >
                      6
                    </button>
                    <button
                      onClick={() => setReels(8)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all border-2 ${
                        reels === 8
                          ? 'bg-yellow-300 text-black border-white'
                          : 'bg-white/10 text-white hover:bg-white/20 border-white'
                      }`}
                    >
                      8
                    </button>
                    <button
                      onClick={() => setReels(12)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all border-2 ${
                        reels === 12
                          ? 'bg-yellow-300 text-black border-white'
                          : 'bg-white/10 text-white hover:bg-white/20 border-white'
                      }`}
                    >
                      12
                    </button>
                  </div>
                  {reels > 0 && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setReelsType('mobile')}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          reelsType === 'mobile'
                            ? 'bg-yellow-300 text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {t('marketing.mobile')}
                      </button>
                      <button
                        onClick={() => setReelsType('camera')}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          reelsType === 'camera'
                            ? 'bg-yellow-300 text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
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
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          photosType === 'mobile'
                            ? 'bg-yellow-300 text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {t('marketing.mobile')}
                      </button>
                      <button
                        onClick={() => setPhotosType('camera')}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          photosType === 'camera'
                            ? 'bg-yellow-300 text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {t('marketing.camera')}
                      </button>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <label className={`block text-sm font-semibold mb-3 text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
                    {t('marketing.designs')}
                    {designs > 6 && (
                      <span className="text-yellow-300 text-xs ml-2">(-10%)</span>
                    )}
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDesigns(4)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all border-2 ${
                        designs === 4
                          ? 'bg-yellow-300 text-black border-white'
                          : 'bg-white/10 text-white hover:bg-white/20 border-white'
                      }`}
                    >
                      4
                    </button>
                    <button
                      onClick={() => setDesigns(8)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all border-2 ${
                        designs === 8
                          ? 'bg-yellow-300 text-black border-white'
                          : 'bg-white/10 text-white hover:bg-white/20 border-white'
                      }`}
                    >
                      8
                    </button>
                    <button
                      onClick={() => setDesigns(12)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all border-2 ${
                        designs === 12
                          ? 'bg-yellow-300 text-black border-white'
                          : 'bg-white/10 text-white hover:bg-white/20 border-white'
                      }`}
                    >
                      12
                    </button>
                    <button
                      onClick={() => setDesigns(16)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all border-2 ${
                        designs === 16
                          ? 'bg-yellow-300 text-black border-white'
                          : 'bg-white/10 text-white hover:bg-white/20 border-white'
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
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          videosType === 'mobile'
                            ? 'bg-yellow-300 text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {t('marketing.mobile')}
                      </button>
                      <button
                        onClick={() => setVideosType('camera')}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          videosType === 'camera'
                            ? 'bg-yellow-300 text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
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
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-yellow-300/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-yellow-300" />
                <h3 className={`text-2xl font-bold ${isRTL ? 'font-arabic' : ''}`}>
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
                  <div className="bg-white/5 rounded-xl p-4 space-y-2">
                    <div className={`flex justify-between text-sm ${isRTL ? 'font-arabic' : ''}`}>
                      <span className="text-gray-400">{t('summary.basePrice')}</span>
                      <span className="text-white font-semibold">{websiteBasePrice.toLocaleString()} {t('summary.egp')}</span>
                    </div>
                    {websiteCashDiscount > 0 && (
                      <div className={`flex justify-between text-sm ${isRTL ? 'font-arabic' : ''}`}>
                        <span className="text-gray-400">{t('summary.cashDiscount')}</span>
                        <span className="text-green-400 font-semibold">-{websiteCashDiscount.toLocaleString()} {t('summary.egp')}</span>
                      </div>
                    )}
                    <div className={`flex justify-between text-base pt-2 border-t border-white/10 ${isRTL ? 'font-arabic' : ''}`}>
                      <span className="text-yellow-300 font-bold">{websitePayment === 'cash' ? t('summary.total') : t('summary.monthly')}</span>
                      <span className="text-yellow-300 font-bold text-xl">{websiteMonthly.toLocaleString()} {t('summary.egp')}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Management Package */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-yellow-300/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <Receipt className="w-6 h-6 text-yellow-300" />
                <h3 className={`text-2xl font-bold ${isRTL ? 'font-arabic' : ''}`}>
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
                  <div className="bg-white/5 rounded-xl p-4 space-y-2">
                    <div className={`flex justify-between text-sm ${isRTL ? 'font-arabic' : ''}`}>
                      <span className="text-gray-400">{t('summary.basePrice')}</span>
                      <span className="text-white font-semibold">{managementBasePrice.toLocaleString()} {t('summary.egp')}</span>
                    </div>
                    {managementCashDiscount > 0 && (
                      <div className={`flex justify-between text-sm ${isRTL ? 'font-arabic' : ''}`}>
                        <span className="text-gray-400">{t('summary.cashDiscount')}</span>
                        <span className="text-green-400 font-semibold">-{managementCashDiscount.toLocaleString()} {t('summary.egp')}</span>
                      </div>
                    )}
                    <div className={`flex justify-between text-base pt-2 border-t border-white/10 ${isRTL ? 'font-arabic' : ''}`}>
                      <span className="text-yellow-300 font-bold">{managementPayment === 'cash' ? t('summary.total') : t('summary.monthly')}</span>
                      <span className="text-yellow-300 font-bold text-xl">{managementMonthly.toLocaleString()} {t('summary.egp')}</span>
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
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-3xl p-8 text-black shadow-2xl shadow-yellow-300/20">
              <h3 className={`text-2xl font-bold mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                {t('summary.title')}
              </h3>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b-2 border-black/20">
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
                <div className={`flex justify-between items-baseline ${isRTL ? 'font-arabic' : ''}`}>
                  <span className="text-lg font-semibold opacity-80">{t('summary.monthly')}</span>
                  <span className="text-4xl font-bold">{monthlyPayment.toLocaleString()}</span>
                </div>
                <div className={`text-sm opacity-70 ${isRTL ? 'text-left' : 'text-right'} ${isRTL ? 'font-arabic' : ''}`}>
                  {t('summary.egp')}
                </div>
              </div>
            </div>
          </motion.div>
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

// Helper Components
function InputGroup({ label, value, onChange, isRTL, showDiscount = false }) {
  return (
    <div>
      <label className={`block text-sm font-semibold mb-3 text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
        {label}
        {showDiscount && (
          <span className="text-yellow-300 text-xs ml-2">(-10%)</span>
        )}
      </label>
      <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-1">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center group"
        >
          <Minus className="w-5 h-5 text-white group-hover:text-yellow-300 transition-colors" />
        </button>
        <div className="flex-1 text-center">
          <span className="text-2xl font-bold text-white">{value}</span>
        </div>
        <button
          onClick={() => onChange(value + 1)}
          className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center group"
        >
          <Plus className="w-5 h-5 text-white group-hover:text-yellow-300 transition-colors" />
        </button>
      </div>
    </div>
  );
}

function ToggleGroup({ label, checked, onChange, isRTL }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
        checked
          ? 'border-yellow-300 bg-yellow-300/10 shadow-lg shadow-yellow-300/20'
          : 'border-white/20 bg-white/5 hover:border-white/40'
      }`}
    >
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
        checked
          ? 'bg-yellow-300 border-yellow-300'
          : 'bg-white/10 border-white/20'
      }`}>
        {checked && (
          <svg
            className="w-3 h-3 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`text-sm font-semibold flex-1 ${checked ? 'text-yellow-300' : 'text-gray-300'} ${isRTL ? 'font-arabic' : ''}`}>
        {label}
      </span>
    </div>
  );
}

function PriceRow({ label, amount, isRTL, isDiscount = false }) {
  return (
    <div className={`flex justify-between items-center text-sm ${isRTL ? 'font-arabic' : ''}`}>
      <span className="opacity-80">{label}</span>
      <span className={`font-semibold ${isDiscount ? 'text-green-700' : ''}`}>
        {isDiscount && '- '}
        {Math.abs(amount).toLocaleString()}
      </span>
    </div>
  );
}

function PaymentOption({ label, selected, onClick, disabled, isRTL }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full aspect-square flex items-center justify-center text-center px-2 py-4 rounded-xl border-2 transition-all duration-300 ${
        selected
          ? 'border-yellow-300 bg-black shadow-lg shadow-yellow-300/30'
          : 'border-black/20 bg-white/50 hover:border-black/60 hover:bg-white/70'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${isRTL ? 'font-arabic' : ''}`}
    >
      <span className={`font-bold text-base ${selected ? 'text-yellow-300' : 'text-black/80'}`}>
        {label}
      </span>
    </button>
  );
}

function SystemOption({ label, selected, onClick, isRTL }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full aspect-square flex items-center justify-center text-center px-2 py-3 rounded-xl border-2 transition-all duration-300 ${
        selected
          ? 'border-yellow-300 bg-yellow-300/10 shadow-lg shadow-yellow-300/20'
          : 'border-white/20 bg-white/5 hover:border-white/40'
      } ${isRTL ? 'font-arabic' : ''}`}
    >
      <span className={`font-bold text-sm ${selected ? 'text-yellow-300' : 'text-white'}`}>
        {label}
      </span>
    </button>
  );
}
