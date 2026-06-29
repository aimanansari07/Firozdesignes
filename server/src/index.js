import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { env, validateEnv } from './config/env.js';
import { connectDB, isDBConnected } from './config/db.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import authRoutes, { dashboardRouter } from './routes/authRoutes.js';
import { publicProjectRouter, adminProjectRouter } from './routes/projectRoutes.js';
import { publicProductRouter, adminProductRouter } from './routes/productRoutes.js';
import { publicTestimonialRouter, adminTestimonialRouter } from './routes/testimonialRoutes.js';
import { publicInquiryRouter, adminInquiryRouter } from './routes/inquiryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

validateEnv();

const app = express();

// ── Security & parsing ────────────────────────────────────
app.use(helmet());
app.set('trust proxy', 1); // correct client IPs behind Render/Vercel proxies

const allowedOrigins = [
  'https://www.ferozedesigns.com',
  'https://ferozedesigns.com',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  env.FRONTEND_URL,
];
app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin/non-browser (no origin) and whitelisted origins.
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (!env.isProd) app.use(morgan('dev'));

// ── Health check ──────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'ok', db: isDBConnected() ? 'connected' : 'disconnected' });
});

// ── Rate limiting (all /api routes) ───────────────────────
app.use('/api', apiLimiter);

// ── Public routes ─────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/projects', publicProjectRouter);
app.use('/api/products', publicProductRouter);
app.use('/api/testimonials', publicTestimonialRouter);
app.use('/api/inquiries', publicInquiryRouter);

// ── Protected admin routes ────────────────────────────────
app.use('/api/admin', dashboardRouter);
app.use('/api/admin/projects', adminProjectRouter);
app.use('/api/admin/products', adminProductRouter);
app.use('/api/admin/testimonials', adminTestimonialRouter);
app.use('/api/admin/inquiries', adminInquiryRouter);
app.use('/api/upload', uploadRoutes);

// ── Errors ────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Boot ──────────────────────────────────────────────────
const start = async () => {
  await connectDB();
  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`\x1b[36m[server] FEROZE API running on port ${env.PORT} (${env.NODE_ENV})\x1b[0m`);
  });
};

start();

export default app;
