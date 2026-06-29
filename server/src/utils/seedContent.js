/**
 * Demo content seed — real Feroze brand data so the site looks finished before
 * Cloudinary photos are uploaded. Images are left empty; the frontend renders a
 * tasteful generated placeholder until real Cloudinary URLs are added via admin.
 *
 *   npm run seed:content
 *
 * Re-running clears and reseeds Projects, Products and Testimonials (NOT admins
 * or inquiries).
 */
import mongoose from 'mongoose';
import { validateEnv } from '../config/env.js';
import { connectDB } from '../config/db.js';
import Project from '../models/Project.js';
import Product from '../models/Product.js';
import Testimonial from '../models/Testimonial.js';

const projects = [
  {
    title: "Jugheads — The Unrestaurant",
    category: 'hospitality',
    shortDescription: 'A bold, comic-book-inspired themed restaurant blending retro Americana with playful spatial drama.',
    description:
      "Jugheads — The Unrestaurant is one of Feroze Interiors' signature hospitality projects: an experience-driven themed restaurant where every surface tells a story. Checkerboard floors, neon-lit facades and richly layered booth seating create a memorable, photogenic environment engineered for high footfall and Instagram-era dining culture.",
    location: 'Mumbai, India',
    year: 2023,
    area: '4,500 sq ft',
    client: 'Jugheads Hospitality',
    featured: true,
    published: true,
    order: 1,
  },
  {
    title: 'Northern Tadka',
    category: 'hospitality',
    shortDescription: 'A rustic North-Indian dining concept rooted in warmth, texture and earthy materiality.',
    description:
      'Northern Tadka translates the soul of North-Indian cuisine into a tactile, warm-toned interior. Hand-finished surfaces, brass accents and curated lighting build an immersive hospitality environment delivered turnkey by the Feroze in-house team.',
    location: 'Delhi, India',
    year: 2022,
    area: '3,800 sq ft',
    client: 'Northern Tadka Restaurants',
    featured: true,
    published: true,
    order: 2,
  },
  {
    title: 'Slice of Lime',
    category: 'hospitality',
    shortDescription: 'A fresh, contemporary café with a citrus-bright palette and sculptural seating.',
    description:
      'Slice of Lime is a contemporary café concept balancing crisp minimalism with inviting comfort. The design pairs a bright, modern palette with bespoke furniture manufactured in-house — a hallmark of the Feroze turnkey approach.',
    location: 'Kolkata, India',
    year: 2023,
    area: '2,600 sq ft',
    client: 'Slice of Lime Cafés',
    featured: true,
    published: true,
    order: 3,
  },
  {
    title: 'Azure Sky Lounge',
    category: 'hospitality',
    shortDescription: 'A rooftop hospitality lounge with panoramic glazing and layered ambient lighting.',
    description:
      'A premium rooftop lounge designed for evening hospitality, combining panoramic glazing, sculpted ceilings and a refined champagne-and-charcoal palette to deliver an upscale, memorable guest experience.',
    location: 'Mumbai, India',
    year: 2024,
    area: '5,200 sq ft',
    featured: false,
    published: true,
    order: 4,
  },
  {
    title: 'The Heritage Villa',
    category: 'villa',
    shortDescription: 'A luxury private villa marrying timeless craftsmanship with contemporary detailing.',
    description:
      'A ground-up luxury villa interior across multiple levels, blending timeless materiality — marble, walnut and brass — with contemporary spatial planning. Bespoke furniture and joinery were manufactured in the Feroze Mumbai workshop.',
    location: 'Rajasthan, India',
    year: 2022,
    area: '12,000 sq ft',
    featured: true,
    published: true,
    order: 5,
  },
  {
    title: 'Meridian Corporate HQ',
    category: 'commercial',
    shortDescription: 'A corporate headquarters balancing brand expression with workplace performance.',
    description:
      'A full-floor corporate headquarters delivering a refined, brand-aligned workplace. The scheme integrates collaborative zones, executive suites and a signature reception experience, executed turnkey across design, manufacturing and fit-out.',
    location: 'Mumbai, India',
    year: 2023,
    area: '18,000 sq ft',
    featured: false,
    published: true,
    order: 6,
  },
  {
    title: 'The Linden Residence',
    category: 'residential',
    shortDescription: 'A luxury apartment interior with warm minimalism and curated custom furniture.',
    description:
      'A premium residential interior expressing warm minimalism — soft neutrals, fluted timber, integrated lighting and bespoke furniture crafted in-house — creating a serene, elevated home environment.',
    location: 'Mumbai, India',
    year: 2024,
    area: '3,200 sq ft',
    featured: false,
    published: true,
    order: 7,
  },
  {
    title: 'Lumen Flagship Store',
    category: 'retail',
    shortDescription: 'A flagship retail experience designed around light, sightlines and brand storytelling.',
    description:
      'A flagship retail interior engineered around customer journey and brand storytelling, using considered lighting, sculptural display joinery and a premium material palette to elevate the in-store experience.',
    location: 'Mumbai, India',
    year: 2023,
    area: '2,900 sq ft',
    featured: false,
    published: true,
    order: 8,
  },
  {
    title: 'Serenity Resort & Spa',
    category: 'resort',
    shortDescription: 'A destination resort interior rooted in calm, nature and tactile luxury.',
    description:
      'A destination resort and spa interior built around tranquillity and tactile luxury. Natural materials, soft layered lighting and bespoke furniture create restorative guest spaces across rooms, lobby and wellness zones.',
    location: 'Rajasthan, India',
    year: 2024,
    area: '24,000 sq ft',
    featured: false,
    published: true,
    order: 9,
  },
];

