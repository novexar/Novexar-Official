import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { LazyCanvas } from '@/components/3d/common/LazyCanvas';
import skillsData from '@/data/skills.json';

const TechOrbit = lazy(() =>
  import('@/components/3d/skills/TechOrbit').then((m) => ({ default: m.TechOrbit }))
);

// CSS fallback: infinite scroll
const SkillScrollFallback = () => {
  const allSkills = skillsData.skillCategories.flatMap((c) => c.skills);
  const doubled = [...allSkills, ...allSkills];

  return (
    <div className="overflow-hidden py-8">
      <div className="flex animate-scroll whitespace-nowrap">
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="inline-block px-6 py-3 mx-2 border border-gray-700 rounded-full text-sm text-gray-300 whitespace-nowrap"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const capability = useDeviceCapability();
  const show3D = capability === 'high' || capability === 'medium';

  return (
    <section id="skills" className="relative py-20 bg-[#030303]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-['Inter'] tracking-[0.5em] text-azure-light uppercase mb-4">
            Technologies
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold font-heading">
            TECH STACK
          </h3>
        </motion.div>

        {show3D ? (
          <div className="h-[500px] md:h-[600px] relative">
            <LazyCanvas
              className="w-full h-full"
              fallback={<SkillScrollFallback />}
              camera={{ position: [0, 0, 8], fov: 45 }}
            >
              <Suspense fallback={null}>
                <TechOrbit />
              </Suspense>
              <ambientLight intensity={0.5} />
            </LazyCanvas>
          </div>
        ) : (
          <SkillScrollFallback />
        )}
      </div>
    </section>
  );
};
