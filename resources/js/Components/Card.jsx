export default function Card({ children, className = '' }) {
  return <div className={`rounded-lg border border-slate-200 bg-white shadow-soft ${className}`}>{children}</div>;
}
