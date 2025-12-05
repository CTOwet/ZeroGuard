import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

interface CodeInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function CodeInput({ value, onChange, disabled }: CodeInputProps) {
    const [focused, setFocused] = useState(false);

    return (
        <GlassCard neonBorder={focused} className="relative">
            <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-6 h-6 text-neon-cyan" />
                <h3 className="font-orbitron font-bold text-xl text-white">
                    Paste Your Code
                </h3>
            </div>
            <motion.textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                disabled={disabled}
                placeholder="// Paste your code here for analysis..."
                className="w-full h-64 bg-black/40 border border-white/10 rounded-xl p-4 text-white font-mono text-sm
                   placeholder:text-white/30 focus:outline-none focus:border-neon-cyan/50
                   resize-none custom-scrollbar transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed"
                whileFocus={{ scale: 1.01 }}
            />
            <div className="flex items-center justify-between mt-3 text-xs text-white/50">
                <span>Supported: C, C++, Python, JavaScript, SQL</span>
                <span>{value.length} characters</span>
            </div>
        </GlassCard>
    );
}
