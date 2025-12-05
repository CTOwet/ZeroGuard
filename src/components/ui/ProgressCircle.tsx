import { motion } from 'framer-motion';

interface ProgressCircleProps {
    value: number;
    size?: number;
    strokeWidth?: number;
}

export default function ProgressCircle({
    value,
    size = 120,
    strokeWidth = 8,
}: ProgressCircleProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    const getColor = () => {
        if (value >= 80) return '#00ff9d'; // neon-cyan
        if (value >= 60) return '#fbbf24'; // amber
        return '#ff006e'; // neon-pink
    };

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={getColor()}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{
                        filter: `drop-shadow(0 0 8px ${getColor()})`,
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    className="text-3xl font-orbitron font-bold"
                    style={{ color: getColor() }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {value}%
                </motion.span>
                <span className="text-xs text-white/60 mt-1">Confidence</span>
            </div>
        </div>
    );
}
