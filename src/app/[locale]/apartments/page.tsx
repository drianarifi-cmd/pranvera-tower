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
    <main style={{ backgroundColor: '#07111f', minHeight: '100vh' }}>
      {/* Page hero */}
      <section
        style={{
          paddingTop: '10rem',
          paddingBottom: '5rem',
          borderBottom: '1px solid rgba(200,169,110,0.1)',
          background: 'linear-gradient(to bottom, #0d1e33, #07111f)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4rem' }}>
          <AnimatedSection>
            <p className="section-label" style={{ marginBottom: '1rem' }}>
              {t('label')}
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 300,
                color: '#f9f4ec',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {t('title')}{' '}
              <em style={{ fontStyle: 'italic', color: '#c8a96e' }}>{t('titleItalic')}</em>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Tabs + content */}
      <section style={{ padding: '5rem 0 8rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4rem' }}>
          <CategoryTabs />
        </div>
      </section>
    </main>
  );
}
