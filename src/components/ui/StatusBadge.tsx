import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Skull } from 'lucide-react';
import type { VulnerabilityStatus } from '../../types';

interface StatusBadgeProps {
    status: VulnerabilityStatus;
    className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
    const config = {
        SAFE: {
            icon: Shield,
            color: 'text-neon-cyan',
            bgColor: 'bg-neon-cyan/20',
            borderColor: 'border-neon-cyan',
            label: 'SAFE',
        },
        'POTENTIAL ZERO-DAY': {
            icon: AlertTriangle,
            color: 'text-amber-400',
            bgColor: 'bg-amber-400/20',
            borderColor: 'border-amber-400',
            label: 'POTENTIAL ZERO-DAY',
        },
        'HIGH RISK': {
            icon: Skull,
            color: 'text-neon-pink',
            bgColor: 'bg-neon-pink/20',
            borderColor: 'border-neon-pink',
            label: 'HIGH RISK',
        },
    };

    const { icon: Icon, color, bgColor, borderColor, label } = config[status];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${bgColor} ${borderColor} ${className}`}
        >
            <Icon className={`w-5 h-5 ${color}`} />
            <span className={`font-orbitron font-bold text-sm ${color}`}>{label}</span>
        </motion.div>
    );
}
