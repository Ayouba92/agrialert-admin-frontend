import { useMemo } from "react";

export default function DataAnalysis({
  regions = [],
  selectedRegionId = "",
  onChangeRegionId,
}) {
  const selectedLabel = useMemo(() => {
    const found = regions.find((r) => String(r.id) === String(selectedRegionId));
    return found ? found.nom : "Aucune";
  }, [regions, selectedRegionId]);

  return (
    <div className="bg-white/10 rounded-2xl p-6 border border-white/10 shadow-xl">
      <h2 className="text-xl font-extrabold mb-4">Analyser les données</h2>

      <div className="space-y-3">
        <div className="text-sm text-gray-200">Filtre Par:</div>

        <div className="flex gap-3 items-center">
          <select
            value={selectedRegionId}
            onChange={(e) => onChangeRegionId?.(e.target.value)}
            className="flex-1 bg-white/90 text-black rounded-lg px-3 py-2 outline-none"
          >
            <option value="">Région (Toutes)</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nom}
              </option>
            ))}
          </select>

          <button className="bg-[#3E443D] text-white px-4 py-2 rounded-lg hover:brightness-110">
            Période culture
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-200">
          Région sélectionnée :{" "}
          <span className="font-bold">
            {selectedRegionId ? selectedLabel : "Aucune (National)"}
          </span>
        </div>
      </div>
    </div>
  );
}