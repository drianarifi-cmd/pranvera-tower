'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80';

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations('hero');

  return (
    <section style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
      {/* Background with ken-burns */}
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Pranvera Tower"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(7,17,31,0.55) 0%, rgba(7,17,31,0.35) 50%, #07111f 100%)'
        }} />
      </motion.div>

      {/* Content */}
      <div
        className="px-6 pb-16 md:px-16 md:pb-24"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Label */}
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ marginBottom: '1.5rem' }}
        >
          {t('label')}
        </motion.p>

        {/* Title line 1 */}
        <div style={{ overflow: 'hidden', marginBottom: '0.25rem' }}>
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(4rem, 10vw, 7rem)',
              fontWeight: 300,
              color: '#f9f4ec',
              lineHeight: 1,
              margin: 0,
            }}
          >
            {t('title')}
          </motion.h1>
        </div>

        {/* Title line 2 - italic gold */}
        <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.65, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(4rem, 10vw, 7rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#c8a96e',
              lineHeight: 1,
              margin: 0,
            }}
          >
            {t('titleItalic')}
          </motion.h1>
        </div>

        {/* Gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.8, ease: 'easeOut' }}
          style={{
            originX: 0,
            width: '4rem',
            height: '1px',
            backgroundColor: '#c8a96e',
            marginBottom: '2rem',
            transformOrigin: 'left',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            color: 'rgba(249,244,236,0.7)',
            fontSize: '0.875rem',
            maxWidth: '28rem',
            marginBottom: '2.5rem',
            lineHeight: 1.7,
          }}
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}
        >
          <Link href={`/${locale}/apartments`} className="btn-primary">
            {t('cta1')}
          </Link>
          <Link href={`/${locale}/contact`} className="btn-ghost">
            {t('cta2')}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-6 md:right-16 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '3rem',
            background: 'linear-gradient(to bottom, #c8a96e, transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
