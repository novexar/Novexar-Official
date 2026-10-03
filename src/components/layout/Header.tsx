import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import { containerClass } from '@/components/ui/layout';
import { BRAND_ICON_SMALL } from '@/data/brand';

// ハッシュ付きの to はどのページからでもトップの該当セクションへ遷移する
// （スクロール制御は ScrollManager が担当）
const NAV_ITEMS = [
  { id: 'about', to: '/#about' },
  { id: 'works', to: '/#works' },
  { id: 'product', to: '/#product' },
  { id: 'skills', to: '/#skills' },
  { id: 'contact', to: '/#contact' },
] as const;

const SCROLLED_THRESHOLD = 40;
const MOBILE_MENU_ID = 'mobile-nav';

export function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { scrollY } = useScroll();
  // リロードで途中位置が復元された場合に備え、初期値も実際の位置から決める
  const [scrolled, setScrolled] = useState(
    () => window.scrollY > SCROLLED_THRESHOLD
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > SCROLLED_THRESHOLD);
  });

  // ページ遷移・セクション移動のたびにモバイルメニューを閉じる
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Escape でモバイルメニューを閉じる
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // resolvedLanguage は supportedLngs (en / ja) のどちらかに必ず解決される
  const isJapanese = i18n.resolvedLanguage === 'ja';

  const toggleLanguage = () => {
    i18n.changeLanguage(isJapanese ? 'en' : 'ja');
  };

  const solid = scrolled || menuOpen;
  const MenuIcon = menuOpen ? XIcon : ListIcon;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        solid
          ? 'border-line bg-night/80 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className={`${containerClass} flex h-16 items-center justify-between`}>
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight text-ink"
        >
          <img
            src={BRAND_ICON_SMALL.src}
            alt=""
            width={BRAND_ICON_SMALL.width}
            height={BRAND_ICON_SMALL.height}
            className="h-6 w-auto"
          />
          Novexar
        </Link>

        <div className="flex items-center gap-2 md:gap-8">
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className="link-underline text-sm text-mute transition-colors hover:text-ink"
              >
                {t(`nav.${item.id}`)}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t('nav.language')}
            className="rounded-full px-3 py-2 font-mono text-xs text-mute transition-colors hover:text-ink"
          >
            {isJapanese ? 'EN' : 'JA'}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={t('nav.menu')}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            className="-mr-2 rounded-full p-2 text-ink md:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id={MOBILE_MENU_ID}
          className={`${containerClass} flex flex-col pb-6 md:hidden`}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-2xl font-medium tracking-tight text-ink"
            >
              {t(`nav.${item.id}`)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
