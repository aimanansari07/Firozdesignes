// ── Site-wide constants ────────────────────────────────────

export const SITE = {
  name: 'FEROZE',
  legalName: 'Feroze Designs & Holdings',
  tagline: 'Designs & Holdings',
  url: 'https://www.ferozedesigns.com',
  locations: 'Mumbai | Dubai',
  email: 'info@ferozedesigns.com',
  phoneDisplay: '+91 83558 21370',
};

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '918355821370';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const INSTAGRAM = {
  interiors: {
    handle: import.meta.env.VITE_INSTAGRAM_INTERIORS || 'feroze.arch',
    url: `https://www.instagram.com/${import.meta.env.VITE_INSTAGRAM_INTERIORS || 'feroze.arch'}`,
  },
  automotive: {
    handle: import.meta.env.VITE_INSTAGRAM_AUTOMOTIVE || 'ferozeautomotivedecor',
    url: `https://www.instagram.com/${
      import.meta.env.VITE_INSTAGRAM_AUTOMOTIVE || 'ferozeautomotivedecor'
    }`,
  },
};

export const BRANDS = {
  interiors: {
    key: 'interiors',
    name: 'Feroze Interiors',
    label: 'INTERIORS',
    handle: 'feroze.arch',
    descriptor: 'Interior & Architecture Design Studio · Since 1996',
    founder: 'Feroz Shaikh',
    founderRole: 'Founder & Principal Designer',
    path: '/interiors',
  },
  automotive: {
    key: 'automotive',
    name: 'Feroze Automotive Decor',
    label: 'AUTOMOTIVE DECOR',
    handle: 'ferozeautomotivedecor',
    descriptor: 'Automotive Inspired Luxury Decor — Engineered From Real Car Parts',
    tagline: 'Where Engineering Meets Craftsmanship',
    founder: 'Ayan Shaikh',
    founderRole: 'Director – Design Innovation & Business Development',
    path: '/automotive',
  },
};

// Homepage / about animated stats (from brand documents).
export const STATS = [
  { value: 29, suffix: '+', label: 'Years of Experience' },
  { value: 500000, suffix: '+', label: 'Sq Ft Delivered', format: 'inLakh' },
  { value: 335, suffix: '+', label: 'Projects Completed' },
  { value: 65, suffix: '+', label: 'Hospitality Projects' },
];

export const STATS_EXTENDED = [
  { value: 29, suffix: '+', label: 'Years of Experience' },
  { value: 500000, suffix: '+', label: 'Sq Ft Delivered', format: 'inLakh' },
  { value: 335, suffix: '+', label: 'Completed Projects' },
  { value: 65, suffix: '+', label: 'Hospitality Projects' },
  { value: 150, suffix: '+', label: 'Commercial Projects' },
  { value: 120, suffix: '+', label: 'Residential Projects' },
];

export const PROJECT_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'hospitality', label: 'Hospitality' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'residential', label: 'Residential' },
  { key: 'villa', label: 'Villa' },
  { key: 'retail', label: 'Retail' },
  { key: 'resort', label: 'Resort' },
];

export const PRODUCT_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'coffee-table', label: 'Coffee Tables' },
  { key: 'side-table', label: 'Side Tables' },
  { key: 'wall-art', label: 'Wall Art' },
  { key: 'statement-piece', label: 'Statement Pieces' },
  { key: 'shelf', label: 'Shelves' },
  { key: 'custom', label: 'Custom' },
];

export const INQUIRY_TYPES = [
  { key: 'project', label: 'New Project' },
  { key: 'product', label: 'Product Inquiry' },
  { key: 'custom-order', label: 'Custom Order' },
  { key: 'quotation', label: 'Request Quotation' },
  { key: 'general', label: 'General' },
];

export const BUDGET_RANGES = [
  'Under ₹5 Lakh',
  '₹5 – 15 Lakh',
  '₹15 – 50 Lakh',
  '₹50 Lakh – 1 Cr',
  'Above ₹1 Cr',
  'Prefer to discuss',
];

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Interiors', path: '/interiors' },
  { label: 'Automotive', path: '/automotive' },
  { label: 'Contact', path: '/contact' },
];
