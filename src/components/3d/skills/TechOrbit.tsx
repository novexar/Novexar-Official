import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Azure', color: '#0078D4' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Three.js', color: '#FFFFFF' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'Kubernetes', color: '#326CE5' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Angular', color: '#DD0031' },
  { name: 'Vue.js', color: '#4FC08D' },
  { name: 'OpenAI', color: '#412991' },
  { name: 'Git', color: '#F05032' },
  { name: 'SQL', color: '#0078D4' },
  { name: 'Vite', color: '#646CFF' },
];

interface SkillNodeProps {
  position: [number, number, number];
  name: string;
  color: string;
}

const SkillNode = ({ position, name, color }: SkillNodeProps) => {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Html
        center
        distanceFactor={8}
        style={{
          color: color,
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          textShadow: '0 0 10px rgba(0,0,0,0.8)',
        }}
      >
        {name}
      </Html>
    </group>
  );
};

export const TechOrbit = () => {
  const groupRef = useRef<THREE.Group>(null);

  const points = useMemo(() => {
    const radius = 3;
    const result: { position: [number, number, number]; skill: typeof skills[0] }[] = [];
    const phiSpan = Math.PI * (3 - Math.sqrt(5)); // golden angle

    for (let i = 0; i < skills.length; i++) {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phiSpan * i;

      result.push({
        position: [
          Math.cos(theta) * r * radius,
          y * radius,
          Math.sin(theta) * r * radius,
        ],
        skill: skills[i],
      });
    }
    return result;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {points.map((item, i) => (
          <SkillNode
            key={i}
            position={item.position}
            name={item.skill.name}
            color={item.skill.color}
          />
        ))}
        {/* Wireframe sphere guide */}
        <mesh>
          <sphereGeometry args={[3, 16, 16]} />
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.03} />
        </mesh>
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
      />
    </>
  );
};
