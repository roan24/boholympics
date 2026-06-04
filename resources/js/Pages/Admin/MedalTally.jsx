import { useForm } from '@inertiajs/react';
import { FileSpreadsheet, Upload } from 'lucide-react';
import Card from '../../Components/Card';
import MedalTallyTable from '../../Components/MedalTallyTable';
import AdminLayout from '../../Layouts/AdminLayout';

export default function MedalTally({ tally, lastImport }) {
  const form = useForm({ file: null });

  function submit(event) {
    event.preventDefault();
    form.post('/admin/medal-tally/import', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => form.reset('file'),
    });
  }

  return (
    <AdminLayout>
      <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Medal Tally</h1>
          <p className="mt-1 text-sm text-slate-500">Upload the PYDO Excel medal tally file. Imported totals become the public leaderboard source.</p>
        </div>
      </div>

      <Card className="mb-5 p-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_.9fr] lg:items-start">
          <form onSubmit={submit} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-50 text-primary-700">
                <FileSpreadsheet size={22} />
              </div>
              <div>
                <h2 className="font-black text-slate-950">Excel Import</h2>
                <p className="text-sm text-slate-500">Accepted format: `.xlsx` with Overall Standings and sport sheets.</p>
              </div>
            </div>
            <label className="block text-sm font-semibold text-slate-700">
              Medal tally workbook
              <input
                type="file"
                accept=".xlsx"
                onChange={(event) => form.setData('file', event.target.files?.[0] ?? null)}
                className="mt-2 block w-full rounded-md border border-slate-300 text-sm file:mr-4 file:border-0 file:bg-primary-700 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-primary-900"
              />
            </label>
            {form.errors.file && <p className="text-sm font-semibold text-rose-600">{form.errors.file}</p>}
            <button disabled={form.processing || !form.data.file} className="inline-flex h-10 items-center gap-2 rounded-md bg-primary-700 px-4 text-sm font-bold text-white shadow-sm hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-60">
              <Upload size={16} /> {form.processing ? 'Importing...' : 'Import Excel'}
            </button>
          </form>

          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-black uppercase tracking-wide text-slate-500">Last Import</h3>
            {lastImport ? (
              <div className="mt-3 space-y-2 text-sm">
                <div><span className="font-bold text-slate-700">File:</span> {lastImport.original_filename}</div>
                <div><span className="font-bold text-slate-700">Rows:</span> {lastImport.rows_imported}</div>
                <div><span className="font-bold text-slate-700">As of:</span> {lastImport.as_of_text || 'Not provided'}</div>
                <div><span className="font-bold text-slate-700">Imported:</span> {lastImport.imported_at ? new Date(lastImport.imported_at).toLocaleString() : 'Pending'}</div>
                {lastImport.warnings?.length > 0 && (
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-800">
                    <div className="font-black">Warnings</div>
                    <ul className="mt-2 list-disc space-y-1 pl-4">
                      {lastImport.warnings.slice(0, 5).map((warning, index) => <li key={index}>{warning}</li>)}
                    </ul>
                    {lastImport.warnings.length > 5 && <div className="mt-2 text-xs font-bold">+{lastImport.warnings.length - 5} more warnings</div>}
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">No Excel file imported yet.</p>
            )}
          </div>
        </div>
      </Card>

      <MedalTallyTable tally={tally} />
    </AdminLayout>
  );
}
