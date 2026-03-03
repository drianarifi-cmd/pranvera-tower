import { useTranslations } from 'next-intl';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default function StatsBar() {
  const t = useTranslations('stats');

  const stats = [
    { value: 10, suffix: '', label: t('floors') },
    { value: 100, suffix: '+', label: t('apartments') },
    { value: 20, suffix: '+', label: t('commercial') },
  ];

  return (
    <section style={{ backgroundColor: '#0d1e33', borderTop: '1px solid rgba(200,169,110,0.1)', borderBottom: '1px solid rgba(200,169,110,0.1)', padding: '3rem 4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', alignItems: 'center' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 300, color: '#c8a96e' }}>
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
            </p>
            <p className="section-label" style={{ color: '#8fa3b8', marginTop: '0.25rem' }}>{stat.label}</p>
          </div>
        ))}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(249,244,236,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.6 }}>
            {t('price')}
          </p>
        </div>
      </div>
    </section>
  );
}
