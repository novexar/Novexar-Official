import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Suspense } from 'react';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

interface CanvasLayoutProps {
    children: React.ReactNode;
    className?: string;
}

const CanvasLayout = ({ children, className }: CanvasLayoutProps) => {
    return (
        <div className={`fixed inset-0 bg-dark-bg ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <color attach="background" args={['#050505']} />
                <Suspense fallback={null}>
                    {children}
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                        <Noise opacity={0.05} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default CanvasLayout;
