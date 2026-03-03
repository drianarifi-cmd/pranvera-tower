import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: _locale } = await params;
  const t = await getTranslations('about');
  const st = await getTranslations('stats');

  const stats = [
    { end: 10, suffix: '', prefix: '', label: st('floors') },
    { end: 100, suffix: '+', prefix: '', label: st('apartments') },
    { end: 20, suffix: '+', prefix: '', label: st('commercial') },
    { end: 1000, suffix: '/m²', prefix: '€', label: st('price') },
  ];

  return (
    <main>
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80"
          alt="Pranvera Tower"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-navy" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <span className="section-label mb-4">{t('label')}</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white">
            {t('title')}{' '}
            <em className="text-gold">{t('titleItalic')}</em>
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left: Quote */}
          <AnimatedSection>
            <blockquote className="font-serif italic text-gold text-2xl md:text-3xl leading-relaxed">
              &ldquo;{t('quote')}&rdquo;
            </blockquote>
            <p className="mt-6 text-muted text-sm tracking-widest uppercase">
              — {t('quoteAuthor')}
            </p>
          </AnimatedSection>

          {/* Right: Body */}
          <AnimatedSection delay={0.2}>
            <p className="text-muted font-light text-lg leading-relaxed">
              {t('body')}
            </p>
          </AnimatedSection>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-gold/10 pt-10 mt-12 md:pt-16 md:mt-24">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1} className="text-center py-6 md:py-8">
              <div className="font-serif text-4xl md:text-6xl text-gold mb-3">
                <AnimatedCounter end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <span className="section-label text-muted">{stat.label}</span>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
  );
}
