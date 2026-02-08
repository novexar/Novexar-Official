import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";

interface ParallaxTextProps {
    children: string;
    className?: string;
}

export const ParallaxText = ({ children, className = "" }: ParallaxTextProps) => {
    return (
        <div className={`parallax-wrap overflow-hidden whitespace-nowrap flex flex-nowrap ${className}`}>
            <motion.div className="scroller font-['Syncopate'] font-bold uppercase flex whitespace-nowrap flex-nowrap" style={{ x: 0 }}>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
            </motion.div>
        </div>
    );
};

// Simple scroll parallax for vertical movement
export const ScrollParallax = ({ children, offset = 50, className = "" }: { children: React.ReactNode, offset?: number, className?: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
}
