import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { containerClass, sectionTitleClass } from '@/components/ui/layout';
import type { Product } from '@/data/products';

interface FeatureGridProps {
  product: Product;
}

/** Pro 限定機能のセルはアクセントの色味で区別する */
const PRO_SURFACE =
  'bg-[radial-gradient(120%_100%_at_100%_0%,rgb(var(--accent)/0.2),transparent_65%)] bg-surface';

export function FeatureGrid({ product }: FeatureGridProps) {
  const { t } = useTranslation();
  const ns = `productPage.${product.i18nKey}`;

  return (
    <section className="py-16 md:py-24">
      <div className={containerClass}>
        <h2 className={sectionTitleClass}>
          {t('productPage.sections.features')}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {product.features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal
                key={feature.key}
                delay={(i % 4) * 0.06}
                className={`rounded-2xl border border-line p-6 ${
                  feature.pro ? PRO_SURFACE : 'bg-surface'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon aria-hidden="true" className="h-6 w-6 text-accent" />
                  {feature.pro && (
                    <span className="text-xs font-medium text-accent">
                      {t('productPage.proBadge')}
                    </span>
                  )}
                </div>
                <h3 className="mt-8 text-lg font-medium tracking-tight text-ink">
                  {t(`${ns}.features.${feature.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {t(`${ns}.features.${feature.key}.desc`)}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
