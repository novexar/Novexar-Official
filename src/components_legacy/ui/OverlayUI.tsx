import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, Github, Linkedin, Mail } from 'lucide-react';

export const OverlayUI = () => {
    const { t } = useTranslation();

    return (
        <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-6">
            {/* Top Bar */}
            <div className="flex justify-between items-center pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold tracking-tighter text-white mix-blend-difference"
                >
                    POXCON
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-white mix-blend-difference"
                >
                    <Menu className="w-6 h-6" />
                </motion.button>
            </div>

            {/* Bottom Bar */}
            <div className="flex justify-between items-end pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 text-white mix-blend-difference"
                >
                    <a href="#" className="hover:text-azure-light transition-colors"><Github className="w-5 h-5" /></a>
                    <a href="#" className="hover:text-azure-light transition-colors"><Linkedin className="w-5 h-5" /></a>
                    <a href="#" className="hover:text-azure-light transition-colors"><Mail className="w-5 h-5" /></a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-white/50 mix-blend-difference"
                >
                    © 2024 POXCON Official
                </motion.div>
            </div>
        </div>
    );
};
