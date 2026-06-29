/**
 * One-time admin seed script.
 *   npm run seed:admin
 * Creates a superadmin from SEED_ADMIN_* env vars (defaults: admin / changeme_on_first_login).
 * Safe to re-run: skips if an admin with the same email already exists.
 */
import mongoose from 'mongoose';
import { env, validateEnv } from '../config/env.js';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';

const run = async () => {
  validateEnv();
  await connectDB();

  const username = process.env.SEED_ADMIN_USERNAME || 'admin';
  const email = (process.env.SEED_ADMIN_EMAIL || 'admin@ferozedesigns.com').toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD || 'changeme_on_first_login';

  const existing = await Admin.findOne({ email });
  if (existing) {
    // eslint-disable-next-line no-console
    console.log(`\x1b[33m[seed] Admin "${email}" already exists — nothing to do.\x1b[0m`);
  } else {
    const admin = new Admin({ username, email, role: 'superadmin' });
    await admin.setPassword(password);
    await admin.save();
    // eslint-disable-next-line no-console
    console.log(`\x1b[32m[seed] Superadmin created:\x1b[0m`);
    // eslint-disable-next-line no-console
    console.log(`        email:    ${email}`);
    // eslint-disable-next-line no-console
    console.log(`        password: ${password}`);
    // eslint-disable-next-line no-console
    console.log(`\x1b[33m        → Change this password after first login.\x1b[0m`);
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('\x1b[31m[seed] Failed:\x1b[0m', err.message);
  process.exit(1);
});
