// La Structure globale
import Sidebar from './Sidebar';

export default function Layout({ children, activeSection, setActiveSection }) {
  return (
    <div className="flex min-h-screen bg-agri-dark">
      {/* Sidebar Fixe */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Contenu défilable */}
      <div className="flex-1 h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
}