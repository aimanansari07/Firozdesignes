import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import siteSettingsService from '../services/siteSettingsService.js';
import SingleImageUploader from './SingleImageUploader.jsx';

export default function SiteSettings() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [interiorsImage, setInteriorsImage] = useState('');
  const [automotiveImage, setAutomotiveImage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await siteSettingsService.get();
        const d = res.data;
        setInteriorsImage(d.interiors?.founderImage || '');
        setAutomotiveImage(d.automotive?.founderImage || '');
        reset({
          'interiors.founderName': d.interiors?.founderName || '',
          'interiors.since': d.interiors?.since || '',
          'interiors.description': d.interiors?.description || '',
          'automotive.founderName': d.automotive?.founderName || '',
          'automotive.tagline': d.automotive?.tagline || '',
          'automotive.description': d.automotive?.description || '',
          'stats.0.value': d.stats?.[0]?.value ?? '',
          'stats.0.suffix': d.stats?.[0]?.suffix ?? '+',
          'stats.0.label': d.stats?.[0]?.label ?? '',
          'stats.0.format': d.stats?.[0]?.format ?? '',
          'stats.1.value': d.stats?.[1]?.value ?? '',
          'stats.1.suffix': d.stats?.[1]?.suffix ?? '+',
          'stats.1.label': d.stats?.[1]?.label ?? '',
          'stats.1.format': d.stats?.[1]?.format ?? '',
          'stats.2.value': d.stats?.[2]?.value ?? '',
          'stats.2.suffix': d.stats?.[2]?.suffix ?? '+',
          'stats.2.label': d.stats?.[2]?.label ?? '',
          'stats.2.format': d.stats?.[2]?.format ?? '',
          'stats.3.value': d.stats?.[3]?.value ?? '',
          'stats.3.suffix': d.stats?.[3]?.suffix ?? '+',
          'stats.3.label': d.stats?.[3]?.label ?? '',
          'stats.3.format': d.stats?.[3]?.format ?? '',
        });
      } catch {
        toast.error('Could not load settings');
      }
    })();
  }, [reset]);

  const onSubmit = async (values) => {
    const payload = {
      interiors: {
        founderName: values['interiors.founderName'],
        founderImage: interiorsImage,
        since: values['interiors.since'],
        description: values['interiors.description'],
      },
      automotive: {
        founderName: values['automotive.founderName'],
        founderImage: automotiveImage,
        tagline: values['automotive.tagline'],
        description: values['automotive.description'],
      },
      stats: [0, 1, 2, 3].map((i) => ({
        value: Number(values['stats.' + i + '.value']),
        suffix: values['stats.' + i + '.suffix'],
        label: values['stats.' + i + '.label'],
        format: values['stats.' + i + '.format'] || '',
      })),
    };
    try {
      await siteSettingsService.update(payload);
      toast.success('Settings saved');
    } catch {
      toast.error('Save failed');
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-8 font-display text-3xl font-light text-white">Site Settings</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        {/* Interiors Brand Story */}
        <fieldset className="space-y-5 border border-border p-6">
          <legend className="px-2 font-body text-caption uppercase tracking-wider text-gold">
            Feroze Interiors - Brand Story
          </legend>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Founder Name">
              <input {...register('interiors.founderName', { required: 'Required' })} className="form-input" />
              {errors['interiors.founderName'] && <Err msg={errors['interiors.founderName'].message} />}
            </Field>
            <Field label="Est. Year (e.g. 1996)">
              <input {...register('interiors.since', { required: 'Required' })} className="form-input" />
              {errors['interiors.since'] && <Err msg={errors['interiors.since'].message} />}
            </Field>
          </div>

          <Field label="Founder Photo">
            <SingleImageUploader
              value={interiorsImage}
              onChange={setInteriorsImage}
              label="Upload Founder Photo"
            />
          </Field>

          <Field label="Brand Description">
            <textarea
              {...register('interiors.description', { required: 'Required' })}
              rows={4}
              className="form-input resize-none"
            />
            {errors['interiors.description'] && <Err msg={errors['interiors.description'].message} />}
          </Field>
        </fieldset>

        {/* Automotive Brand Story */}
        <fieldset className="space-y-5 border border-border p-6">
          <legend className="px-2 font-body text-caption uppercase tracking-wider text-automotive">
            Feroze Automotive Decor - Brand Story
          </legend>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Founder Name">
              <input {...register('automotive.founderName', { required: 'Required' })} className="form-input" />
              {errors['automotive.founderName'] && <Err msg={errors['automotive.founderName'].message} />}
            </Field>
            <Field label="Tagline">
              <input {...register('automotive.tagline')} className="form-input" />
            </Field>
          </div>

          <Field label="Founder Photo">
            <SingleImageUploader
              value={automotiveImage}
              onChange={setAutomotiveImage}
              label="Upload Founder Photo"
            />
          </Field>

          <Field label="Brand Description">
            <textarea
              {...register('automotive.description', { required: 'Required' })}
              rows={4}
              className="form-input resize-none"
            />
            {errors['automotive.description'] && <Err msg={errors['automotive.description'].message} />}
          </Field>
        </fieldset>

        {/* Stats Counter */}
        <fieldset className="space-y-4 border border-border p-6">
          <legend className="px-2 font-body text-caption uppercase tracking-wider text-muted">
            Home Page Stats Counter
          </legend>
          <p className="font-body text-caption text-muted">
            Format: leave blank for plain number. Type <code className="text-gold">inLakh</code> to show Indian lakh format (e.g. 5,00,000).
          </p>

          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-3">
                  {i === 0 && <span className="mb-1.5 block font-body text-caption uppercase tracking-wider text-muted">Value</span>}
                  <input
                    type="number"
                    {...register('stats.' + i + '.value', { required: 'Required' })}
                    className="form-input"
                    placeholder="335"
                  />
                </div>
                <div className="col-span-2">
                  {i === 0 && <span className="mb-1.5 block font-body text-caption uppercase tracking-wider text-muted">Suffix</span>}
                  <input
                    {...register('stats.' + i + '.suffix')}
                    className="form-input"
                    placeholder="+"
                  />
                </div>
                <div className="col-span-4">
                  {i === 0 && <span className="mb-1.5 block font-body text-caption uppercase tracking-wider text-muted">Label</span>}
                  <input
                    {...register('stats.' + i + '.label', { required: 'Required' })}
                    className="form-input"
                    placeholder="Projects Completed"
                  />
                </div>
                <div className="col-span-3">
                  {i === 0 && <span className="mb-1.5 block font-body text-caption uppercase tracking-wider text-muted">Format</span>}
                  <input
                    {...register('stats.' + i + '.format')}
                    className="form-input"
                    placeholder="inLakh or blank"
                  />
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gold px-7 py-3 font-body text-small uppercase tracking-wider text-bg transition hover:bg-gold-light disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-caption uppercase tracking-wider text-muted">{label}</span>
      {children}
    </label>
  );
}

function Err({ msg }) {
  return <span className="mt-1 block font-body text-caption text-automotive">{msg}</span>;
}
