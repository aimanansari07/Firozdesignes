import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/** Sign a short-lived JWT for an admin user. */
export function generateToken(admin) {
  return jwt.sign({ id: admin._id, role: admin.role, username: admin.username }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRE,
  });
}

/** Cookie options for the httpOnly auth cookie. */
export function cookieOptions() {
  return {
    httpOnly: true,
    // In production the frontend (Vercel) and API (Render) are on different
    // domains — a cross-site request. The cookie therefore needs
    // SameSite=None + Secure so the browser will send it; otherwise the admin
    // appears logged out on every request after login. Locally we keep 'lax'.
    secure: env.isProd, // HTTPS only — required when sameSite is 'none'
    sameSite: env.isProd ? 'none' : 'lax',
    maxAge: env.COOKIE_EXPIRE_DAYS * 24 * 60 * 60 * 1000,
    path: '/',
  };
}
