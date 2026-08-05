import axios from 'axios';
import { validateUrlSafety } from '../utils/ssrfProtection';
import { logger } from '../utils/logger';

export const analyzeWebpage = async (url: string) => {
  try {
    const safetyCheck = await validateUrlSafety(url);
    if (!safetyCheck.safe) {
      logger.warn(`Skipping webpage analysis for unsafe URL: ${url} (${safetyCheck.reason})`);
      return null;
    }

    const response = await axios.get(url, {
      timeout: 10000,
      maxRedirects: 5,
      maxContentLength: 5 * 1024 * 1024, // 5MB limit
      responseType: 'text',
      validateStatus: () => true, // Accept all statuses to analyze them
    });

    const html = response.data;
    const finalUrl = response.request?.res?.responseUrl || url;
    
    let numForms = 0;
    let numIframes = 0;
    let numExternalScripts = 0;
    let hasPasswordInput = false;

    if (typeof html === 'string') {
      const lowerHtml = html.toLowerCase();
      numForms = (lowerHtml.match(/<form[^>]*>/g) || []).length;
      numIframes = (lowerHtml.match(/<iframe[^>]*>/g) || []).length;
      numExternalScripts = (lowerHtml.match(/<script[^>]+src=["'](http|https|\/\/)[^>]+>/g) || []).length;
      hasPasswordInput = /<input[^>]+type=["']password["'][^>]*>/i.test(html);
    }

    return {
      statusCode: response.status,
      redirectCount: response.request?.res?.redirects?.length || 0, // rough estimate
      finalUrl,
      contentType: response.headers['content-type'] || 'unknown',
      htmlSize: typeof html === 'string' ? html.length : 0,
      numForms,
      numIframes,
      numExternalScripts,
      hasPasswordInput,
    };
  } catch (error: any) {
    logger.warn(`Webpage analysis failed for ${url}: ${error.message}`);
    return null;
  }
};
