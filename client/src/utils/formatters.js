// ── Display formatters ─────────────────────────────────────

/** Format a stat value, optionally in the Indian lakh convention (5,00,000+). */
export function formatStat(value, format) {
  if (format === 'inLakh') return formatIndianNumber(value);
  return new Intl.NumberFormat('en-IN').format(value);
}

/** Indian digit grouping: 500000 → "5,00,000". */
export function formatIndianNumber(value) {
  return new Intl.NumberFormat('en-IN').format(value);
}

/** Currency for automotive products. */
export function formatPrice({ amount, currency = 'INR' } = {}) {
  if (!amount) return 'Price on Request';
  try {
    return new Intl.NumberFormat(currency === 'AED' ? 'en-AE' : 'en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

/** Human-readable date. */
export function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/** Compact date-time for admin tables. */
export function formatDateTime(value) {
  if (!value) return '';
  return new Date(value).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Join dimension parts into a single L × W × H string. */
export function formatDimensions(d = {}) {
  return [d.length, d.width, d.height].filter(Boolean).join(' × ');
}

/** Title-case a kebab/space category key. */
export function titleCase(str = '') {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
