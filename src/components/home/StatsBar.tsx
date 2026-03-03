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
    <section
      className="px-6 py-10 md:px-16 md:py-16"
      style={{ backgroundColor: '#0d1e33', borderTop: '1px solid rgba(200,169,110,0.1)', borderBottom: '1px solid rgba(200,169,110,0.1)' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 items-center">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-serif text-4xl md:text-5xl text-gold font-light">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
            </p>
            <p className="section-label text-muted mt-2">{stat.label}</p>
          </div>
        ))}
        <div className="text-center">
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(249,244,236,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.6 }}>
            {t('price')}
          </p>
        </div>
      </div>
    </section>
  );
}
