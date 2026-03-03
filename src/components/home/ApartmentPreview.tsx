'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';

const APARTMENT_IMAGES: Record<string, string> = {
  '1br': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  '2br': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  '3br': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  penthouse: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  commercial: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
};

const TABS = ['1br', '2br', '3br', 'penthouse', 'commercial'] as const;

export default function ApartmentPreview({ locale }: { locale: string }) {
  const t = useTranslations('apartments');

  return (
    <section style={{ padding: '7rem 0', backgroundColor: '#0d1e33' }}>
      <div className="px-6 md:px-16" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <AnimatedSection>
            <p className="section-label" style={{ marginBottom: '1rem' }}>{t('label')}</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 300, color: '#f9f4ec' }}>
              {t('title')} <em style={{ fontStyle: 'italic', color: '#c8a96e' }}>{t('titleItalic')}</em>
            </h2>
          </AnimatedSection>
        </div>

        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          {TABS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ position: 'relative', flexShrink: 0, width: '280px', height: '380px', overflow: 'hidden', cursor: 'pointer' }}
            >
              <Image
                src={APARTMENT_IMAGES[key]}
                alt={t(`${key}.title` as any)}
                fill
                style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #07111f, rgba(7,17,31,0.3) 50%, transparent)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                <p className="section-label" style={{ marginBottom: '0.5rem' }}>{t(`tabs.${key}` as any)}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 300, color: '#f9f4ec' }}>
                  {t(`${key}.title` as any)}
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: '#8fa3b8', marginTop: '0.25rem' }}>
                  {t('from')} {t(`${key}.size` as any)} {t('sqm')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <AnimatedSection>
            <Link href={`/${locale}/apartments`} className="btn-primary">
              {t('label')}
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
