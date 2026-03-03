import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';

const locales = ['en', 'sq'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      default: locale === 'en' ? 'Pranvera Tower — Luxury Residences' : 'Pranvera Tower — Rezidenca Luksoze',
      template: '%s | Pranvera Tower',
    },
    description: locale === 'en'
      ? 'Premium residential and commercial spaces in the heart of the city. 10 floors, 100+ apartments, from €1,000/m².'
      : 'Rezidenca dhe hapësira komerciale premium në zemër të qytetit. 10 kate, 100+ apartamente, nga €1,000/m².',
    alternates: {
      canonical: `https://drianarifi.online/${locale}`,
      languages: {
        en: 'https://drianarifi.online/en',
        sq: 'https://drianarifi.online/sq',
      },
    },
    openGraph: {
      title: 'Pranvera Tower',
      description: 'Premium Residences · Pristina',
      url: 'https://drianarifi.online',
      siteName: 'Pranvera Tower',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar locale={locale} />
      <PageTransition>{children}</PageTransition>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
