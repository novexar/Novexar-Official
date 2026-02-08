import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { LazyCanvas } from '@/components/3d/common/LazyCanvas';

const HeroScene = lazy(() =>
  import('@/components/3d/hero/HeroScene').then((m) => ({ default: m.HeroScene }))
);

const GradientFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-[#030303] via-[#0a1628] to-[#1a0533] opacity-80" />
);

export const HeroSection = () => {
  const capability = useDeviceCapability();
  const { t } = useTranslation();

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* 3D Background Layer */}
      {capability !== 'low' ? (
        <div className="absolute inset-0 z-0">
          <LazyCanvas
            className="w-full h-full"
            fallback={<GradientFallback />}
            camera={{ position: [0, 0, 5], fov: 45 }}
          >
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </LazyCanvas>
        </div>
      ) : (
        <GradientFallback />
      )}

      {/* Text Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs md:text-sm font-['Inter'] tracking-[0.5em] text-azure-light uppercase mb-6"
        >
          {t('hero.badge')}
        </motion.span>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[10rem] font-bold tracking-tighter font-heading leading-none text-white"
          >
            POXCON
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-lg md:text-xl text-gray-300 font-light tracking-wide"
        >
          {t('hero.description')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 text-xs font-['Inter'] tracking-[0.3em] text-gray-500 uppercase"
        >
          {t('hero.scrollText')}
        </motion.p>
      </div>
    </section>
  );
};
