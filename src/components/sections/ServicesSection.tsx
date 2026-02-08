import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { LazyCanvas } from '@/components/3d/common/LazyCanvas';
import servicesData from '@/data/services.json';

const ServiceIcon3D = lazy(() =>
  import('@/components/3d/services/ServiceIcon3D').then((m) => ({ default: m.ServiceIcon3D }))
);

function getIconType(icon: string): 'cloud' | 'code' | 'brain' {
  switch (icon) {
    case 'Cloud': return 'cloud';
    case 'Code': return 'code';
    case 'Brain': return 'brain';
    default: return 'code';
  }
}

interface ServiceCardProps {
  service: typeof servicesData.services[0];
  index: number;
  show3D: boolean;
}

const ServiceCard = ({ service, index, show3D }: ServiceCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="relative group p-6 rounded-xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm hover:border-blue-500/30 transition-colors"
    >
      {/* 3D Icon */}
      {show3D && (
        <div className="h-32 mb-4">
          <LazyCanvas
            className="w-full h-full"
            camera={{ position: [0, 0, 3], fov: 40 }}
          >
            <Suspense fallback={null}>
              <ServiceIcon3D type={getIconType(service.icon)} />
            </Suspense>
            <ambientLight intensity={0.5} />
          </LazyCanvas>
        </div>
      )}

      <h4 className="text-xl font-bold font-heading mb-3 text-white">
        {service.title}
      </h4>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {service.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 border border-gray-800 rounded text-gray-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const capability = useDeviceCapability();
  const show3D = capability !== 'low';

  return (
    <section id="services" className="relative py-20 bg-[#030303]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-['Inter'] tracking-[0.5em] text-azure-light uppercase mb-4">
            What I Do
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold font-heading">
            SERVICES
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {servicesData.services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              show3D={show3D}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
