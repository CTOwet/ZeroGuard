import { motion } from 'framer-motion';
import { Brain, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="glass border-t border-white/10 mt-20"
        >
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-white/70">
                        <Brain className="w-5 h-5 text-neon-cyan animate-pulse" />
                        <span className="font-rajdhani">
                            Powered by <span className="text-neon-cyan font-bold">Neural Network</span>
                        </span>
                    </div>

                    <div className="text-white/70 text-center md:text-right">
                        <p className="font-rajdhani">
                            Teknik Informatika <span className="text-neon-pink font-bold">UNSIQ 2026</span>
                        </p>
                        <p className="text-sm text-white/50 mt-1 flex items-center justify-center md:justify-end gap-1">
                            Made with <Heart className="w-4 h-4 text-neon-pink fill-neon-pink animate-pulse" /> for security
                        </p>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
                    <p>© 2025 ZeroGuard Scanner. For educational purposes only.</p>
                </div>
            </div>
        </motion.footer>
    );
}
