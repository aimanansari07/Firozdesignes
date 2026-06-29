import { useState, useRef } from 'react';
import { UploadCloud, X, GripVertical, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import authService from '../services/authService.js';
import LazyImage from '../components/ui/LazyImage.jsx';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX = 10 * 1024 * 1024;

/**
 * Drag-and-drop multi-image uploader → Cloudinary.
 * The first image is treated as the cover. Supports reordering and removal.
 * @param {string[]} value list of image URLs
 * @param {Function} onChange (urls) => void
 */
export default function ImageUploader({ value = [], onChange, automotive = false }) {
  const [uploading, setUploading] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const inputRef = useRef(null);

  const validate = (files) => {
    const valid = [];
    for (const f of files) {
      if (!ALLOWED.includes(f.type)) {
        toast.error(`${f.name}: only JPEG, PNG, WebP allowed`);
        continue;
      }
      if (f.size > MAX) {
        toast.error(`${f.name}: exceeds 10MB`);
        continue;
      }
      valid.push(f);
    }
    return valid;
  };

  const handleFiles = async (fileList) => {
    const files = validate(Array.from(fileList || []));
    if (!files.length) return;
    setUploading(true);
    try {
      const res = await authService.uploadImages(files);
      const urls = (res.data || []).map((d) => d.url);
      onChange([...value, ...urls]);
      toast.success(`${urls.length} image(s) uploaded`);
    } catch (err) {
      toast.error(err.friendlyMessage || 'Upload failed (is Cloudinary configured?)');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));

  const reorder = (from, to) => {
    if (from === to || from == null) return;
    const next = [...value];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-border bg-bg py-10 text-center transition hover:border-gold"
      >
        <UploadCloud size={28} className="text-gold" />
        <p className="mt-3 font-body text-small text-white">
          {uploading ? 'Uploading…' : 'Drag & drop images, or click to browse'}
        </p>
        <p className="mt-1 font-body text-caption text-muted">JPEG, PNG, WebP · max 10MB each · first image is the cover</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {value.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {value.map((url, i) => (
            <li
              key={url + i}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                reorder(dragIndex, i);
                setDragIndex(null);
              }}
              className="group relative aspect-square overflow-hidden border border-border bg-surface"
            >
              <LazyImage src={url} alt={`Upload ${i + 1}`} automotive={automotive} className="h-full w-full" />
              {i === 0 && (
                <span className="absolute left-1 top-1 flex items-center gap-1 bg-gold px-1.5 py-0.5 font-mono text-[10px] uppercase text-bg">
                  <Star size={10} /> Cover
                </span>
              )}
              <span className="absolute right-1 top-1 cursor-grab text-white/70"><GripVertical size={16} /></span>
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-automotive/90 py-1 font-body text-caption text-white opacity-0 transition group-hover:opacity-100"
              >
                <X size={13} /> Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
