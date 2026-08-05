import { normalizeUrl } from '../utils/urlUtils';
import { validateUrlSafety } from '../utils/ssrfProtection';

export interface UrlValidationResult {
  valid: boolean;
  normalizedUrl: string;
  errors: string[];
}

export const validateUrl = async (url: string): Promise<UrlValidationResult> => {
  const errors: string[] = [];
  let valid = true;

  if (!url || typeof url !== 'string') {
    return { valid: false, normalizedUrl: '', errors: ['URL is required'] };
  }

  if (url.length > 2048) {
    errors.push('URL is too long (max 2048 characters)');
    valid = false;
  }

  const normalizedUrl = normalizeUrl(url);

  try {
    const safetyCheck = await validateUrlSafety(normalizedUrl);
    if (!safetyCheck.safe) {
      valid = false;
      if (safetyCheck.reason) {
        errors.push(safetyCheck.reason);
      } else {
        errors.push('URL is not safe to analyze');
      }
    }
  } catch (error) {
    valid = false;
    errors.push('Failed to validate URL safety');
  }

  return {
    valid,
    normalizedUrl: valid ? normalizedUrl : '',
    errors,
  };
};
