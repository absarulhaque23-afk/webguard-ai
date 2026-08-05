import { Scan } from '../models/Scan';
import { User } from '../models/User';
import { ModelMetadata } from '../models/ModelMetadata';

export const getUserStats = async (userId: string) => {
  const stats = await Scan.aggregate([
    { $match: { userId: userId as any } },
    {
      $group: {
        _id: null,
        totalScans: { $sum: 1 },
        avgRiskScore: { $avg: '$riskScore' },
        benignCount: { $sum: { $cond: [{ $eq: ['$prediction', 'BENIGN'] }, 1, 0] } },
        suspiciousCount: { $sum: { $cond: [{ $eq: ['$prediction', 'SUSPICIOUS'] }, 1, 0] } },
        maliciousCount: { $sum: { $cond: [{ $eq: ['$prediction', 'MALICIOUS'] }, 1, 0] } },
      }
    }
  ]);

  return stats[0] || {
    totalScans: 0, avgRiskScore: 0, benignCount: 0, suspiciousCount: 0, maliciousCount: 0
  };
};

export const getAdminStats = async () => {
  const [userCount, scanStats] = await Promise.all([
    User.countDocuments(),
    Scan.aggregate([
      {
        $group: {
          _id: null,
          totalScans: { $sum: 1 },
          avgRiskScore: { $avg: '$riskScore' },
          benignCount: { $sum: { $cond: [{ $eq: ['$prediction', 'BENIGN'] }, 1, 0] } },
          suspiciousCount: { $sum: { $cond: [{ $eq: ['$prediction', 'SUSPICIOUS'] }, 1, 0] } },
          maliciousCount: { $sum: { $cond: [{ $eq: ['$prediction', 'MALICIOUS'] }, 1, 0] } },
        }
      }
    ])
  ]);

  return {
    totalUsers: userCount,
    stats: scanStats[0] || { totalScans: 0, avgRiskScore: 0, benignCount: 0, suspiciousCount: 0, maliciousCount: 0 }
  };
};

export const getAdminAnalytics = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const scansOverTime = await Scan.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  return { scansOverTime };
};

export const getModelInfo = async () => {
  return await ModelMetadata.findOne().sort({ trainedAt: -1 });
};
