import { SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import skillsData from '@/data/skills.json';

const formatIndex = (index: number): string =>
  String(index + 1).padStart(2, '0');

const hideBrokenIcon = (e: SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = 'none';
};

export const Skills = () => {
  const { t } = useTranslation();
  const totalSkills = skillsData.skillCategories.reduce(
    (sum, category) => sum + category.skills.length,
    0
  );

  return (
    <section id="skills" className="px-6 md:px-10 py-28 md:py-40">
      <SectionHeading
        index="04"
        label={t('skills.label')}
        count={`/${String(totalSkills).padStart(2, '0')}`}
      />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-10 md:mt-14 font-serif italic text-2xl md:text-4xl text-ink/90"
      >
        {t('skills.sub')}
      </motion.p>

      <div className="mt-14 md:mt-20 border-t border-line">
        {skillsData.skillCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
            className="grid md:grid-cols-[16rem_1fr] gap-4 md:gap-8 border-b border-line py-8 md:py-10"
          >
            <h3 className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.3em] text-mute md:pt-2.5">
              <span className="text-mute/60">{formatIndex(index)}</span>
              {category.title}
            </h3>

            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  title={skill.description}
                  className="inline-flex items-center gap-2.5 rounded-full border border-line bg-ink/[0.02] px-4 py-2 text-sm text-mute hover:border-accent/40 hover:text-ink hover:bg-ink/[0.05] transition-colors"
                >
                  <img
                    src={skill.icon}
                    alt=""
                    className="h-4 w-4"
                    loading="lazy"
                    onError={hideBrokenIcon}
                  />
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
