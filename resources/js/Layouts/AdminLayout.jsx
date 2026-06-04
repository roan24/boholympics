import { Link, router, usePage } from '@inertiajs/react';
import { BarChart3, CalendarDays, Dumbbell, Home, LogOut, Medal, Trophy, Users } from 'lucide-react';
import Flash from '../Components/Flash';

const nav = [
  ['/admin/dashboard', 'Dashboard', Home],
  ['/admin/municipalities', 'Municipalities', Users],
  ['/admin/sports', 'Sports', Dumbbell],
  ['/admin/events', 'Events', Trophy],
  ['/admin/schedules', 'Schedules', CalendarDays],
  ['/admin/results', 'Results', Medal],
  ['/admin/medal-tally', 'Medal Tally', BarChart3],
  ['/admin/users', 'Users', Users],
];

export default function AdminLayout({ children }) {
  const { url, props } = usePage();

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <aside className="border-r border-slate-200 bg-primary-900 text-white lg:fixed lg:inset-y-0 lg:w-72">
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-primary-800"><Trophy size={23} /></div>
          <div>
            <div className="font-black">Boholympics</div>
            <div className="text-xs font-semibold text-primary-100">Admin Console</div>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 lg:block lg:space-y-1">
          {nav.map(([href, label, Icon]) => (
            <Link key={href} href={href} className={`flex min-w-fit items-center gap-3 rounded-md px-3 py-2 text-sm font-bold ${url.startsWith(href) ? 'bg-white text-primary-900' : 'text-primary-50 hover:bg-primary-700'}`}>
              <Icon size={17} /> {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 lg:ml-72">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4">
          <div className="text-sm font-semibold text-slate-500">Signed in as <span className="text-slate-900">{props.auth?.user?.name}</span></div>
          <button onClick={() => router.post('/logout')} className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"><LogOut size={16} /> Logout</button>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          <Flash />
          {children}
        </main>
      </div>
    </div>
  );
}
