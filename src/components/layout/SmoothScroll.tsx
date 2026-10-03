import { ReactNode, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { LenisContext } from './lenis-context';

interface SmoothScrollProps {
  children: ReactNode;
}

const HEADER_OFFSET = -72;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // 視差効果を減らす設定のユーザーには慣性スクロールを適用しない（ネイティブのまま）
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    setLenis(instance);

    let rafId = requestAnimationFrame(function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    // Handle anchor link navigation
    const handleAnchorClick = (e: MouseEvent) => {
      // 新規タブで開く操作（Ctrl / Cmd / Shift クリック、中クリック）は横取りしない
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#') || href.length < 2) return;

      // セレクタとして解釈させず id で引く（不正な文字列でも例外にならない）
      const el = document.getElementById(href.slice(1));
      if (!el) return;

      e.preventDefault();
      instance.scrollTo(el, { offset: HEADER_OFFSET });
      // スキップリンクなどでキーボードフォーカスも移す
      el.focus({ preventScroll: true });
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <div className="smooth-scroll-wrapper">{children}</div>
    </LenisContext.Provider>
  );
};
