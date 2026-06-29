import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProducts,
  getProductBySlug,
  adminGetProducts,
  adminGetProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  togglePublishProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest, sanitizeBody } from '../middleware/validateRequest.js';

const CATEGORIES = ['coffee-table', 'side-table', 'wall-art', 'shelf', 'statement-piece', 'custom'];

const productValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('category').isIn(CATEGORIES).withMessage('Invalid category'),
  body('materials').optional().isArray(),
  body('finishes').optional().isArray(),
  body('price.amount').optional().isFloat({ min: 0 }),
  body('images').optional().isArray(),
];

/* Public router (mounted at /api/products) */
export const publicProductRouter = Router();
publicProductRouter.get('/', getProducts);
publicProductRouter.get('/:slug', getProductBySlug);

/* Admin router (mounted at /api/admin/products, all protected) */
export const adminProductRouter = Router();
adminProductRouter.use(protect);
adminProductRouter.get('/', adminGetProducts);
adminProductRouter.get('/:id', adminGetProduct);
adminProductRouter.post('/', sanitizeBody, productValidators, validateRequest, createProduct);
adminProductRouter.put('/:id', sanitizeBody, productValidators, validateRequest, updateProduct);
adminProductRouter.delete('/:id', deleteProduct);
adminProductRouter.patch('/:id/publish', togglePublishProduct);
