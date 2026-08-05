export interface DashboardStats {
  totalScans: number;
  benignCount: number;
  suspiciousCount: number;
  maliciousCount: number;
  averageRiskScore: number;
  scansOverTime: { date: string; count: number }[];
  riskDistribution: { name: string; value: number }[];
}
