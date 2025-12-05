import { useState } from 'react';
import { motion } from 'framer-motion';
import { History } from 'lucide-react';
import ParticlesBackground from './components/background/ParticlesBackground';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScanHistory from './components/layout/ScanHistory';
import Hero from './components/Hero';
import CodeInput from './components/scanner/CodeInput';
import ScanButton from './components/scanner/ScanButton';
import MatrixRain from './components/scanner/MatrixRain';
import ResultsCard from './components/scanner/ResultsCard';
import type { ScanResult, HistoryItem } from './types';
import { scanCode } from './utils/scanEngine';

function App() {
  const [code, setCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleScan = async () => {
    if (!code.trim()) return;

    setIsScanning(true);
    setShowMatrix(true);
    setResult(null);

    try {
      const scanResult = await scanCode(code);
      setResult(scanResult);

      // Add to history
      const historyItem: HistoryItem = {
        id: scanResult.id,
        timestamp: scanResult.timestamp,
        status: scanResult.status,
        confidence: scanResult.confidence,
        language: scanResult.language,
      };
      setHistory((prev) => [historyItem, ...prev]);
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsScanning(false);
      setTimeout(() => setShowMatrix(false), 500);
    }
  };

  const handleSelectHistory = (id: string) => {
    // In a real app, you'd load the full scan result from storage
    console.log('Selected history item:', id);
    setHistoryOpen(false);
  };

  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />
      {showMatrix && <MatrixRain />}

      <Header />

      <main className="container mx-auto px-4 py-8 relative">
        <Hero />

        <div className="max-w-5xl mx-auto space-y-8">
          <CodeInput value={code} onChange={setCode} disabled={isScanning} />

          <ScanButton
            onClick={handleScan}
            loading={isScanning}
            disabled={!code.trim() || isScanning}
          />

          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <ResultsCard result={result} />
            </motion.div>
          )}
        </div>

        {/* History Toggle Button */}
        {history.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setHistoryOpen(!historyOpen)}
            className="fixed bottom-8 right-8 p-4 glass rounded-full shadow-neon-cyan hover:bg-white/10 transition-all z-30"
            title="View History"
          >
            <History className="w-6 h-6 text-neon-cyan" />
            {history.length > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-neon-pink rounded-full flex items-center justify-center text-xs font-bold">
                {history.length}
              </span>
            )}
          </motion.button>
        )}
      </main>

      <Footer />

      <ScanHistory
        history={history}
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelectItem={handleSelectHistory}
      />
    </div>
  );
}

export default App;
