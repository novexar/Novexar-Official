import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useCursor } from '@react-three/drei';
import { GlitchImage } from '@/components/ui/GlitchImage';
import * as THREE from 'three';
import { Project } from '@/data/projects';
import { easing } from 'maath';

interface ProjectCardProps {
    project: Project;
    position: [number, number, number];
    index: number;
}

export const ProjectCard = ({ project, position, index }: ProjectCardProps) => {
    const ref = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    useFrame((state, delta) => {
        if (ref.current) {
            // Smooth scaling on hover
            easing.damp3(ref.current.scale, hovered ? 1.1 : 1, 0.1, delta);

            // Subtle floating animation
            ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
        }
    });

    return (
        <group position={position}>
            <GlitchImage
                url={project.image}
                hovered={hovered}
                scale={[4, 3, 1]}
            />
            {/* Invisible hit area for hover detection since GlitchImage might be complex */}
            <mesh
                position={[0, 0, 0.01]}
                scale={[4, 3, 1]}
                visible={false}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <planeGeometry />
            </mesh>
            <Text
                position={[0, -2, 0.1]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="top"
            >
                {project.title}
            </Text>
            <Text
                position={[0, -2.3, 0.1]}
                fontSize={0.1}
                color="#0078D4"
                anchorX="center"
                anchorY="top"
            >
                {project.category}
            </Text>
            <Text
                position={[0, -2.5, 0.1]}
                fontSize={0.08}
                color="#888888"
                anchorX="center"
                anchorY="top"
            >
                {project.tags.join(' / ')}
            </Text>
        </group>
    );
};
