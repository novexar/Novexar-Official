import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Certification } from '@/types';

interface ExperienceSectionProps {
  certifications: Certification[];
}

function FlipCard({ cert, index }: { cert: Certification; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-[220px] cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-colors flex flex-col items-center justify-center p-6 text-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="p-4 rounded-full bg-primary/10 mb-4">
            <Award className="w-8 h-8 text-primary" />
          </div>
          <h4 className="text-lg font-bold font-heading text-white mb-1">
            {cert.name}
          </h4>
          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30 flex flex-col items-center justify-center p-6 text-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <Award className="w-10 h-10 text-primary mb-3" />
          <h4 className="text-lg font-bold font-heading text-white mb-2">
            {cert.name}
          </h4>
          <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
          <div className="mt-3 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30">
            <span className="text-sm font-semibold text-primary">
              {cert.date}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection({ certifications }: ExperienceSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient font-heading">
            {t('experience.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('experience.description')}
          </p>
        </motion.div>

        {/* Certifications with 3D flip cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center font-heading">
            {t('experience.certifications.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {certifications.map((cert, index) => (
              <FlipCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
