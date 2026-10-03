import { useTranslation } from 'react-i18next';
import { ArrowUpRightIcon, DownloadSimpleIcon } from '@phosphor-icons/react';
import {
  ctaAccentClass,
  ctaDisabledClass,
  ctaGhostClass,
} from '@/components/ui/cta';
import type { Product } from '@/data/products';

interface ProductActionsProps {
  product: Product;
  /** true なら購入ボタンに価格を併記する */
  showPrice?: boolean;
  className?: string;
}

/** 無料ダウンロードと Pro 購入の 2 ボタン。製品ページ内で共通利用する */
export function ProductActions({
  product,
  showPrice = false,
  className = '',
}: ProductActionsProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <DownloadButton product={product} />
      <PurchaseButton product={product} showPrice={showPrice} />
    </div>
  );
}

export function DownloadButton({ product }: { product: Product }) {
  const { t } = useTranslation();

  return (
    <a
      href={product.downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={ctaGhostClass}
    >
      <DownloadSimpleIcon className="h-4 w-4" />
      {t('product.download')}
    </a>
  );
}

export function PurchaseButton({
  product,
  showPrice = false,
}: {
  product: Product;
  showPrice?: boolean;
}) {
  const { t } = useTranslation();

  if (!product.purchaseUrl) {
    return (
      <span aria-disabled="true" className={ctaDisabledClass}>
        {t('product.buySoon')}
      </span>
    );
  }

  return (
    <a
      href={product.purchaseUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={ctaAccentClass}
    >
      {t('product.buy')}
      {showPrice && <span className="font-mono">{product.pricePro}</span>}
      <ArrowUpRightIcon className="h-4 w-4" />
    </a>
  );
}
