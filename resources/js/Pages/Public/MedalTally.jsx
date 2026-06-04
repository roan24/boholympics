import MedalTallyTable from '../../Components/MedalTallyTable';
import PublicLayout from '../../Layouts/PublicLayout';

export default function MedalTally({ tally }) {
  return (
    <PublicLayout>
      <div className="mb-5">
        <h1 className="text-3xl font-black text-slate-950">Medal Tally</h1>
        <p className="mt-2 text-slate-500">Ranked by gold, then silver, bronze, and total medals.</p>
      </div>
      <MedalTallyTable tally={tally} />
    </PublicLayout>
  );
}
