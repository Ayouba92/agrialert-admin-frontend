import { useState } from 'react';

export default function UserTable() {
  const [rows] = useState([
    { id: 1, nom: 'Jean', surface: 12, telephone: '12345', culture: 'Sorgho', region: 'Sikasso' },
    { id: 2, nom: 'Awa', surface: 8, telephone: '77777', culture: 'Riz', region: 'Ségou' },
  ]);

  const onDelete = (id) => alert(`Supprimer user ${id} (à connecter au backend)`);
  const onBlock = (id) => alert(`Bloquer user ${id} (à connecter au backend)`);

  return (
    <div className="bg-white/10 rounded-2xl p-6 border border-white/10 shadow-2xl">
      <h2 className="text-2xl font-extrabold mb-4">Gestion des utilisateurs</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-white/20">
            <tr>
              <th className="p-2 border border-white/20">Nom</th>
              <th className="p-2 border border-white/20">Surface cultivée</th>
              <th className="p-2 border border-white/20">Téléphone</th>
              <th className="p-2 border border-white/20">Culture</th>
              <th className="p-2 border border-white/20">Région</th>
              <th className="p-2 border border-white/20">Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="bg-white/5">
                <td className="p-2 border border-white/10">{r.nom}</td>
                <td className="p-2 border border-white/10">{r.surface}</td>
                <td className="p-2 border border-white/10">{r.telephone}</td>
                <td className="p-2 border border-white/10">{r.culture}</td>
                <td className="p-2 border border-white/10">{r.region}</td>
                <td className="p-2 border border-white/10">
                  <button
                    onClick={() => onDelete(r.id)}
                    className="text-red-300 font-bold hover:underline mr-3"
                  >
                    sup
                  </button>
                  <button
                    onClick={() => onBlock(r.id)}
                    className="text-yellow-200 font-bold hover:underline"
                  >
                    bloq
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
