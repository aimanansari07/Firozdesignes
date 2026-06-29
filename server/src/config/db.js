import mongoose from 'mongoose';
import { env } from './env.js';

/**
 * Connect to MongoDB Atlas. Returns the mongoose connection, or null if no URI
 * is configured (degraded dev mode — public endpoints will return empty lists).
 */
export async function connectDB() {
  if (!env.MONGODB_URI) {
    // Fail queries immediately (instead of buffering 10s) so the frontend's
    // static fallback data renders instantly during DB-less dev.
    mongoose.set('bufferCommands', false);
    // eslint-disable-next-line no-console
    console.warn('\x1b[33m[db] MONGODB_URI not set — skipping DB connection.\x1b[0m');
    return null;
  }

  mongoose.set('strictQuery', true);

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    // eslint-disable-next-line no-console
    console.log(`\x1b[32m[db] MongoDB connected: ${conn.connection.host}\x1b[0m`);
    return conn;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`\x1b[31m[db] Connection error: ${err.message}\x1b[0m`);
    if (env.isProd) process.exit(1);
    return null;
  }
}

export function isDBConnected() {
  return mongoose.connection.readyState === 1;
}
