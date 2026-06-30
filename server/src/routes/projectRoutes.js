import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProjects,
  getProjectBySlug,
  adminGetProjects,
  adminGetProject,
  createProject,
  updateProject,
  deleteProject,
  togglePublishProject,
  toggleFeaturedProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest, sanitizeBody } from '../middleware/validateRequest.js';

const CATEGORIES = ['hospitality', 'commercial', 'residential', 'retail', 'villa', 'resort'];

const projectValidators = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('category').isIn(CATEGORIES).withMessage('Invalid category'),
  body('shortDescription').optional().isLength({ max: 150 }),
  body('year').optional().isInt({ min: 1990, max: 2100 }).toInt(),
  body('images').optional().isArray(),
];

/* Public router (mounted at /api/projects) */
export const publicProjectRouter = Router();
publicProjectRouter.get('/', getProjects);
publicProjectRouter.get('/:slug', getProjectBySlug);

/* Admin router (mounted at /api/admin/projects, all protected) */
export const adminProjectRouter = Router();
adminProjectRouter.use(protect);
adminProjectRouter.get('/', adminGetProjects);
adminProjectRouter.get('/:id', adminGetProject);
adminProjectRouter.post('/', sanitizeBody, projectValidators, validateRequest, createProject);
adminProjectRouter.put('/:id', sanitizeBody, projectValidators, validateRequest, updateProject);
adminProjectRouter.delete('/:id', deleteProject);
adminProjectRouter.patch('/:id/publish', togglePublishProject);
adminProjectRouter.patch('/:id/featured', toggleFeaturedProject);
