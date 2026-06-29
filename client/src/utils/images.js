// ── Image helpers ──────────────────────────────────────────

/** Inject Cloudinary auto-format/quality (and optional width) transforms. */
export function optimizeCloudinary(url, { width } = {}) {
  if (!url || typeof url !== 'string' || !url.includes('/upload/')) return url;
  const transforms = ['f_auto', 'q_auto'];
  if (width) transforms.push(`w_${width}`, 'c_limit');
  // Avoid double-injecting if transforms already present.
  if (/\/upload\/(f_auto|q_auto|w_\d)/.test(url)) return url;
  return url.replace('/upload/', `/upload/${transforms.join(',')}/`);
}

// Deterministic hash so the same seed always yields the same placeholder.
function hash(str = '') {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Generate a tasteful dark gradient SVG placeholder (data URI) keyed by `seed`,
 * with an optional centered label. Used until real Cloudinary photos exist.
 */
export function placeholderImage(seed = 'feroze', { label, automotive = false } = {}) {
  const h = hash(seed);
  const hue = automotive ? 0 : 35 + (h % 15); // warm gold-ish, or red for automotive
  const sat = automotive ? 50 : 30;
  const c1 = `hsl(${hue}, ${sat}%, 10%)`;
  const c2 = `hsl(${hue}, ${sat}%, 4%)`;
  const accent = automotive ? '#8B1A1A' : '#C9A96E';
  const safeLabel = (label || '').replace(/[<>&]/g, '').slice(0, 40);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#g)"/>
    <line x1="${100 + (h % 200)}" y1="0" x2="${100 + (h % 200)}" y2="600" stroke="${accent}" stroke-width="1" opacity="0.25"/>
    <line x1="0" y1="300" x2="800" y2="300" stroke="${accent}" stroke-width="0.5" opacity="0.12"/>
    <text x="400" y="305" fill="${accent}" opacity="0.5" font-family="Georgia, serif" font-size="30" text-anchor="middle" letter-spacing="6">FEROZE</text>
    ${safeLabel ? `<text x="400" y="340" fill="#888880" font-family="monospace" font-size="13" text-anchor="middle" letter-spacing="2">${safeLabel.toUpperCase()}</text>` : ''}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** Resolve the best display URL for an item: first image (optimized) or placeholder. */
export function resolveImage(images, seed, opts = {}) {
  const first = Array.isArray(images) ? images[0] : images;
  if (first) return optimizeCloudinary(first, opts);
  return placeholderImage(seed, opts);
}
