import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { containerClass, sectionTitleClass } from '@/components/ui/layout';
import type { Product } from '@/data/products';

interface RequirementsProps {
  product: Product;
}

export function Requirements({ product }: RequirementsProps) {
  const { t } = useTranslation();
  const ns = `productPage.${product.i18nKey}`;

  return (
    <section className="py-16 md:py-24">
      <div className={containerClass}>
        <h2 className={sectionTitleClass}>
          {t('productPage.sections.requirements')}
        </h2>
        <Reveal>
          <dl className="mt-10 grid gap-x-10 gap-y-8 md:mt-14 md:grid-cols-3">
            {product.requirementKeys.map((key) => (
              <div key={key}>
                <dt className="text-sm text-mute">
                  {t(`${ns}.requirements.${key}.label`)}
                </dt>
                <dd className="mt-2 leading-relaxed text-ink">
                  {t(`${ns}.requirements.${key}.value`)}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
