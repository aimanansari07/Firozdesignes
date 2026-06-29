import { validationResult } from 'express-validator';

/**
 * Collects express-validator errors and returns a 422 if any are present.
 * Place after a chain of validators in a route definition.
 */
export function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  return next();
}

/**
 * Lightweight recursive sanitizer — strips angle brackets from string inputs to
 * blunt stored-XSS. Applied to req.body before validation on write routes.
 */
export function sanitizeBody(req, _res, next) {
  const clean = (val) => {
    if (typeof val === 'string') return val.replace(/[<>]/g, '').trim();
    if (Array.isArray(val)) return val.map(clean);
    if (val && typeof val === 'object') {
      return Object.fromEntries(Object.entries(val).map(([k, v]) => [k, clean(v)]));
    }
    return val;
  };
  if (req.body && typeof req.body === 'object') req.body = clean(req.body);
  next();
}
