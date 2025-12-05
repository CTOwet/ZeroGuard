import { motion } from 'framer-motion';
import { Shield, Zap } from 'lucide-react';

export default function Hero() {
    return (
        <div className="text-center py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center gap-4 mb-6"
            >
                <Shield className="w-16 h-16 text-neon-cyan animate-pulse" />
                <h1 className="font-orbitron font-black text-5xl md:text-7xl text-gradient">
                    ZeroGuard
                </h1>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-rajdhani text-3xl md:text-4xl font-bold text-white neon-glow-cyan mb-4"
            >
                Advanced Zero-Day Scanner
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-white/70 text-lg max-w-2xl mx-auto mb-6"
            >
                Detect potential zero-day vulnerabilities in your code using advanced pattern matching and heuristic analysis. Secure your application before deployment.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex items-center justify-center gap-4 text-neon-cyan"
            >
                <Zap className="w-5 h-5 animate-pulse" />
                <span className="font-rajdhani font-semibold">Real-time Scanning</span>
                <span className="text-white/30">•</span>
                <Zap className="w-5 h-5 animate-pulse animation-delay-200" />
                <span className="font-rajdhani font-semibold">Pattern Detection</span>
                <span className="text-white/30">•</span>
                <Zap className="w-5 h-5 animate-pulse animation-delay-400" />
                <span className="font-rajdhani font-semibold">Instant Reports</span>
            </motion.div>
        </div>
    );
}
