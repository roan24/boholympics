import { router } from '@inertiajs/react';
import Badge from '../../Components/Badge';
import Card from '../../Components/Card';
import Pagination from '../../Components/Pagination';
import PublicLayout from '../../Layouts/PublicLayout';

export default function Results({ results, sports, filters }) {
  function filter(key, value) {
    router.get('/results', { ...filters, [key]: value || undefined }, { preserveState: true });
  }

  return (
    <PublicLayout>
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Results</h1>
          <p className="mt-2 text-slate-500">Verified medal results from completed events.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select value={filters.sport_id || ''} onChange={(e) => filter('sport_id', e.target.value)} className="rounded-md border-slate-300 text-sm"><option value="">All sports</option>{sports.map((sport) => <option key={sport.id} value={sport.id}>{sport.name}</option>)}</select>
          <select value={filters.gender || ''} onChange={(e) => filter('gender', e.target.value)} className="rounded-md border-slate-300 text-sm"><option value="">All genders</option>{['male', 'female', 'mixed', 'open'].map((item) => <option key={item}>{item}</option>)}</select>
        </div>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Medal</th><th className="px-4 py-3">Municipality</th><th className="px-4 py-3">Event</th><th className="px-4 py-3">Winner</th><th className="px-4 py-3">Score</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {results.data.map((row) => <tr key={row.id}><td className="px-4 py-4"><Badge tone={row.medal_type}>{row.medal_type}</Badge></td><td className="px-4 py-4 font-bold">{row.municipality?.name}</td><td className="px-4 py-4">{row.event?.sport?.name} - {row.event?.name}</td><td className="px-4 py-4">{row.athlete_name || row.team_name}</td><td className="px-4 py-4">{row.score || '-'}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Card>
      <Pagination links={results.links} />
    </PublicLayout>
  );
}
