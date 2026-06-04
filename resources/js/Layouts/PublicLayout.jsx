import { Link, usePage } from '@inertiajs/react';
import { BarChart3, CalendarDays, Medal, Trophy } from 'lucide-react';

const nav = [
  ['/', 'Home'],
  ['/medal-tally', 'Medal Tally'],
  ['/sports', 'Sports'],
  ['/schedule', 'Schedule'],
  ['/results', 'Results'],
];

export default function PublicLayout({ children }) {
  const { url } = usePage();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-700 text-white shadow-soft"><Trophy size={23} /></div>
            <div>
              <div className="text-lg font-black text-primary-900">Boholympics 2026</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sports Tally</div>
            </div>
          </Link>
          <nav className="flex gap-1 overflow-x-auto">
            {nav.map(([href, label]) => (
              <Link key={href} href={href} className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-bold ${url === href ? 'bg-primary-700 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{label}</Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8">{children}</main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-5 text-sm text-slate-500">
          <Medal size={16} /><span>Official Boholympics 2026 public results board</span>
        </div>
      </footer>
    </div>
  );
}
