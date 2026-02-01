import { useEffect, useMemo, useState } from "react";
import { adminUserService } from "../../services/adminUserService"; 

export default function UserTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const users = await adminUserService.list();
      setRows(Array.isArray(users) ? users : []);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Erreur chargement des utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onDelete = async (id) => {
    const ok = window.confirm("Supprimer cet utilisateur ?");
    if (!ok) return;

    setBusyId(id);
    setError("");
    try {
      await adminUserService.remove(id);
      // refresh
      await fetchUsers();
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Erreur suppression utilisateur.");
    } finally {
      setBusyId(null);
    }
  };

  const onBlock = async (id) => {
    setBusyId(id);
    setError("");
    try {
      await adminUserService.toggleStatus(id);
      await fetchUsers();
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Erreur blocage/déblocage.");
    } finally {
      setBusyId(null);
    }
  };

  // Petite fonction pour afficher une surface propre
  const getSurface = (u) => {
    // Laravel withSum('champs','aire') => champs_sum_aire
    const v = u?.champs_sum_aire;
    if (v === null || v === undefined) return "--";
    const n = Number(v);
    if (Number.isNaN(n)) return "--";
    return n.toFixed(2);
  };

  const content = useMemo(() => {
    if (loading) {
      return <div className="p-4 text-white/80">Chargement...</div>;
    }

    if (error) {
      return (
        <div className="p-4">
          <div className="text-red-300 font-semibold mb-2">{error}</div>
          <button
            onClick={fetchUsers}
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20"
          >
            Réessayer
          </button>
        </div>
      );
    }

    if (!rows.length) {
      return <div className="p-4 text-white/80">Aucun utilisateur.</div>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-white/20">
            <tr>
              <th className="p-2 border border-white/20">Nom</th>
              <th className="p-2 border border-white/20">Surface cultivée</th>
              <th className="p-2 border border-white/20">Téléphone</th>
              <th className="p-2 border border-white/20">Email</th>
              <th className="p-2 border border-white/20">Statut</th>
              <th className="p-2 border border-white/20">Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((u) => (
              <tr key={u.id} className="bg-white/5">
                <td className="p-2 border border-white/10">{u.nom}</td>
                <td className="p-2 border border-white/10">{getSurface(u)} ha</td>
                <td className="p-2 border border-white/10">{u.telephone ?? "--"}</td>
                <td className="p-2 border border-white/10">{u.email ?? "--"}</td>
                <td className="p-2 border border-white/10">
                  {u.is_active ? (
                    <span className="text-green-300 font-bold">Actif</span>
                  ) : (
                    <span className="text-red-300 font-bold">Bloqué</span>
                  )}
                </td>
                <td className="p-2 border border-white/10">
                  <button
                    onClick={() => onDelete(u.id)}
                    disabled={busyId === u.id}
                    className="text-red-300 font-bold hover:underline mr-3 disabled:opacity-50"
                  >
                    {busyId === u.id ? "..." : "sup"}
                  </button>

                  <button
                    onClick={() => onBlock(u.id)}
                    disabled={busyId === u.id}
                    className="text-yellow-200 font-bold hover:underline disabled:opacity-50"
                  >
                    {busyId === u.id ? "..." : (u.is_active ? "bloq" : "debloq")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }, [loading, error, rows, busyId]);

  return (
    <div className="bg-white/10 rounded-2xl p-6 border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold">Gestion des utilisateurs</h2>
        <button
          onClick={fetchUsers}
          className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20"
        >
          Rafraîchir
        </button>
      </div>

      {content}
    </div>
  );
}
