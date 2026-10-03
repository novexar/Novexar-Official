import { useTranslation } from 'react-i18next';
import { MapPinIcon } from '@phosphor-icons/react';
import { Reveal } from '@/components/ui/Reveal';
import {
  containerClass,
  sectionTitleClass,
  tileClass,
} from '@/components/ui/layout';
import certificationsData from '@/data/certifications.json';

export const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 md:py-36">
      <div
        className={`${containerClass} grid gap-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-24`}
      >
        <div>
          <Reveal>
            <h2 className={sectionTitleClass}>{t('nav.about')}</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-10 text-xl leading-relaxed text-ink md:text-2xl md:leading-relaxed">
              {t('about.p1')}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[65ch] leading-relaxed text-mute md:text-lg md:leading-relaxed">
              {t('about.p2')}
            </p>
            <p className="mt-5 max-w-[65ch] leading-relaxed text-mute md:text-lg md:leading-relaxed">
              {t('about.p3')}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 inline-flex items-center gap-2 text-sm text-mute">
              <MapPinIcon className="h-4 w-4" />
              {t('about.location')}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-2">
          <h3 className="text-lg font-medium text-ink">{t('about.certs')}</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {certificationsData.certifications.map((cert) => (
              <li key={cert.id} className={`${tileClass} p-5`}>
                <span className="font-mono text-sm text-accent">
                  {cert.code}
                </span>
                <p className="mt-6 font-medium leading-snug text-ink">
                  {cert.name}
                </p>
                <p className="mt-1 text-sm text-mute">{cert.issuer}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};
