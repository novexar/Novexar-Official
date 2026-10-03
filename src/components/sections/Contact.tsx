import { useTranslation } from 'react-i18next';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { Reveal } from '@/components/ui/Reveal';
import { ctaAccentClass } from '@/components/ui/cta';
import { containerClass } from '@/components/ui/layout';
import { GITHUB_ORG_URL, GITHUB_PROFILE_URL } from '@/data/links';

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="pt-24 pb-24 md:pt-36 md:pb-32">
      <div className={containerClass}>
        <Reveal>
          <h2 className="text-5xl font-semibold leading-none tracking-tighter text-ink md:text-7xl lg:text-8xl">
            {t('contact.title')}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-mute md:text-xl">
            {t('contact.sub')}
          </p>
        </Reveal>

        <Reveal
          delay={0.2}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
        >
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaAccentClass}
          >
            {t('contact.github')}
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
          <a
            href={GITHUB_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-2 text-sm text-ink"
          >
            {t('contact.org')}
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};
