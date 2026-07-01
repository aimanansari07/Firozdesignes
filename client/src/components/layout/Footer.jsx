import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail, Phone } from 'lucide-react';
import { SITE, WHATSAPP_URL, INSTAGRAM } from '../../utils/constants.js';

const columns = [
  {
    title: 'Interiors',
    links: [
      { label: 'Overview', to: '/interiors' },
      { label: 'Projects', to: '/interiors/projects' },
      { label: 'About Feroz Shaikh', to: '/interiors/about' },
    ],
  },
  {
    title: 'Automotive Decor',
    links: [
      { label: 'Overview', to: '/automotive' },
      { label: 'Collection', to: '/automotive/collection' },
      { label: 'About Ayan Shaikh', to: '/automotive/about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-feroze py-10 md:py-16">
        <div className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="font-display text-3xl tracking-[0.3em] text-white">FEROZE</span>
            <p className="mt-1 font-body text-caption uppercase tracking-[0.35em] text-muted">
              Designs &amp; Holdings
            </p>
            <p className="mt-5 max-w-xs font-body text-small leading-relaxed text-muted">
              Luxury interior design and automotive-inspired furniture. Crafting experiences across India
              and the Middle East since 1996.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href={INSTAGRAM.interiors.url} target="_blank" rel="noopener noreferrer" aria-label="Feroze Interiors on Instagram" className="text-muted transition hover:text-gold">
                <Instagram size={20} />
              </a>
              <a href={INSTAGRAM.automotive.url} target="_blank" rel="noopener noreferrer" aria-label="Feroze Automotive Decor on Instagram" className="text-muted transition hover:text-gold">
                <Instagram size={20} />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-muted transition hover:text-gold">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-caption uppercase tracking-widest text-gold">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="font-body text-small text-muted transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="mt-10 md:mt-14 flex flex-col gap-4 border-t border-border pt-6 md:pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
            <a href={`mailto:${SITE.emailHref}`} className="inline-flex items-center gap-2 font-body text-small text-muted transition hover:text-gold">
              <Mail size={15} /> {SITE.email}
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body text-small text-muted transition hover:text-gold">
              <Phone size={15} /> {SITE.phoneDisplay}
            </a>
          </div>
          <span className="data text-caption uppercase tracking-widest text-gold">{SITE.locations}</span>
        </div>

        <p className="mt-8 text-center font-body text-caption text-muted/70">
          © {year} Feroze Designs &amp; Holdings. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
