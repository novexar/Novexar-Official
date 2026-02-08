import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
    'Azure OpenAI', 'Cognitive Search', 'Cosmos DB', 'Python', 'FastAPI',
    'React', 'TypeScript', 'Three.js', 'Docker', 'Kubernetes', 'Terraform'
];

const Word = ({ children, ...props }: any) => {
    const color = new THREE.Color();
    const fontProps = { fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false };
    const ref = useRef<any>();
    const [hovered, setHovered] = useState(false);

    useFrame(({ camera }) => {
        // Make text face the camera
        ref.current.quaternion.copy(camera.quaternion);
        ref.current.material.color.lerp(color.set(hovered ? '#50E6FF' : '#0078D4'), 0.1);
    });

    return (
        <Float floatIntensity={5} rotationIntensity={2}>
            <Text ref={ref} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} {...props} {...fontProps} children={children} />
        </Float>
    );
};

const SkillGalaxy = () => {
    const words = useMemo(() => {
        return skills.map((skill, i) => {
            const phi = Math.acos(-1 + (2 * i) / skills.length);
            const theta = Math.sqrt(skills.length * Math.PI) * phi;
            return {
                position: [
                    4 * Math.cos(theta) * Math.sin(phi),
                    4 * Math.sin(theta) * Math.sin(phi),
                    4 * Math.cos(phi)
                ],
                word: skill
            };
        });
    }, []);

    return (
        <group>
            {words.map((item, i) => (
                <Word key={i} position={item.position}>{item.word}</Word>
            ))}
        </group>
    );
};

export default SkillGalaxy;
