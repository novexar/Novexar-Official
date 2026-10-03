/** public/brand 配下のロゴ素材。原本は MASTER/01. Icon にあり、余白を切り詰めて書き出している */
const brandAsset = (file: string): string =>
  `${import.meta.env.BASE_URL}brand/${file}`;

/** シンボルマーク（大）。960 x 914 */
export const BRAND_ICON = {
  src: brandAsset('icon.webp'),
  width: 960,
  height: 914,
} as const;

/** シンボルマーク（ヘッダー用の小サイズ）。96 x 91 */
export const BRAND_ICON_SMALL = {
  src: brandAsset('icon-small.webp'),
  width: 96,
  height: 91,
} as const;
