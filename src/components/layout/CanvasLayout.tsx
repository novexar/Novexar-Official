import { Canvas } from '@react-three/fiber';
import { EffectComposer, Noise, Vignette, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { Suspense } from 'react';
import { BlendFunction } from 'postprocessing';

interface CanvasLayoutProps {
    children: React.ReactNode;
}

export const CanvasLayout = ({ children }: CanvasLayoutProps) => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    {children}

                    <EffectComposer enableNormalPass={false}>
                        <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                        <ChromaticAberration offset={[0.002, 0.002]} radialModulation={false} modulationOffset={0} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
};
