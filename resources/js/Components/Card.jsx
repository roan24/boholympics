export default function Card({ children, className = '' }) {
  return <div className={`rounded-lg border border-primary-100/80 bg-white shadow-soft ${className}`}>{children}</div>;
}
