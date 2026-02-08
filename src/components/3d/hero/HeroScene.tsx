import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ---- Particle Field with custom ShaderMaterial ----

const PARTICLE_COUNT = 3000;

const particleVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aScale;
  attribute float aOffset;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Floating animation
    float t = uTime * 0.3 + aOffset * 6.28;
    pos.y += sin(t + pos.x * 0.5) * 0.3;
    pos.x += cos(t * 0.7 + pos.z * 0.3) * 0.2;

    // Mouse interaction: wave ripple
    float distToMouse = length(pos.xy - uMouse * 3.0);
    float wave = sin(distToMouse * 2.0 - uTime * 2.0) * exp(-distToMouse * 0.3);
    pos.z += wave * 0.5;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * (200.0 / -mvPosition.z);

    vAlpha = smoothstep(0.0, 0.5, 1.0 - length(pos) / 8.0) * (0.4 + wave * 0.3);
  }
`;

const particleFragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;

    float glow = exp(-d * 6.0);
    vec3 color = mix(uColor1, uColor2, gl_PointCoord.y);
    gl_FragColor = vec4(color * glow * 2.0, vAlpha * glow);
  }
`;

const ParticleField = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, scales, offsets } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const scl = new Float32Array(PARTICLE_COUNT);
    const off = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      scl[i] = Math.random() * 3 + 1;
      off[i] = Math.random();
    }

    return { positions: pos, scales: scl, offsets: off };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value.lerp(state.pointer, 0.05);
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={PARTICLE_COUNT}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          count={PARTICLE_COUNT}
          array={offsets}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uColor1: { value: new THREE.Color('#3B82F6') },
          uColor2: { value: new THREE.Color('#38BDF8') },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ---- Floating Wireframe Geometries ----

interface FloatingGeoProps {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  color: string;
  speed?: number;
  rotationSpeed?: number;
  scale?: number;
}

const FloatingGeo = ({ geometry, position, color, speed = 2, rotationSpeed = 0.3, scale = 1 }: FloatingGeoProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = t * rotationSpeed;
      meshRef.current.rotation.y = t * rotationSpeed * 0.7;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
      </mesh>
    </Float>
  );
};

const FloatingGeometries = () => {
  const geometries = useMemo(() => ({
    icosahedron: new THREE.IcosahedronGeometry(1, 1),
    octahedron: new THREE.OctahedronGeometry(0.8, 0),
    torusKnot: new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8),
    dodecahedron: new THREE.DodecahedronGeometry(0.7, 0),
  }), []);

  return (
    <group>
      <FloatingGeo geometry={geometries.icosahedron} position={[-3.5, 2, -2]} color="#3B82F6" scale={1.2} />
      <FloatingGeo geometry={geometries.octahedron} position={[4, -1.5, -3]} color="#8B5CF6" speed={1.5} />
      <FloatingGeo geometry={geometries.torusKnot} position={[-2, -2.5, -1.5]} color="#38BDF8" rotationSpeed={0.2} />
      <FloatingGeo geometry={geometries.dodecahedron} position={[3, 2.5, -2.5]} color="#3B82F6" speed={2.5} scale={0.9} />
      <FloatingGeo geometry={geometries.icosahedron} position={[0, -3, -4]} color="#8B5CF6" scale={0.6} rotationSpeed={0.15} />
    </group>
  );
};

// ---- Main HeroScene ----

export const HeroScene = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 7;

  return (
    <>
      <ambientLight intensity={0.1} />
      <ParticleField />
      {!isMobile && <FloatingGeometries />}
      <EffectComposer enableNormalPass={false}>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.2}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
};
