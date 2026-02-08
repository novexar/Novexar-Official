import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github } from 'lucide-react';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { LazyCanvas } from '@/components/3d/common/LazyCanvas';
import contentData from '@/data/content.json';

const ContactParticles = lazy(() =>
  import('@/components/3d/contact/ContactParticles').then((m) => ({ default: m.ContactParticles }))
);

export const ContactSectionNew = () => {
  const capability = useDeviceCapability();
  const show3D = capability !== 'low';
  const { t } = useTranslation();

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
          className="text-4xl font-bold mb-4 text-gradient font-heading"
        >
          {t('contact.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground text-lg mb-12"
        >
          {t('contact.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <a
            href={contentData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
          >
            <Github className="w-5 h-5" />
            {t('contact.github')}
          </a>
          <a
            href="mailto:contact@poxcon.dev"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
          >
            {t('contact.email')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
