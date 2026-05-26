import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { logInfo, logError } from './utils/logger.js';
import { generalLimiter } from './middleware/rateLimit.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(generalLimiter);

// Request logging
app.use((req, res, next) => {
  logInfo(`${req.method} ${req.path} from ${req.ip}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint non trouvé.',
  });
});

// Error handler
app.use((error, req, res, next) => {
  logError('UNHANDLED_ERROR', error.message, req.ip);
  res.status(500).json({
    success: false,
    error: 'Erreur serveur interne.',
  });
});

// Start server
app.listen(PORT, () => {
  logInfo(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  logInfo(`📝 Logs au monitoring: /api/admin/logs`);
});
