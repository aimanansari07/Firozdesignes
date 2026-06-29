import { PRODUCT_CATEGORIES } from '../../utils/constants.js';

/** Category filter tabs for automotive products (gold-active, red hover accent). */
export default function ProductFilter({ active, onChange, categories = PRODUCT_CATEGORIES }) {
  return (
    <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:px-0">
      {categories.map((c) => {
        const isActive = active === c.key;
        return (
          <button
            key={c.key}
            onClick={() => onChange(c.key)}
            className={`shrink-0 whitespace-nowrap border px-5 py-2 font-body text-small uppercase tracking-wider transition-all duration-300 ${
              isActive
                ? 'border-gold bg-gold text-bg'
                : 'border-border text-muted hover:border-gold hover:text-gold'
            }`}
            aria-pressed={isActive}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
