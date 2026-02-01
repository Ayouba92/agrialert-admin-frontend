import React, { useState } from 'react';
import api from '../../api/axios';

export default function ExportReports() {
  const [loading, setLoading] = useState(false);

  const handleExport = async (type) => {
    setLoading(true);
    const url = type === 'pdf' ? '/admin/export/pdf' : '/admin/export/excel';
    const fileName = type === 'pdf' ? 'rapport-agrialert.pdf' : 'utilisateurs.xlsx';

    try {
      const response = await api.get(url, {
        responseType: 'blob', // Indispensable pour les fichiers binaires
      });

      // Création du lien de téléchargement
      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      // Nettoyage
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Erreur d'export :", error);
      alert("Erreur lors de la génération du fichier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 rounded-2xl p-6 border border-white/10 shadow-xl">
      <h2 className="text-xl font-extrabold mb-4">Exporter des rapports</h2>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => handleExport('pdf')}
          disabled={loading}
          className="bg-[#3E443D] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Génération...' : ' Rapport en PDF'}
        </button>

        <button
          onClick={() => handleExport('excel')}
          disabled={loading}
          className="bg-[#3E443D] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Génération...' : 'Rapport en EXCEL'}
        </button>
      </div>
    </div>
  );
}