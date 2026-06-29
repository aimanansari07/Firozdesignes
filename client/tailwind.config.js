/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Map Tailwind's screen tokens to the brand breakpoints.
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        border: 'var(--color-border)',
        gold: 'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        white: 'var(--color-white)',
        muted: 'var(--color-muted)',
        automotive: 'var(--color-automotive)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Jost"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        hero: 'clamp(4rem, 12vw, 10rem)',
        display: 'clamp(2rem, 5vw, 4rem)',
        heading: 'clamp(1.25rem, 2.5vw, 2rem)',
        body: ['1rem', { lineHeight: '1.7' }],
        small: '0.875rem',
        caption: '0.75rem',
      },
      letterSpacing: {
        widest: '0.3em',
        wider: '0.2em',
      },
      maxWidth: {
        content: '1440px',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'line-grow': {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'bounce-soft': 'bounce-soft 1.8s ease-in-out infinite',
        'line-grow': 'line-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};
