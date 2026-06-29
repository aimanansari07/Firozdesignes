import { Router } from 'express';
import { upload } from '../config/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadImage, uploadImages, deleteImage } from '../controllers/uploadController.js';

const router = Router();

// All upload routes require an authenticated admin.
router.use(protect);
router.post('/image', upload.single('image'), uploadImage);
router.post('/images', upload.array('images', 12), uploadImages);
router.delete('/image', deleteImage);

export default router;
