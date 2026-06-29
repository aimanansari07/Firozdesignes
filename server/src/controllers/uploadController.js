import { cloudinary } from '../config/cloudinary.js';
import { env } from '../config/env.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/** Map a multer/Cloudinary file object to a stable URL + public_id pair. */
const toImage = (file) => ({
  url: file.path || file.secure_url,
  publicId: file.filename || file.public_id,
});

/** POST /api/upload/image — single image. */
export const uploadImage = asyncHandler(async (req, res) => {
  if (!env.cloudinary.configured) {
    return res.status(503).json({ success: false, message: 'Image uploads are not configured (Cloudinary).' });
  }
  if (!req.file) return res.status(400).json({ success: false, message: 'No image provided' });
  res.status(201).json({ success: true, data: toImage(req.file) });
});

/** POST /api/upload/images — multiple images. */
export const uploadImages = asyncHandler(async (req, res) => {
  if (!env.cloudinary.configured) {
    return res.status(503).json({ success: false, message: 'Image uploads are not configured (Cloudinary).' });
  }
  if (!req.files?.length) return res.status(400).json({ success: false, message: 'No images provided' });
  res.status(201).json({ success: true, data: req.files.map(toImage) });
});

/** DELETE /api/upload/image — remove by public_id. */
export const deleteImage = asyncHandler(async (req, res) => {
  if (!env.cloudinary.configured) {
    return res.status(503).json({ success: false, message: 'Image uploads are not configured (Cloudinary).' });
  }
  const { publicId } = req.body;
  if (!publicId) return res.status(400).json({ success: false, message: 'publicId is required' });
  const result = await cloudinary.uploader.destroy(publicId);
  res.json({ success: true, data: result });
});
