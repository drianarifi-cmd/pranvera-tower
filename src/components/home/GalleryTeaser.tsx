'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80',
];

export default function GalleryTeaser({ locale }: { locale: string }) {
  const t = useTranslations('gallery');

  return (
    <section className="px-6 py-16 md:px-16 md:py-28" style={{ backgroundColor: '#0d1e33' }}>
      <div className="max-w-6xl mx-auto">
        <div style={{ marginBottom: '3rem' }}>
          <AnimatedSection>
            <p className="section-label" style={{ marginBottom: '1rem' }}>{t('label')}</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 300, color: '#f9f4ec' }}>
              {t('title')} <em style={{ fontStyle: 'italic', color: '#c8a96e' }}>{t('titleItalic')}</em>
            </h2>
          </AnimatedSection>
        </div>

        {/* Mobile: single hero image */}
        <div className="block md:hidden relative w-full h-64 overflow-hidden">
          <Image src={GALLERY_IMAGES[0]} alt="Gallery" fill className="object-cover" />
          <div className="absolute inset-0 bg-navy/20" />
        </div>

        {/* Desktop: asymmetric grid */}
        <div className="hidden md:grid gap-3" style={{ gridTemplateColumns: '7fr 5fr', height: '480px' }}>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <Image
              src={GALLERY_IMAGES[0]}
              alt=""
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '0.75rem' }}>
            {GALLERY_IMAGES.slice(1).map((src, i) => (
              <div key={i} style={{ position: 'relative', overflow: 'hidden' }}>
                <Image
                  src={src}
                  alt=""
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <AnimatedSection>
            <Link href={`/${locale}/gallery`} className="btn-ghost">
              {t('viewAll')}
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
