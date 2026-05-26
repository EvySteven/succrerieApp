import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, '../logs');

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFile = path.join(logsDir, 'admin-access.log');
const errorFile = path.join(logsDir, 'errors.log');

/**
 * Log admin access attempts
 */
export const logAdminAccess = (ipAddress, success, passwordAttempt = null) => {
  const timestamp = new Date().toISOString();
  const status = success ? 'SUCCESS' : 'FAILED';
  const logEntry = `[${timestamp}] IP: ${ipAddress} | Status: ${status}${passwordAttempt ? ` | Attempt: ${passwordAttempt}` : ''}\n`;

  fs.appendFileSync(logFile, logEntry, 'utf8');
};

/**
 * Log security errors
 */
export const logError = (errorType, message, ipAddress = null) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] Type: ${errorType} | Message: ${message}${ipAddress ? ` | IP: ${ipAddress}` : ''}\n`;

  fs.appendFileSync(errorFile, logEntry, 'utf8');
  console.error(`[${errorType}]`, message);
};

/**
 * Log info messages
 */
export const logInfo = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] INFO:`, message);
};

/**
 * Get logs for monitoring dashboard
 */
export const getLogs = (type = 'access', limit = 100) => {
  try {
    const file = type === 'access' ? logFile : errorFile;
    if (!fs.existsSync(file)) {
      return [];
    }

    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    return lines.slice(-limit); // Return last N lines
  } catch (error) {
    logError('LOG_READ_ERROR', error.message);
    return [];
  }
};

export default {
  logAdminAccess,
  logError,
  logInfo,
  getLogs,
};
