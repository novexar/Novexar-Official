import { useEffect, useState } from 'react';

export function useScrollProgress(sectionId: string): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = el.offsetHeight;

      // 0 when section enters viewport from bottom, 1 when it leaves from top
      const rawProgress = (windowHeight - rect.top) / (windowHeight + sectionHeight);
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionId]);

  return progress;
}
