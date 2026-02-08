import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
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

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
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
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[10rem] font-bold tracking-tighter font-heading leading-none text-transparent text-stroke-white mix-blend-overlay opacity-50"
          >
            CREATIVE
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[10rem] font-bold tracking-tighter font-heading leading-none text-white mix-blend-overlay"
          >
            DEVELOPER
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 text-sm md:text-base font-['Inter'] tracking-[0.5em] text-azure-light uppercase"
        >
          Crafting Digital Experiences
        </motion.p>
      </div>
    </section>
  );
};
