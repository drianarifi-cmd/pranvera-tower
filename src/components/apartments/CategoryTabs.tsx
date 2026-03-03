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

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setActiveImage(0);
  };

  const rawFeatures = t.raw(`${activeTab}.features` as any);
  const features: string[] = Array.isArray(rawFeatures) ? rawFeatures : [];

  const isCommercial = activeTab === 'commercial';
  const price = t(`${activeTab}.price` as any);

  return (
    <>
      {/* Tab bar */}
      <div
        className="tab-bar"
        style={{
          display: 'flex',
          gap: 0,
          borderBottom: '1px solid rgba(200,169,110,0.15)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '1rem 1.5rem',
              fontFamily: "'Jost', sans-serif",
              fontSize: '11px',
              fontWeight: 300,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: activeTab === tab ? '#c8a96e' : 'rgba(249,244,236,0.5)',
              transition: 'color 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab) {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(249,244,236,0.8)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab) {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(249,244,236,0.5)';
              }
            }}
          >
            {t(`tabs.${tab}` as any)}
            {activeTab === tab && (
              <motion.div
                layoutId="tab-underline"
                style={{
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundColor: '#c8a96e',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            paddingTop: '3rem',
          }}
        >
          {/* Left: Image carousel */}
          <div>
            {/* Main image */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/3',
                overflow: 'hidden',
                backgroundColor: '#0d1e33',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${activeImage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Image
                    src={images[activeImage]}
                    alt={t(`${activeTab}.title` as any)}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(7,17,31,0.4) 0%, transparent 60%)',
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((i) => (i - 1 + images.length) % images.length)}
                    aria-label="Previous image"
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(7,17,31,0.6)',
                      border: '1px solid rgba(200,169,110,0.3)',
                      color: '#c8a96e',
                      cursor: 'pointer',
                      width: '2.5rem',
                      height: '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      transition: 'all 0.2s',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i + 1) % images.length)}
                    aria-label="Next image"
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(7,17,31,0.6)',
                      border: '1px solid rgba(200,169,110,0.3)',
                      color: '#c8a96e',
                      cursor: 'pointer',
                      width: '2.5rem',
                      height: '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      transition: 'all 0.2s',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail dots / bars */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', alignItems: 'center' }}>
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Image ${i + 1}`}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      flex: 1,
                      height: '3px',
                      backgroundColor: i === activeImage ? '#c8a96e' : 'rgba(200,169,110,0.25)',
                      transition: 'background-color 0.2s',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
            {/* Label + Title */}
            <div>
              <p className="section-label" style={{ marginBottom: '0.75rem' }}>
                {t(`tabs.${activeTab}` as any)}
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2.5rem',
                  fontWeight: 300,
                  color: '#f9f4ec',
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                {t(`${activeTab}.title` as any)}
              </h2>
            </div>

            {/* Gold divider */}
            <div style={{ width: '3rem', height: '1px', backgroundColor: '#c8a96e' }} />

            {/* Description */}
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 300,
                color: 'rgba(249,244,236,0.7)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {t(`${activeTab}.description` as any)}
            </p>

            {/* Specs grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div
                style={{
                  padding: '1rem',
                  border: '1px solid rgba(200,169,110,0.15)',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.5rem',
                    fontWeight: 300,
                    color: '#c8a96e',
                    margin: 0,
                  }}
                >
                  {t(`${activeTab}.size` as any)}
                </p>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '9px',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: '#8fa3b8',
                    marginTop: '0.25rem',
                  }}
                >
                  {t('sqm')}
                </p>
              </div>

              <div
                style={{
                  padding: '1rem',
                  border: '1px solid rgba(200,169,110,0.15)',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: isCommercial ? '1rem' : '1.5rem',
                    fontWeight: 300,
                    color: '#c8a96e',
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {isCommercial ? price : `€${price}`}
                </p>
                {!isCommercial && (
                  <p
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '9px',
                      fontWeight: 300,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: '#8fa3b8',
                      marginTop: '0.25rem',
                    }}
                  >
                    {t('pricePer')}
                  </p>
                )}
              </div>

              <div
                style={{
                  padding: '1rem',
                  border: '1px solid rgba(200,169,110,0.15)',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.5rem',
                    fontWeight: 300,
                    color: '#c8a96e',
                    margin: 0,
                  }}
                >
                  {t(`${activeTab}.floorRange` as any)}
                </p>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '9px',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: '#8fa3b8',
                    marginTop: '0.25rem',
                  }}
                >
                  {t('floors')}
                </p>
              </div>
            </div>

            {/* Features list */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {features.map((feat: string, i: number) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.8125rem',
                    fontWeight: 300,
                    color: 'rgba(249,244,236,0.75)',
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#c8a96e',
                      flexShrink: 0,
                    }}
                  />
                  {feat}
                </li>
              ))}
            </ul>

            {/* Inquiry button */}
            <div>
              <button
                onClick={() => setDrawerOpen(true)}
                className="btn-primary"
                style={{ fontSize: '10px' }}
              >
                {t('inquire')}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '0.25rem' }}>
                  <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Inquiry drawer */}
      <InquiryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        apartmentType={activeTab}
      />
    </>
  );
}
