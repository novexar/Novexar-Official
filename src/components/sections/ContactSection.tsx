import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { LazyCanvas } from '@/components/3d/common/LazyCanvas';

const ContactParticles = lazy(() =>
  import('@/components/3d/contact/ContactParticles').then((m) => ({ default: m.ContactParticles }))
);

export const ContactSectionNew = () => {
  const capability = useDeviceCapability();
  const show3D = capability !== 'low';

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center bg-[#030303] overflow-hidden">
      {/* 3D Particle Background */}
      {show3D && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LazyCanvas
            className="w-full h-full"
            camera={{ position: [0, 0, 5], fov: 45 }}
          >
            <Suspense fallback={null}>
              <ContactParticles />
            </Suspense>
          </LazyCanvas>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm font-['Inter'] tracking-[0.5em] text-azure-light uppercase mb-8"
        >
          Ready to Start?
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold font-['Syncopate'] mb-16"
        >
          LET'S BUILD <br />
          <span className="text-transparent text-stroke-white hover:text-white transition-colors duration-500 cursor-none">
            SOMETHING GREAT
          </span>
        </motion.h3>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="mailto:contact@example.com"
            className="relative inline-block group"
          >
            <span className="absolute inset-0 border border-azure rounded-full scale-110 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500" />
            <span className="relative block px-12 py-6 bg-white text-black font-['Syncopate'] font-bold tracking-wider rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
              GET IN TOUCH
            </span>
          </a>
        </motion.div>

        <div className="mt-20 flex justify-center gap-8">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors uppercase text-xs tracking-widest">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors uppercase text-xs tracking-widest">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors uppercase text-xs tracking-widest">Twitter</a>
        </div>

        <footer className="absolute bottom-8 left-0 w-full text-center text-gray-600 text-xs font-['Inter'] tracking-widest uppercase">
          &copy; 2024 POXCON. All Rights Reserved.
        </footer>
      </div>
    </section>
  );
};
