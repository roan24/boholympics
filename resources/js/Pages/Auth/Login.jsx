import { useForm } from '@inertiajs/react';
import { Trophy } from 'lucide-react';

export default function Login() {
  const form = useForm({ email: '', password: '', remember: false });

  function submit(event) {
    event.preventDefault();
    form.post('/login');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary-900 px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg bg-white p-6 shadow-soft">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-700 text-white"><Trophy size={22} /></div>
          <div><h1 className="text-xl font-black">Admin Login</h1><p className="text-sm text-slate-500">Boholympics 2026 Sports Tally</p></div>
        </div>
        <label className="block text-sm font-bold text-slate-700">Email<input value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} className="mt-1 w-full rounded-md border-slate-300 focus-ring" /></label>
        {form.errors.email && <p className="mt-1 text-xs text-rose-600">{form.errors.email}</p>}
        <label className="mt-4 block text-sm font-bold text-slate-700">Password<input type="password" value={form.data.password} onChange={(e) => form.setData('password', e.target.value)} className="mt-1 w-full rounded-md border-slate-300 focus-ring" /></label>
        {form.errors.password && <p className="mt-1 text-xs text-rose-600">{form.errors.password}</p>}
        <label className="mt-4 flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={form.data.remember} onChange={(e) => form.setData('remember', e.target.checked)} className="rounded border-slate-300" /> Remember me</label>
        <button disabled={form.processing} className="mt-5 w-full rounded-md bg-primary-700 px-4 py-3 text-sm font-black text-white hover:bg-primary-900 focus-ring">Sign in</button>
      </form>
    </main>
  );
}
