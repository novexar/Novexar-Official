import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Project } from '@/types';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(Math.floor(projects.length / 2));
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, projects.length - 1));
      setActiveIndex(clamped);
    },
    [projects.length]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(activeIndex + (diff > 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  return (
    <section id="project" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient font-heading">
            {t('projects.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('projects.description')}
          </p>
        </motion.div>

        {/* 3D Coverflow Carousel */}
        <div
          className="relative h-[450px] md:h-[500px] w-full overflow-hidden"
          style={{ perspective: '1200px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {projects.map((project, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;

              const translateX = offset * 280;
              const translateZ = isActive ? 0 : -200 - absOffset * 50;
              const rotateY = offset * -25;
              const scale = isActive ? 1 : 0.8 - absOffset * 0.05;
              const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.2;
              const zIndex = 10 - absOffset;

              return (
                <motion.div
                  key={project.id}
                  className="absolute w-[300px] md:w-[400px] cursor-pointer"
                  style={{
                    zIndex,
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    transformStyle: 'preserve-3d',
                  }}
                  onClick={() => goTo(index)}
                >
                  <div
                    className={`relative rounded-xl overflow-hidden border ${
                      isActive
                        ? 'border-primary/50 shadow-[0_0_30px_rgba(56,189,248,0.15)]'
                        : 'border-white/10'
                    } bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm`}
                  >
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold font-heading mb-2 text-white">
                        {project.title}
                      </h3>
                      {project.tags && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {isActive && (
                        <motion.a
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mt-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t('projects.viewOnGithub')}
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 border border-white/10 text-white disabled:opacity-30 hover:bg-black/70 transition-colors"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === projects.length - 1}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 border border-white/10 text-white disabled:opacity-30 hover:bg-black/70 transition-colors"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex
                  ? 'w-8 bg-primary'
                  : 'bg-muted hover:bg-muted-foreground'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
