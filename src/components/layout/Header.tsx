import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const NAV_ITEMS = [
  { id: 'about', href: '#about' },
  { id: 'works', href: '#works' },
  { id: 'product', href: '#product' },
  { id: 'skills', href: '#skills' },
  { id: 'contact', href: '#contact' },
] as const;

export function Header() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ja' : 'en');
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'bg-night/70 backdrop-blur-md border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 py-5">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-ink"
        >
          Novexar<span className="text-accent">®</span>
        </a>

        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="link-underline font-mono text-xs uppercase tracking-[0.25em] text-mute hover:text-ink transition-colors"
              >
                {t(`nav.${item.id}`)}
              </a>
            ))}
          </div>

          <button
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="font-mono text-xs uppercase tracking-[0.25em] text-mute hover:text-ink transition-colors"
          >
            {i18n.language === 'en' ? 'JA' : 'EN'}
          </button>
        </div>
      </nav>
    </header>
  );
}
