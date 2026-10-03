import { useTranslation } from 'react-i18next';
import { containerClass } from '@/components/ui/layout';
import { GITHUB_PROFILE_URL } from '@/data/links';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={`${containerClass} pb-8`}>
      <div className="flex items-center justify-between gap-4 border-t border-line pt-6 text-sm text-mute">
        <span>{t('meta.copyright')}</span>
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline transition-colors hover:text-ink"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
