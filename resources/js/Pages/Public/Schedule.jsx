import { router } from '@inertiajs/react';
import Badge from '../../Components/Badge';
import Card from '../../Components/Card';
import Pagination from '../../Components/Pagination';
import PublicLayout from '../../Layouts/PublicLayout';

export default function Schedule({ schedules, sports, filters }) {
  function filter(key, value) {
    router.get('/schedule', { ...filters, [key]: value || undefined }, { preserveState: true });
  }

  return (
    <PublicLayout>
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Schedule</h1>
          <p className="mt-2 text-slate-500">Filter by sport, gender, and status.</p>
        </div>
        <Filters sports={sports} filters={filters} onChange={filter} />
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Event</th><th className="px-4 py-3">Teams</th><th className="px-4 py-3">Venue</th><th className="px-4 py-3">Time</th><th className="px-4 py-3">Status</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {schedules.data.map((row) => <tr key={row.id}><td className="px-4 py-4 font-bold">{row.event?.sport?.name} - {row.event?.name}</td><td className="px-4 py-4">{row.municipality_a?.name || 'TBA'} vs {row.municipality_b?.name || 'TBA'}</td><td className="px-4 py-4">{row.venue}</td><td className="px-4 py-4">{new Date(row.scheduled_at).toLocaleString()}</td><td className="px-4 py-4"><Badge tone="blue">{row.status}</Badge></td></tr>)}
            </tbody>
          </table>
        </div>
      </Card>
      <Pagination links={schedules.links} />
    </PublicLayout>
  );
}

function Filters({ sports, filters, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <select value={filters.sport_id || ''} onChange={(e) => onChange('sport_id', e.target.value)} className="rounded-md border-slate-300 text-sm"><option value="">All sports</option>{sports.map((sport) => <option key={sport.id} value={sport.id}>{sport.name}</option>)}</select>
      <select value={filters.gender || ''} onChange={(e) => onChange('gender', e.target.value)} className="rounded-md border-slate-300 text-sm"><option value="">All genders</option>{['male', 'female', 'mixed', 'open'].map((item) => <option key={item}>{item}</option>)}</select>
      <select value={filters.status || ''} onChange={(e) => onChange('status', e.target.value)} className="rounded-md border-slate-300 text-sm"><option value="">All status</option>{['scheduled', 'live', 'completed', 'postponed', 'cancelled'].map((item) => <option key={item}>{item}</option>)}</select>
    </div>
  );
}
