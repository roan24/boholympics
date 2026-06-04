import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import Card from './Card';
import Flash from './Flash';
import Pagination from './Pagination';

function valueAt(row, path) {
  return path.split('.').reduce((value, key) => value?.[key], row);
}

export default function ResourceManager({ title, description, rows, columns, fields, endpoint }) {
  const [editing, setEditing] = useState(null);
  const defaults = Object.fromEntries(fields.map((field) => [field.name, field.default ?? '']));
  const form = useForm(defaults);

  function beginEdit(row) {
    setEditing(row);
    form.setData(Object.fromEntries(fields.map((field) => [field.name, valueAt(row, field.name) ?? row[field.name] ?? ''])));
  }

  function reset() {
    setEditing(null);
    form.reset();
    form.clearErrors();
  }

  function submit(event) {
    event.preventDefault();
    const options = { preserveScroll: true, onSuccess: reset };
    editing ? form.put(`${endpoint}/${editing.id}`, options) : form.post(endpoint, options);
  }

  function destroy(row) {
    if (confirm(`Delete ${row.name || row.event?.name || 'record'}?`)) {
      router.delete(`${endpoint}/${row.id}`, { preserveScroll: true });
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-950">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <Flash />
      <Card className="p-4">
        <form onSubmit={submit} className="grid gap-3 lg:grid-cols-4">
          {fields.map((field) => (
            <label key={field.name} className="text-sm font-semibold text-slate-700">
              {field.label}
              {field.type === 'select' ? (
                <select value={form.data[field.name] ?? ''} onChange={(event) => form.setData(field.name, event.target.value)} className="mt-1 w-full rounded-md border-slate-300 text-sm shadow-sm focus-ring">
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              ) : (
                <input type={field.type || 'text'} value={form.data[field.name] ?? ''} onChange={(event) => form.setData(field.name, event.target.value)} className="mt-1 w-full rounded-md border-slate-300 text-sm shadow-sm focus-ring" />
              )}
              {form.errors[field.name] && <span className="mt-1 block text-xs text-rose-600">{form.errors[field.name]}</span>}
            </label>
          ))}
          <div className="flex items-end gap-2">
            <button disabled={form.processing} className="inline-flex h-10 items-center gap-2 rounded-md bg-primary-700 px-4 text-sm font-bold text-white shadow-sm hover:bg-primary-900 focus-ring">
              <Plus size={16} /> {editing ? 'Update' : 'Add'}
            </button>
            {editing && (
              <button type="button" onClick={reset} className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50">
                <X size={16} /> Cancel
              </button>
            )}
          </div>
        </form>
      </Card>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {columns.map((column) => <th key={column.key} className="px-4 py-3">{column.label}</th>)}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.data.map((row) => (
                <tr key={row.id} className="hover:bg-primary-50/40">
                  {columns.map((column) => <td key={column.key} className="px-4 py-4">{column.render ? column.render(row) : valueAt(row, column.key)}</td>)}
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => beginEdit(row)} className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-50" title="Edit"><Pencil size={16} /></button>
                      <button onClick={() => destroy(row)} className="rounded-md border border-rose-200 p-2 text-rose-600 hover:bg-rose-50" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Pagination links={rows.links} />
    </div>
  );
}
