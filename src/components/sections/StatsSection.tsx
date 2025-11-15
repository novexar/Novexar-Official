import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar, FolderKanban, Code, LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Statistic } from '@/types';

interface StatsSectionProps {
  statistics: Statistic[];
}

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  FolderKanban,
  Code,
};

function AnimatedCounter({ target, duration = 2000 }: { target: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseInt(target.replace(/\D/g, ''), 10);
    if (isNaN(numericValue)) {
      setCount(numericValue);
      return;
    }

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * numericValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  const suffix = target.replace(/[0-9]/g, '');
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection({ statistics }: StatsSectionProps) {
  const { t } = useTranslation();

  // Calculate years of experience dynamically (current year - 2015)
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2015;

  return (
    <section className="py-20 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statistics.map((stat, index) => {
            const Icon = iconMap[stat.icon] || Code;
            // Use dynamic years for experience stat
            const displayValue = stat.id === 'experience' ? `${yearsOfExperience}+` : stat.value;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                    <AnimatedCounter target={displayValue} />
                  </h3>
                  <p className="text-lg font-semibold">{t(`stats.${stat.id}.label`)}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
