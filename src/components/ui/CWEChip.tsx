import { motion } from 'framer-motion';
import { Bug } from 'lucide-react';

interface CWEChipProps {
    id: string;
    name: string;
    index?: number;
}

export default function CWEChip({ id, name, index = 0 }: CWEChipProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-neon-pink/30 hover:border-neon-pink/60 transition-colors group"
        >
            <Bug className="w-4 h-4 text-neon-pink group-hover:animate-pulse" />
            <div className="flex flex-col">
                <span className="text-xs font-orbitron font-bold text-neon-pink">{id}</span>
                <span className="text-[10px] text-white/70 max-w-[200px] truncate">{name}</span>
            </div>
        </motion.div>
    );
}
