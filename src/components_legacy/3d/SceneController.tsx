import { useScroll } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';

export const SceneController = () => {
    const scroll = useScroll();
    const { camera } = useThree();

    // Camera path points [x, y, z]
    // 0: Hero (Center)
    // 1: About (Slightly right, looking at galaxy)
    // 2: Stats (Zoomed out)
    // 3: Services (Side view)
    // 4: Skills (Inside galaxy)
    // 5: Experience (Tunnel entrance)
    // 6: Projects (Gallery view)
    // 7: Contact (Bottom)

    useFrame((state, delta) => {
        const r1 = scroll.range(0, 1 / 8); // Hero
        const r2 = scroll.range(1 / 8, 1 / 8); // About
        const r3 = scroll.range(2 / 8, 1 / 8); // Stats
        const r4 = scroll.range(3 / 8, 1 / 8); // Services
        const r5 = scroll.range(4 / 8, 1 / 8); // Skills
        const r6 = scroll.range(5 / 8, 1 / 8); // Experience
        const r7 = scroll.range(6 / 8, 1 / 8); // Projects
        const r8 = scroll.range(7 / 8, 1 / 8); // Contact

        // Smooth camera movement logic
        // This is a simplified version. For true cinematic feel, we'd use a CatmullRomCurve3

        // Base position
        const targetPos = new THREE.Vector3(0, 0, 5);
        const targetLookAt = new THREE.Vector3(0, 0, 0);

        // Hero -> About
        if (scroll.offset < 0.15) {
            targetPos.set(0, 0, 5 + scroll.offset * 10);
        }
        // About -> Skills
        else if (scroll.offset < 0.5) {
            const t = (scroll.offset - 0.15) / 0.35;
            targetPos.set(Math.sin(t * Math.PI) * 5, -t * 10, 5 + Math.cos(t * Math.PI) * 2);
            targetLookAt.set(0, -t * 10, 0);
        }
        // Experience Tunnel
        else if (scroll.offset < 0.75) {
            const t = (scroll.offset - 0.5) / 0.25;
            // Move through tunnel
            targetPos.set(0, -20, 5 - t * 50);
            targetLookAt.set(0, -20, -50); // Look forward
        }
        // Projects & Contact
        else {
            const t = (scroll.offset - 0.75) / 0.25;
            targetPos.set(0, -30 - t * 10, 10);
            targetLookAt.set(0, -30 - t * 10, 0);
        }

        // Apply with lerp for smoothness
        camera.position.lerp(targetPos, delta * 2);

        // Handle lookAt smoothly
        const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
        currentLookAt.lerp(targetLookAt, delta * 2);
        camera.lookAt(currentLookAt);

    });

    return null;
};
