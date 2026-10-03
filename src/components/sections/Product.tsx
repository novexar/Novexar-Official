import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRightIcon, DownloadSimpleIcon } from '@phosphor-icons/react';
import { Reveal } from '@/components/ui/Reveal';
import { WindowFrame } from '@/components/ui/WindowFrame';
import { ctaAccentClass, ctaGhostClass } from '@/components/ui/cta';
import { containerClass, sectionTitleClass } from '@/components/ui/layout';
import { PRODUCTS, screenshotSrc } from '@/data/products';

const TEASER_SCREENSHOT_ID = 'search';

/** トップページの Product ティーザー。詳細・購入導線は個別ページに集約 */
export const Product = () => {
  const { t } = useTranslation();
  const [product] = PRODUCTS;
  const ns = `productPage.${product.i18nKey}`;

  return (
    <section id="product" className="py-24 md:py-36">
      <div
        className={`${containerClass} grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20`}
      >
        {/* モバイルでは文章を先に読ませるため order で入れ替える */}
        <Reveal className="order-2 lg:order-1">
          <WindowFrame>
            <img
              src={screenshotSrc(product, TEASER_SCREENSHOT_ID)}
              alt={t(`${ns}.screenshots.${TEASER_SCREENSHOT_ID}`)}
              loading="lazy"
              className="block w-full"
            />
          </WindowFrame>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <p className="text-sm text-accent">{t('product.label')}</p>
          <h2 className={`mt-3 ${sectionTitleClass}`}>{product.name}</h2>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-mute">
            {t(`${ns}.tagline`)}
          </p>

          <dl className="mt-8 flex gap-10">
            <div>
              <dt className="text-sm text-mute">
                {t('product.plans.free.name')}
              </dt>
              <dd className="mt-1 font-mono text-2xl text-ink">
                {product.priceFree}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-mute">
                {t('product.plans.pro.name')} / {t('product.oneTime')}
              </dt>
              <dd className="mt-1 font-mono text-2xl text-ink">
                {product.pricePro}
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to={`/products/${product.slug}`} className={ctaAccentClass}>
              {t('product.viewDetails')}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href={product.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaGhostClass}
            >
              <DownloadSimpleIcon className="h-4 w-4" />
              {t('product.download')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
