import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function LocationTeaser() {
  const t = useTranslations('location');
  const advantages = t.raw('advantages') as Array<{ icon: string; text: string }>;

  return (
    <section style={{ padding: '7rem 4rem', backgroundColor: '#07111f' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <AnimatedSection>
          <p className="section-label" style={{ marginBottom: '1rem' }}>{t('label')}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 300, color: '#f9f4ec', marginBottom: '4rem' }}>
            {t('title')} <em style={{ fontStyle: 'italic', color: '#c8a96e' }}>{t('titleItalic')}</em>
          </h2>
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {advantages.map((adv: { icon: string; text: string }, i: number) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div
                style={{
                  border: '1px solid rgba(200,169,110,0.2)',
                  padding: '1.5rem',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,169,110,0.6)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,169,110,0.2)'; }}
              >
                <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>{adv.icon}</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(249,244,236,0.8)', lineHeight: 1.6 }}>{adv.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
