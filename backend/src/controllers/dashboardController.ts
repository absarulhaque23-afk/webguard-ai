import { Request, Response, NextFunction } from 'express';
import * as dashboardService from '../services/dashboardService';
import { successResponse } from '../utils/responseHelper';
import { AuthRequest } from '../middlewares/auth';

export const getStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const stats = await dashboardService.getUserStats(req.user._id.toString());
    return successResponse(res, stats, 'Dashboard stats retrieved successfully');
  } catch (error) {
    next(error);
  }
};
