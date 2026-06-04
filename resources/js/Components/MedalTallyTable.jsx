import Card from './Card';

const medalClass = {
  gold: 'bg-medal-gold text-white',
  silver: 'bg-medal-silver text-white',
  bronze: 'bg-medal-bronze text-white',
};

export default function MedalTallyTable({ tally = [] }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-primary-100 text-sm">
          <thead className="bg-primary-50/70 text-left text-xs uppercase tracking-wide text-primary-700">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Municipality</th>
              <th className="px-4 py-3 text-center">Gold</th>
              <th className="px-4 py-3 text-center">Silver</th>
              <th className="px-4 py-3 text-center">Bronze</th>
              <th className="px-4 py-3 text-center">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-50 bg-white">
            {tally.map((row) => (
              <tr key={row.id} className="transition hover:bg-primary-50/50">
                <td className="px-4 py-4 font-bold text-accent-600">#{row.rank}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-700 ring-2 ring-white">
                      {row.logo ? <img src={row.logo} alt="" className="h-9 w-9 rounded-full object-cover" /> : row.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-900">{row.name}</span>
                  </div>
                </td>
                {['gold', 'silver', 'bronze'].map((type) => (
                  <td key={type} className="px-4 py-4 text-center">
                    <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 font-bold ${medalClass[type]}`}>{row[type]}</span>
                  </td>
                ))}
                <td className="px-4 py-4 text-center text-base font-black text-slate-900">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
