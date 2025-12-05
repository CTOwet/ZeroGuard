export type VulnerabilityStatus = 'SAFE' | 'POTENTIAL ZERO-DAY' | 'HIGH RISK';

export interface CWE {
    id: string;
    name: string;
    description: string;
}

export interface ScanResult {
    id: string;
    timestamp: Date;
    status: VulnerabilityStatus;
    confidence: number;
    language: string;
    codeSnippet: string;
    cwes: CWE[];
    recommendations: string[];
    vulnerabilities: {
        type: string;
        severity: 'low' | 'medium' | 'high' | 'critical';
        description: string;
        line?: number;
    }[];
}

export interface HistoryItem {
    id: string;
    timestamp: Date;
    status: VulnerabilityStatus;
    confidence: number;
    language: string;
}
