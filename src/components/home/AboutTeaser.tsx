import { useTranslations } from 'next-intl';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function AboutTeaser({ locale }: { locale: string }) {
  const t = useTranslations('about');

  return (
    <section style={{ padding: '7rem 4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <AnimatedSection>
          <p className="section-label" style={{ marginBottom: '1.5rem' }}>{t('label')}</p>
          <blockquote style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2rem',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#c8a96e',
            lineHeight: 1.4,
            marginBottom: '1rem',
          }}>
            &ldquo;{t('quote')}&rdquo;
          </blockquote>
          <p className="section-label" style={{ color: '#8fa3b8' }}>— {t('quoteAuthor')}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2rem',
            fontWeight: 300,
            color: '#f9f4ec',
            marginBottom: '1.5rem',
            lineHeight: 1.3,
          }}>
            {t('title')}<br />
            <em style={{ fontStyle: 'italic', color: '#c8a96e' }}>{t('titleItalic')}</em>
          </h2>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            color: '#8fa3b8',
            fontSize: '0.875rem',
            lineHeight: 1.8,
            marginBottom: '2rem',
          }}>
            {t('body')}
          </p>
          <Link href={`/${locale}/about`} className="btn-primary">
            {t('cta')}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
