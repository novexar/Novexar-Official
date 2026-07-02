interface MarqueeProps {
  items: string[];
  className?: string;
}

/**
 * 無限ループするテキストストリップ。
 * 同一コンテンツを2つ並べ、translateX(-50%) でシームレスに繋げる。
 */
export function Marquee({ items, className = '' }: MarqueeProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden border-y border-line py-5 md:py-6 ${className}`}
    >
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span
                key={`${half}-${item}`}
                className="flex items-center font-display text-sm md:text-lg font-medium uppercase tracking-[0.35em] text-ink/30"
              >
                <span className="mx-8">{item}</span>
                <span className="text-accent/50 text-xs">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
