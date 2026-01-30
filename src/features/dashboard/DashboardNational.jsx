import React, { useState } from 'react';
import { authService } from '../../services/authService';
import KpiCard from '../../components/KpiCard';
import MaliMap from './MaliMap';
import DataAnalysis from './DataAnalysis';
import ExportReports from './ExportReports';
import UserTable from '../users/UserTable';

export default function DashboardNational() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Récupération des infos de l'admin connecté (optionnel, pour l'affichage)
  const admin = authService.getCurrentUser();

  const handleLogout = async () => {
    // Une petite confirmation pour éviter les erreurs
    if (!window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) return;

    setIsLoggingOut(true);
    try {
      // 1. Appel API pour invalider le token côté Laravel
      await authService.logout();
      
      // 2. Redirection vers la page d'accueil (login)
      window.location.href = '/'; 
    } catch (error) {
      console.error("Erreur déconnexion:", error);
      localStorage.clear();
      window.location.href = '/';
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-500 text-white">

      {/* SECTION DASHBOARD (ancre) */}
      <section id="dashboard" className="space-y-6">
        
        {/* 1. TOP BAR - Titre et Déconnexion */}
        <div className="flex justify-between items-center bg-[#566056] p-4 rounded-xl border border-white/10 shadow-lg">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              Dashboard National
            </h1>
            {admin && (
              <p className="text-green-300 text-xs mt-1">
                Connecté en tant que : <span className="font-bold">{admin.nom}</span>
              </p>
            )}
          </div>

          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`${
              isLoggingOut ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'
            } text-white px-6 py-2 rounded-lg font-bold transition-all active:scale-95 shadow-lg flex items-center gap-2`}
          >
            {isLoggingOut ? (
              <>
                <span className="animate-spin">🌀</span> En cours...
              </>
            ) : (
              'Se Déconnecter'
            )}
          </button>
        </div>

        {/* 2. STATISTIQUES (KPI) */}
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
              <MaliMap />
            </div>
          </div>

          {/* RIGHT SIDE: Analytics + Reports */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <section id="analytics">
              <DataAnalysis />
            </section>

            <section id="reports">
              <ExportReports />
            </section>
          </div>
        </div>
      </section>

      {/* SECTION USERS (ancre) */}
      <section id="users" className="space-y-4">
        <UserTable />
      </section>
    </div>
  );
}