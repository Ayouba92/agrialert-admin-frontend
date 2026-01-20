import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";

// Importation de ton fichier GeoJSON (assure-toi qu'il est dans src/assets/ml.json)
import maliGeoData from "../../assets/ml.json";

/**
 * COORDONNÉES PRÉCISES DES CENTRES DES RÉGIONS
 * Ces points permettent d'afficher les noms exactement au bon endroit.
 */
const regionCenters = {
  "Kayes": [-10.5, 14.5],
  "Koulikoro": [-7.5, 14.2],
  "Sikasso": [-5.8, 11.5],
  "Ségou": [-6.2, 14.0],
  "Mopti": [-4.0, 15.0],
  "Tombouctou": [-3.0, 19.5],
  "Gao": [0.5, 16.5],
  "Kidal": [1.5, 19.5],
  "Ménaka": [2.5, 16.0],
  "Taoudénit": [-4.5, 23.0],
  "Bamako": [-8.0, 12.6]
};

/**
 * SIMULATION DE DONNÉES DE PLUIE
 */
const rainfallStats = {
  "Kayes": "rare",
  "Koulikoro": "moyenne",
  "Sikasso": "abondante",
  "Ségou": "moyenne",
  "Mopti": "moyenne",
  "Tombouctou": "rare",
  "Gao": "rare",
  "Kidal": "rare",
  "Bamako": "abondante",
  "Ménaka": "rare",
  "Taoudénit": "rare"
};

export default function MaliMap({ onRegionSelect }) {
  const [position, setPosition] = useState({ coordinates: [-4, 17.5], zoom: 1 });

  const getFillColor = (regionName) => {
    const status = rainfallStats[regionName];
    switch (status) {
      case "abondante": return "#2563eb"; // Bleu
      case "moyenne":   return "#22c55e"; // Vert
      case "rare":      return "#f97316"; // Orange
      default:          return "#4b5563"; // Gris
    }
  };

  return (
    <div className="relative w-full h-full bg-[#1e293b] rounded-3xl overflow-hidden border border-white/10 shadow-2xl min-h-[500px]">
      
      {/* --- LÉGENDE AVEC CORRECTION DES SYMBOLES --- */}
      <div className="absolute top-6 left-6 z-10">
        <h3 className="text-white font-bold text-lg mb-4">Analyse Pluviométrique</h3>
        <div className="flex flex-col gap-2 bg-black/40 p-4 rounded-xl backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#2563eb]"></span>
            <span className="text-xs text-gray-200">Abondante (&gt; 1000mm)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
            <span className="text-xs text-gray-200">Moyenne (500-1000mm)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#f97316]"></span>
            <span className="text-xs text-gray-200">Rare / Sécheresse (&lt; 500mm)</span>
          </div>
        </div>
      </div>

      {/* --- CONTRÔLES DE ZOOM --- */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
        <button 
          onClick={() => setPosition(p => ({...p, zoom: p.zoom * 1.2}))}
          className="bg-white/10 hover:bg-agri-green text-white hover:text-black w-10 h-10 rounded-lg backdrop-blur-md border border-white/20 transition-all font-bold"
        > + </button>
        <button 
          onClick={() => setPosition(p => ({...p, zoom: p.zoom / 1.2}))}
          className="bg-white/10 hover:bg-agri-green text-white hover:text-black w-10 h-10 rounded-lg backdrop-blur-md border border-white/20 transition-all font-bold"
        > - </button>
      </div>

      {/* --- CARTE INTERACTIVE --- */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 2600 }}
        className="w-full h-full"
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={setPosition}
        >
          {/* Dessin des régions */}
          <Geographies geography={maliGeoData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const regionName = geo.properties.name;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => onRegionSelect && onRegionSelect(regionName)}
                    style={{
                      default: { 
                        fill: getFillColor(regionName), 
                        stroke: "#0f172a", 
                        strokeWidth: 0.5, 
                        outline: "none" 
                      },
                      hover: { 
                        fill: "#ffffff", 
                        stroke: "#000", 
                        strokeWidth: 1, 
                        cursor: "pointer", 
                        outline: "none" 
                      },
                      pressed: { fill: "#00FF66", outline: "none" }
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Affichage des Noms (Labels) */}
          {maliGeoData.features.map((feature) => {
            const regionName = feature.properties.name;
            const center = regionCenters[regionName];

            if (center) {
              return (
                <Marker key={`label-${regionName}`} coordinates={center}>
                  <text
                    textAnchor="middle"
                    className="fill-white font-bold pointer-events-none uppercase"
                    style={{ 
                      fontSize: "10px", 
                      textShadow: "1px 1px 2px rgba(0,0,0,0.9)",
                      paintOrder: "stroke",
                      stroke: "#1e293b",
                      strokeWidth: "2px"
                    }}
                  >
                    {regionName}
                  </text>
                </Marker>
              );
            }
            return null;
          })}
        </ZoomableGroup>
      </ComposableMap>

      <div className="absolute bottom-6 left-6 text-[10px] text-gray-400 uppercase tracking-widest font-medium">
        AgriAlert Admin • Surveillance Pluviométrique
      </div>
    </div>
  );
}