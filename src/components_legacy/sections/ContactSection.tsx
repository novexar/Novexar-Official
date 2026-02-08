import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
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
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-8 text-gradient">
            {t('contact.title')}
          </h2>
          <a
            href={content.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-6xl text-white hover:text-primary transition-colors"
            aria-label="GitHub Profile"
          >
            <Github />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
