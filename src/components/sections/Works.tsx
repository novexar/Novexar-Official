import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRightIcon, LockSimpleIcon } from '@phosphor-icons/react';
import { Reveal } from '@/components/ui/Reveal';
import { containerClass, sectionTitleClass } from '@/components/ui/layout';
import { GITHUB_PROFILE_URL } from '@/data/links';
import type { Project } from '@/types';

interface WorksProps {
  projects: Project[];
}

interface ProjectItemProps {
  project: Project;
}

/**
 * ベント各セルの見た目。1 件目を大きく、背景は 3 種類に振り分けて単調さを避ける。
 * 件数が変わっても破綻しないよう、範囲外は最後の要素を使う。
 */
const FEATURED_CELLS = [
  {
    span: 'lg:col-span-2 lg:row-span-2',
    surface:
      'bg-[radial-gradient(120%_90%_at_0%_0%,rgb(var(--accent)/0.22),transparent_60%)] bg-surface',
    title: 'text-4xl md:text-6xl',
  },
  { span: '', surface: 'bg-raised', title: 'text-2xl md:text-3xl' },
  { span: '', surface: 'bg-surface', title: 'text-2xl md:text-3xl' },
] as const;

function useProjectDescription(project: Project): string {
  const { t } = useTranslation();
  return t(`works.items.${project.id}`, { defaultValue: project.description });
}

/** 公開リポジトリならリンク、非公開なら「非公開」表示 */
function ProjectStatus({ project }: ProjectItemProps) {
  const { t } = useTranslation();

  if (project.url) {
    return (
      <ArrowUpRightIcon
        aria-hidden="true"
        className="h-5 w-5 shrink-0 text-mute transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
      />
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-mute">
      <LockSimpleIcon aria-hidden="true" className="h-3.5 w-3.5" />
      {t('works.private')}
    </span>
  );
}

/** url があれば外部リンク、なければ素の div で包む */
function ProjectShell({
  project,
  className,
  children,
}: ProjectItemProps & { className: string; children: ReactNode }) {
  if (!project.url) {
    return <div className={className}>{children}</div>;
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function ProjectMeta({ project }: ProjectItemProps) {
  const parts = [project.year, ...(project.tags ?? [])].filter(Boolean);
  return <p className="font-mono text-xs text-mute">{parts.join(' / ')}</p>;
}

function FeaturedCard({ project, index }: ProjectItemProps & { index: number }) {
  const description = useProjectDescription(project);
  const cell = FEATURED_CELLS[Math.min(index, FEATURED_CELLS.length - 1)];

  return (
    <Reveal delay={index * 0.08} className={cell.span}>
      <ProjectShell
        project={project}
        className={`group flex h-full min-h-[15rem] flex-col justify-between gap-10 rounded-2xl border border-line p-6 transition-colors duration-300 hover:border-ink/25 md:p-8 ${cell.surface}`}
      >
        <div className="flex items-start justify-between gap-4">
          <ProjectMeta project={project} />
          <ProjectStatus project={project} />
        </div>
        <div>
          <h3
            className={`font-semibold leading-none tracking-tighter text-ink ${cell.title}`}
          >
            {project.title}
          </h3>
          <p className="mt-3 max-w-[48ch] leading-relaxed text-mute">
            {description}
          </p>
        </div>
      </ProjectShell>
    </Reveal>
  );
}

function CompactItem({ project, index }: ProjectItemProps & { index: number }) {
  const description = useProjectDescription(project);

  return (
    <Reveal delay={(index % 3) * 0.06}>
      <ProjectShell project={project} className="group block">
        <div className="flex items-start justify-between gap-4">
          <h4 className="text-lg font-medium tracking-tight text-ink">
            {project.title}
          </h4>
          <ProjectStatus project={project} />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-mute">{description}</p>
        <div className="mt-3">
          <ProjectMeta project={project} />
        </div>
      </ProjectShell>
    </Reveal>
  );
}

export function Works({ projects }: WorksProps) {
  const { t } = useTranslation();
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section id="works" className="py-24 md:py-36">
      <div className={containerClass}>
        <Reveal>
          <h2 className={sectionTitleClass}>{t('works.label')}</h2>
          <p className="mt-4 max-w-[65ch] text-mute">{t('works.sub')}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {featured.map((project, index) => (
            <FeaturedCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {rest.length > 0 && (
          <>
            <h3 className="mt-16 text-lg font-medium text-ink md:mt-20">
              {t('works.more')}
            </h3>
            <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((project, index) => (
                <CompactItem key={project.id} project={project} index={index} />
              ))}
            </div>
          </>
        )}

        <div className="mt-14 md:mt-16">
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-2 text-sm text-ink"
          >
            {t('works.viewAll')}
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
