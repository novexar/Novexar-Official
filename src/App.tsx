import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { CanvasLayout } from '@/components/layout/CanvasLayout';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Hero3D } from '@/components/features/Hero/Hero3D';
import { HeroContent } from '@/components/features/Hero/HeroContent';
import { WorkSection } from '@/components/features/Work/WorkSection';
import { AboutSection } from '@/components/features/About/AboutSection';
import { SkillsCloud } from '@/components/features/About/SkillsCloud';
import { ContactSection } from '@/components/features/Contact/ContactSection';
import { useThree } from '@react-three/fiber';

import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const Scene = () => {
  const { height } = useThree((state) => state.viewport);
  return (
    <ErrorBoundary fallback={null}>
      <Hero3D />
      <WorkSection />
      <group position={[0, -height * 2, 0]}>
        <SkillsCloud />
      </group>
      <ambientLight intensity={0.5} />
    </ErrorBoundary>
  );
};

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="relative w-full min-h-screen bg-[#030303] text-white">
        <CanvasLayout>
          <Scene />
        </CanvasLayout>

        {/* HTML Content Layer */}
        <main className="relative z-10">
          <HeroContent />
          <div className="h-screen"></div> {/* Spacer for Work Section scroll */}
          <AboutSection />
          <ContactSection />
        </main>
      </div>
    </SmoothScroll>
  );
}

export default App;