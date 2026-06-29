import { Router } from 'express';
import { body } from 'express-validator';
import {
  createInquiry,
  adminGetInquiries,
  updateInquiryStatus,
} from '../controllers/inquiryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest, sanitizeBody } from '../middleware/validateRequest.js';

const inquiryValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('brand').optional().isIn(['interiors', 'automotive', 'both', 'general']),
  body('inquiryType').optional().isIn(['project', 'product', 'quotation', 'custom-order', 'general']),
];

/* Public router (mounted at /api/inquiries) */
export const publicInquiryRouter = Router();
publicInquiryRouter.post('/', sanitizeBody, inquiryValidators, validateRequest, createInquiry);

/* Admin router (mounted at /api/admin/inquiries, all protected) */
export const adminInquiryRouter = Router();
adminInquiryRouter.use(protect);
adminInquiryRouter.get('/', adminGetInquiries);
adminInquiryRouter.patch('/:id/status', updateInquiryStatus);
