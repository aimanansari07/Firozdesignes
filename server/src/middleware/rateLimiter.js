import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

const skipInDev = () => !env.isProd;

/** General API limiter: 100 requests / 15 minutes / IP. Disabled in development. */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipInDev,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

/** Strict limiter for auth routes: 5 attempts / 15 minutes / IP. Disabled in development. */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  skip: skipInDev,
  message: { success: false, message: 'Too many login attempts. Try again in 15 minutes.' },
});
