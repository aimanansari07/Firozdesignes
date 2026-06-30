import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top of the page on every route change.
 *
 * The site sets `html { scroll-behavior: smooth }` for anchor links. A normal
 * `window.scrollTo({ behavior: 'auto' })` inherits that smooth behaviour, which
 * on tall mobile pages animates a long scroll that gets interrupted by the
 * page transition — leaving the new page scrolled partway down. We force an
 * instant jump that ignores the CSS smooth-scroll instead.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Stop the browser from restoring the previous scroll position on its own.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Direct assignment is always instant and is NOT affected by the CSS
    // `scroll-behavior: smooth` rule — unlike window.scrollTo with 'auto'.
    document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    // Belt-and-suspenders for browsers that honour the explicit 'instant' value.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
