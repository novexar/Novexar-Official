import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { LazyCanvas } from '@/components/3d/common/LazyCanvas';
import statsData from '@/data/stats.json';

const StatsRing = lazy(() =>
  import('@/components/3d/stats/StatsRing').then((m) => ({ default: m.StatsRing }))
);

const RING_COLORS = ['#3B82F6', '#38BDF8', '#8B5CF6', '#3B82F6'];

export const StatsSection = () => {
  const capability = useDeviceCapability();
  const show3D = capability !== 'low';
  const { t } = useTranslation();

  return (
    <section id="stats" className="relative py-20 bg-[#030303]">
      <div className="container mx-auto px-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gradient font-heading"
        >
          {t('stats.title')}
        </motion.h2>
      </div>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {statsData.statistics.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              {/* 3D Ring background */}
              {show3D && (
                <div className="absolute inset-0 opacity-50 pointer-events-none">
                  <LazyCanvas
                    className="w-full h-full"
                    camera={{ position: [0, 0, 3], fov: 40 }}
                  >
                    <Suspense fallback={null}>
                      <StatsRing color={RING_COLORS[i % RING_COLORS.length]} />
                    </Suspense>
                  </LazyCanvas>
                </div>
              )}

              <div className="relative z-10">
                <h4 className="text-4xl md:text-5xl font-bold text-white mb-2 font-heading">
                  {stat.value}
                </h4>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
