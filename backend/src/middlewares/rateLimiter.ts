import rateLimit from 'express-rate-limit';
import { config } from '../config/environment';

export const generalLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
});

export const scanLimiter = rateLimit({
  windowMs: config.SCAN_RATE_LIMIT_WINDOW_MS,
  max: config.SCAN_RATE_LIMIT_MAX_REQUESTS,
  message: {
    success: false,
    message: 'Too many scan requests, please try again later.',
  },
});
