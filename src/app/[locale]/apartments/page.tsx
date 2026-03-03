import { getTranslations } from 'next-intl/server';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CategoryTabs from '@/components/apartments/CategoryTabs';

export default async function ApartmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  void locale; // locale is used by next-intl middleware context
  const t = await getTranslations('apartments');

  return (
    <main className="bg-navy min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-40 md:pb-20 border-b border-gold/10" style={{ background: 'linear-gradient(to bottom, #0d1e33, #07111f)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-16">
          <AnimatedSection>
            <p className="section-label mb-4">{t('label')}</p>
            <h1 className="font-serif font-light text-cream leading-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              {t('title')}{' '}
              <em className="italic text-gold">{t('titleItalic')}</em>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-10 md:py-20">
        <div className="max-w-6xl mx-auto px-0 md:px-16">
          <CategoryTabs />
        </div>
      </section>
    </main>
  );
}
