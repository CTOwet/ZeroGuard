import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface NeonButtonProps {
    children: ReactNode;
    loading?: boolean;
    variant?: 'primary' | 'secondary';
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}

export default function NeonButton({
    children,
    loading = false,
    variant = 'primary',
    className,
    disabled,
    onClick,
}: NeonButtonProps) {
    const isPrimary = variant === 'primary';

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            disabled={disabled || loading}
            onClick={onClick}
            className={cn(
                'relative px-8 py-4 rounded-xl font-rajdhani font-bold text-lg',
                'transition-all duration-300',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                isPrimary
                    ? 'bg-neon-cyan text-dark-navy shadow-neon-cyan hover:shadow-neon-cyan/80'
                    : 'glass border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10',
                className
            )}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                </span>
            ) : (
                children
            )}
            {!disabled && !loading && (
                <motion.div
                    className="absolute inset-0 rounded-xl bg-neon-cyan opacity-0 hover:opacity-20 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2 }}
                />
            )}
        </motion.button>
    );
}
