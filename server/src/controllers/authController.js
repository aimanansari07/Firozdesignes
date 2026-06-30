import crypto from 'crypto';
import Admin from '../models/Admin.js';
import Project from '../models/Project.js';
import Product from '../models/Product.js';
import Testimonial from '../models/Testimonial.js';
import Inquiry from '../models/Inquiry.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken, cookieOptions } from '../utils/generateToken.js';
import { sendEmail } from '../utils/sendEmail.js';

/** POST /api/auth/login */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: String(email).toLowerCase() }).select('+passwordHash');
  if (!admin || !(await admin.verifyPassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  admin.lastLogin = new Date();
  await admin.save();

  const token = generateToken(admin);
  res.cookie('token', token, cookieOptions());
  res.json({
    success: true,
    token,
    data: { id: admin._id, username: admin.username, email: admin.email, role: admin.role },
  });
});

/** POST /api/auth/logout */
export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie('token', { ...cookieOptions(), maxAge: undefined });
  res.json({ success: true, message: 'Logged out' });
});

/** GET /api/auth/me */
export const getMe = asyncHandler(async (req, res) => {
  const a = req.admin;
  res.json({
    success: true,
    data: { id: a._id, username: a.username, email: a.email, role: a.role, lastLogin: a.lastLogin },
  });
});

/** POST /api/auth/forgot-password */
export const forgotPassword = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ email: String(req.body.email).toLowerCase() });
  // Always respond OK so we don't leak whether an email exists.
  if (!admin) return res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });

  const raw = admin.generateResetToken();
  await admin.save();

  const resetUrl = `${process.env.FRONTEND_URL}/admin/reset-password/${raw}`;
  const html = `
    <div style="background:#0A0A0A;padding:32px 0;font-family:Arial,sans-serif;color:#F5F5F0">
      <div style="max-width:520px;margin:0 auto;background:#111;border:1px solid #2A2A2A;border-radius:8px;overflow:hidden">
        <div style="padding:28px 32px;border-bottom:1px solid #2A2A2A;text-align:center">
          <span style="font-family:Georgia,serif;font-size:26px;letter-spacing:6px;color:#F5F5F0">FEROZE</span>
          <div style="font-size:10px;letter-spacing:4px;color:#888880;margin-top:4px">ADMIN PANEL</div>
        </div>
        <div style="padding:32px">
          <h2 style="font-family:Georgia,serif;font-weight:normal;color:#C9A96E;margin:0 0 16px">Password Reset Request</h2>
          <p style="color:#cfcfc8;line-height:1.6">You requested to reset your admin password. Click the button below — this link expires in <strong>30 minutes</strong>.</p>
          <p style="margin:24px 0">
            <a href="${resetUrl}" style="background:#C9A96E;color:#0A0A0A;text-decoration:none;padding:14px 28px;border-radius:4px;font-size:14px;font-weight:bold;display:inline-block;letter-spacing:1px">
              RESET PASSWORD
            </a>
          </p>
          <p style="color:#888880;font-size:13px">If you didn't request this, ignore this email — your password won't change.</p>
        </div>
      </div>
    </div>`;

  await sendEmail({ to: admin.email, subject: 'Feroze Admin — Password Reset', html });
  res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
});

/** POST /api/auth/reset-password/:token */
export const resetPassword = asyncHandler(async (req, res) => {
  const hashed = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const admin = await Admin.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpire: { $gt: Date.now() },
  }).select('+passwordHash +resetPasswordToken +resetPasswordExpire');

  if (!admin) return res.status(400).json({ success: false, message: 'Reset link is invalid or has expired.' });

  const { password } = req.body;
  if (!password || password.length < 8) {
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
  }

  await admin.setPassword(password);
  admin.resetPasswordToken = undefined;
  admin.resetPasswordExpire = undefined;
  await admin.save();

  res.json({ success: true, message: 'Password reset successfully. You can now log in.' });
});

/** POST /api/auth/change-password — logged-in admin changes their own password. */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Both current and new password are required.' });
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ success: false, message: 'New password must be at least 8 characters.' });
  }

  const admin = await Admin.findById(req.admin._id).select('+passwordHash');
  if (!(await admin.verifyPassword(currentPassword))) {
    return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
  }

  await admin.setPassword(newPassword);
  await admin.save();
  res.json({ success: true, message: 'Password changed successfully.' });
});

/** GET /api/admin/dashboard — aggregate counts + recent inquiries. */
export const getDashboard = asyncHandler(async (_req, res) => {
  const [
    totalProjects,
    publishedProjects,
    totalProducts,
    publishedProducts,
    totalTestimonials,
    totalInquiries,
    newInquiries,
    recentInquiries,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ published: true }),
    Product.countDocuments(),
    Product.countDocuments({ published: true }),
    Testimonial.countDocuments(),
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: 'new' }),
    Inquiry.find().sort({ createdAt: -1 }).limit(10),
  ]);

  res.json({
    success: true,
    data: {
      stats: {
        totalProjects,
        publishedProjects,
        totalProducts,
        publishedProducts,
        totalTestimonials,
        totalInquiries,
        newInquiries,
      },
      recentInquiries,
    },
  });
});
