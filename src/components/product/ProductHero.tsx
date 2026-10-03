import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import { Reveal } from '@/components/ui/Reveal';
import { containerClass } from '@/components/ui/layout';
import type { Product } from '@/data/products';
import { ProductActions } from './ProductActions';

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const { t } = useTranslation();
  const ns = `productPage.${product.i18nKey}`;

  return (
    <section className="pt-28 pb-12 md:pt-36 md:pb-16">
      <div className={containerClass}>
        <Reveal immediate>
          <Link
            to="/#product"
            className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-ink"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {t('productPage.back')}
          </Link>
        </Reveal>

        <Reveal immediate delay={0.05}>
          <h1 className="mt-10 text-5xl font-semibold leading-none tracking-tighter text-ink md:text-7xl">
            {product.name}
          </h1>
        </Reveal>

        <Reveal immediate delay={0.1}>
          <p className="mt-6 text-xl text-ink md:text-2xl">
            {t(`${ns}.tagline`)}
          </p>
          <p className="mt-5 max-w-[65ch] leading-relaxed text-mute">
            {t(`${ns}.desc`)}
          </p>
          <p className="mt-5 font-mono text-sm text-mute">
            {t(`${ns}.platforms`)}
          </p>
        </Reveal>

        <Reveal immediate delay={0.2}>
          <ProductActions product={product} showPrice className="mt-10" />
        </Reveal>
      </div>
    </section>
  );
}
