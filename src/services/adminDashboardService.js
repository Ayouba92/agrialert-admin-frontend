import api from "../api/axios";

export const adminDashboardService = {
  // Stats globales (KPI)
  getStats: async () => {
    const res = await api.get("/admin/stats");
    return res.data;
  },

  // Stats filtrées par région (KPI)
  getStatsByRegion: async (regionId) => {
    const res = await api.get(`/admin/analyser?region_id=${regionId}`);
    return res.data;
  },

  // Champs pour la carte (markers) — filtrable
  getChamps: async (regionId) => {
    const url = regionId ? `/admin/map/champs?region_id=${regionId}` : "/admin/map/champs";
    const res = await api.get(url);
    return res.data; // [{id, nom, latitude, longitude, aire, region_id?}]
  },

  // Liste des régions (publique chez toi)
  getRegions: async () => {
    const res = await api.get("/regions"); // ton route est Route::get('/regions', ...)
    return res.data; // selon ton controller : {regions: [...] } ou [...]
  }
};