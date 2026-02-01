import React, { useEffect, useMemo, useState } from "react";
import { authService } from "../../services/authService";
import KpiCard from "../../components/KpiCard";
import MaliMap from "./MaliMap";
import DataAnalysis from "./DataAnalysis";
import ExportReports from "./ExportReports";
import UserTable from "../users/UserTable";
import { adminDashboardService } from "../../services/adminDashboardService";

export default function DashboardNational() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [stats, setStats] = useState({
    total_users: 0,
    surface_totale: 0,
    notification_total: 0,
    diagnostics_ia_total: 0
  });

  const [loading, setLoading] = useState(true);

  //  régions pour le select
  const [regions, setRegions] = useState([]); // [{id, nom}]
  const [selectedRegionId, setSelectedRegionId] = useState(""); // "" = national

  const admin = authService.getCurrentUser();

  // Charger les régions
  useEffect(() => {
    const loadRegions = async () => {
      try {
        const data = await adminDashboardService.getRegions();

        // Normalisation : parfois backend renvoie {regions:[...]} ou direct [...]
        const list = Array.isArray(data) ? data : (data.regions ?? data.data ?? []);

        // On veut [{id, nom}] => adapte si c'est {id, name}
        const normalized = list.map((r) => ({
          id: r.id,
          nom: r.nom ?? r.name ?? r.libelle ?? "Région"
        }));

        setRegions(normalized);
      } catch (e) {
        console.error("Erreur chargement régions:", e);
        setRegions([]);
      }
    };

    loadRegions();
  }, []);

  // Charger les stats selon filtre
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const data = selectedRegionId
          ? await adminDashboardService.getStatsByRegion(selectedRegionId)
          : await adminDashboardService.getStats();

        setStats(data);
      } catch (error) {
        console.error("Erreur stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [selectedRegionId]);

  // clic sur map -> transformer regionName en regionId
  const regionNameToId = useMemo(() => {
    const map = new Map();
    regions.forEach((r) => map.set(String(r.nom).toLowerCase(), String(r.id)));
    return map;
  }, [regions]);

  const handleRegionSelectFromMap = (regionName) => {
    const id = regionNameToId.get(String(regionName).toLowerCase());
    if (id) setSelectedRegionId(id);
  };

  const handleLogout = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) return;
    setIsLoggingOut(true);
    try {
      await authService.logout();
      window.location.href = "/";
    } catch (error) {
      localStorage.clear();
      window.location.href = "/";
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-500 text-white">
      <section id="dashboard" className="space-y-6">

        {/* TOP BAR */}
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
              isLoggingOut ? "bg-gray-500" : "bg-red-500 hover:bg-red-600"
            } text-white px-6 py-2 rounded-lg font-bold transition-all active:scale-95 shadow-lg flex items-center gap-2`}
          >
            {isLoggingOut ? "Déconnexion..." : "Se Déconnecter"}
          </button>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard title="Surface semées" value={loading ? "..." : `${stats.surface_totale} Ha`} />
          <KpiCard title="Maladies détectées" value={loading ? "..." : stats.diagnostics_ia_total?.toLocaleString?.() ?? stats.diagnostics_ia_total} />
          <KpiCard title="Alertes actives" value={loading ? "..." : stats.notification_total?.toLocaleString?.() ?? stats.notification_total} />
          <KpiCard title="Utilisateurs" value={loading ? "..." : stats.total_users?.toLocaleString?.() ?? stats.total_users} />
        </div>

        {/* ZONE CENTRALE */}
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-8 bg-white/10 rounded-2xl p-6 border border-white/10 shadow-2xl">
            <h2 className="text-center italic text-gray-200 mb-4 underline underline-offset-8 decoration-green-400/40">
              L'importance du secteur primaire au Mali
            </h2>

            <div className="relative min-h-[500px] flex items-center justify-center">
              <MaliMap
                selectedRegionId={selectedRegionId}
                onRegionSelect={handleRegionSelectFromMap}
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-8">
            <section id="analytics">
              <DataAnalysis
                regions={regions}
                selectedRegionId={selectedRegionId}
                onChangeRegionId={(id) => setSelectedRegionId(id)}
              />
            </section>

            <section id="reports">
              <ExportReports />
            </section>
          </div>
        </div>
      </section>

      <section id="users" className="space-y-4">
        <UserTable />
      </section>
    </div>
  );
}