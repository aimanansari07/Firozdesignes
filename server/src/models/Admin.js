import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const SALT_ROUNDS = 12;

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['superadmin', 'editor'], default: 'editor' },
    lastLogin: { type: Date },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpire: { type: Date, select: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

/** Hash and set the password. */
adminSchema.methods.setPassword = async function setPassword(plain) {
  this.passwordHash = await bcrypt.hash(plain, SALT_ROUNDS);
};

/** Compare a candidate password against the stored hash. */
adminSchema.methods.verifyPassword = function verifyPassword(plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

/** Generate a password reset token (raw token returned, hashed version stored). */
adminSchema.methods.generateResetToken = function generateResetToken() {
  const raw = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(raw).digest('hex');
  this.resetPasswordExpire = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
  return raw;
};

export default mongoose.model('Admin', adminSchema);
