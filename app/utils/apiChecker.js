// src/utils/apiChecker.js
import { API_CHECK_TIMEOUT, API_STATUS } from '@/lib/constants';

/**
 * Check if an API endpoint is reachable
 * @param {string} apiUrl - The API URL to check
 * @param {number} timeout - Request timeout in milliseconds
 * @returns {Promise<{status: string, responseTime: number}>}
 */
export const checkApiHealth = async (apiUrl, timeout = API_CHECK_TIMEOUT) => {
  if (!apiUrl) {
    return { status: API_STATUS.UNKNOWN, responseTime: 0 };
  }

  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    await fetch(apiUrl, {
      method: 'HEAD',
      signal: controller.signal,
      mode: 'no-cors',
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    return { status: API_STATUS.ONLINE, responseTime };
  } catch (error) {
    const responseTime = Date.now() - startTime;

    if (error.name === 'AbortError') {
      return { status: API_STATUS.TIMEOUT, responseTime };
    }

    return { status: API_STATUS.OFFLINE, responseTime };
  }
};

/**
 * Check multiple APIs at once
 * @param {Array<{id: string, url: string}>} apis - Array of API objects
 * @returns {Promise<Array<{id: string, status: string, responseTime: number}>>}
 */
export const checkMultipleApis = async (apis) => {
  const promises = apis.map(async (api) => {
    const result = await checkApiHealth(api.url);
    return {
      id: api.id,
      ...result,
    };
  });

  return Promise.all(promises);
};

/**
 * Get status color based on API status
 * @param {string} status - API status
 * @returns {string} Color name
 */
export const getStatusColor = (status) => {
  switch (status) {
    case API_STATUS.ONLINE:
      return 'green';
    case API_STATUS.OFFLINE:
      return 'red';
    case API_STATUS.TIMEOUT:
      return 'yellow';
    case API_STATUS.CHECKING:
      return 'gray';
    default:
      return 'gray';
  }
};

/**
 * Get status icon based on API status
 * @param {string} status - API status
 * @returns {string} Emoji icon
 */
export const getStatusIcon = (status) => {
  switch (status) {
    case API_STATUS.ONLINE:
      return '🟢';
    case API_STATUS.OFFLINE:
      return '🔴';
    case API_STATUS.TIMEOUT:
      return '🟡';
    case API_STATUS.CHECKING:
      return '⚪';
    default:
      return '⚪';
  }
};

/**
 * Get status label based on API status
 * @param {string} status - API status
 * @returns {string} Human readable label
 */
export const getStatusLabel = (status) => {
  switch (status) {
    case API_STATUS.ONLINE:
      return 'Online';
    case API_STATUS.OFFLINE:
      return 'Offline';
    case API_STATUS.TIMEOUT:
      return 'Slow';
    case API_STATUS.CHECKING:
      return 'Checking';
    case API_STATUS.UNKNOWN:
      return 'Unknown';
    default:
      return 'Unknown';
  }
};

/**
 * Format response time to human readable string
 * @param {number} ms - Response time in milliseconds
 * @returns {string} Formatted string
 */
export const formatResponseTime = (ms) => {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
};

/**
 * Retry API check with exponential backoff
 * @param {string} apiUrl - The API URL to check
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise<{status: string, responseTime: number, attempts: number}>}
 */
export const checkApiWithRetry = async (
  apiUrl,
  maxRetries = 3,
  baseDelay = 1000
) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await checkApiHealth(apiUrl);
      
      if (result.status === API_STATUS.ONLINE) {
        return { ...result, attempts: attempt };
      }
      
      lastError = result;
    } catch (error) {
      lastError = { status: API_STATUS.OFFLINE, responseTime: 0 };
    }

    // Wait before next retry (exponential backoff)
    if (attempt < maxRetries) {
      await new Promise(resolve => 
        setTimeout(resolve, baseDelay * Math.pow(2, attempt - 1))
      );
    }
  }

  return { ...lastError, attempts: maxRetries };
};

/**
 * Get API status config object (color, icon, label)
 * @param {string} status - API status
 * @returns {object} Config object with color, icon, and label
 */
export const getStatusConfig = (status) => ({
  color: getStatusColor(status),
  icon: getStatusIcon(status),
  label: getStatusLabel(status),
});