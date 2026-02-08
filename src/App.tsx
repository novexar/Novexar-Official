import { lazy, Suspense } from 'react';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { HeroSection } from '@/components/sections/HeroSection';
import contentData from '@/data/content.json';
import experienceData from '@/data/experience.json';
import projectsData from '@/data/projects.json';
import testimonialsData from '@/data/testimonials.json';

// Lazy load non-critical sections
const GlobalBackground = lazy(() =>
  import('@/components/3d/background/GlobalBackground').then((m) => ({ default: m.GlobalBackground }))
);
const AboutSectionNew = lazy(() =>
  import('@/components/sections/AboutSection').then((m) => ({ default: m.AboutSectionNew }))
);
const StatsSection = lazy(() =>
  import('@/components/sections/StatsSection').then((m) => ({ default: m.StatsSection }))
);
const ServicesSection = lazy(() =>
  import('@/components/sections/ServicesSection').then((m) => ({ default: m.ServicesSection }))
);
const SkillsSection = lazy(() =>
  import('@/components/sections/SkillsSection').then((m) => ({ default: m.SkillsSection }))
);
const ExperienceSection = lazy(() =>
  import('@/components/sections/ExperienceSection').then((m) => ({ default: m.ExperienceSection }))
);
const ProjectsSection = lazy(() =>
  import('@/components/sections/ProjectsSection').then((m) => ({ default: m.ProjectsSection }))
);
const TestimonialsSection = lazy(() =>
  import('@/components/sections/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection }))
);
const ContactSectionNew = lazy(() =>
  import('@/components/sections/ContactSection').then((m) => ({ default: m.ContactSectionNew }))
);

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <ScrollProgress />
      <Header navigation={contentData.navigation} logo={contentData.site.title} />

      <div className="relative w-full min-h-screen bg-[#030303] text-white">
        {/* Global star background */}
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <GlobalBackground />
          </Suspense>
        </ErrorBoundary>

        {/* All Content Sections */}
        <main className="relative z-10">
          <ErrorBoundary fallback={null}>
            <HeroSection />
          </ErrorBoundary>

          <Suspense fallback={null}>
            <ErrorBoundary fallback={null}>
              <AboutSectionNew />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={null}>
            <ErrorBoundary fallback={null}>
              <StatsSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={null}>
            <ErrorBoundary fallback={null}>
              <ServicesSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={null}>
            <ErrorBoundary fallback={null}>
              <SkillsSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={null}>
            <ErrorBoundary fallback={null}>
              <ExperienceSection certifications={experienceData.certifications} />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={null}>
            <ErrorBoundary fallback={null}>
              <ProjectsSection projects={projectsData.projects} />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={null}>
            <ErrorBoundary fallback={null}>
              <TestimonialsSection testimonials={testimonialsData.testimonials} />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={null}>
            <ErrorBoundary fallback={null}>
              <ContactSectionNew />
            </ErrorBoundary>
          </Suspense>
        </main>
      </div>

      <Footer />
    </SmoothScroll>
  );
}

export default App;
