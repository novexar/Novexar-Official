import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageIcon } from '@phosphor-icons/react';
import { Reveal } from '@/components/ui/Reveal';
import { WindowFrame } from '@/components/ui/WindowFrame';
import { containerClass, sectionTitleClass } from '@/components/ui/layout';
import { screenshotSrc, type Product } from '@/data/products';

interface ScreenshotGalleryProps {
  product: Product;
}

export function ScreenshotGallery({ product }: ScreenshotGalleryProps) {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24">
      <div className={containerClass}>
        <h2 className={sectionTitleClass}>
          {t('productPage.sections.screenshots')}
        </h2>
        <div className="mt-10 grid gap-x-6 gap-y-10 md:mt-14 md:grid-cols-2">
          {product.screenshotIds.map((id, i) => (
            <ScreenshotFrame key={id} product={product} id={id} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ScreenshotFrameProps {
  product: Product;
  id: string;
  index: number;
}

function ScreenshotFrame({ product, id, index }: ScreenshotFrameProps) {
  const { t } = useTranslation();
  const [failed, setFailed] = useState(false);
  const caption = t(`productPage.${product.i18nKey}.screenshots.${id}`);

  return (
    <Reveal delay={(index % 2) * 0.08}>
      <figure>
        <WindowFrame>
          {failed ? (
            <div className="flex aspect-[3/2] w-full flex-col items-center justify-center gap-3 bg-raised">
              <ImageIcon className="h-6 w-6 text-mute" />
              <span className="text-sm text-mute">
                {t('productPage.comingSoon')}
              </span>
            </div>
          ) : (
            <img
              src={screenshotSrc(product, id)}
              alt={caption}
              loading="lazy"
              onError={() => setFailed(true)}
              className="block w-full"
            />
          )}
        </WindowFrame>
        <figcaption className="mt-4 text-sm text-mute">{caption}</figcaption>
      </figure>
    </Reveal>
  );
}
