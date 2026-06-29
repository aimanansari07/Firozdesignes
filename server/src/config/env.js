import dotenv from 'dotenv';

dotenv.config();

/**
 * Centralised, validated access to environment variables.
 * Required vars are checked at boot so the app fails fast with a clear message
 * rather than crashing deep inside a request handler.
 */
const required = ['MONGODB_URI', 'JWT_SECRET'];

const optionalWithDefaults = {
  NODE_ENV: 'development',
  PORT: '5000',
  JWT_EXPIRE: '1h',
  COOKIE_EXPIRE_DAYS: '7',
  FRONTEND_URL: 'https://www.ferozedesigns.com',
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: '587',
  FROM_EMAIL: 'noreply@ferozedesigns.com',
  ADMIN_EMAIL: 'admin@ferozedesigns.com',
};

export function validateEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    // In production we hard-fail; in dev we warn so the server can still boot
    // for frontend work without a database configured.
    const message = `Missing required environment variables: ${missing.join(', ')}`;
    if (process.env.NODE_ENV === 'production') {
      throw new Error(message);
    }
    // eslint-disable-next-line no-console
    console.warn(`\x1b[33m[env] ${message}. Running in degraded dev mode.\x1b[0m`);
  }
}

export const env = {
  get NODE_ENV() {
    return process.env.NODE_ENV || optionalWithDefaults.NODE_ENV;
  },
  get isProd() {
    return this.NODE_ENV === 'production';
  },
  get PORT() {
    return parseInt(process.env.PORT || optionalWithDefaults.PORT, 10);
  },
  get MONGODB_URI() {
    return process.env.MONGODB_URI;
  },
  get JWT_SECRET() {
    return process.env.JWT_SECRET || 'dev_insecure_secret_change_me';
  },
  get JWT_EXPIRE() {
    return process.env.JWT_EXPIRE || optionalWithDefaults.JWT_EXPIRE;
  },
  get COOKIE_EXPIRE_DAYS() {
    return parseInt(process.env.COOKIE_EXPIRE_DAYS || optionalWithDefaults.COOKIE_EXPIRE_DAYS, 10);
  },
  get FRONTEND_URL() {
    return process.env.FRONTEND_URL || optionalWithDefaults.FRONTEND_URL;
  },
  cloudinary: {
    get cloudName() {
      return process.env.CLOUDINARY_CLOUD_NAME;
    },
    get apiKey() {
      return process.env.CLOUDINARY_API_KEY;
    },
    get apiSecret() {
      return process.env.CLOUDINARY_API_SECRET;
    },
    get configured() {
      return Boolean(
        process.env.CLOUDINARY_CLOUD_NAME &&
          process.env.CLOUDINARY_API_KEY &&
          process.env.CLOUDINARY_API_SECRET
      );
    },
  },
  smtp: {
    get host() {
      return process.env.SMTP_HOST || optionalWithDefaults.SMTP_HOST;
    },
    get port() {
      return parseInt(process.env.SMTP_PORT || optionalWithDefaults.SMTP_PORT, 10);
    },
    get user() {
      return process.env.SMTP_EMAIL;
    },
    get pass() {
      return process.env.SMTP_PASSWORD;
    },
    get from() {
      return process.env.FROM_EMAIL || optionalWithDefaults.FROM_EMAIL;
    },
    get adminEmail() {
      return process.env.ADMIN_EMAIL || optionalWithDefaults.ADMIN_EMAIL;
    },
    get configured() {
      return Boolean(process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD);
    },
  },
};
