import { env } from '../config/env.js';

/** 404 handler for unmatched routes. */
export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Not found: ${req.originalUrl}`));
}

/** Global error handler. Keeps responses JSON and hides stack traces in prod. */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  let status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Server error';

  // Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    status = 400;
    message = 'Invalid resource id';
  }
  // Mongoose duplicate key
  if (err.code === 11000) {
    status = 409;
    message = `Duplicate value for: ${Object.keys(err.keyValue || {}).join(', ')}`;
  }
  // Multer file-size
  if (err.code === 'LIMIT_FILE_SIZE') {
    status = 413;
    message = 'File too large (max 10MB)';
  }

  res.status(status).json({
    success: false,
    message,
    ...(env.isProd ? {} : { stack: err.stack }),
  });
}