const products = [
  {
    name: 'V8 Engine Block Coffee Table',
    category: 'coffee-table',
    engineType: 'V8',
    shortDescription: 'A genuine V8 engine block reborn as a sculptural glass-topped coffee table.',
    description:
      'India’s 1st automotive-inspired furniture. A real V8 engine block, meticulously cleaned, restored and finished, mounted on a handcrafted base and topped with tempered glass. Where engineering meets craftsmanship — a true conversation piece for collectors and luxury interiors.',
    dimensions: { length: '120 cm', width: '70 cm', height: '45 cm', weight: '85 kg' },
    materials: ['Aluminium Engine Block', 'Tempered Glass', 'Walnut Wood Base'],
    finishes: ['Chrome', 'Matte Black', 'Gloss Black', 'Gold'],
    price: { show: false, amount: 0, currency: 'INR' },
    customizable: true,
    inStock: true,
    featured: true,
    published: true,
    order: 1,
  },
  {
    name: 'V12 Engine Block Coffee Table',
    category: 'coffee-table',
    engineType: 'V12',
    shortDescription: 'The flagship — a monumental V12 block transformed into a statement centerpiece.',
    description:
      'The flagship of the collection. A monumental V12 engine block, engineered from real car parts and finished to showroom standard, crowned with a wide tempered-glass top. A rare, collector-grade statement piece.',
    dimensions: { length: '150 cm', width: '80 cm', height: '46 cm', weight: '130 kg' },
    materials: ['Aluminium Engine Block', 'Tempered Glass', 'Solid Oak Base'],
    finishes: ['Chrome', 'Matte Black', 'Gloss Black', 'Gold'],
    price: { show: false, amount: 0, currency: 'INR' },
    customizable: true,
    inStock: true,
    featured: true,
    published: true,
    order: 2,
  },
  {
    name: 'V6 Engine Block Coffee Table',
    category: 'coffee-table',
    engineType: 'V6',
    shortDescription: 'A compact V6 block coffee table — engineering art for modern spaces.',
    description:
      'A compact yet striking V6 engine-block coffee table, ideal for apartments, lounges and offices. Real automotive engineering reimagined as functional art, finished by hand in our Mumbai workshop.',
    dimensions: { length: '100 cm', width: '60 cm', height: '44 cm', weight: '62 kg' },
    materials: ['Aluminium Engine Block', 'Tempered Glass', 'Walnut Wood Base'],
    finishes: ['Chrome', 'Matte Black', 'Gloss Black'],
    price: { show: false, amount: 0, currency: 'INR' },
    customizable: true,
    inStock: true,
    featured: true,
    published: true,
    order: 3,
  },
  {
    name: 'Piston Clock Tower',
    category: 'statement-piece',
    engineType: 'Inline-6',
    shortDescription: 'The Piston Tower series — a vertical sculpture built from real pistons and conrods.',
    description:
      'From the signature Piston Clock Tower series. Real pistons and connecting rods are stacked into a vertical sculpture and integrated with a precision clock face — a bold statement piece celebrating automotive culture.',
    dimensions: { length: '30 cm', width: '30 cm', height: '90 cm', weight: '18 kg' },
    materials: ['Steel Pistons', 'Connecting Rods', 'Brushed Steel Base'],
    finishes: ['Chrome', 'Matte Black', 'Gloss Black', 'Gold'],
    price: { show: false, amount: 0, currency: 'INR' },
    customizable: true,
    inStock: true,
    featured: true,
    published: true,
    order: 4,
  },
  {
    name: 'Crankshaft Wall Art',
    category: 'wall-art',
    engineType: 'V8',
    shortDescription: 'A polished crankshaft mounted as dramatic automotive wall art.',
    description:
      'A genuine crankshaft, polished and mounted on a backlit panel, transforms raw engineering into striking wall art. A perfect accent for garages, lounges, offices and luxury interiors.',
    dimensions: { length: '110 cm', width: '12 cm', height: '40 cm', weight: '22 kg' },
    materials: ['Steel Crankshaft', 'Backlit Panel', 'Powder-coated Frame'],
    finishes: ['Chrome', 'Matte Black', 'Gold'],
    price: { show: false, amount: 0, currency: 'INR' },
    customizable: true,
    inStock: true,
    featured: false,
    published: true,
    order: 5,
  },
  {
    name: 'Turbo Side Table',
    category: 'side-table',
    engineType: 'Turbo',
    shortDescription: 'A turbocharger reborn as a compact, sculptural side table.',
    description:
      'A real turbocharger assembly, restored and finished, forms the sculptural base of this compact side table. Engineering aesthetics scaled for living rooms, studies and lounges.',
    dimensions: { length: '45 cm', width: '45 cm', height: '55 cm', weight: '20 kg' },
    materials: ['Turbocharger Assembly', 'Tempered Glass', 'Steel Base'],
    finishes: ['Chrome', 'Matte Black', 'Gloss Black'],
    price: { show: false, amount: 0, currency: 'INR' },
    customizable: true,
    inStock: true,
    featured: false,
    published: true,
    order: 6,
  },
  {
    name: 'Bespoke Custom Commission',
    category: 'custom',
    engineType: 'Custom',
    shortDescription: 'Commission a one-of-a-kind piece built around your chosen engine or car part.',
    description:
      'Have a specific engine, car part or vision in mind? Our team designs and manufactures fully bespoke automotive-inspired furniture in-house at our Mumbai workshop — engineered around your story, finished to collector standard.',
    dimensions: { length: 'Custom', width: 'Custom', height: 'Custom', weight: 'Custom' },
    materials: ['Client-specified automotive components', 'Premium bases', 'Tempered Glass'],
    finishes: ['Chrome', 'Matte Black', 'Gloss Black', 'Gold'],
    price: { show: false, amount: 0, currency: 'INR' },
    customizable: true,
    inStock: true,
    featured: false,
    published: true,
    order: 7,
  },
];

