import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { LazyCanvas } from '@/components/3d/common/LazyCanvas';
import contentData from '@/data/content.json';

const MeshWave = lazy(() =>
  import('@/components/3d/about/MeshWave').then((m) => ({ default: m.MeshWave }))
);

export const AboutSectionNew = () => {
  const capability = useDeviceCapability();
  const show3D = capability !== 'low';
  const { t } = useTranslation();

  return (
    <section id="about-me" className="relative min-h-screen py-20 bg-[#030303] overflow-hidden">
      {/* 3D Mesh Wave Background */}
      {show3D && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LazyCanvas
            className="w-full h-full"
            camera={{ position: [0, 0, 5], fov: 45 }}
          >
            <Suspense fallback={null}>
              <MeshWave />
            </Suspense>
            <ambientLight intensity={1} />
          </LazyCanvas>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient font-heading">
            {t('about.title')}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {contentData.about.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-lg text-gray-400 leading-relaxed font-light"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};
