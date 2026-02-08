import { Scroll, useScroll } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useState } from 'react';
import HeroScene from './HeroScene';
import SkillGalaxy from './SkillGalaxy';
import ExperienceTunnel from './ExperienceTunnel';
import ProjectGallery from './ProjectGallery';
import ContactScene from './ContactScene';
import { SceneController } from './SceneController';
import projectsData from '@/data/projects.json';

const Experience = () => {
    const { height } = useThree((state) => state.viewport);

    return (
        <>
            <SceneController />

            {/* 3D Content that moves with scroll */}
            <Scroll>
                <HeroScene position={[0, 0, 0]} />

                {/* About Section (Skill Galaxy) */}
                <group position={[0, -height, 0]}>
                    <SkillGalaxy />
                </group>

                {/* Experience Section (Tunnel) */}
                <group position={[0, -height * 1.5, 0]}>
                    <ExperienceTunnel />
                </group>

                {/* Projects Section */}
                <group position={[0, -height * 2.5, 0]}>
                    <ProjectGallery projects={projectsData.projects as any} />
                </group>

                {/* Contact Section */}
                <group position={[0, -height * 4, 0]}>
                    <ContactScene />
                </group>
            </Scroll>
        </>
    );
};

export default Experience;
