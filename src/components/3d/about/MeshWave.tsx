import { MeshDistortMaterial } from '@react-three/drei';

export const MeshWave = () => {
  return (
    <mesh scale={[8, 4, 1]} position={[0, 0, -1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <MeshDistortMaterial
        color="#3B82F6"
        transparent
        opacity={0.06}
        distort={0.3}
        speed={1.5}
        roughness={1}
      />
    </mesh>
  );
};
