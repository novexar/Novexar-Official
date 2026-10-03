import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowDownIcon } from '@phosphor-icons/react';
import { Reveal } from '@/components/ui/Reveal';
import { ctaAccentClass, ctaGhostClass } from '@/components/ui/cta';
import { containerClass } from '@/components/ui/layout';
import { BRAND_ICON } from '@/data/brand';

/** スクロールに対してシンボルマークが遅れて動く量(px) */
const PARALLAX_DISTANCE = 64;

export const Hero = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  // 連続値は state ではなく MotionValue で扱う（再レンダリングを起こさない）
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const markY = useTransform(scrollYProgress, [0, 1], [0, PARALLAX_DISTANCE]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden pt-24 pb-16 md:pb-24 lg:flex lg:min-h-[100dvh] lg:items-center"
    >
      <div
        className={`${containerClass} relative grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16`}
      >
        <div>
          <Reveal immediate>
            <h1 className="text-6xl font-semibold leading-none tracking-tighter text-ink md:text-7xl xl:text-8xl">
              Novexar
            </h1>
          </Reveal>

          <Reveal immediate delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mute md:text-xl">
              {t('hero.lead')}
            </p>
          </Reveal>

          <Reveal immediate delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <Link to="/#works" className={ctaAccentClass}>
              {t('hero.cta')}
              <ArrowDownIcon className="h-4 w-4" />
            </Link>
            <Link to="/#contact" className={ctaGhostClass}>
              {t('nav.contact')}
            </Link>
          </Reveal>
        </div>

        {/* モバイルでは見出しの上に小さく置く。h1 が社名を読むので画像は装飾扱い */}
        <Reveal
          immediate
          delay={0.25}
          className="relative order-first mx-auto w-40 sm:w-56 lg:order-none lg:w-full lg:max-w-md lg:justify-self-end"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[35%] bg-[radial-gradient(closest-side,rgb(var(--accent)/0.22),transparent)]"
          />
          <motion.img
            style={{ y: markY }}
            src={BRAND_ICON.src}
            alt=""
            width={BRAND_ICON.width}
            height={BRAND_ICON.height}
            fetchPriority="high"
            className="relative block h-auto w-full"
          />
        </Reveal>
      </div>
    </section>
  );
};
