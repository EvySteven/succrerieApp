import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for admin authentication
 * Max 5 attempts per 15 minutes per IP
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.',
    retryAfter: '15 minutes',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => {
    // Don't rate limit monitoring/logs endpoints for admins with valid tokens
    return req.path === '/api/admin/logs' && req.isAdminAuthenticated;
  },
});

/**
 * General API rate limiter
 * Max 100 requests per minute per IP
 */
export const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

export default {
  authLimiter,
  generalLimiter,
};
