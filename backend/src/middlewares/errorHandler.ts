import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/responseHelper';
import { logger } from '../utils/logger';

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, { stack: err.stack, path: req.path, method: req.method });

  if (err.name === 'ValidationError') {
    return errorResponse(res, 'Validation Error', 400, err.errors);
  }
  
  if (err.name === 'CastError') {
    return errorResponse(res, 'Invalid ID format', 400);
  }
  
  if (err.code === 11000) {
    return errorResponse(res, 'Duplicate key error', 409);
  }
  
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token', 401);
  }
  
  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token expired', 401);
  }

  if (err instanceof AppError) {
    return errorResponse(res, err.message, err.statusCode);
  }

  return errorResponse(res, 'Internal Server Error', 500);
};
