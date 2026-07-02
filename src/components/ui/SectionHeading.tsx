import { motion } from 'framer-motion';

interface SectionHeadingProps {
  index: string;
  label: string;
  count?: string;
}

/** 全セクション共通のエディトリアルなヘッダー行 */
export function SectionHeading({ index, label, count }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-baseline justify-between border-b border-line pb-4"
    >
      <span className="font-mono text-[0.65rem] md:text-xs uppercase tracking-[0.35em] text-mute">
        {index} — {label}
      </span>
      {count && (
        <span className="font-mono text-[0.65rem] md:text-xs text-mute/60">
          {count}
        </span>
      )}
    </motion.div>
  );
}
