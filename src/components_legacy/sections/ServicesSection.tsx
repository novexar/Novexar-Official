import { motion } from 'framer-motion';
import { Cloud, Code, Brain, LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Service } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ServicesSectionProps {
  services: Service[];
}

const iconMap: Record<string, LucideIcon> = {
  Cloud,
  Code,
  Brain,
};

export function ServicesSection({ services }: ServicesSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black to-blue-900/20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gradient font-heading">
          {t('services.title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Cloud;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="card-glass border-border hover:scale-105 transition-transform h-full">
                  <CardHeader>
                    <div className="text-primary mb-4">
                      <Icon className="w-12 h-12" />
                    </div>
                    <CardTitle className="text-xl">{t(`services.${service.id}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {t(`services.${service.id}.description`)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
