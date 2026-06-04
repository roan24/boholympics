import { CalendarDays, Medal, Trophy, Users } from 'lucide-react';
import Card from '../../Components/Card';
import MedalTallyTable from '../../Components/MedalTallyTable';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Dashboard({ cards, leaders, recentResults, upcomingSchedules }) {
  return (
    <AdminLayout>
      <h1 className="mb-5 text-2xl font-black text-slate-950">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Municipalities', cards.municipalities, Users],
          ['Sports', cards.sports, Trophy],
          ['Events', cards.events, CalendarDays],
          ['Results', cards.results, Medal],
        ].map(([label, value, Icon]) => (
          <Card key={label} className="p-5">
            <Icon className="text-primary-700" size={22} />
            <div className="mt-3 text-3xl font-black">{value}</div>
            <div className="text-sm font-semibold text-slate-500">{label}</div>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[1.3fr_.8fr]">
        <div>
          <h2 className="mb-3 text-lg font-black">Top Municipalities</h2>
          <MedalTallyTable tally={leaders} />
        </div>
        <Card className="p-4">
          <h2 className="mb-3 text-lg font-black">Recent Activity</h2>
          <div className="space-y-3">
            {recentResults.map((result) => <div key={result.id} className="rounded-md border border-slate-100 p-3 text-sm"><b>{result.municipality?.name}</b> won {result.medal_type} in {result.event?.name}</div>)}
            {upcomingSchedules.map((schedule) => <div key={`s-${schedule.id}`} className="rounded-md border border-slate-100 p-3 text-sm">{schedule.event?.name} at {schedule.venue}</div>)}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
