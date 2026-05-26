import jwt from 'jsonwebtoken';
import { logError } from '../utils/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';

/**
 * Middleware to verify JWT token
 */
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Token manquant. Authentification requise.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.adminId;
    req.isAdminAuthenticated = true;
    next();
  } catch (error) {
    logError('JWT_VERIFICATION_FAILED', error.message, req.ip);
    return res.status(401).json({
      success: false,
      error: 'Token invalide ou expiré.',
    });
  }
};

/**
 * Generate JWT token
 */
export const generateToken = (adminId) => {
  return jwt.sign(
    { adminId, iat: Math.floor(Date.now() / 1000) },
    JWT_SECRET,
    { expiresIn: '24h' } // Token expires in 24 hours
  );
};

export default {
  verifyToken,
  generateToken,
};
