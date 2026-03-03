'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { APARTMENT_IMAGES, TABS, TabKey } from '@/lib/apartments-data';
import InquiryDrawer from './InquiryDrawer';

export default function CategoryTabs() {
  const t = useTranslations('apartments');
  const [activeTab, setActiveTab] = useState<TabKey>('1br');
  const [activeImage, setActiveImage] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const images = APARTMENT_IMAGES[activeTab];
  const rawFeatures = t.raw(`${activeTab}.features` as any);
  const features: string[] = Array.isArray(rawFeatures) ? rawFeatures : [];
  const isCommercial = activeTab === 'commercial';
  const price = t(`${activeTab}.price` as any);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setActiveImage(0);
  };

  return (
    <>
      {/* Tab bar — scrollable, fills width on mobile */}
      <div className="tab-bar flex overflow-x-auto border-b border-gold/15" style={{ scrollbarWidth: 'none' }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`relative flex-1 md:flex-none px-4 md:px-6 py-4 font-sans text-[10px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-light whitespace-nowrap transition-colors duration-200 ${
              activeTab === tab ? 'text-gold' : 'text-cream/50 hover:text-cream/80'
            }`}
          >
            {t(`tabs.${tab}` as any)}
            {activeTab === tab && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-[-1px] left-0 right-0 h-px bg-gold"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16 pt-8 md:pt-12"
        >
          {/* Image carousel */}
          <div>
            <div className="relative w-full overflow-hidden bg-navy-mid" style={{ aspectRatio: '4/3' }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${activeTab}-${activeImage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[activeImage]}
                    alt={t(`${activeTab}.title` as any)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((i) => (i - 1 + images.length) % images.length)}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-navy/60 border border-gold/30 text-gold transition-colors hover:bg-navy/80"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i + 1) % images.length)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-navy/60 border border-gold/30 text-gold transition-colors hover:bg-navy/80"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail bars */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Image ${i + 1}`}
                    className="flex-1 h-[3px] transition-colors duration-200"
                    style={{ backgroundColor: i === activeImage ? '#c8a96e' : 'rgba(200,169,110,0.25)' }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center gap-5 p-6 md:p-0 bg-navy-mid md:bg-transparent">
            <div>
              <p className="section-label mb-2">{t(`tabs.${activeTab}` as any)}</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-cream leading-tight">
                {t(`${activeTab}.title` as any)}
              </h2>
            </div>

            <div className="w-10 h-px bg-gold" />

            <p className="font-sans text-sm font-light text-cream/70 leading-relaxed">
              {t(`${activeTab}.description` as any)}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {[
                { value: t(`${activeTab}.size` as any), label: t('sqm') },
                { value: isCommercial ? price : `€${price}`, label: isCommercial ? '' : t('pricePer') },
                { value: t(`${activeTab}.floorRange` as any), label: t('floors') },
              ].map((spec, i) => (
                <div key={i} className="border border-gold/15 p-3 md:p-4 text-center">
                  <p className="font-serif text-xl md:text-2xl font-light text-gold leading-tight">{spec.value}</p>
                  {spec.label && <p className="section-label text-muted mt-1 text-[8px] md:text-[9px]">{spec.label}</p>}
                </div>
              ))}
            </div>

            {/* Features */}
            <ul className="space-y-2">
              {features.map((feat: string, i: number) => (
                <li key={i} className="flex items-center gap-3 font-sans text-xs font-light text-cream/75">
                  <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            {/* Inquiry button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="btn-primary w-full md:w-auto justify-center"
            >
              {t('inquire')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <InquiryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        apartmentType={activeTab}
      />
    </>
  );
}
