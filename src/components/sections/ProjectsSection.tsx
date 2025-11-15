import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileSearch, MessageSquare, Brain, Wrench, Server, LucideIcon, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectsSectionProps {
  projects: Project[];
}

const iconMap: Record<string, LucideIcon> = {
  FileSearch,
  MessageSquare,
  Brain,
  Wrench,
  Server,
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
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

        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden"
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project, index) => {
                const Icon = project.icon ? iconMap[project.icon] : Brain;
                return (
                  <div key={project.id} className="w-full flex-shrink-0 px-4">
                    <Card className="card-glass border-border hover:scale-[1.02] transition-transform">
                      {/* Icon Section */}
                      <div className="relative h-64 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.03) 10px, rgba(255,255,255,.03) 20px)`
                          }} />
                        </div>

                        {/* Large Icon */}
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="relative z-10"
                        >
                          <div className="p-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30">
                            <Icon className="w-24 h-24 text-primary" strokeWidth={1.5} />
                          </div>
                        </motion.div>
                      </div>

                      <CardHeader>
                        <CardTitle className="text-2xl">{project.title}</CardTitle>
                        {project.description && (
                          <CardDescription className="text-base">
                            {project.description}
                          </CardDescription>
                        )}
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Tags */}
                        {project.tags && (
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* View Button */}
                        <Button className="w-full group flex items-center justify-center whitespace-nowrap" asChild>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            <span>{t('projects.viewOnGithub')}</span>
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <Button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
            disabled={currentSlide === 0}
            variant="outline"
            size="icon"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            onClick={() =>
              setCurrentSlide(Math.min(projects.length - 1, currentSlide + 1))
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
            disabled={currentSlide === projects.length - 1}
            variant="outline"
            size="icon"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-primary'
                    : 'bg-muted hover:bg-muted-foreground'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
