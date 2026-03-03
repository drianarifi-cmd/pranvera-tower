import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/contact/ContactForm';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: _locale } = await params;
  const t = await getTranslations('contact');

  return (
    <main className="pt-24 pb-24 px-8 md:px-16">
      <div className="max-w-6xl mx-auto py-16">
        <div className="grid md:grid-cols-2 gap-20">
          {/* Left: contact info */}
          <AnimatedSection>
            <p className="section-label mb-6">{t('label')}</p>
            <h1 className="font-serif text-h2 font-light text-cream mb-12">
              {t('title')} <em className="italic text-gold">{t('titleItalic')}</em>
            </h1>
            <div className="space-y-6 border-t border-gold/10 pt-10">
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-muted mb-1">
                  Address
                </p>
                <p className="font-sans text-sm text-cream/80">{t('address')}</p>
              </div>
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-muted mb-1">
                  Phone
                </p>
                <a
                  href={`tel:${t('phone').replace(/\s/g, '')}`}
                  className="font-sans text-sm text-cream/80 hover:text-gold transition-colors duration-200"
                >
                  {t('phone')}
                </a>
              </div>
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-muted mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${t('email')}`}
                  className="font-sans text-sm text-cream/80 hover:text-gold transition-colors duration-200"
                >
                  {t('email')}
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: form */}
          <AnimatedSection delay={0.2}>
            <ContactForm />
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
}
