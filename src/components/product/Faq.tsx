import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { containerClass, sectionTitleClass } from '@/components/ui/layout';
import type { Product } from '@/data/products';

interface FaqProps {
  product: Product;
}

/** 件数が少ないのでアコーディオンにせず、質問と回答をすべて開いた状態で並べる */
export function Faq({ product }: FaqProps) {
  const { t } = useTranslation();
  const ns = `productPage.${product.i18nKey}`;

  return (
    <section className="py-16 md:py-24">
      <div
        className={`${containerClass} grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20`}
      >
        <h2 className={`${sectionTitleClass} lg:sticky lg:top-28 lg:self-start`}>
          {t('productPage.sections.faq')}
        </h2>
        <dl className="space-y-10">
          {product.faqKeys.map((key, i) => (
            <Reveal key={key} delay={(i % 3) * 0.05}>
              <dt className="text-lg font-medium tracking-tight text-ink">
                {t(`${ns}.faq.${key}.q`)}
              </dt>
              <dd className="mt-3 max-w-[65ch] leading-relaxed text-mute">
                {t(`${ns}.faq.${key}.a`)}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
