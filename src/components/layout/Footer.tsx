import { useTranslation } from 'react-i18next';

interface FooterProps {
  copyright: string;
}

export function Footer({ copyright }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer className="py-8 bg-black/80 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-6 text-center text-muted-foreground">
        <p>{t('site.copyright')}</p>
      </div>
    </footer>
  );
}
