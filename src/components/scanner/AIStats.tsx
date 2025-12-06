import { motion } from 'framer-motion';
import { Brain, Database, Activity } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { useEffect, useState } from 'react';

interface BackendStatus {
    status: string;
    model_loaded: boolean;
    scaler_loaded: boolean;
}

export default function AIStats() {
    const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null);
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        const checkBackend = async () => {
            try {
                const response = await fetch('http://localhost:8000/health');
                if (response.ok) {
                    const data = await response.json();
                    setBackendStatus(data);
                    setIsOnline(true);
                } else {
                    setIsOnline(false);
                }
            } catch (error) {
                setIsOnline(false);
            }
        };

        checkBackend();
        const interval = setInterval(checkBackend, 10000); // Check every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
        >
            <GlassCard className="mb-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <Brain className="w-8 h-8 text-neon-purple" />
                        <div>
                            <h3 className="font-orbitron font-bold text-lg text-white">AI Model Status</h3>
                            <p className="text-sm text-white/60">PyTorch Neural Network Backend</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <div className="flex items-center gap-2 mb-1">
                                <Activity className={`w-4 h-4 ${isOnline ? 'text-green-400' : 'text-red-400'}`} />
                                <span className="text-sm font-semibold text-white">Backend</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${isOnline ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {isOnline ? 'ONLINE' : 'OFFLINE'}
                            </span>
                        </div>

                        {isOnline && backendStatus && (
                            <>
                                <div className="text-center">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Brain className="w-4 h-4 text-neon-cyan" />
                                        <span className="text-sm font-semibold text-white">Model</span>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${backendStatus.model_loaded ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-red-500/20 text-red-400'}`}>
                                        {backendStatus.model_loaded ? 'LOADED' : 'ERROR'}
                                    </span>
                                </div>

                                <div className="text-center">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Database className="w-4 h-4 text-neon-purple" />
                                        <span className="text-sm font-semibold text-white">Scaler</span>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${backendStatus.scaler_loaded ? 'bg-neon-purple/20 text-neon-purple' : 'bg-red-500/20 text-red-400'}`}>
                                        {backendStatus.scaler_loaded ? 'LOADED' : 'ERROR'}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    );
}
