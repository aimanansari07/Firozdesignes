import { Router } from 'express';
import { body } from 'express-validator';
import { login, logout, getMe, getDashboard, forgotPassword, resetPassword, changePassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

const loginValidators = [
  body('email').trim().isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password required'),
];

router.post('/login', authLimiter, loginValidators, validateRequest, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/change-password', protect, changePassword);

// Dashboard is auth-scoped data; exported here for convenience, mounted under /api/admin.
export const dashboardRouter = Router();
dashboardRouter.get('/dashboard', protect, getDashboard);

export default router;
