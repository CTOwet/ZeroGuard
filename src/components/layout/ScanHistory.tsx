import { motion, AnimatePresence } from 'framer-motion';
import { History, X, Clock } from 'lucide-react';
import type { HistoryItem } from '../../types';
import StatusBadge from '../ui/StatusBadge';

interface ScanHistoryProps {
    history: HistoryItem[];
    isOpen: boolean;
    onClose: () => void;
    onSelectItem: (id: string) => void;
}

export default function ScanHistory({ history, isOpen, onClose, onSelectItem }: ScanHistoryProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    />

                    {/* Sidebar */}
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="fixed right-0 top-0 h-full w-80 glass border-l border-white/10 z-50 overflow-y-auto custom-scrollbar"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <History className="w-6 h-6 text-neon-cyan" />
                                    <h2 className="font-orbitron font-bold text-xl text-white">
                                        Scan History
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-white/70" />
                                </button>
                            </div>

                            {history.length === 0 ? (
                                <div className="text-center text-white/50 py-12">
                                    <History className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                    <p className="font-rajdhani">No scans yet</p>
                                    <p className="text-sm mt-2">Your scan history will appear here</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {history.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => onSelectItem(item.id)}
                                            className="p-4 glass-hover rounded-xl cursor-pointer space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-white/50 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(item.timestamp).toLocaleTimeString()}
                                                </span>
                                                <span className="text-xs font-mono text-neon-cyan">
                                                    {item.language}
                                                </span>
                                            </div>
                                            <StatusBadge status={item.status} className="text-xs px-2 py-1" />
                                            <div className="text-sm text-white/70">
                                                Confidence: <span className="text-neon-cyan font-bold">{item.confidence}%</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
