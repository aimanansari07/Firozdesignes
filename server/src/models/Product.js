import mongoose from 'mongoose';

const slugify = (str) =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    brand: { type: String, default: 'automotive', enum: ['automotive'] },
    category: {
      type: String,
      required: true,
      enum: ['coffee-table', 'side-table', 'wall-art', 'shelf', 'statement-piece', 'custom'],
      index: true,
    },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    engineType: { type: String, default: '' }, // V8, V12, Inline-6...
    dimensions: {
      length: { type: String, default: '' },
      width: { type: String, default: '' },
      height: { type: String, default: '' },
      weight: { type: String, default: '' },
    },
    materials: { type: [String], default: [] },
    finishes: { type: [String], default: [] },
    price: {
      show: { type: Boolean, default: false },
      amount: { type: Number, default: 0 },
      currency: { type: String, default: 'INR', enum: ['INR', 'AED'] },
    },
    customizable: { type: Boolean, default: true },
    inStock: { type: Boolean, default: true },
    images: { type: [String], default: [] },
    featured: { type: Boolean, default: false, index: true },
    published: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

productSchema.pre('validate', async function generateSlug(next) {
  if (this.slug && !this.isModified('name')) return next();
  const base = slugify(this.name || 'product');
  let slug = base;
  let n = 1;
  // eslint-disable-next-line no-await-in-loop
  while (await mongoose.models.Product.exists({ slug, _id: { $ne: this._id } })) {
    slug = `${base}-${n++}`;
  }
  this.slug = slug;
  next();
});

export default mongoose.model('Product', productSchema);
