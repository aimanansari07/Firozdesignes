import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BRANDS } from '../../utils/constants.js';

export default function BrandSplit() {
  return (
    <div className="flex items-stretch">

      {/* ── Interiors ── */}
      <Link
        to={BRANDS.interiors.path}
        className="group flex flex-1 min-w-0 overflow-hidden flex-col items-center gap-2 sm:gap-3 py-4 sm:py-6 pr-3 sm:pr-8 text-center transition-all duration-500"
      >
        <span className="font-body text-[10px] sm:text-caption uppercase tracking-[0.15em] sm:tracking-[0.3em] text-white/35 transition-colors duration-300 group-hover:text-gold/60">
          Since 1996
        </span>

        <h2
          className="font-display text-xl sm:text-3xl md:text-4xl font-light uppercase text-white transition-colors duration-300 group-hover:text-gold"
          style={{ letterSpacing: 'clamp(0.05em, 1vw, 0.2em)', textShadow: '0 2px 24px rgba(0,0,0,0.9)' }}
        >
          Interiors
        </h2>

        <span className="hidden sm:block font-body text-caption text-white/30 transition-colors duration-300 group-hover:text-white/50">
          Interior &amp; Architecture
        </span>

        <div className="mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-2 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="h-px w-4 sm:w-6 bg-gold" />
          <span className="font-body text-[10px] sm:text-caption uppercase tracking-widest text-gold">Enter</span>
          <ArrowUpRight size={11} className="text-gold" />
        </div>
      </Link>

      {/* ── Vertical divider ── */}
      <div className="flex items-center">
        <div className="w-px self-stretch bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      {/* ── Automotive ── */}
      <Link
        to={BRANDS.automotive.path}
        className="group flex flex-1 min-w-0 overflow-hidden flex-col items-center gap-2 sm:gap-3 py-4 sm:py-6 pl-3 sm:pl-8 text-center transition-all duration-500"
      >
        <span className="font-body text-[10px] sm:text-caption uppercase tracking-[0.15em] sm:tracking-[0.3em] text-white/35 transition-colors duration-300 group-hover:text-automotive/80">
          Real Car Parts
        </span>

        <h2
          className="font-display text-xl sm:text-3xl md:text-4xl font-light uppercase text-white transition-colors duration-300 group-hover:text-automotive"
          style={{ letterSpacing: 'clamp(0.05em, 1vw, 0.2em)', textShadow: '0 2px 24px rgba(0,0,0,0.9)' }}
        >
          Automotive
        </h2>

        <span className="hidden sm:block font-body text-caption text-white/30 transition-colors duration-300 group-hover:text-white/50">
          Luxury Decor
        </span>

        <div className="mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-2 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="h-px w-4 sm:w-6 bg-automotive" />
          <span className="font-body text-[10px] sm:text-caption uppercase tracking-widest text-automotive">Enter</span>
          <ArrowUpRight size={11} className="text-automotive" />
        </div>
      </Link>

    </div>
  );
}
