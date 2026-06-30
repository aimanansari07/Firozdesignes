import mongoose from 'mongoose';

const slugify = (str) =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    brand: { type: String, default: 'interiors', enum: ['interiors'] },
    category: {
      type: String,
      required: true,
      enum: ['hospitality', 'commercial', 'residential', 'retail', 'villa', 'resort'],
      index: true,
    },
    description: { type: String, default: '' },
    shortDescription: { type: String, maxlength: 150, default: '' },
    location: { type: String, default: '' },
    year: { type: Number },
    area: { type: String, default: '' },
    client: { type: String, default: '' },
    images: { type: [String], default: [] },
    featured: { type: Boolean, default: false, index: true },
    published: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// Auto-generate a unique slug from the title.
projectSchema.pre('validate', async function generateSlug(next) {
  if (this.slug && !this.isModified('title')) return next();
  const base = slugify(this.title || 'project');
  let slug = base;
  let n = 1;
  // Ensure uniqueness (ignoring this document itself on updates).
  // eslint-disable-next-line no-await-in-loop
  while (await mongoose.models.Project.exists({ slug, _id: { $ne: this._id } })) {
    slug = `${base}-${n++}`;
  }
  this.slug = slug;
  next();
});

export default mongoose.model('Project', projectSchema);
