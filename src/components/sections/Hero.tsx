import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** overflow-hidden の中から行が立ち上がるリビール */
function RevealLine({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center px-6 md:px-10"
    >
      <div className="w-full">
        <RevealLine delay={0.2} className="-mx-1">
          <h1 className="font-display text-[16.5vw] leading-[0.85] font-black uppercase tracking-[-0.04em] text-ink select-none">
            Novexar
          </h1>
        </RevealLine>

        <div className="mt-6 md:mt-10 flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
          <RevealLine delay={0.35}>
            <p className="font-serif italic text-2xl md:text-4xl text-ink/90">
              {t('hero.role1')}
            </p>
          </RevealLine>
          <RevealLine delay={0.45}>
            <p className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-mute">
              {t('hero.role2')}
            </p>
          </RevealLine>
        </div>
      </div>

      {/* Editorial bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-0 inset-x-0 px-6 md:px-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-line py-5 font-mono text-[0.6rem] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.22em] text-mute">
          <span className="text-left">{t('hero.location')}</span>
          <span className="hidden md:block text-center">
            ( {t('hero.scroll')} )
          </span>
          <span className="text-right">{t('hero.keywords')}</span>
        </div>
      </motion.div>
    </section>
  );
};
