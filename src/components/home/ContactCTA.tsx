import { useTranslations } from 'next-intl';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function ContactCTA({ locale }: { locale: string }) {
  const t = useTranslations('contact');
  const nt = useTranslations('nav');

  return (
    <section style={{ padding: '8rem 4rem', textAlign: 'center', backgroundColor: '#07111f', borderTop: '1px solid rgba(200,169,110,0.1)' }}>
      <AnimatedSection>
        <p className="section-label" style={{ marginBottom: '1.5rem' }}>{t('label')}</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: '#f9f4ec', marginBottom: '1rem' }}>
          {t('title')} <em style={{ fontStyle: 'italic', color: '#c8a96e' }}>{t('titleItalic')}</em>
        </h2>
        <div style={{ width: '1px', height: '4rem', background: 'linear-gradient(to bottom, #c8a96e, transparent)', margin: '2.5rem auto' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link href={`/${locale}/contact`} className="btn-primary">{t('label')}</Link>
          <Link href={`/${locale}/apartments`} className="btn-ghost">{nt('apartments')}</Link>
        </div>
      </AnimatedSection>
    </section>
  );
}
