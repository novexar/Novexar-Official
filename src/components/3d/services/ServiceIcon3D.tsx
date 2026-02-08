import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ServiceIcon3DProps {
  type: 'cloud' | 'code' | 'brain';
}

const CloudGeo = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} floatIntensity={0.5}>
      <group ref={groupRef} scale={0.8}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.4} />
        </mesh>
        <mesh position={[0.5, 0.15, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.4} />
        </mesh>
        <mesh position={[-0.45, 0.1, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.4} />
        </mesh>
        <mesh position={[0.2, 0.35, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

const CodeGeo = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} floatIntensity={0.5}>
      <group ref={groupRef} scale={0.8}>
        <mesh>
          <octahedronGeometry args={[0.6, 0]} />
          <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <octahedronGeometry args={[0.45, 0]} />
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

const BrainGeo = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <group ref={groupRef} scale={0.8}>
        {/* Central neuron */}
        <mesh>
          <icosahedronGeometry args={[0.4, 1]} />
          <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.4} />
        </mesh>
        {/* Surrounding nodes */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const r = 0.7;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r * 0.5, Math.sin(angle) * r * 0.3]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color="#38BDF8" transparent opacity={0.6} />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};

export const ServiceIcon3D = ({ type }: ServiceIcon3DProps) => {
  switch (type) {
    case 'cloud':
      return <CloudGeo />;
    case 'code':
      return <CodeGeo />;
    case 'brain':
      return <BrainGeo />;
    default:
      return null;
  }
};
