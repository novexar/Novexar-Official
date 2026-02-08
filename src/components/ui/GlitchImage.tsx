import { useRef } from 'react';
import { useFrame, extend, Object3DNode } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial, useTexture } from '@react-three/drei';

// Create a custom shader material
const GlitchMaterial = shaderMaterial(
    {
        uTime: 0,
        uTexture: new THREE.Texture(),
        uHover: 0,
        uResolution: new THREE.Vector2(0, 0)
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uHover;
    varying vec2 vUv;

    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      
      // Glitch effect based on hover
      float glitchStrength = uHover * 0.1;
      
      // Random displacement
      if (uHover > 0.0) {
          float time = uTime * 10.0;
          float split = random(vec2(floor(uv.y * 20.0), time));
          if (split > 0.8) {
              uv.x += (random(vec2(time)) - 0.5) * glitchStrength;
          }
      }

      // RGB Split
      float r = texture2D(uTexture, uv + vec2(glitchStrength * 0.05, 0.0)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - vec2(glitchStrength * 0.05, 0.0)).b;

      vec3 color = vec3(r, g, b);
      
      // Scanlines
      if (uHover > 0.0) {
          float scanline = sin(uv.y * 200.0 + uTime * 10.0) * 0.1;
          color -= scanline * uHover;
      }

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ GlitchMaterial });

// Add type definition for the custom material
declare global {
    namespace JSX {
        interface IntrinsicElements {
            glitchMaterial: Object3DNode<THREE.ShaderMaterial, typeof GlitchMaterial>;
        }
    }
}

interface GlitchImageProps {
    url: string;
    hovered: boolean;
    scale?: [number, number, number];
}

export const GlitchImage = ({ url, hovered, scale = [1, 1, 1] }: GlitchImageProps) => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const texture = useTexture(url);

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            // Smoothly interpolate hover value
            materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
                materialRef.current.uniforms.uHover.value,
                hovered ? 1 : 0,
                delta * 5
            );
        }
    });

    return (
        <mesh scale={scale}>
            <planeGeometry args={[1, 1, 32, 32]} />
            {/* @ts-ignore */}
            <glitchMaterial ref={materialRef} uTexture={texture} transparent />
        </mesh>
    );
};
