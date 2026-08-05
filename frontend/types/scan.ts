export interface ScanResult {
  _id: string;
  userId: string;
  url: string;
  normalizedUrl: string;
  prediction: 'BENIGN' | 'SUSPICIOUS' | 'MALICIOUS';
  riskScore: number;
  confidence: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  features: Record<string, number>;
  reasons: string[];
  featureImportance: Record<string, number>;
  modelVersion: string;
  scanDuration: number;
  webpageAnalysis?: {
    statusCode: number;
    redirectCount: number;
    finalUrl: string;
    contentType: string;
    htmlSize: number;
    numForms: number;
    numIframes: number;
    numExternalScripts: number;
    hasPasswordInput: boolean;
  };
  createdAt: string;
}

export interface ScanRequest {
  url: string;
}

export interface PaginatedScans {
  success: boolean;
  data: ScanResult[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
