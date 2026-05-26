import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getLogs, logError } from '../utils/logger.js';

const router = express.Router();

/**
 * GET /api/admin/logs
 * Get admin access logs (admin only)
 */
router.get('/logs', verifyToken, (req, res) => {
  try {
    const accessLogs = getLogs('access', 100);
    const errorLogs = getLogs('error', 100);

    res.json({
      success: true,
      data: {
        accessLogs,
        errorLogs,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logError('LOGS_FETCH_ERROR', error.message);
    res.status(500).json({
      success: false,
      error: 'Impossible de récupérer les logs.',
    });
  }
});

/**
 * GET /api/admin/status
 * Get admin dashboard status (admin only)
 */
router.get('/status', verifyToken, (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'online',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      authenticatedAs: 'admin',
    },
  });
});

export default router;
