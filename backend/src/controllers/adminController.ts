import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import * as dashboardService from '../services/dashboardService';
import * as scanService from '../services/scanService';
import { successResponse, paginatedResponse } from '../utils/responseHelper';
import { AuthRequest } from '../middlewares/auth';

export const getUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      User.find().select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments()
    ]);

    return paginatedResponse(res, data, total, page, limit, 'Users retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getAllScans = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const filters: any = {};
    if (req.query.prediction) filters.prediction = req.query.prediction;
    if (req.query.riskLevel) filters.riskLevel = req.query.riskLevel;

    const result = await scanService.getAllScans(page, limit, filters);
    
    return paginatedResponse(res, result.data, result.total, result.page, result.limit, 'All scans retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getModelInfo = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const modelInfo = await dashboardService.getModelInfo();
    return successResponse(res, modelInfo, 'Model info retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const stats = await dashboardService.getAdminStats();
    const analytics = await dashboardService.getAdminAnalytics();
    return successResponse(res, { stats, analytics }, 'Analytics retrieved successfully');
  } catch (error) {
    next(error);
  }
};
