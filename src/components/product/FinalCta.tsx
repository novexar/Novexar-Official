import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { containerClass } from '@/components/ui/layout';
import type { Product } from '@/data/products';
import { ProductActions } from './ProductActions';

interface FinalCtaProps {
  product: Product;
}

export function FinalCta({ product }: FinalCtaProps) {
  const { t } = useTranslation();
  const ns = `productPage.${product.i18nKey}`;

  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <div className={containerClass}>
        <Reveal className="rounded-2xl border border-line bg-[radial-gradient(90%_120%_at_0%_0%,rgb(var(--accent)/0.2),transparent_60%)] bg-surface p-8 md:p-14">
          <h2 className="text-4xl font-semibold leading-none tracking-tighter text-ink md:text-6xl">
            {t(`${ns}.cta.title`)}
          </h2>
          <p className="mt-5 text-lg text-mute">{t(`${ns}.cta.sub`)}</p>
          <ProductActions product={product} showPrice className="mt-10" />
        </Reveal>
      </div>
    </section>
  );
}
