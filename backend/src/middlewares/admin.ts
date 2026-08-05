import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { errorResponse } from '../utils/responseHelper';
import { Role } from '../models/User';

export const adminAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return errorResponse(res, 'Authentication required', 401);
  }

  if (req.user.role !== Role.ADMIN) {
    return errorResponse(res, 'Access denied. Admin resources only.', 403);
  }

  next();
};
