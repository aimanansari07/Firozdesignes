import { Link } from 'react-router-dom';

/**
 * Reusable button with brand variants.
 * variant: 'gold' | 'solid' | 'ghost' | 'automotive'
 * Renders as <Link> (to), <a> (href) or <button>.
 */
const VARIANTS = {
  gold: 'bg-gold text-bg hover:bg-gold-light border border-gold hover:border-gold-light',
  solid: 'bg-white text-bg hover:bg-gold-light border border-white hover:border-gold-light',
  ghost: 'bg-transparent text-white border border-border hover:border-gold hover:text-gold',
  automotive: 'bg-automotive text-white hover:brightness-110 border border-automotive',
};

const SIZES = {
  sm: 'px-5 py-2 text-caption',
  md: 'px-7 py-3 text-small',
  lg: 'px-9 py-4 text-small',
};

export default function Button({
  children,
  variant = 'gold',
  size = 'md',
  to,
  href,
  className = '',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 font-body font-normal uppercase tracking-wider transition-all duration-300 ease-out-soft ${
    VARIANTS[variant] || VARIANTS.gold
  } ${SIZES[size] || SIZES.md} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
