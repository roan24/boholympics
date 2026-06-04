import { Link, usePage } from '@inertiajs/react';
import { Radio } from 'lucide-react';

const nav = [
  ['/', 'Home'],
  ['/medal-tally', 'Medal Tally'],
  ['/sports', 'Sports'],
  ['/schedule', 'Schedule'],
  ['/results', 'Results'],
];

export default function PublicLayout({ children }) {
  const { url } = usePage();
  const isHome = url === '/';

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7fc]">
      <header className="sticky top-0 z-30 bg-[#0d1a3a]">
        <div className="mx-auto flex min-h-14 max-w-7xl flex-col gap-3 px-4 py-3 md:h-14 md:flex-row md:items-center md:justify-between md:py-0">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <img
              src="/assets/boholympics-2026-logo.png"
              alt="Boholympics 2026"
              className="boholympics-logo h-10 w-auto max-w-[190px] object-contain"
            />
            <img
              src="/assets/province-of-bohol-seal.png"
              alt="Province of Bohol Official Seal"
              className="hidden h-10 w-10 border-l border-white/15 pl-3 object-contain sm:block"
            />
            <img
              src="/assets/pydo-logo.png"
              alt="PYDO Logo"
              className="hidden h-10 w-10 object-contain sm:block"
            />
          </Link>
          <nav className="flex h-11 gap-0 overflow-x-auto md:h-14" aria-label="Primary navigation">
            {nav.map(([href, label]) => (
              <Link key={href} href={href} className={`flex items-center whitespace-nowrap border-b-[3px] px-3 text-xs font-black uppercase tracking-wide transition ${url === href ? 'border-accent-500 text-white' : 'border-transparent text-white/65 hover:border-accent-500 hover:text-white'}`}>{label}</Link>
            ))}
          </nav>
          <Link href="/schedule" className="inline-flex h-9 items-center justify-center gap-2 bg-accent-500 px-4 text-xs font-black uppercase tracking-wide text-white transition hover:bg-accent-600">
            <Radio size={14} /> Live
          </Link>
        </div>
      </header>
      <main className={`flex-1 ${isHome ? '' : 'mx-auto w-full max-w-7xl px-4 py-6 sm:py-8'}`}>{children}</main>
      <footer className="bg-[#0d1a3a] px-4 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <img
              src="/assets/province-of-bohol-seal.png"
              alt="Province of Bohol Official Seal"
              className="h-12 w-12 object-contain"
            />
            <img
              src="/assets/pydo-logo.png"
              alt="PYDO Logo"
              className="h-12 w-12 object-contain"
            />
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
            Boholympics 2026 · Official Results Board
          </div>
        </div>
      </footer>
    </div>
  );
}
