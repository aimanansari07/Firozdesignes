import { Router } from 'express';
import { body } from 'express-validator';
import {
  getTestimonials,
  adminGetTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest, sanitizeBody } from '../middleware/validateRequest.js';

const validators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('quote').trim().notEmpty().withMessage('Quote is required'),
  body('brand').optional().isIn(['interiors', 'automotive', 'both']),
  body('rating').optional().isInt({ min: 1, max: 5 }).toInt(),
];

/* Public router (mounted at /api/testimonials) */
export const publicTestimonialRouter = Router();
publicTestimonialRouter.get('/', getTestimonials);

/* Admin router (mounted at /api/admin/testimonials, all protected) */
export const adminTestimonialRouter = Router();
adminTestimonialRouter.use(protect);
adminTestimonialRouter.get('/', adminGetTestimonials);
adminTestimonialRouter.post('/', sanitizeBody, validators, validateRequest, createTestimonial);
adminTestimonialRouter.put('/:id', sanitizeBody, validators, validateRequest, updateTestimonial);
adminTestimonialRouter.delete('/:id', deleteTestimonial);
