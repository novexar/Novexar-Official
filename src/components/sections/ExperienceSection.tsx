import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Certification } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ExperienceSectionProps {
  certifications: Certification[];
}

export function ExperienceSection({ certifications }: ExperienceSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            {t('experience.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('experience.description')}
          </p>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            {t('experience.certifications.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-glass border-border hover:scale-105 transition-transform text-center h-full">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-full bg-primary/10">
                        <Award className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                    <CardDescription>{cert.issuer}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm font-semibold text-primary">
                      {cert.date}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
