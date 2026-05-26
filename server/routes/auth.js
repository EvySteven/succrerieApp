import express from 'express';
import { generateToken } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimit.js';
import { logAdminAccess, logError } from '../utils/logger.js';

const router = express.Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bombo-admin';
const ALLOWED_IPS = process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(',') : []; // Optional IP whitelist

/**
 * POST /api/auth/login
 * Authenticate admin with password
 */
router.post('/login', authLimiter, (req, res) => {
  const { password } = req.body;
  const clientIp = req.ip || req.connection.remoteAddress;

  // Validate input
  if (!password || typeof password !== 'string') {
    logError('INVALID_LOGIN_ATTEMPT', 'Missing or invalid password field', clientIp);
    return res.status(400).json({
      success: false,
      error: 'Mot de passe requis.',
    });
  }

  // Check IP whitelist if enabled
  if (ALLOWED_IPS.length > 0 && !ALLOWED_IPS.includes(clientIp)) {
    logAdminAccess(clientIp, false, 'IP not whitelisted');
    logError('UNAUTHORIZED_IP', `IP not in whitelist: ${clientIp}`);
    return res.status(403).json({
      success: false,
      error: 'Accès refusé. Adresse IP non autorisée.',
    });
  }

  // Verify password
  if (password !== ADMIN_PASSWORD) {
    logAdminAccess(clientIp, false, 'Invalid password');
    return res.status(401).json({
      success: false,
      error: 'Mot de passe incorrect.',
    });
  }

  // Generate JWT token
  try {
    const token = generateToken('admin-bombo');
    logAdminAccess(clientIp, true);

    res.json({
      success: true,
      message: 'Authentification réussie',
      token,
      expiresIn: '24h',
    });
  } catch (error) {
    logError('TOKEN_GENERATION_ERROR', error.message, clientIp);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur. Réessayez plus tard.',
    });
  }
});

/**
 * POST /api/auth/verify
 * Verify if token is still valid
 */
router.post('/verify', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      error: 'Token requis.',
    });
  }

  try {
    const jwt = require('jsonwebtoken');
    const secret = process.env.JWT_SECRET || 'default-secret-change-in-production';
    jwt.verify(token, secret);

    res.json({
      success: true,
      message: 'Token valide',
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Token invalide ou expiré.',
    });
  }
});

export default router;
