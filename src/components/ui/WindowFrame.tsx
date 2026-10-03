import type { ReactNode } from 'react';

interface WindowFrameProps {
  children: ReactNode;
  className?: string;
}

/** スクリーンショットを収める二重ベゼルの枠（外殻 rounded-2xl / 中身 rounded-xl） */
export function WindowFrame({ children, className = '' }: WindowFrameProps) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface p-1.5 shadow-[0_32px_80px_-24px_rgb(0_0_0/0.8)] ${className}`}
    >
      <div className="overflow-hidden rounded-xl border border-ink/5">
        {children}
      </div>
    </div>
  );
}
