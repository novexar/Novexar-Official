import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { HeroContent } from '@/types';
import { KineticText } from '@/components/ui/KineticText';

interface HeroSectionProps {
  content: HeroContent;
}



export function HeroSection({ }: HeroSectionProps) {
  const { t } = useTranslation();
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/50 to-dark-bg pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-8"
        >
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">
            {t('hero.badge')}
          </span>
        </motion.div>
        <div className="relative z-10 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full mb-12"
          >
            <div className="w-full py-4">
              <KineticText baseVelocity={-2} className="text-6xl md:text-8xl font-bold text-transparent text-stroke-white opacity-30 font-['Syncopate']">
                CREATIVE DEVELOPER
              </KineticText>
              <KineticText baseVelocity={2} className="text-6xl md:text-8xl font-bold text-white font-['Syncopate'] mt-4">
                FULL STACK ENGINEER
              </KineticText>
            </div>
          </motion.div>

          <div className="container mx-auto px-6">
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light tracking-wide"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-none border border-primary text-white transition-all hover:bg-primary/10"
              >
                <span className="relative z-10 font-['Syncopate'] font-bold tracking-wider">
                  {t('hero.viewWork')}
                </span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-none transition-all duration-300 group-hover:scale-100 group-hover:bg-primary/20" />
              </a>

              <a
                href="#contact"
                className="group relative px-8 py-4 bg-white text-black overflow-hidden rounded-none transition-all hover:bg-gray-200"
              >
                <span className="relative z-10 font-['Syncopate'] font-bold tracking-wider">
                  {t('hero.contactMe')}
                </span>
              </a>
            </motion.div>
          </div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
