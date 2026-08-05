import { Request, Response, NextFunction } from 'express';
import * as scanService from '../services/scanService';
import { successResponse } from '../utils/responseHelper';
import { AuthRequest } from '../middlewares/auth';

export const createScan = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body;
    const scan = await scanService.createScan(req.user._id.toString(), url);
    return successResponse(res, scan, 'Scan completed successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getScans = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const filters: any = {};
    if (req.query.prediction) filters.prediction = req.query.prediction;
    if (req.query.riskLevel) filters.riskLevel = req.query.riskLevel;

    const result = await scanService.getUserScans(req.user._id.toString(), page, limit, filters);
    
    return res.status(200).json({
      success: true,
      data: result.data,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getScanById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const scan = await scanService.getScanById(req.params.id, req.user._id.toString());
    return successResponse(res, scan, 'Scan retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteScan = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await scanService.deleteScan(req.params.id, req.user._id.toString());
    return successResponse(res, null, 'Scan deleted successfully');
  } catch (error) {
    next(error);
  }
};
