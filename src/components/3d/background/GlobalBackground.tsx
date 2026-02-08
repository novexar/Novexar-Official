import { Stars } from '@react-three/drei';
import { LazyCanvas } from '@/components/3d/common/LazyCanvas';

const StarField = () => {
  return (
    <Stars
      radius={100}
      depth={50}
      count={3000}
      factor={3}
      saturation={0}
      fade
      speed={0.5}
    />
  );
};

export const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <LazyCanvas
        className="w-full h-full"
        frameloop="demand"
        camera={{ position: [0, 0, 1], fov: 60 }}
      >
        <StarField />
      </LazyCanvas>
    </div>
  );
};
