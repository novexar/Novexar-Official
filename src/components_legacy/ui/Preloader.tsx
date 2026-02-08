import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1; // Adjust speed here
            });
        }, 20); // 20ms * 100 = 2000ms total duration approx

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            setTimeout(onComplete, 500); // Wait a bit before unmounting
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className="relative w-full max-w-md px-10">
                {/* Progress Text */}
                <div className="flex justify-between items-end mb-2 font-['Syncopate'] font-bold tracking-widest">
                    <span className="text-xs text-azure-light/50">SYSTEM LOADING</span>
                    <span className="text-4xl">{progress}%</span>
                </div>

                {/* Progress Bar */}
                <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                    <motion.div
                        className="h-full bg-azure"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.02 }} // Smooth update
                    />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none mix-blend-overlay opacity-20">
                    <div className="absolute top-[-20px] left-10 text-[10px] tracking-[0.5em]">INITIALIZING CORE...</div>
                </div>
            </div>
        </motion.div>
    );
};
