import { useTranslations } from 'next-intl';
import Link from 'next/link';

const NAV_LINKS = ['about', 'apartments', 'gallery', 'location', 'contact'] as const;

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const ft = useTranslations('footer');

  const localePath = (path: string) => `/${locale}/${path}`;

  return (
    <footer
      className="border-t py-16 px-8 md:px-16"
      style={{ backgroundColor: '#0d1e33', borderColor: 'rgba(200,169,110,0.1)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div>
            <p
              className="text-2xl font-light uppercase mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.12em', color: '#c8a96e' }}
            >
              Pranvera Tower
            </p>
            <p className="section-label" style={{ color: '#8fa3b8' }}>{ft('tagline')}</p>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-4 list-none">
            {NAV_LINKS.map((key) => (
              <li key={key}>
                <Link
                  href={localePath(key)}
                  className="footer-nav-link text-[11px] font-light uppercase transition-colors"
                  style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.2em', color: '#8fa3b8' }}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between gap-4" style={{ borderColor: 'rgba(200,169,110,0.1)' }}>
          <p className="text-xs font-light" style={{ fontFamily: "'Jost', sans-serif", color: 'rgba(143,163,184,0.6)' }}>
            © {new Date().getFullYear()} Pranvera Tower. {ft('rights')}
          </p>
          <p className="text-xs font-light" style={{ fontFamily: "'Jost', sans-serif", color: 'rgba(143,163,184,0.4)' }}>
            drianarifi.online
          </p>
        </div>
      </div>
    </footer>
  );
}
