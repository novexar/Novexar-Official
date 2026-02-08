import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AboutContent } from '@/types';



interface AboutSectionProps {
  content: AboutContent;
}

export function AboutSection({ content }: AboutSectionProps) {
  const { t } = useTranslation();

  const roles = [
    t('about.developer'),
    t('about.engineer'),
    t('about.consultant'),
    t('about.architect')
  ];
  return (
    <section id="about-me" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">
                {t('about.badge')}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-left space-y-6 text-lg text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t('about.paragraph1')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {t('about.paragraph2')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t('about.paragraph3')}
              </motion.p>

              {/* Role Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 pt-6"
              >
                {roles.map((role, index) => (
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm"
                  >
                    <span className="font-semibold text-foreground">{role}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* 3D Skills Galaxy Placeholder - Rendered in Global Experience */}
            <div className="h-[400px] w-full relative" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
