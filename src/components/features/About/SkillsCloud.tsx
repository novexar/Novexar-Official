import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
    "React", "TypeScript", "Three.js", "WebGL", "Node.js",
    "Python", "Azure", "AWS", "Docker", "Kubernetes",
    "Next.js", "Tailwind", "Framer Motion", "GSAP", "Rust"
];

export const SkillsCloud = () => {
    const groupRef = useRef<THREE.Group>(null);

    const words = useMemo(() => {
        const sphericalPoints: { position: [number, number, number], word: string }[] = [];
        const phiSpan = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < skills.length; i++) {
            const y = 1 - (i / (skills.length - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = phiSpan * i;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;

            sphericalPoints.push({
                position: [x * 4, y * 4, z * 4],
                word: skills[i]
            });
        }
        return sphericalPoints;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {words.map((item, i) => (
                <Float key={i} speed={2} rotationIntensity={1} floatIntensity={0.5}>
                    <Text
                        position={item.position}
                        fontSize={0.4}
                        color="#0078D4"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {item.word}
                    </Text>
                </Float>
            ))}
        </group>
    );
};
