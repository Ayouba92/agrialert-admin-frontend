// Barre latérale 
import { LayoutDashboard, Users, BarChart3, FileText, LogOut } from 'lucide-react';
import { authService } from '../services/authService';



// Récupération des infos de l'admin connecté (optionnel, pour l'affichage)
const Sidebar = ({ activeSection, setActiveSection }) => {
  const admin = authService.getCurrentUser();
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard national', icon: LayoutDashboard },
    { id: 'users', label: 'Gérer les utilisateurs', icon: Users },
    { id: 'analytics', label: 'Analyser les données', icon: BarChart3 },
    { id: 'reports', label: 'Exporter des Rapports', icon: FileText },
  ];

  return (
    <div className="w-64 bg-[#3E443D] h-screen flex flex-col border-r border-gray-600">
      <div className="p-6 flex flex-col items-center border-b border-gray-600">
        <img src="/agri_alert.jpg" alt="AgriAlert" className="h-16 mb-4" />
        <div className="w-20 h-20 rounded-full border-2 border-white overflow-hidden mb-2">
           <img src="/Agriculteur.webp" alt="Admin" className="w-full h-full object-cover" />
        </div>
        <span className="text-white font-semibold">{admin?.nom || 'Admin'}</span>
      </div>

      <nav className="flex-1 mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center px-6 py-4 text-sm transition-colors ${
              activeSection === item.id 
              ? 'bg-[#555C54] text-white border-l-4 border-green-400' 
              : 'text-gray-300 hover:bg-[#4A5149]'
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
