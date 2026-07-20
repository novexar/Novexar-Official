import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Check, Download } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

// Lemon Squeezy のチェックアウトURL。空文字の間は購入ボタンを「準備中」表示にする
const PURCHASE_URL: string =
  'https://novexar.lemonsqueezy.com/checkout/buy/512b1cf4-7162-4836-ae82-509f3c4859af';
const DOWNLOAD_URL =
  'https://github.com/novexar/steam-server-manager-releases/releases/latest';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FREE_FEATURE_KEYS = ['search', 'update', 'single'] as const;
const PRO_FEATURE_KEYS = ['multi', 'mods', 'backup', 'seats'] as const;

const ctaClass =
  'inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] transition-colors';

function FeatureList({ keys, planId }: { keys: readonly string[]; planId: string }) {
  const { t } = useTranslation();
  return (
    <ul className="mt-6 space-y-3">
      {keys.map((key) => (
        <li key={key} className="flex items-start gap-3 text-sm text-mute">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          {t(`product.plans.${planId}.features.${key}`)}
        </li>
      ))}
    </ul>
  );
}

export const Product = () => {
  const { t } = useTranslation();

  return (
    <section id="product" className="px-6 md:px-10 py-28 md:py-40">
      <SectionHeading index="03" label={t('product.label')} />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-10 md:mt-14 font-display text-4xl md:text-7xl font-black uppercase tracking-[-0.03em] leading-[0.95] text-ink"
      >
        {t('product.name')}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-6 font-serif italic text-xl md:text-3xl text-ink/90"
      >
        {t('product.tagline')}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mt-6 max-w-2xl text-sm md:text-base text-mute leading-relaxed"
      >
        {t('product.desc')}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-mute/60"
      >
        {t('product.platforms')}
      </motion.p>

      <div className="mt-14 md:mt-20 grid md:grid-cols-2 border-t border-line">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col border-b border-line py-10 md:py-12 md:pr-12 md:border-r"
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-mute">
            {t('product.plans.free.name')}
          </h3>
          <p className="mt-4 font-display text-4xl md:text-5xl font-black text-ink">
            ¥0
          </p>
          <FeatureList keys={FREE_FEATURE_KEYS} planId="free" />
          <div className="mt-8 md:mt-auto md:pt-8">
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${ctaClass} border-line text-ink hover:border-accent hover:text-accent`}
            >
              <Download className="h-4 w-4" />
              {t('product.download')}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="flex flex-col border-b border-line py-10 md:py-12 md:pl-12"
        >
          <h3 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-mute">
            {t('product.plans.pro.name')}
            <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.6rem] tracking-widest text-accent">
              {t('product.oneTime')}
            </span>
          </h3>
          <p className="mt-4 font-display text-4xl md:text-5xl font-black text-ink">
            ¥1,980
          </p>
          <FeatureList keys={PRO_FEATURE_KEYS} planId="pro" />
          <div className="mt-8 md:mt-auto md:pt-8">
            {PURCHASE_URL ? (
              <a
                href={PURCHASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaClass} border-accent bg-accent/10 text-accent hover:bg-accent hover:text-night`}
              >
                {t('product.buy')}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <span
                aria-disabled="true"
                className={`${ctaClass} border-line text-mute/60 cursor-not-allowed`}
              >
                {t('product.buySoon')}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
