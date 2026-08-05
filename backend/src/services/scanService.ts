import { Scan } from '../models/Scan';
import { validateUrl } from '../validators/urlValidator';
import { AppError } from '../middlewares/errorHandler';
import { predict } from './mlClientService';
import { analyzeWebpage } from './urlAnalyzerService';

export const createScan = async (userId: string, rawUrl: string) => {
  const validationResult = await validateUrl(rawUrl);
  
  if (!validationResult.valid) {
    throw new AppError(validationResult.errors.join(', '), 400);
  }
  
  const startTime = Date.now();
  const normalizedUrl = validationResult.normalizedUrl;

  // 1. Call ML Service
  const mlResult = await predict(normalizedUrl);
  
  // 2. Analyze webpage (non-blocking)
  const webpageAnalysis = await analyzeWebpage(normalizedUrl);

  const scanDuration = Date.now() - startTime;

  // 3. Save to DB
  const scan = new Scan({
    userId,
    url: rawUrl,
    normalizedUrl,
    prediction: mlResult.prediction || 'BENIGN',
    riskScore: mlResult.riskScore || 0,
    confidence: mlResult.confidence || 0,
    riskLevel: mlResult.riskLevel || 'LOW',
    features: mlResult.features || {},
    reasons: mlResult.reasons || [],
    featureImportance: mlResult.featureImportance || {},
    modelVersion: mlResult.modelVersion || '1.0',
    scanDuration,
    webpageAnalysis,
  });

  await scan.save();
  return scan;
};

export const getUserScans = async (userId: string, page: number, limit: number, filters: any = {}) => {
  const skip = (page - 1) * limit;
  const query = { userId, ...filters };
  
  const [data, total] = await Promise.all([
    Scan.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Scan.countDocuments(query)
  ]);
  
  return { data, total, page, limit };
};

export const getScanById = async (id: string, userId: string) => {
  const scan = await Scan.findOne({ _id: id, userId });
  if (!scan) throw new AppError('Scan not found', 404);
  return scan;
};

export const deleteScan = async (id: string, userId: string) => {
  const result = await Scan.findOneAndDelete({ _id: id, userId });
  if (!result) throw new AppError('Scan not found', 404);
  return result;
};

export const getAllScans = async (page: number, limit: number, filters: any = {}) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Scan.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('userId', 'name email'),
    Scan.countDocuments(filters)
  ]);
  
  return { data, total, page, limit };
};
