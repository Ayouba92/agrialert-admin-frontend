import KpiCard from '../../components/KpiCard';
import MaliMap from './MaliMap';
import DataAnalysis from './DataAnalysis';
import ExportReports from './ExportReports';
import UserTable from '../users/UserTable';

export default function DashboardNational() {
  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-500 text-white">

      {/* ✅ SECTION DASHBOARD (ancre) */}
      <section id="dashboard" className="space-y-6">
        {/* 1. TOP BAR - Titre et Déconnexion */}
        <div className="flex justify-between items-center bg-[#566056] p-4 rounded-xl border border-white/10 shadow-lg">
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Dashboard National
          </h1>

          <button className="bg-green-400 text-black px-6 py-2 rounded-lg font-bold hover:brightness-110 active:scale-95">
            Se Déconnecter
          </button>
        </div>

        {/* 2. STATISTIQUES (KPI) - Tes 4 blocs gris */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard title="Surface semées" value="1.2M Ha" />
          <KpiCard title="Maladies" value="15,000" />
          <KpiCard title="Alertes actives" value="12,000" />
          <KpiCard title="Utilisateurs" value="12,000" />
        </div>

        {/* 3. ZONE CENTRALE - La Carte du Mali */}
        <div className="grid grid-cols-12 gap-8 items-start">
          
          <div className="col-span-12 lg:col-span-8 bg-white/10 rounded-2xl p-6 border border-white/10 shadow-2xl">
            <h2 className="text-center italic text-gray-200 mb-4 underline underline-offset-8 decoration-green-400/40">
              L&apos;importance du secteur primaire au Mali
            </h2>

            <div className="relative min-h-[500px] flex items-center justify-center">
              {/* APPEL DU COMPOSANT CARTE ICI */}
              <MaliMap />
            </div>
          </div>

          {/* RIGHT SIDE: Analytics + Reports */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* ✅ SECTION ANALYTICS (ancre) */}
            <section id="analytics">
              <DataAnalysis />
            </section>

            {/* ✅ SECTION REPORTS (ancre) */}
            <section id="reports">
              <ExportReports />
            </section>
          </div>
        </div>
      </section>

      {/* ✅ SECTION USERS (ancre) */}
      <section id="users" className="space-y-4">
        <UserTable />
      </section>
    </div>
  );
}
