export default function KpiCard({ title, value }) {
  return (
    <div className="bg-agri-kpi p-5 rounded-2xl shadow-lg flex flex-col items-center justify-center border border-white/10 transition-transform hover:scale-105">
      <span className="text-agri-dark font-bold text-sm uppercase tracking-wider mb-2">{title}</span>
      <span className="text-agri-dark font-black text-2xl">{value}</span>
    </div>
  );
}