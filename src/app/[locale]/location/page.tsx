import { getTranslations } from 'next-intl/server';
import SectionHeader from '@/components/ui/SectionHeader';
import MapEmbed from '@/components/location/MapEmbed';

interface Advantage {
  icon: string;
  text: string;
}

export default async function LocationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: _locale } = await params;
  const t = await getTranslations('location');

  const advantages = t.raw('advantages') as Advantage[];

  return (
    <main className="pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="py-16">
          <SectionHeader
            label={t('label')}
            title={t('title')}
            titleItalic={t('titleItalic')}
          />
        </div>
      </div>

      <div className="w-full">
        <MapEmbed />
      </div>

      <div className="max-w-6xl mx-auto px-8 md:px-16 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="border border-gold/20 p-8 text-center hover:border-gold/60 transition-colors duration-300"
            >
              <div className="text-4xl mb-4">{advantage.icon}</div>
              <p className="font-sans text-xs">{advantage.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
