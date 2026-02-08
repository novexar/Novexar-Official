import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const HeroScene = (props: any) => {
    const meshRef = useRef<any>();
    const materialRef = useRef<any>();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
        if (materialRef.current) {
            materialRef.current.distort = 0.4 + Math.sin(state.clock.elapsedTime) * 0.2;
        }
    });

    return (
        <group {...props}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Icosahedron args={[1, 4]} ref={meshRef}>
                    <MeshDistortMaterial
                        ref={materialRef}
                        color="#0078D4"
                        envMapIntensity={1}
                        clearcoat={1}
                        clearcoatRoughness={0}
                        metalness={0.5}
                        roughness={0.2}
                        distort={0.4}
                        speed={2}
                    />
                </Icosahedron>

                {/* Surrounding particles ring */}
                <points>
                    <torusGeometry args={[3, 0.02, 16, 100]} />
                    <pointsMaterial size={0.02} color="#50E6FF" transparent opacity={0.6} />
                </points>
            </Float>
        </group>
    );
};

export default HeroScene;
