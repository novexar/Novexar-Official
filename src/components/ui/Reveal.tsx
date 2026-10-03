import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** true ならマウント時に再生（ファーストビュー用）。既定はビューポート進入時 */
  immediate?: boolean;
}

/**
 * フェードアップで現れるラッパー。
 * 移動量の無効化は App の MotionConfig(reducedMotion="user") が担う。
 */
export function Reveal({
  children,
  delay = 0,
  className,
  immediate = false,
}: RevealProps) {
  const target = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      {...(immediate
        ? { animate: target }
        : {
            whileInView: target,
            viewport: { once: true, margin: '-60px' },
          })}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
