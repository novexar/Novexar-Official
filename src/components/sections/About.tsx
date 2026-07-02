import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import certificationsData from '@/data/certifications.json';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
} as const;

export const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="px-6 md:px-10 py-28 md:py-40">
      <SectionHeading index="01" label={t('about.label')} />

      <div className="mt-12 md:mt-16 grid md:grid-cols-[16rem_1fr] gap-10 md:gap-16">
        {/* Sticky label column (desktop) */}
        <div className="hidden md:block">
          <span className="sticky top-32 font-serif italic text-3xl text-mute/70">
            {t('about.label')}
          </span>
        </div>

        <div className="max-w-3xl">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7 }}
            className="text-xl md:text-3xl leading-relaxed md:leading-relaxed text-ink font-light"
          >
            {t('about.p1')}
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 text-base md:text-lg leading-relaxed text-mute"
          >
            {t('about.p2')}
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-base md:text-lg leading-relaxed text-mute"
          >
            {t('about.p3')}
          </motion.p>

          {/* Certifications */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20"
          >
            <span className="font-mono text-[0.65rem] md:text-xs uppercase tracking-[0.35em] text-mute">
              {t('about.certs')}
            </span>
            <ul className="mt-6 border-t border-line">
              {certificationsData.certifications.map((cert) => (
                <li
                  key={cert.id}
                  className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_minmax(0,14rem)_6rem] items-baseline gap-4 border-b border-line py-4"
                >
                  <span className="text-sm md:text-base text-ink">
                    {cert.name}
                  </span>
                  <span className="hidden md:block text-sm text-mute">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-xs text-mute text-right">
                    {cert.code}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
