import { Quote, Star } from 'lucide-react';

/** Testimonial display card used inside the slider and grids. */
export default function TestimonialCard({ testimonial }) {
  const { quote, name, designation, rating = 5 } = testimonial;
  return (
    <figure className="flex h-full flex-col justify-between border border-border bg-surface p-8 md:p-12">
      <div>
        <Quote className="text-gold" size={32} aria-hidden="true" />
        <blockquote className="mt-6 font-display text-2xl font-light leading-snug text-white md:text-3xl">
          “{quote}”
        </blockquote>
      </div>
      <figcaption className="mt-8">
        {rating > 0 && (
          <div className="mb-3 flex gap-1" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} size={14} className="fill-gold text-gold" />
            ))}
          </div>
        )}
        <div className="font-body text-small font-medium uppercase tracking-wider text-gold">{name}</div>
        {designation && <div className="font-body text-caption text-muted">{designation}</div>}
      </figcaption>
    </figure>
  );
}
