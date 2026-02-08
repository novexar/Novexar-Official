import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface KineticTextProps {
    children: string;
    className?: string;
    baseVelocity?: number;
}

export const KineticText = ({ children, className = "", baseVelocity = 5 }: KineticTextProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, 100 * baseVelocity]);

    return (
        <div ref={containerRef} className={`overflow-hidden whitespace-nowrap ${className}`}>
            <motion.div style={{ x }} className="flex">
                <span className="block mr-8">{children}</span>
                <span className="block mr-8">{children}</span>
                <span className="block mr-8">{children}</span>
                <span className="block mr-8">{children}</span>
                <span className="block mr-8">{children}</span>
                <span className="block mr-8">{children}</span>
                <span className="block mr-8">{children}</span>
                <span className="block mr-8">{children}</span>
            </motion.div>
        </div>
    );
};
