import { motion } from 'framer-motion';
import experienceData from '@/data/experience.json';
import statsData from '@/data/stats.json';
import { ScrollParallax } from '@/components/ui/ParallaxText';

export const AboutSection = () => {
    return (
        <div className="relative z-10 min-h-screen py-20 bg-[#030303]">
            <div className="container mx-auto px-6">

                {/* Intro Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-32">
                    {/* Left: Bio */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <ScrollParallax offset={-50}>
                                <h2 className="text-sm font-['Inter'] tracking-[0.5em] text-azure-light uppercase mb-4">
                                    The Core
                                </h2>
                                <h3 className="text-4xl md:text-6xl font-bold font-['Syncopate'] leading-tight mb-8">
                                    ENGINEERING <br />
                                    <span className="text-transparent text-stroke-white opacity-50">THE FUTURE</span>
                                </h3>
                                <p className="text-lg text-gray-400 leading-relaxed font-light">
                                    Senior Azure Consultant & Full Stack Engineer based in Tokyo.
                                    I specialize in building scalable cloud architectures and integrating cutting-edge AI solutions.
                                    With a deep understanding of both infrastructure and application layers, I bridge the gap between complex backend logic and immersive frontend experiences.
                                </p>
                            </ScrollParallax>
                        </motion.div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-8">
                            {statsData.statistics.map((stat) => (
                                <div key={stat.id}>
                                    <h4 className="text-3xl font-bold text-white mb-2 font-['Syncopate']">{stat.value}</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Space for 3D Cloud (handled by CanvasLayout) */}
                    <div className="h-[50vh] md:h-auto relative hidden md:block">
                        {/* This area is visually filled by the 3D scene behind it */}
                    </div>
                </div>

                {/* Experience Timeline */}
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-['Syncopate'] text-white mb-12 text-center">Experience</h3>
                    <div className="space-y-12 border-l border-gray-800 pl-8 md:pl-12 relative">
                        {experienceData.timeline.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                {/* Dot */}
                                <span className="absolute -left-[37px] md:-left-[53px] top-2 w-4 h-4 bg-azure rounded-full border-4 border-[#030303]" />

                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                                    <h4 className="text-xl font-bold text-white">{item.title}</h4>
                                    <span className="text-azure text-sm font-mono">{item.company}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4 font-mono">{item.period} | {item.location}</p>
                                <p className="text-gray-400 mb-4 leading-relaxed">{item.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {item.technologies.map((tech) => (
                                        <span key={tech} className="text-xs px-2 py-1 border border-gray-800 rounded text-gray-500">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
