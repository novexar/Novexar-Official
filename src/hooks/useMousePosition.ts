import { useEffect, useRef } from 'react';

interface NormalizedMouse {
  x: number;
  y: number;
}

export function useMousePosition(): React.MutableRefObject<NormalizedMouse> {
  const mouse = useRef<NormalizedMouse>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mouse;
}
