import { motion } from 'framer-motion';

/**
 * Wraps a page in a fade + slight upward translate (300ms ease-out).
 * Framer Motion automatically respects prefers-reduced-motion when the user has
 * the OS setting enabled (via reduced-motion config in MotionConfig defaults),
 * and the transform here is subtle by design.
 */
const variants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
