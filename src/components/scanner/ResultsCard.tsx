import { motion } from 'framer-motion';
import { Share2, Download, AlertCircle, CheckCircle } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import StatusBadge from '../ui/StatusBadge';
import ProgressCircle from '../ui/ProgressCircle';
import CWEChip from '../ui/CWEChip';
import type { ScanResult } from '../../types';

interface ResultsCardProps {
    result: ScanResult;
}

export default function ResultsCard({ result }: ResultsCardProps) {
    const handleShare = () => {
        const text = `ZeroGuard Scanner Result:\nStatus: ${result.status}\nConfidence: ${result.confidence}%\nLanguage: ${result.language}\nCWEs: ${result.cwes.map(c => c.id).join(', ')}`;

        if (navigator.share) {
            navigator.share({ title: 'ZeroGuard Scan Result', text });
        } else {
            navigator.clipboard.writeText(text);
            alert('Result copied to clipboard!');
        }
    };

    const handleDownload = () => {
        const reportData = JSON.stringify(result, null, 2);
        const blob = new Blob([reportData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `zeroguard-scan-${result.id}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <GlassCard neonBorder className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <h2 className="font-orbitron font-bold text-2xl text-gradient">
                        Scan Results
                    </h2>
                    <div className="flex gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleShare}
                            className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
                            title="Share Results"
                        >
                            <Share2 className="w-5 h-5 text-neon-cyan" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleDownload}
                            className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
                            title="Download Report"
                        >
                            <Download className="w-5 h-5 text-neon-cyan" />
                        </motion.button>
                    </div>
                </div>

                {/* Status & Confidence */}
                <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
                    <div className="flex-1 space-y-4">
                        <StatusBadge status={result.status} />
                        <div className="space-y-2">
                            <p className="text-white/70">
                                <span className="font-semibold text-white">Language:</span> {result.language}
                            </p>
                            <p className="text-white/70">
                                <span className="font-semibold text-white">Timestamp:</span>{' '}
                                {new Date(result.timestamp).toLocaleString()}
                            </p>
                            <p className="text-white/70">
                                <span className="font-semibold text-white">Vulnerabilities Found:</span>{' '}
                                {result.vulnerabilities.length}
                            </p>
                        </div>
                    </div>
                    <ProgressCircle value={result.confidence} />
                </div>

                {/* CWEs */}
                {result.cwes.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="font-orbitron font-bold text-lg flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-neon-pink" />
                            Detected CWEs
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {result.cwes.map((cwe, index) => (
                                <CWEChip key={cwe.id} id={cwe.id} name={cwe.name} index={index} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Vulnerabilities Details */}
                {result.vulnerabilities.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="font-orbitron font-bold text-lg">Vulnerability Details</h3>
                        <div className="space-y-2">
                            {result.vulnerabilities.map((vuln, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 bg-black/30 rounded-lg border border-white/10"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-white">{vuln.type}</h4>
                                            <p className="text-sm text-white/70 mt-1">{vuln.description}</p>
                                        </div>
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-bold ${vuln.severity === 'critical'
                                                ? 'bg-red-500/20 text-red-400'
                                                : vuln.severity === 'high'
                                                    ? 'bg-orange-500/20 text-orange-400'
                                                    : vuln.severity === 'medium'
                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                        : 'bg-blue-500/20 text-blue-400'
                                                }`}
                                        >
                                            {vuln.severity.toUpperCase()}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recommendations */}
                <div className="space-y-3">
                    <h3 className="font-orbitron font-bold text-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-neon-cyan" />
                        Recommendations
                    </h3>
                    <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3 text-white/80"
                            >
                                <span className="text-neon-cyan mt-1">▸</span>
                                <span>{rec}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </GlassCard>
        </motion.div>
    );
}
