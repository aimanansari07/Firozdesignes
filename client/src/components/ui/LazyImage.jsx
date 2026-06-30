import { useState, useEffect } from 'react';
import { optimizeCloudinary, placeholderImage } from '../../utils/images.js';

export default function LazyImage({
  src,
  alt = '',
  seed,
  label,
  automotive = false,
  eager = false,
  width,
  className = '',
  imgClassName = '',
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // Reset error when src changes so a newly-available URL always gets a fresh attempt
  useEffect(() => {
    setErrored(false);
  }, [src]);

  const placeholder = placeholderImage(seed || alt || 'feroze', { label: label ?? alt, automotive });
  const resolved = src && !errored ? optimizeCloudinary(src, { width }) : placeholder;
  const isPlaceholder = resolved === placeholder;

  return (
    <span className={`relative block overflow-hidden bg-surface ${className}`} {...props}>
      <img
        src={resolved}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
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
