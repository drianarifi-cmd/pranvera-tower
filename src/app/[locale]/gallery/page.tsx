import { getTranslations } from 'next-intl/server';
import MasonryGrid from '@/components/gallery/MasonryGrid';
import SectionHeader from '@/components/ui/SectionHeader';

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: _locale } = await params;
  const t = await getTranslations('gallery');

  return (
    <main className="pt-24 pb-24 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="py-16">
          <SectionHeader label={t('label')} title={t('title')} titleItalic={t('titleItalic')} />
        </div>
        <MasonryGrid />
      </div>
    </main>
  );
}
