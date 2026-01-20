export default function ExportReports() {
  const exportPDF = () => {
    // TODO: appeler ton backend /api/reports/pdf
    alert('Export PDF (à connecter au backend)');
  };

  const exportExcel = () => {
    // TODO: appeler ton backend /api/reports/excel
    alert('Export EXCEL (à connecter au backend)');
  };

  return (
    <div className="bg-white/10 rounded-2xl p-6 border border-white/10 shadow-xl">
      <h2 className="text-xl font-extrabold mb-4">Exporter des rapports</h2>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={exportPDF}
          className="bg-[#3E443D] text-white px-4 py-2 rounded-lg hover:brightness-110"
        >
          Rapport en PDF
        </button>

        <button
          onClick={exportExcel}
          className="bg-[#3E443D] text-white px-4 py-2 rounded-lg hover:brightness-110"
        >
          Rapport en EXCEL
        </button>
      </div>
    </div>
  );
}