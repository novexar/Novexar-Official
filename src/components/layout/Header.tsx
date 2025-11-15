import { useState } from 'react';
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
  const { t } = useTranslation();

  return (
    <header className="fixed w-full z-50 bg-black/80 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gradient cursor-pointer"
          >
            <a href="#home">{logo}</a>
          </motion.h1>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t(`nav.${item.id}`)}
              </motion.a>
            ))}

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
                  className="block py-2 hover:text-primary transition-colors"
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
