import useCounter from '../../hooks/useCounter.js';
import { formatStat } from '../../utils/formatters.js';
import { STATS } from '../../utils/constants.js';

function Stat({ value, suffix, label, format }) {
  const { ref, value: current } = useCounter(value);
  return (
    <div ref={ref} className="px-1 text-center">
      <div className="data whitespace-nowrap leading-none text-gold text-[1.9rem] sm:text-[2.75rem] lg:text-[2.4rem] xl:text-[3.25rem]">
        {formatStat(current, format)}
        <span>{suffix}</span>
      </div>
      <div className="mx-auto mt-3 max-w-[14ch] font-body text-caption font-light uppercase leading-snug tracking-wider text-muted sm:text-small">
        {label}
      </div>
    </div>
  );
}

/** Animated stats band — counts up from 0 on scroll into view. */
export default function StatsCounter({ stats = STATS, id = 'stats' }) {
  const wide = stats.length > 4;
  return (
    <section id={id} className="border-y border-border bg-bg py-12 md:py-20">
      <div className="hairline mb-10 md:mb-16" />
      <div className="container-feroze">
        <div
          className={`grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 ${
            wide ? 'lg:grid-cols-3' : 'lg:grid-cols-4 lg:gap-y-0'
          }`}
        >
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>
      <div className="hairline mt-10 md:mt-16" />
    </section>
  );
}
