import KpiCard from '../../components/KpiCard';
import MaliMap from './MaliMap';

export default function DashboardNational() {
  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-500">
      
      {/* 1. TOP BAR - Titre et Déconnexion */}
      <div className="flex justify-between items-center bg-agri-sidebar/30 p-4 rounded-xl border border-white/5 shadow-lg">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
          Dashboard National
        </h1>
        <button className="bg-agri-green text-agri-dark px-8 py-2 rounded-full font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)] active:scale-95">
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
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7 xl:col-span-8 mx-auto w-full bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
          
          <h2 className="text-center italic text-gray-400 mb-8 underline underline-offset-8 decoration-agri-green/30">
            L'importance du secteur primaire au Mali
          </h2>

          <div className="relative min-h-[500px] flex items-center justify-center">
            {/* APPEL DU COMPOSANT CARTE ICI */}
            <MaliMap />
          </div>

        </div>
      </div>

    </div>
  );
}