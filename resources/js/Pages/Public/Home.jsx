import { Link } from '@inertiajs/react';
import { CalendarDays, Medal, Trophy, Users } from 'lucide-react';
import Badge from '../../Components/Badge';
import Card from '../../Components/Card';
import MedalTallyTable from '../../Components/MedalTallyTable';
import PublicLayout from '../../Layouts/PublicLayout';

export default function Home({ leaders, stats, liveEvents, recentResults, upcomingSchedules }) {
  return (
    <PublicLayout>
      <section className="mb-6 rounded-lg bg-primary-900 px-5 py-7 text-white shadow-soft sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_.8fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary-100">Boholympics 2026</p>
            <h1 className="mt-2 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">Live medal race, schedules, and verified sports results.</h1>
            <p className="mt-4 max-w-2xl text-primary-50">Track Bohol municipalities as results come in across every sport, category, and division.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Municipalities', stats.municipalities, Users],
              ['Sports', stats.sports, Trophy],
              ['Events', stats.events, CalendarDays],
              ['Completed', stats.completedEvents, Medal],
            ].map(([label, value, Icon]) => (
              <div key={label} className="rounded-lg bg-white/10 p-4">
                <Icon size={18} className="text-primary-100" />
                <div className="mt-2 text-2xl font-black">{value}</div>
                <div className="text-xs font-bold uppercase tracking-wide text-primary-100">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-950">Leaderboard</h2>
        <Link href="/medal-tally" className="text-sm font-bold text-primary-700 hover:text-primary-900">Full tally</Link>
      </div>
      <MedalTallyTable tally={leaders} />

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <Panel title="Live Events" items={liveEvents} empty="No live events right now." render={(event) => (
          <>
            <Badge tone="red">Live</Badge>
            <div className="mt-2 font-bold">{event.name}</div>
            <div className="text-sm text-slate-500">{event.sport?.name} - {event.gender}</div>
          </>
        )} />
        <Panel title="Recent Results" items={recentResults} empty="No results posted yet." render={(result) => (
          <>
            <Badge tone={result.medal_type}>{result.medal_type}</Badge>
            <div className="mt-2 font-bold">{result.municipality?.name}</div>
            <div className="text-sm text-slate-500">{result.event?.sport?.name} - {result.event?.name}</div>
          </>
        )} />
        <Panel title="Upcoming Schedule" items={upcomingSchedules} empty="No upcoming matches." render={(schedule) => (
          <>
            <Badge tone="blue">{schedule.status}</Badge>
            <div className="mt-2 font-bold">{schedule.event?.name}</div>
            <div className="text-sm text-slate-500">{schedule.venue} - {new Date(schedule.scheduled_at).toLocaleString()}</div>
          </>
        )} />
      </div>
    </PublicLayout>
  );
}

function Panel({ title, items, empty, render }) {
  return (
    <Card className="p-4">
      <h3 className="mb-3 font-black text-slate-950">{title}</h3>
      <div className="space-y-3">
        {items.length ? items.map((item) => <div key={item.id} className="rounded-md border border-slate-100 p-3">{render(item)}</div>) : <p className="text-sm text-slate-500">{empty}</p>}
      </div>
    </Card>
  );
}
