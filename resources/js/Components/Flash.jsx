import { usePage } from '@inertiajs/react';

export default function Flash() {
  const { flash = {} } = usePage().props;
  if (!flash.success && !flash.error) return null;

  return (
    <div className={`mb-4 rounded-lg px-4 py-3 text-sm font-medium ${flash.error ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
      {flash.error || flash.success}
    </div>
  );
}
