import { motion } from 'framer-motion';
import { Shield, Github } from 'lucide-react';

export default function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl"
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-neon-cyan" />
                    <span className="font-orbitron font-bold text-xl text-white">
                        Zero<span className="text-neon-cyan">Guard</span>
                    </span>
                </div>

                <nav className="flex items-center gap-6">
                    <a
                        href="https://github.com/CtoXplt/ZeroGuard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-neon-cyan transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                </nav>
            </div>
        </motion.header>
    );
}