const testimonials = [
  {
    name: 'Rohan Mehta',
    designation: 'Director, Jugheads Hospitality',
    brand: 'interiors',
    quote:
      'Feroze Interiors turned our themed-restaurant concept into a space guests genuinely remember. The detailing, the craftsmanship and the on-time turnkey delivery were exceptional.',
    rating: 5,
    published: true,
    order: 1,
  },
  {
    name: 'Aisha Khan',
    designation: 'Private Client, Heritage Villa',
    brand: 'interiors',
    quote:
      'From the first hand-drawn sketches to the final handover, the team understood our vision completely. Our villa feels timeless and deeply personal.',
    rating: 5,
    published: true,
    order: 2,
  },
  {
    name: 'Karan Malhotra',
    designation: 'Car Collector & Enthusiast',
    brand: 'automotive',
    quote:
      'My V12 engine-block table is the centerpiece of my lounge. It is genuinely a work of art — engineering and craftsmanship in one. Nothing else like it.',
    rating: 5,
    published: true,
    order: 3,
  },
  {
    name: 'Priya Sharma',
    designation: 'Managing Partner, Meridian Group',
    brand: 'both',
    quote:
      'Whether it is a corporate fit-out or a bespoke statement piece, the Feroze team delivers a level of finish that sets them apart in the industry.',
    rating: 5,
    published: true,
    order: 4,
  },
];

const run = async () => {
  validateEnv();
  await connectDB();

  await Promise.all([Project.deleteMany({}), Product.deleteMany({}), Testimonial.deleteMany({})]);

  // create() one-by-one so the slug pre-validate hook runs per document.
  for (const p of projects) await Project.create(p); // eslint-disable-line no-await-in-loop
  for (const p of products) await Product.create(p); // eslint-disable-line no-await-in-loop
  await Testimonial.insertMany(testimonials);

  // eslint-disable-next-line no-console
  console.log(
    `\x1b[32m[seed] Content seeded: ${projects.length} projects, ${products.length} products, ${testimonials.length} testimonials.\x1b[0m`
  );
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('\x1b[31m[seed] Failed:\x1b[0m', err.message);
  process.exit(1);
});
