import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { containerClass, sectionTitleClass } from '@/components/ui/layout';
import type { Product } from '@/data/products';

interface HowItWorksProps {
  product: Product;
}

export function HowItWorks({ product }: HowItWorksProps) {
  const { t } = useTranslation();
  const ns = `productPage.${product.i18nKey}`;

  return (
    <section className="py-16 md:py-24">
      <div className={containerClass}>
        <h2 className={sectionTitleClass}>
          {t('productPage.sections.howItWorks')}
        </h2>
        <ol className="mt-10 grid gap-x-10 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {product.stepKeys.map((key, i) => (
            <li key={key}>
              <Reveal delay={i * 0.08}>
                <span className="font-mono text-sm text-accent">{i + 1}</span>
                <h3 className="mt-3 text-xl font-medium tracking-tight text-ink">
                  {t(`${ns}.steps.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {t(`${ns}.steps.${key}.desc`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
