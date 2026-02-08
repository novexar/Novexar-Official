import { useThree } from '@react-three/fiber';
import { projects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { useRef } from 'react';
import * as THREE from 'three';

export const WorkSection = () => {
    const { width, height } = useThree((state) => state.viewport);
    const groupRef = useRef<THREE.Group>(null);

    const isMobile = width < 7;
    const xSpacing = isMobile ? 3.5 : 5;
    const scale = isMobile ? 0.8 : 1;

    return (
        <group position={[0, -height, 0]} ref={groupRef}>
            {/* Projects Horizontal Scroll Simulation */}
            {/* In a real scroll rig, we'd map scroll offset to x position */}
            {projects.map((project, i) => (
                <group key={project.id} position={[(i - 1.5) * xSpacing, 0, 0]} scale={[scale, scale, scale]}>
                    <ProjectCard
                        project={project}
                        index={i}
                        position={[0, 0, 0]}
                    />
                </group>
            ))}
        </group>
    );
};
