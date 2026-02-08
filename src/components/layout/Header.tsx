import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { NavigationItem } from '@/types';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/ui/language-toggle';

interface HeaderProps {
  navigation: NavigationItem[];
  logo: string;
}

export function Header({ navigation, logo }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { t } = useTranslation();

  // Scroll-connected transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = navigation.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [navigation]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gradient cursor-pointer font-heading"
          >
            <a href="#home">{logo}</a>
          </motion.h1>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredLink === item.id;

              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative text-sm font-medium transition-colors py-1 ${
                    isActive ? 'text-primary' : 'hover:text-primary'
                  }`}
                  onMouseEnter={() => setHoveredLink(item.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {t(`nav.${item.id}`)}
                  {/* Slide underline animation */}
                  {(isActive || isHovered) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </motion.a>
              );
            })}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navigation.length * 0.1 }}
              className="flex items-center gap-3 ml-4"
            >
              <LanguageToggle />
              <Button variant="ghost" size="sm" asChild>
                <a href="#contact">{t('buttons.contactMe')}</a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-border pt-4"
            >
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`block py-2 transition-colors ${
                    activeSection === item.id
                      ? 'text-primary'
                      : 'hover:text-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`nav.${item.id}`)}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <LanguageToggle />
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <a href="#contact">{t('buttons.contactMe')}</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
