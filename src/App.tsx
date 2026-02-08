import { lazy, Suspense } from 'react';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { HeroSection } from '@/components/sections/HeroSection';

// Lazy load non-critical sections
const GlobalBackground = lazy(() =>
  import('@/components/3d/background/GlobalBackground').then((m) => ({ default: m.GlobalBackground }))
);
const ServicesSection = lazy(() =>
  import('@/components/sections/ServicesSection').then((m) => ({ default: m.ServicesSection }))
);
const SkillsSection = lazy(() =>
  import('@/components/sections/SkillsSection').then((m) => ({ default: m.SkillsSection }))
);
const StatsSection = lazy(() =>
  import('@/components/sections/StatsSection').then((m) => ({ default: m.StatsSection }))
);
const AboutSectionNew = lazy(() =>
  import('@/components/sections/AboutSection').then((m) => ({ default: m.AboutSectionNew }))
);
const ContactSectionNew = lazy(() =>
  import('@/components/sections/ContactSection').then((m) => ({ default: m.ContactSectionNew }))
);

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <ScrollProgress />
      <div className="relative w-full min-h-screen bg-[#030303] text-white">
        {/* Global star background */}
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <GlobalBackground />
          </Suspense>
        </ErrorBoundary>

        {/* HTML + 3D Content Sections */}
        <main className="relative z-10">
          <ErrorBoundary fallback={null}>
            <HeroSection />
          </ErrorBoundary>

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
              <StatsSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={null}>
            <ErrorBoundary fallback={null}>
              <AboutSectionNew />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={null}>
            <ErrorBoundary fallback={null}>
              <ContactSectionNew />
            </ErrorBoundary>
          </Suspense>
        </main>
      </div>
    </SmoothScroll>
  );
}

export default App;
