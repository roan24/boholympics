import { Link } from '@inertiajs/react';
import { ArrowRight, Building2, CalendarDays, Clock3, Medal, Radio, Trophy } from 'lucide-react';
import Badge from '../../Components/Badge';
import PublicLayout from '../../Layouts/PublicLayout';

export default function Home({ leaders, stats, liveEvents, recentResults, upcomingSchedules }) {
  const statCards = [
    ['Municipalities', stats.municipalities, Building2],
    ['Sports', stats.sports, Trophy],
    ['Events', stats.events, CalendarDays],
    ['Completed', stats.completedEvents, Medal],
  ];
  const tickerItems = [
    leaders[0] ? `${leaders[0].name} leads the medal tally` : 'Medal tally updates are being prepared',
    liveEvents[0] ? `${liveEvents[0].sport?.name} ${liveEvents[0].name} is live` : 'No live events right now',
    recentResults[0] ? `${recentResults[0].municipality?.name} posted a ${recentResults[0].medal_type} result` : 'Recent results will appear here',
    upcomingSchedules[0] ? `${upcomingSchedules[0].event?.name} is scheduled next` : 'Upcoming schedules are being finalized',
  ];

  return (
    <PublicLayout>
      <h1 className="sr-only">Boholympics 2026 live results, medal tally, and event schedule dashboard</h1>

      <Ticker items={tickerItems} />

      <section className="relative overflow-hidden bg-[#0d1a3a] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="absolute inset-0 bg-competition-grid opacity-[0.045]" aria-hidden="true" />
        <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-2 md:items-center">
          <div className="relative">
            <div className="mb-5 flex justify-start">
              <img src="/assets/boholympics-2026-logo.png" alt="Boholympics 2026" className="boholympics-logo h-auto w-full max-w-[430px] object-contain" />
            </div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-accent-500">Official Results Board</span>
            </div>
            <h2 className="max-w-xl text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Every medal.<br />Every <span className="text-accent-500">municipality.</span><br />Every moment.
            </h2>
            <p className="mt-4 max-w-[420px] text-sm font-medium leading-7 text-white/60">
              Follow the Boholympics 2026 medal race with live events, schedules, and verified results in one fast public dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/medal-tally" className="inline-flex h-12 items-center gap-2 bg-accent-500 px-5 text-[13px] font-black uppercase tracking-wide text-white transition hover:bg-accent-600">
                View Medal Tally <ArrowRight size={16} />
              </Link>
              <Link href="/schedule" className="inline-flex h-12 items-center gap-2 border border-white/25 px-5 text-[13px] font-bold uppercase tracking-wide text-white/85 transition hover:border-accent-500 hover:text-accent-500">
                See Schedule <CalendarDays size={16} />
              </Link>
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-[2px] border border-white/10 bg-white/10">
            {statCards.map(([label, value, Icon]) => (
              <div key={label} className="group border-b-[3px] border-transparent bg-white/[0.055] p-4 transition hover:border-accent-500 sm:p-5">
                <Icon size={19} className="mb-3 text-accent-500" />
                <div className="text-3xl font-black leading-none text-white">{value}</div>
                <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/45">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[5px] bg-[linear-gradient(90deg,#3657b3_0_50%,#e37e2d_50%_100%)]" aria-hidden="true" />
      </section>

      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <SectionHeader eyebrow="Medal Race" title="Leaderboard" href="/medal-tally" label="Full tally" />
            <TallyTable tally={leaders} />
          </div>

          <aside>
            <SectionHeader eyebrow="Live Desk" title="Event Pulse" />
            <div className="border border-[#dde3f0] border-t-4 border-t-primary-500 bg-white">
              <div className="flex items-center gap-3 border-b border-[#dde3f0] px-5 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent-500 text-white">
                  <Clock3 size={20} />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b7a9a]">Real-time</div>
                  <div className="text-[15px] font-black text-[#0d1a3a]">Activity Feed</div>
                </div>
              </div>
              <div className="space-y-2 p-4">
                <Pulse label="Live Events" detail="Live Now" value={liveEvents.length} href="/schedule" live />
                <Pulse label="Recent Results" detail="Updated" value={recentResults.length} href="/results" />
                <Pulse label="Upcoming Matches" detail="Scheduled" value={upcomingSchedules.length} href="/schedule" />
              </div>
            </div>
          </aside>
        </section>

        <SectionHeader eyebrow="What's Happening" title="Today's Action" />
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Panel title="Live Events" count={liveEvents.length} items={liveEvents} empty="No live events right now." render={(event) => (
            <>
              <Badge tone="red">Live</Badge>
              <div className="mt-2 text-[13px] font-bold leading-snug text-[#0d1a3a]">{event.name}</div>
              <div className="mt-1 text-[11px] text-[#6b7a9a]">{event.sport?.name} · {event.gender}</div>
            </>
          )} />
          <Panel title="Recent Results" count={recentResults.length} items={recentResults} empty="No results posted yet." render={(result) => (
            <>
              <Badge tone={result.medal_type}>{result.medal_type}</Badge>
              <div className="mt-2 text-[13px] font-bold leading-snug text-[#0d1a3a]">{result.municipality?.name}</div>
              <div className="mt-1 text-[11px] text-[#6b7a9a]">{result.event?.sport?.name} · {result.event?.name}</div>
            </>
          )} />
          <Panel title="Upcoming Schedule" count={upcomingSchedules.length} items={upcomingSchedules} empty="No upcoming matches." render={(schedule) => (
            <>
              <Badge tone="blue">{schedule.status}</Badge>
              <div className="mt-2 text-[13px] font-bold leading-snug text-[#0d1a3a]">{schedule.event?.name}</div>
              <div className="mt-1 text-[11px] text-[#6b7a9a]">{schedule.venue} · {new Date(schedule.scheduled_at).toLocaleString()}</div>
            </>
          )} />
        </section>
      </div>
    </PublicLayout>
  );
}

function Ticker({ items }) {
  const track = [...items, ...items];

  return (
    <div className="flex h-9 overflow-hidden border-t border-white/10 bg-[#e37e2d] shadow-sm">
      <div className="flex shrink-0 items-center bg-[#b85e1a] px-4 text-[10px] font-black uppercase tracking-[0.12em] text-white">
        <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        Live
      </div>
      <div className="relative flex-1 overflow-hidden bg-[#e37e2d]">
        <div className="ticker-track flex h-full items-center gap-8 whitespace-nowrap px-4">
          {track.map((item, index) => (
            <span key={`${item}-${index}`} className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-wide text-white drop-shadow-sm">
              <span className="text-white/65">●</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, href, label }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div className="border-l-4 border-accent-500 pl-3">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-600">{eyebrow}</div>
        <h2 className="text-2xl font-black tracking-tight text-[#0d1a3a]">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="inline-flex items-center gap-1 border-b-2 border-primary-100 pb-0.5 text-xs font-black uppercase tracking-wide text-primary-500 transition hover:border-primary-500">
          {label} <ArrowRight size={13} />
        </Link>
      )}
    </div>
  );
}

function TallyTable({ tally = [] }) {
  return (
    <div className="overflow-hidden border border-[#dde3f0] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-[13px]" aria-label="Medal tally leaderboard">
          <thead className="bg-[#0d1a3a] text-left text-[10px] uppercase tracking-[0.1em] text-white/70">
            <tr>
              <th className="w-10 px-4 py-3 font-bold">#</th>
              <th className="px-4 py-3 font-bold">Municipality</th>
              <th className="px-4 py-3 text-center font-bold">Gold</th>
              <th className="px-4 py-3 text-center font-bold">Silver</th>
              <th className="px-4 py-3 text-center font-bold">Bronze</th>
              <th className="px-4 py-3 text-right font-bold">Total</th>
            </tr>
          </thead>
          <tbody>
            {tally.map((row) => (
              <tr key={row.id} className={`${row.rank === 1 ? 'bg-accent-50/60' : 'bg-white'} transition hover:bg-accent-50`}>
                <td className="border-b border-[#dde3f0] px-4 py-3">
                  <span className={`inline-block w-7 text-center text-xs font-black ${row.rank === 1 ? 'text-accent-600' : 'text-[#6b7a9a]'}`}>{row.rank}</span>
                </td>
                <td className="border-b border-[#dde3f0] px-4 py-3 font-bold text-[#0d1a3a]">{row.name}</td>
                <td className="border-b border-[#dde3f0] px-4 py-3 text-center text-sm font-black text-medal-gold">{row.gold}</td>
                <td className="border-b border-[#dde3f0] px-4 py-3 text-center text-sm font-black text-medal-silver">{row.silver}</td>
                <td className="border-b border-[#dde3f0] px-4 py-3 text-center text-sm font-black text-medal-bronze">{row.bronze}</td>
                <td className="border-b border-[#dde3f0] px-4 py-3 text-right font-black text-[#0d1a3a]">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Pulse({ label, detail, value, href, live = false }) {
  return (
    <Link href={href} className="flex items-center justify-between border border-[#dde3f0] px-3 py-3 no-underline transition hover:border-accent-500 hover:bg-accent-50">
      <span>
        <span className={`block text-[10px] font-bold uppercase tracking-[0.12em] ${live ? 'text-red-600' : 'text-[#6b7a9a]'}`}>
          {live && <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />}
          {detail}
        </span>
        <span className="mt-1 block text-xs font-black uppercase tracking-wide text-[#0d1a3a]">{label}</span>
      </span>
      <span className="text-2xl font-black text-accent-600">{value}</span>
    </Link>
  );
}

function Panel({ title, count, items, empty, render }) {
  return (
    <div className="border border-[#dde3f0] bg-white">
      <div className="flex items-center justify-between bg-[#0d1a3a] px-4 py-3">
        <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white">{title}</h3>
        <span className="bg-white/10 px-2 py-0.5 text-[11px] font-bold text-white/50">{count}</span>
      </div>
      <div className="flex flex-col gap-2 p-3">
        {items.length ? items.map((item) => <div key={item.id} className="border border-[#dde3f0] p-3 transition hover:border-accent-500">{render(item)}</div>) : <p className="text-sm text-slate-500">{empty}</p>}
      </div>
    </div>
  );
}
