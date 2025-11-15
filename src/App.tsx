import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';

import siteContent from '@/data/content.json';
import servicesData from '@/data/services.json';
import projectsData from '@/data/projects.json';
import skillsData from '@/data/skills.json';
import statsData from '@/data/stats.json';
import experienceData from '@/data/experience.json';

import type {
  SiteContent,
  ServicesData,
  ProjectsData,
  SkillsData,
  StatsData,
  ExperienceData,
} from '@/types';

const content = siteContent as SiteContent;
const { services } = servicesData as ServicesData;
const { projects } = projectsData as ProjectsData;
const { skillCategories } = skillsData as SkillsData;
const { statistics } = statsData as StatsData;
const { certifications } = experienceData as ExperienceData;

function App() {
  return (
    <div className="min-h-screen">
      <Header navigation={content.navigation} logo={content.site.title} />

      <main>
        <HeroSection content={content.hero} />
        <AboutSection content={content.about} />
        <StatsSection statistics={statistics} />
        <ServicesSection services={services} />
        <SkillsSection skillCategories={skillCategories} />
        <ExperienceSection certifications={certifications} />
        <ProjectsSection projects={projects} />
        <ContactSection content={content.contact} />
      </main>

      <Footer copyright={content.site.copyright} />
    </div>
  );
}

export default App;