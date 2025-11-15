import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Testimonial } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-black to-purple-900/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground text-lg">
            クライアント様からいただいた声
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="card-glass border-border">
                <CardHeader>
                  <div className="flex items-center gap-6 mb-6">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-20 h-20 rounded-full border-4 border-primary/20"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{currentTestimonial.name}</h3>
                      <p className="text-muted-foreground">
                        {currentTestimonial.position} at {currentTestimonial.company}
                      </p>
                      <div className="flex gap-1 mt-2">
                        {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <Quote className="w-12 h-12 text-primary/20" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    "{currentTestimonial.comment}"
                  </p>
                  <div className="pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      プロジェクト: <span className="text-foreground font-semibold">{currentTestimonial.project}</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'bg-muted hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
