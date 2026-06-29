import useCounter from '../../hooks/useCounter.js';
import { formatStat } from '../../utils/formatters.js';
import { STATS } from '../../utils/constants.js';

function Stat({ value, suffix, label, format }) {
  const { ref, value: current } = useCounter(value);
  return (
    <div ref={ref} className="text-center">
      <div className="data text-gold" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
        {formatStat(current, format)}
        <span>{suffix}</span>
      </div>
      <div className="mt-3 font-body text-small font-light uppercase tracking-wider text-muted">
        {label}
      </div>
    </div>
  );
}

/** Animated stats band — counts up from 0 on scroll into view. */
export default function StatsCounter({ stats = STATS, id = 'stats' }) {
  return (
    <section id={id} className="border-y border-border bg-bg py-12 md:py-20">
      <div className="hairline mb-10 md:mb-16" />
      <div className="container-feroze">
        <div
          className={`grid grid-cols-2 gap-y-12 md:gap-y-12 ${
            stats.length > 4 ? 'md:grid-cols-3' : 'md:grid-cols-4 md:gap-y-0'
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
