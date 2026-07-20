import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const LINKS = [
  { id: 'github', href: 'https://github.com/novexar' },
  { id: 'org', href: 'https://github.com/POXCON' },
] as const;

export const Contact = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="px-6 md:px-10 pt-28 md:pt-40 pb-8">
      <SectionHeading index="05" label={t('contact.label')} />

      <div className="py-20 md:py-32">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif italic text-xl md:text-3xl text-mute"
        >
          {t('contact.sub')}
        </motion.p>

        {/* whileInView はクリップされない親側に付ける（110%下にずれた子はIOに検知されないため） */}
        <motion.div
          className="overflow-hidden mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={{ hidden: { y: '110%' }, visible: { y: 0 } }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[13vw] font-black uppercase tracking-[-0.03em] leading-[0.9] text-ink select-none"
          >
            {t('contact.title')}
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-6 md:gap-10"
        >
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-2 font-mono text-sm md:text-base uppercase tracking-[0.25em] text-ink hover:text-accent transition-colors"
            >
              {t(`contact.${link.id}`)}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between gap-4 border-t border-line pt-6 pb-2 font-mono text-[0.6rem] md:text-xs uppercase tracking-[0.25em] text-mute">
        <span>{t('meta.copyright')}</span>
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 hover:text-ink transition-colors"
          aria-label={t('contact.top')}
        >
          {t('contact.top')}
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
