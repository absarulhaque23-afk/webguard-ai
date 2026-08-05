import { body } from 'express-validator';
import { isValidUrl } from '../utils/urlUtils';

export const scanValidation = [
  body('url')
    .notEmpty()
    .withMessage('URL is required')
    .isString()
    .withMessage('URL must be a string')
    .isLength({ max: 2048 })
    .withMessage('URL is too long (max 2048 characters)')
    .custom((value) => {
      // Add http if missing to help validation, though normalizeUrl handles it later
      const testUrl = (!value.startsWith('http://') && !value.startsWith('https://')) ? `http://${value}` : value;
      if (!isValidUrl(testUrl)) {
        throw new Error('Invalid URL format');
      }
      return true;
    }),
];
