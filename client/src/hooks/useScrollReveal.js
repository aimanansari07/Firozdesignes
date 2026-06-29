import { useInView } from 'react-intersection-observer';

/**
 * Scroll-reveal helper built on react-intersection-observer.
 * Returns a ref + boolean `inView`. Respects prefers-reduced-motion by reporting
 * inView=true immediately so content is never hidden from those users.
 */
export function useScrollReveal({ threshold = 0.15, triggerOnce = true } = {}) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const { ref, inView } = useInView({ threshold, triggerOnce });
  return { ref, inView: prefersReduced ? true : inView, prefersReduced };
}

export default useScrollReveal;
