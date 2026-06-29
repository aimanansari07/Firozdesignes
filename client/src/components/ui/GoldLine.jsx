import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

/**
 * The signature FEROZE design element: a vertical gold hairline that animates
 * upward (scaleY 0 → 1) when scrolled into view — referencing both architectural
 * drawing lines and automotive chassis lines.
 *
 * @param {'vertical'|'horizontal'} orientation
 * @param {string} className positioning utilities (height, absolute pos, etc.)
 * @param {string} color CSS color (defaults to gold; pass automotive red for that brand)
 */
export default function GoldLine({
  orientation = 'vertical',
  className = '',
  color = 'var(--color-gold)',
  delay = 0,
}) {
  const { ref, inView, prefersReduced } = useScrollReveal({ threshold: 0.2 });
  const isVertical = orientation === 'vertical';

  const initial = isVertical ? { scaleY: 0 } : { scaleX: 0 };
  const animate = inView
    ? { scaleY: 1, scaleX: 1 }
    : isVertical
    ? { scaleY: 0 }
    : { scaleX: 0 };

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none block ${isVertical ? 'w-px' : 'h-px'} ${className}`}
      style={{ overflow: 'hidden' }}
    >
      <motion.span
        className="block h-full w-full"
        style={{
          background: color,
          transformOrigin: isVertical ? 'top' : 'left',
        }}
        initial={prefersReduced ? false : initial}
        animate={animate}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </span>
  );
}
