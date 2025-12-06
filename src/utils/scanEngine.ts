import type { ScanResult, VulnerabilityStatus, CWE } from '../types';

// Common vulnerability patterns
const VULNERABILITY_PATTERNS = {
    bufferOverflow: [/strcpy|strcat|sprintf|gets|scanf/gi, /malloc.*sizeof/gi],
    sqlInjection: [/execute.*query|sql.*exec|SELECT.*FROM.*WHERE/gi, /\$.*\+.*query/gi],
    xss: [/innerHTML|document\.write|eval\(/gi, /\<script\>|\<iframe\>/gi],
    commandInjection: [/system\(|exec\(|popen\(/gi, /shell_exec|passthru/gi],
    pathTraversal: [/\.\.\/|\.\.\\|\.\.[\/\\]/gi],
    hardcodedCredentials: [/password\s*=\s*['"']|api[_-]?key\s*=\s*['"']/gi],
    useAfterFree: [/free\(.*\).*\n.*\*|delete\s+.*\n.*\-\>/gi],
    integerOverflow: [/int.*\+.*int|short.*\*.*short/gi],
    formatString: [/printf\(.*%.*\)|sprintf\(.*%/gi],
    raceCondition: [/pthread.*mutex|CreateThread/gi],
};

const CWE_DATABASE: { [key: string]: CWE } = {
    'CWE-120': {
        id: 'CWE-120',
        name: 'Buffer Copy without Checking Size of Input',
        description: 'The program copies an input buffer to an output buffer without verifying that the size is correct.',
    },
    'CWE-89': {
        id: 'CWE-89',
        name: 'SQL Injection',
        description: 'The software constructs all or part of an SQL command using externally-influenced input.',
    },
    'CWE-79': {
        id: 'CWE-79',
        name: 'Cross-site Scripting (XSS)',
        description: 'The software does not neutralize or incorrectly neutralizes user-controllable input.',
    },
    'CWE-78': {
        id: 'CWE-78',
        name: 'OS Command Injection',
        description: 'The software constructs all or part of an OS command using externally-influenced input.',
    },
    'CWE-22': {
        id: 'CWE-22',
        name: 'Path Traversal',
        description: 'The software uses external input to construct a pathname without proper sanitization.',
    },
    'CWE-798': {
        id: 'CWE-798',
        name: 'Use of Hard-coded Credentials',
        description: 'The software contains hard-coded credentials, such as a password or cryptographic key.',
    },
    'CWE-416': {
        id: 'CWE-416',
        name: 'Use After Free',
        description: 'Referencing memory after it has been freed can cause a program to crash or execute arbitrary code.',
    },
    'CWE-190': {
        id: 'CWE-190',
        name: 'Integer Overflow',
        description: 'The software performs a calculation that can produce an integer overflow or wraparound.',
    },
    'CWE-134': {
        id: 'CWE-134',
        name: 'Format String Vulnerability',
        description: 'The software uses externally-controlled format strings in printf-style functions.',
    },
    'CWE-362': {
        id: 'CWE-362',
        name: 'Race Condition',
        description: 'The program contains a code sequence that can run concurrently with other code.',
    },
};

function detectLanguage(code: string): string {
    if (code.includes('def ') || code.includes('import ') || code.includes('print(')) {
        return 'Python';
    }
    if (code.includes('#include') || code.includes('printf') || code.includes('malloc')) {
        return 'C';
    }
    if (code.includes('class ') || code.includes('std::') || code.includes('cout')) {
        return 'C++';
    }
    if (code.includes('SELECT') || code.includes('INSERT') || code.includes('UPDATE')) {
        return 'SQL';
    }
    if (code.includes('function') || code.includes('const ') || code.includes('let ')) {
        return 'JavaScript';
    }
    return 'Unknown';
}

function analyzeVulnerabilities(code: string) {
    const vulnerabilities: {
        type: string;
        severity: 'low' | 'medium' | 'high' | 'critical';
        description: string;
        cweId: string;
    }[] = [];

    // Check buffer overflow
    if (VULNERABILITY_PATTERNS.bufferOverflow.some((pattern) => pattern.test(code))) {
        vulnerabilities.push({
            type: 'Buffer Overflow',
            severity: 'critical',
            description: 'Unsafe memory operations detected. Use safer alternatives like strncpy, strncat.',
            cweId: 'CWE-120',
        });
    }

    // Check SQL injection
    if (VULNERABILITY_PATTERNS.sqlInjection.some((pattern) => pattern.test(code))) {
        vulnerabilities.push({
            type: 'SQL Injection',
            severity: 'critical',
            description: 'Potential SQL injection vulnerability. Use parameterized queries.',
            cweId: 'CWE-89',
        });
    }

    // Check XSS
    if (VULNERABILITY_PATTERNS.xss.some((pattern) => pattern.test(code))) {
        vulnerabilities.push({
            type: 'Cross-Site Scripting',
            severity: 'high',
            description: 'Potential XSS vulnerability. Sanitize user input before rendering.',
            cweId: 'CWE-79',
        });
    }

    // Check command injection
    if (VULNERABILITY_PATTERNS.commandInjection.some((pattern) => pattern.test(code))) {
        vulnerabilities.push({
            type: 'Command Injection',
            severity: 'critical',
            description: 'OS command injection detected. Avoid using system calls with user input.',
            cweId: 'CWE-78',
        });
    }

    // Check path traversal
    if (VULNERABILITY_PATTERNS.pathTraversal.some((pattern) => pattern.test(code))) {
        vulnerabilities.push({
            type: 'Path Traversal',
            severity: 'high',
            description: 'Path traversal pattern detected. Validate and sanitize file paths.',
            cweId: 'CWE-22',
        });
    }

    // Check hardcoded credentials
    if (VULNERABILITY_PATTERNS.hardcodedCredentials.some((pattern) => pattern.test(code))) {
        vulnerabilities.push({
            type: 'Hard-coded Credentials',
            severity: 'medium',
            description: 'Hard-coded credentials found. Use environment variables or secure vaults.',
            cweId: 'CWE-798',
        });
    }

    // Check use after free
    if (VULNERABILITY_PATTERNS.useAfterFree.some((pattern) => pattern.test(code))) {
        vulnerabilities.push({
            type: 'Use After Free',
            severity: 'critical',
            description: 'Potential use-after-free vulnerability detected.',
            cweId: 'CWE-416',
        });
    }

    // Check integer overflow
    if (VULNERABILITY_PATTERNS.integerOverflow.some((pattern) => pattern.test(code))) {
        vulnerabilities.push({
            type: 'Integer Overflow',
            severity: 'medium',
            description: 'Potential integer overflow. Check bounds before arithmetic operations.',
            cweId: 'CWE-190',
        });
    }

    // Check format string
    if (VULNERABILITY_PATTERNS.formatString.some((pattern) => pattern.test(code))) {
        vulnerabilities.push({
            type: 'Format String',
            severity: 'high',
            description: 'Format string vulnerability detected. Never use user input as format string.',
            cweId: 'CWE-134',
        });
    }

    // Check race condition
    if (VULNERABILITY_PATTERNS.raceCondition.some((pattern) => pattern.test(code))) {
        vulnerabilities.push({
            type: 'Race Condition',
            severity: 'medium',
            description: 'Potential race condition in multi-threaded code.',
            cweId: 'CWE-362',
        });
    }

    return vulnerabilities;
}

export async function scanCode(code: string): Promise<ScanResult> {
    // Simulate scanning delay for UI effect
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const language = detectLanguage(code);
    const detectedVulns = analyzeVulnerabilities(code);

    // Call Backend API
    let aiPrediction = null;
    try {
        const response = await fetch('http://localhost:8000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });

        if (response.ok) {
            aiPrediction = await response.json();
        } else {
            console.warn('Backend API returned error:', response.status);
        }
    } catch (error) {
        console.warn('Backend API unreachable, falling back to local analysis:', error);
    }

    // Determine overall status and confidence
    let status: VulnerabilityStatus = 'SAFE';
    let confidence = 0;

    // Base confidence from local analysis
    if (detectedVulns.length > 0) {
        const criticalCount = detectedVulns.filter((v) => v.severity === 'critical').length;
        const highCount = detectedVulns.filter((v) => v.severity === 'high').length;

        if (criticalCount > 0) {
            status = 'HIGH RISK';
            confidence = 85;
        } else if (highCount > 0) {
            status = 'HIGH RISK';
            confidence = 75;
        } else {
            status = 'POTENTIAL ZERO-DAY';
            confidence = 60;
        }
    } else {
        confidence = 90; // High confidence it's safe
    }

    // Adjust based on AI Prediction
    if (aiPrediction) {
        if (aiPrediction.is_vulnerable) {
            status = 'POTENTIAL ZERO-DAY';
            // AI confidence is usually 0.0-1.0, convert to percentage
            const aiConf = aiPrediction.confidence * 100;
            confidence = Math.max(confidence, aiConf);

            // Add AI finding if no specific vulns found yet
            if (detectedVulns.length === 0) {
                detectedVulns.push({
                    type: 'AI Detected Zero-Day Pattern',
                    severity: 'critical',
                    description: 'The AI model detected patterns consistent with known zero-day vulnerabilities.',
                    cweId: 'CWE-Unknown'
                });
            }
        } else {
            // AI says safe
            if (detectedVulns.length === 0) {
                status = 'SAFE';
                confidence = Math.max(confidence, aiPrediction.confidence * 100);
            }
            // If local found something but AI didn't, we trust local for specific patterns
            // but maybe lower confidence slightly? 
            // Actually, let's keep local findings as truth for known patterns.
        }
    }

    // Get unique CWEs
    const uniqueCWEs = Array.from(new Set(detectedVulns.map((v) => v.cweId)))
        .map((id) => CWE_DATABASE[id])
        .filter(Boolean);

    // Generate recommendations
    const recommendations = [];
    if (detectedVulns.some((v) => v.cweId === 'CWE-120')) {
        recommendations.push('Replace unsafe string functions with bounded alternatives (strncpy, snprintf)');
    }
    if (detectedVulns.some((v) => v.cweId === 'CWE-89')) {
        recommendations.push('Use parameterized queries or prepared statements');
    }
    if (detectedVulns.some((v) => v.cweId === 'CWE-79')) {
        recommendations.push('Implement proper input sanitization and output encoding');
    }
    if (detectedVulns.some((v) => v.cweId === 'CWE-78')) {
        recommendations.push('Avoid executing system commands with user input');
    }
    if (detectedVulns.some((v) => v.severity === 'critical')) {
        recommendations.push('Immediate security review required - Critical vulnerabilities detected');
    }
    if (aiPrediction && aiPrediction.is_vulnerable) {
        recommendations.push('AI Model suggests high probability of zero-day vulnerability. Manual audit recommended.');
    }
    if (recommendations.length === 0) {
        recommendations.push('Code appears secure, but consider additional security testing');
        recommendations.push('Implement secure coding practices and regular code reviews');
    }

    return {
        id: `scan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        status,
        confidence: Math.round(confidence),
        language,
        codeSnippet: code.substring(0, 200),
        cwes: uniqueCWEs,
        recommendations,
        vulnerabilities: detectedVulns,
    };
}
