import { Github, Linkedin, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  copyright: string;
}

export function Footer({ copyright }: FooterProps) {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', href: '#home' },
    { id: 'about', href: '#about-me' },
    { id: 'services', href: '#services' },
    { id: 'skills', href: '#skills' },
    { id: 'experience', href: '#experience' },
    { id: 'projects', href: '#project' },
    { id: 'contact', href: '#contact' },
  ];

  return (
    <footer className="relative pt-12 pb-8 bg-black/90">
      {/* Light line separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, hsl(217 91% 60% / 0.5), hsl(271 81% 56% / 0.5), hsl(192 95% 68% / 0.5), transparent)',
        }}
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Navigation links */}
          <div>
            <h4 className="text-sm font-bold font-heading uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(`nav.${link.id}`)}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 2: Social links */}
          <div>
            <h4 className="text-sm font-bold font-heading uppercase tracking-wider text-white mb-4">
              Social
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/poxcondev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 3: Copyright + Back to top */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4 group"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Back to Top
            </button>
            <p className="text-sm text-muted-foreground">
              {t('site.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
