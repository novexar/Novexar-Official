import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ContactContent } from '@/types';

interface ContactSectionProps {
  content: ContactContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      {/* Decorative glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient font-heading">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            {t('contact.description')}
          </p>

          {/* Social links */}
          <div className="flex justify-center gap-8 mb-12">
            <motion.a
              href={content.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub Profile"
            >
              <div className="p-5 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 group-hover:border-primary/60 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-all">
                <Github className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">
                {t('contact.github')}
              </span>
            </motion.a>

            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn Profile"
            >
              <div className="p-5 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 group-hover:border-primary/60 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-all">
                <Linkedin className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">
                LinkedIn
              </span>
            </motion.a>

            <motion.a
              href="mailto:contact@poxcon.dev"
              className="group flex flex-col items-center gap-3"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email"
            >
              <div className="p-5 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 group-hover:border-primary/60 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-all">
                <Mail className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">
                {t('contact.email')}
              </span>
            </motion.a>
          </div>

          {/* CTA Button */}
          <motion.a
            href="mailto:contact@poxcon.dev"
            className="inline-block px-10 py-4 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-bold font-heading tracking-wider hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('contact.contactMe')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
