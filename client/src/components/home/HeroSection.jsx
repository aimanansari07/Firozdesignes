import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import BrandSplit from './BrandSplit.jsx';

/** Full-screen FEROZE hero with animated wordmark + brand split cards. */
export default function HeroSection() {
  const wordmarkRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !wordmarkRef.current) return undefined;

    const letters = wordmarkRef.current.querySelectorAll('[data-letter]');
    const ctx = gsap.context(() => {
      gsap.from(letters, {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.07,
        delay: 0.15,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-screen sm:min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-bg bg-grain pt-20">
      {/* Background video — shifted up slightly so any bottom-corner watermark falls under the gradient */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src="/videos/hero-home.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: 'center 35%' }}
      />
      {/* Cinematic gradient — same treatment as automotive/interiors heroes */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/65 to-bg/25" />
      {/* Corner vignettes — buries any watermark in corners and adds photographic depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 0% 100%, rgba(10,10,10,0.98) 0%, transparent 28%),' +
            'radial-gradient(ellipse at 100% 100%, rgba(10,10,10,0.98) 0%, transparent 28%),' +
            'radial-gradient(ellipse at 0% 0%, rgba(10,10,10,0.7) 0%, transparent 22%),' +
            'radial-gradient(ellipse at 100% 0%, rgba(10,10,10,0.7) 0%, transparent 22%)',
        }}
      />
      {/* Subtle warm gold radial — home brand personality */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 55%, rgba(180,145,75,0.07), transparent 65%)' }}
      />

      <div className="container-feroze relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        {/* Wordmark */}
        <h1
          ref={wordmarkRef}
          className="flex overflow-hidden font-display font-light text-white"
          style={{ fontSize: 'var(--text-hero)', letterSpacing: '0.3em', lineHeight: 1 }}
          aria-label="FEROZE"
        >
          {'FEROZE'.split('').map((ch, i) => (
            <span key={i} data-letter className="inline-block">
              {ch}
            </span>
          ))}
        </h1>

        {/* Gold divider */}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="mt-4 sm:mt-6 block h-px w-24 sm:w-40 origin-center bg-gold"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-4 sm:mt-6 font-body text-small font-light uppercase tracking-[0.25em] sm:tracking-[0.5em] text-muted"
        >
          Designs &amp; Holdings
        </motion.p>

        {/* Brand split cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="mt-8 sm:mt-14 w-full max-w-3xl"
        >
          <div className="rounded-sm border border-white/[0.07] bg-bg/45 backdrop-blur-[4px]">
            <BrandSplit />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <Link
        to="#stats"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }}
        className="relative z-10 mb-6 sm:mb-10 mt-4 sm:mt-8 flex flex-col items-center gap-2 text-muted transition hover:text-gold"
        aria-label="Scroll down"
      >
        <span className="font-body text-caption uppercase tracking-widest">Scroll</span>
        <ArrowDown size={18} className="animate-bounce-soft" />
      </Link>
    </section>
  );
}
