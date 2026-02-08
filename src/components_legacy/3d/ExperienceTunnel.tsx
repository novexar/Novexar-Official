import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const ExperienceTunnel = () => {
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(2, -2, -5),
            new THREE.Vector3(-2, -5, -10),
            new THREE.Vector3(0, -8, -15),
        ]);
    }, []);

    const tubeRef = useRef<any>();

    useFrame((state) => {
        if (tubeRef.current) {
            // Animate texture offset for "speed" effect
            tubeRef.current.material.map.offset.x -= 0.002;
        }
    });

    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const context = canvas.getContext('2d')!;
        context.fillStyle = '#000';
        context.fillRect(0, 0, 1024, 1024);
        context.strokeStyle = '#0078D4';
        context.lineWidth = 2;

        // Grid pattern
        for (let i = 0; i < 20; i++) {
            context.beginPath();
            context.moveTo(0, i * 50);
            context.lineTo(1024, i * 50);
            context.stroke();
            context.beginPath();
            context.moveTo(i * 50, 0);
            context.lineTo(i * 50, 1024);
            context.stroke();
        }

        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        return tex;
    }, []);

    return (
        <group>
            <mesh ref={tubeRef}>
                <tubeGeometry args={[curve, 64, 2, 8, false]} />
                <meshBasicMaterial
                    map={texture}
                    side={THREE.BackSide}
                    transparent
                    opacity={0.3}
                    color="#0078D4"
                />
            </mesh>

            {/* Milestones along the path */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group position={[1, -1, -2]}>
                    <mesh>
                        <sphereGeometry args={[0.2]} />
                        <meshBasicMaterial color="#50E6FF" />
                    </mesh>
                    <Text position={[0.5, 0, 0]} fontSize={0.3} color="white" anchorX="left">
                        2023 - Senior AI Engineer
                    </Text>
                </group>
            </Float>

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group position={[-1, -4, -8]}>
                    <mesh>
                        <sphereGeometry args={[0.2]} />
                        <meshBasicMaterial color="#50E6FF" />
                    </mesh>
                    <Text position={[-0.5, 0, 0]} fontSize={0.3} color="white" anchorX="right">
                        2021 - Cloud Architect
                    </Text>
                </group>
            </Float>
        </group>
    );
};

export default ExperienceTunnel;
