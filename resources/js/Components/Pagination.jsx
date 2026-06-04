import { Link } from '@inertiajs/react';

export default function Pagination({ links = [] }) {
  if (!links.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {links.map((link, index) => (
        <Link
          key={`${link.label}-${index}`}
          href={link.url || '#'}
          className={`rounded-md border px-3 py-2 text-sm ${link.active ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-200 bg-white text-slate-700'} ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  );
}
