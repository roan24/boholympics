import Card from '../../Components/Card';
import PublicLayout from '../../Layouts/PublicLayout';

export default function Sports({ sports }) {
  return (
    <PublicLayout>
      <h1 className="mb-5 text-3xl font-black text-slate-950">Sports</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sports.map((sport) => (
          <Card key={sport.id} className="p-5">
            <div className="text-sm font-black uppercase tracking-wide text-primary-700">{sport.icon || 'sport'}</div>
            <h2 className="mt-3 text-lg font-black">{sport.name}</h2>
            <p className="text-sm text-slate-500">{sport.events_count} events</p>
          </Card>
        ))}
      </div>
    </PublicLayout>
  );
}
