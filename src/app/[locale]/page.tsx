import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';
import AboutTeaser from '@/components/home/AboutTeaser';
import ApartmentPreview from '@/components/home/ApartmentPreview';
import LocationTeaser from '@/components/home/LocationTeaser';
import GalleryTeaser from '@/components/home/GalleryTeaser';
import ContactCTA from '@/components/home/ContactCTA';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <Hero locale={locale} />
      <StatsBar />
      <AboutTeaser locale={locale} />
      <ApartmentPreview locale={locale} />
      <LocationTeaser />
      <GalleryTeaser locale={locale} />
      <ContactCTA locale={locale} />
    </main>
  );
}
