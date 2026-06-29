import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import Admin from '../models/Admin.js';

/**
 * Verify the JWT from the httpOnly cookie (falling back to Authorization header).
 * Attaches req.admin on success.
 */
export async function protect(req, res, next) {
  try {
    let token = req.cookies?.token;
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Account no longer exists' });
    }
    req.admin = admin;
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session' });
  }
}

/** Restrict a route to specific roles. */
export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return res.status(403).json({ success: false, message: 'Insufficient permissions' });
    }
    return next();
  };
}
