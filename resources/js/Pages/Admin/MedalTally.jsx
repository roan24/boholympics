import MedalTallyTable from '../../Components/MedalTallyTable';
import AdminLayout from '../../Layouts/AdminLayout';

export default function MedalTally({ tally }) {
  return (
    <AdminLayout>
      <div className="mb-5">
        <h1 className="text-2xl font-black text-slate-950">Medal Tally</h1>
        <p className="mt-1 text-sm text-slate-500">Calculated from saved results and sorted by gold, silver, bronze, then total.</p>
      </div>
      <MedalTallyTable tally={tally} />
    </AdminLayout>
  );
}
