import maliMapImg from '../../assets/carteDuMali.png';

export default function MaliMap() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* L'image de la carte */}
      <img 
        src={maliMapImg} 
        alt="Carte du Mali" 
        className="max-h-[500px] w-auto object-contain transition-transform duration-500 hover:scale-105"
      />
      
      {/* Légende flottante (Optionnel, présent sur votre maquette) */}
      <div className="absolute top-0 left-0 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-md hidden xl:block">
        <h4 className="text-xs font-bold text-agri-green mb-2 uppercase">Légende</h4>
        <ul className="text-[10px] space-y-1 text-gray-300">
          <li className="flex items-center"><span className="w-2 h-2 bg-yellow-400 mr-2"></span> Élevage</li>
          <li className="flex items-center"><span className="w-2 h-2 bg-green-500 mr-2"></span> Cultures</li>
        </ul>
      </div>
    </div>
  );
}