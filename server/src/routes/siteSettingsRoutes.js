import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/siteSettingsController.js';
import { protect } from '../middleware/authMiddleware.js';

export const publicSettingsRouter = Router();
publicSettingsRouter.get('/', getSettings);

export const adminSettingsRouter = Router();
adminSettingsRouter.use(protect);
adminSettingsRouter.put('/', updateSettings);
