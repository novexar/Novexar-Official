import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Project } from '@/types';

const ProjectCard = ({ project, position, rotation, index }: { project: Project; position: [number, number, number]; rotation: [number, number, number]; index: number }) => {
    const ref = useRef<any>();
    const [hovered, setHovered] = useState(false);

    useFrame((state, delta) => {
        // Float animation
        const t = state.clock.getElapsedTime();
        ref.current.position.y = position[1] + Math.sin(t * 0.5 + index) * 0.2;

        // Scale on hover
        ref.current.scale.lerp(new THREE.Vector3(hovered ? 1.2 : 1, hovered ? 1.2 : 1, 1), delta * 10);
    });

    return (
        <group position={position} rotation={rotation}>
            <Float floatIntensity={2} rotationIntensity={1}>
                <mesh
                    ref={ref}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={() => window.open(project.url, '_blank')}
                >
                    <planeGeometry args={[4, 2.5]} />
                    <meshBasicMaterial color={hovered ? "#0078D4" : "#1a1a1a"} transparent opacity={0.9} side={THREE.DoubleSide} />

                    {/* Text Content */}
                    <Text
                        position={[0, 0.5, 0.1]}
                        fontSize={0.3}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={3.5}
                    >
                        {project.title}
                    </Text>

                    <Text
                        position={[0, -0.5, 0.1]}
                        fontSize={0.15}
                        color="#cccccc"
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={3.5}
                    >
                        {project.description}
                    </Text>
                </mesh>
            </Float>
        </group>
    );
};

const ProjectGallery = ({ projects }: { projects: Project[] }) => {
    return (
        <group>
            {projects.map((project, i) => {
                // Spiral layout
                const angle = (i / projects.length) * Math.PI * 2;
                const radius = 6;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius * 0.5; // Flattened spiral
                const y = -i * 1.5; // Vertical spacing

                return (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={i}
                        position={[x, y, z]}
                        rotation={[0, -angle + Math.PI / 2, 0]}
                    />
                );
            })}
        </group>
    );
};

export default ProjectGallery;
