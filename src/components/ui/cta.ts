/** サイト共通の丸ピルCTAの基本クラス */
export const ctaBaseClass =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition duration-300 ease-out active:scale-[0.98]';

/** アクセント（購入・主要導線） */
export const ctaAccentClass = `${ctaBaseClass} border-accent bg-accent text-night hover:brightness-110`;

/** セカンダリ（ダウンロードなど） */
export const ctaGhostClass = `${ctaBaseClass} border-line text-ink hover:border-ink/30 hover:bg-ink/5`;

/** 無効状態（販売準備中など） */
export const ctaDisabledClass = `${ctaBaseClass} border-line text-mute cursor-not-allowed active:scale-100`;
