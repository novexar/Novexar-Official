import type { SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';
import { containerClass, sectionTitleClass } from '@/components/ui/layout';
import skillsData from '@/data/skills.json';

/**
 * 5 カテゴリを 2 + 3 のベントに並べる（6 列グリッド）。
 * 上段 2 セルは幅広、うち 1 つと下段 1 つに色味を付けて単調さを避ける。
 * カテゴリ数が増えた場合は最後の定義を繰り返す。
 */
const CELL_STYLES = [
  'md:col-span-3 bg-[radial-gradient(110%_100%_at_100%_0%,rgb(var(--accent)/0.18),transparent_60%)] bg-surface',
  'md:col-span-3 bg-surface',
  'md:col-span-2 bg-surface',
  'md:col-span-2 bg-raised',
  'md:col-span-2 bg-surface',
] as const;

const hideBrokenIcon = (e: SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = 'none';
};

export const Skills = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-24 md:py-36">
      <div className={containerClass}>
        <Reveal>
          <h2 className={sectionTitleClass}>{t('skills.label')}</h2>
          <p className="mt-4 text-mute">{t('skills.sub')}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-6">
          {skillsData.skillCategories.map((category, index) => (
            <Reveal
              key={category.id}
              delay={(index % 3) * 0.08}
              className={`rounded-2xl border border-line p-6 md:p-8 ${
                CELL_STYLES[Math.min(index, CELL_STYLES.length - 1)]
              }`}
            >
              <h3 className="text-lg font-medium tracking-tight text-ink">
                {category.title}
              </h3>
              <ul className="mt-8 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-night/40 px-3.5 py-1.5 text-sm text-ink/90"
                  >
                    <img
                      src={skill.icon}
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4"
                      loading="lazy"
                      onError={hideBrokenIcon}
                    />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
