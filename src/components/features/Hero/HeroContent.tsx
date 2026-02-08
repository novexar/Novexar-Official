import { motion } from 'framer-motion';

export const HeroContent = () => {
    return (
        <div className="relative z-10 flex flex-col items-center justify-center h-screen pointer-events-none">
            <div className="overflow-hidden">
                <motion.h1
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl md:text-[10rem] font-bold tracking-tighter font-['Syncopate'] leading-none text-transparent text-stroke-white mix-blend-overlay opacity-50"
                >
                    CREATIVE
                </motion.h1>
            </div>

            <div className="overflow-hidden">
                <motion.h1
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl md:text-[10rem] font-bold tracking-tighter font-['Syncopate'] leading-none text-white mix-blend-overlay"
                >
                    DEVELOPER
                </motion.h1>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-8 text-sm md:text-base font-['Inter'] tracking-[0.5em] text-azure-light uppercase"
            >
                Crafting Digital Experiences
            </motion.p>
        </div>
    );
};
