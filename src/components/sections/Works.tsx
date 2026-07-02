import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Lock } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Project } from '@/types';

interface WorksProps {
  projects: Project[];
}

const formatIndex = (index: number): string =>
  String(index + 1).padStart(2, '0');

function WorkRow({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation();
  const isLinked = Boolean(project.url);
  const description = t(`works.items.${project.id}`, {
    defaultValue: project.description,
  });

  const rowContent = (
    <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[4rem_1fr_minmax(0,20rem)_6rem] items-baseline gap-4 md:gap-8 py-7 md:py-9">
      <span className="font-mono text-xs md:text-sm text-mute/60 group-hover:text-accent transition-colors">
        {formatIndex(index)}
      </span>

      <div className="min-w-0">
        <h3 className="font-display text-2xl md:text-5xl font-bold uppercase tracking-tight text-ink/80 group-hover:text-ink group-hover:translate-x-2 md:group-hover:translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-mute md:hidden">{description}</p>
      </div>

      <div className="hidden md:block min-w-0">
        <p className="text-sm text-mute line-clamp-2">{description}</p>
        {project.tags && (
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-mute/60">
            {project.tags.join(' · ')}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 font-mono text-xs text-mute">
        {project.org && (
          <span className="hidden md:inline rounded-full border border-line px-2.5 py-0.5 text-[0.6rem] uppercase tracking-widest text-accent">
            {project.org}
          </span>
        )}
        <span>{project.year}</span>
        {isLinked ? (
          <ArrowUpRight className="w-4 h-4 text-mute/60 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        ) : (
          <span
            className="inline-flex items-center gap-1 text-mute/60"
            title={t('works.private')}
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[0.6rem] uppercase tracking-widest">
              {t('works.private')}
            </span>
          </span>
        )}
      </div>
    </div>
  );

  const rowClass =
    'group block border-b border-line transition-colors hover:border-ink/30';

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
    >
      {isLinked ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={rowClass}
          aria-label={`${project.title} — GitHub`}
        >
          {rowContent}
        </a>
      ) : (
        <div className={rowClass}>{rowContent}</div>
      )}
    </motion.li>
  );
}

export function Works({ projects }: WorksProps) {
  const { t } = useTranslation();

  return (
    <section id="works" className="px-6 md:px-10 py-28 md:py-40">
      <SectionHeading
        index="02"
        label={t('works.label')}
        count={`/${String(projects.length).padStart(2, '0')}`}
      />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 md:mt-14 font-display text-5xl md:text-8xl font-black uppercase tracking-[-0.03em] leading-none text-ink"
      >
        {t('works.label')}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-mute"
      >
        {t('works.sub')}
      </motion.p>

      <ul className="mt-14 md:mt-20 border-t border-line">
        {projects.map((project, index) => (
          <WorkRow key={project.id} project={project} index={index} />
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-10 flex justify-end"
      >
        <a
          href="https://github.com/novexar"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-2 font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-mute hover:text-ink transition-colors"
        >
          {t('works.viewAll')}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
}
