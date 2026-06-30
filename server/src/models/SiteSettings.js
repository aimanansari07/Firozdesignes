import mongoose from 'mongoose';

const statSchema = new mongoose.Schema(
  {
    value: { type: Number, required: true },
    suffix: { type: String, default: '+' },
    label: { type: String, required: true },
    format: { type: String, default: '' },
  },
  { _id: false }
);

const siteSettingsSchema = new mongoose.Schema(
  {
    interiors: {
      founderName: { type: String, default: 'Feroz Shaikh' },
      founderImage: { type: String, default: '' },
      since: { type: String, default: '1996' },
      description: {
        type: String,
        default:
          'Founded by Feroz Shaikh, Feroze Interiors is a Mumbai-based interior & architecture studio with nearly three decades of craft — delivering over 5,00,000 sq ft across hospitality, commercial and residential spaces in India and the Middle East.',
      },
    },
    automotive: {
      founderName: { type: String, default: 'Ayan Shaikh' },
      founderImage: { type: String, default: '' },
      tagline: { type: String, default: 'Where Engineering Meets Craftsmanship' },
      description: {
        type: String,
        default:
          'Founded by Ayan Shaikh, Feroze Automotive Decor transforms real car parts — V6 to V12 engine blocks, pistons and more — into bespoke statement furniture. India\'s 1st automotive-inspired furniture brand.',
      },
    },
    stats: {
      type: [statSchema],
      default: [
        { value: 29, suffix: '+', label: 'Years of Experience', format: '' },
        { value: 500000, suffix: '+', label: 'Sq Ft Delivered', format: 'inLakh' },
        { value: 335, suffix: '+', label: 'Projects Completed', format: '' },
        { value: 65, suffix: '+', label: 'Hospitality Projects', format: '' },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model('SiteSettings', siteSettingsSchema);
