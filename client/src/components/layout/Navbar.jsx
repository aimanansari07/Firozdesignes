import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../utils/constants.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const linkClass = ({ isActive }) =>
    `font-body text-small uppercase tracking-wider transition-colors duration-300 ${
      isActive ? 'text-gold' : 'text-white/80 hover:text-gold'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? 'border-b border-border bg-bg/90 backdrop-blur-md' : 'bg-gradient-to-b from-bg/80 to-transparent'
      }`}
    >
      <nav className="container-feroze flex h-20 items-center justify-between">
        {/* Wordmark */}
        <Link to="/" className="flex flex-col leading-none" aria-label="FEROZE home">
          <span className="font-display text-2xl font-normal tracking-[0.3em] text-white">FEROZE</span>
          <span className="font-body text-[9px] uppercase tracking-[0.4em] text-muted">Designs &amp; Holdings</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.path}>
              <NavLink to={l.path} end={l.path === '/'} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border bg-bg/98 backdrop-blur-md md:hidden"
          >
            <ul className="container-feroze flex flex-col gap-1 py-4">
              {NAV_LINKS.map((l) => (
                <li key={l.path}>
                  <NavLink
                    to={l.path}
                    end={l.path === '/'}
                    className="block py-3 font-body text-small uppercase tracking-wider text-white/85"
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
