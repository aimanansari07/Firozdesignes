import GoldLine from './GoldLine.jsx';

/** Eyebrow label above section titles, with a short gold lead-in line. */
export default function SectionLabel({ children, className = '', color }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <GoldLine orientation="horizontal" className="h-px w-10" color={color} />
      <span className="eyebrow" style={color ? { color } : undefined}>
        {children}
      </span>
    </div>
  );
}
