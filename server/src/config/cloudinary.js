import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { env } from './env.js';

if (env.cloudinary.configured) {
  cloudinary.config({
    cloud_name: env.cloudinary.cloudName,
    api_key: env.cloudinary.apiKey,
    api_secret: env.cloudinary.apiSecret,
    secure: true,
  });
}

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

// Cloudinary-backed multer storage (used when configured).
const storage = env.cloudinary.configured
  ? new CloudinaryStorage({
      cloudinary,
      params: {
        folder: 'feroze',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
    })
  : multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: MAX_BYTES },
  fileFilter(_req, file, cb) {
    if (!ALLOWED_MIME.includes(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG and WebP images are allowed'));
    }
    cb(null, true);
  },
});

export { cloudinary };
