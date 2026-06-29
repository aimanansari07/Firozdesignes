import { useState } from 'react';
import { optimizeCloudinary, placeholderImage } from '../../utils/images.js';

/**
 * Lazy-loaded image with a blur-up reveal.
 * - Native loading="lazy" + decoding="async".
 * - Falls back to a generated SVG placeholder when no src is provided or on error.
 * - Cloudinary URLs are auto-optimized (f_auto,q_auto).
 */
export default function LazyImage({
  src,
  alt = '',
  seed,
  label,
  automotive = false,
  width,
  className = '',
  imgClassName = '',
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const placeholder = placeholderImage(seed || alt || 'feroze', { label: label ?? alt, automotive });
  const resolved = src && !errored ? optimizeCloudinary(src, { width }) : placeholder;
  const isPlaceholder = resolved === placeholder;

  return (
    <span className={`relative block overflow-hidden bg-surface ${className}`} {...props}>
      <img
        src={resolved}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`h-full w-full object-cover transition-[opacity,filter] duration-700 ease-out ${
          loaded || isPlaceholder ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
        } ${imgClassName}`}
      />
    </span>
  );
}
