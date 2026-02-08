import { Suspense, useEffect, useRef, useState, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface LazyCanvasProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  frameloop?: 'always' | 'demand' | 'never';
  camera?: { position?: [number, number, number]; fov?: number };
}

export const LazyCanvas = ({
  children,
  fallback = null,
  className,
  style,
  frameloop = 'always',
  camera = { position: [0, 0, 5], fov: 45 },
}: LazyCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const capability = useDeviceCapability();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (capability === 'low') {
    return (
      <div ref={containerRef} className={className} style={style}>
        {fallback}
      </div>
    );
  }

  const maxDpr = capability === 'high' ? Math.min(2, window.devicePixelRatio) : 1;

  return (
    <div ref={containerRef} className={className} style={style}>
      {isVisible ? (
        <Canvas
          camera={camera}
          dpr={[1, maxDpr]}
          frameloop={frameloop}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      ) : (
        fallback
      )}
    </div>
  );
};
