'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = ['about', 'apartments', 'gallery', 'location', 'contact'] as const;

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === 'en' ? 'sq' : 'en';
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/') || '/');
  };

  const localePath = (path: string) =>
    path ? `/${locale}/${path}` : `/${locale}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 transition-all duration-500 ${
        scrolled
          ? 'py-4 backdrop-blur-md border-b'
          : 'py-6'
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(7,17,31,0.92)' : 'transparent',
        borderColor: scrolled ? 'rgba(200,169,110,0.15)' : 'transparent',
      }}
    >
      {/* Logo */}
      <Link
        href={localePath('')}
        style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.12em', color: '#c8a96e' }}
        className="text-lg font-medium uppercase"
      >
        Pranvera Tower
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {NAV_LINKS.map((key) => (
          <li key={key}>
            <Link
              href={localePath(key)}
              className="text-[11px] font-light uppercase transition-colors duration-200"
              style={{
                fontFamily: "'Jost', sans-serif",
                letterSpacing: '0.2em',
                color: 'rgba(249,244,236,0.7)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#c8a96e')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(249,244,236,0.7)')}
            >
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Language switcher */}
        <button
          onClick={switchLocale}
          className="text-[11px] font-light uppercase transition-colors duration-200"
          style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.2em', color: '#8fa3b8' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#c8a96e')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#8fa3b8')}
        >
          {locale === 'en' ? 'SQ' : 'EN'}
        </button>

        {/* Book button desktop */}
        <Link href={localePath('contact')} className="btn-primary hidden md:inline-flex" style={{ fontSize: '10px', padding: '0.75rem 1.5rem' }}>
          {t('book')}
        </Link>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className="block h-px transition-all duration-300"
            style={{
              width: '24px',
              backgroundColor: '#f9f4ec',
              transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
            }}
          />
          <span
            className="block h-px transition-all duration-300"
            style={{
              width: '24px',
              backgroundColor: '#f9f4ec',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-px transition-all duration-300"
            style={{
              width: '24px',
              backgroundColor: '#f9f4ec',
              transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 py-8 px-8 md:hidden border-t"
            style={{
              backgroundColor: '#0d1e33',
              borderColor: 'rgba(200,169,110,0.15)',
            }}
          >
            <ul className="flex flex-col gap-6 list-none">
              {NAV_LINKS.map((key) => (
                <li key={key}>
                  <Link
                    href={localePath(key)}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-light uppercase transition-colors"
                    style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.2em', color: '#f9f4ec' }}
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={localePath('contact')} onClick={() => setMenuOpen(false)} className="btn-primary inline-flex">
                  {t('book')}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
