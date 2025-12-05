import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn.ts';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    neonBorder?: boolean;
}

export default function GlassCard({
    children,
    className,
    hover = false,
    neonBorder = false
}: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                'rounded-2xl p-6',
                hover ? 'glass-hover' : 'glass',
                neonBorder && 'neon-border',
                className
            )}
        >
            {children}
        </motion.div>
    );
}
