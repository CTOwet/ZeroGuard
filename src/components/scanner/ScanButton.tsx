import { Scan } from 'lucide-react';
import NeonButton from '../ui/NeonButton';

interface ScanButtonProps {
    onClick: () => void;
    loading: boolean;
    disabled: boolean;
}

export default function ScanButton({ onClick, loading, disabled }: ScanButtonProps) {
    return (
        <div className="flex justify-center my-8">
            <NeonButton
                onClick={onClick}
                loading={loading}
                disabled={disabled}
                className="px-12 py-5 text-xl group"
            >
                {!loading && (
                    <>
                        <Scan className="w-6 h-6 inline-block mr-2 group-hover:animate-pulse" />
                        Start Vulnerability Scan
                    </>
                )}
            </NeonButton>
        </div>
    );
}
