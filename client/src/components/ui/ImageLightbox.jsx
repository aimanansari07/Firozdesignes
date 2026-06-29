import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { optimizeCloudinary, placeholderImage } from '../../utils/images.js';

/**
 * Full-screen image viewer with keyboard nav (Esc / ← / →).
 * @param {string[]} images
 * @param {number} index current image index
 * @param {Function} onClose
 * @param {Function} onNavigate (newIndex) => void
 */
export default function ImageLightbox({ images = [], index = 0, onClose, onNavigate, seed = 'feroze', automotive }) {
  const open = index !== null && index >= 0;
  const total = images.length;

  const go = useCallback(
    (dir) => {
      if (!total) return;
      onNavigate((index + dir + total) % total);
    },
    [index, total, onNavigate]
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, go]);

  if (!open) return null;

  const src = images[index]
    ? optimizeCloudinary(images[index])
    : placeholderImage(`${seed}-${index}`, { automotive });

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-white/70 transition hover:text-gold"
          aria-label="Close"
        >
          <X size={28} />
        </button>

        {total > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-4 text-white/60 transition hover:text-gold"
              aria-label="Previous image"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-4 text-white/60 transition hover:text-gold"
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>
          </>
        )}

        <motion.img
          key={index}
          src={src}
          alt={`View ${index + 1} of ${total}`}
          className="max-h-[88vh] max-w-[90vw] object-contain"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        />

        {total > 1 && (
          <span className="data absolute bottom-5 text-caption tracking-widest text-muted">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
