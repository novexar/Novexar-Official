import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Project } from '@/types';


interface ProjectsSectionProps {
  projects: Project[];
}



export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="project" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            {t('projects.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('projects.description')}
          </p>
        </motion.div>

        <div className="relative h-[600px] w-full">
          {/* 3D Gallery Placeholder - Rendered in Global Experience */}

          {/* Fallback/Overlay for mobile or additional info could go here */}
          <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
            <p className="text-sm text-muted-foreground">
              {t('projects.dragToExplore')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
