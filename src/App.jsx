import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import DashboardNational from './features/dashboard/DashboardNational';
import Login from './features/auth/Login';
import { authService } from './services/authService'; 

function App() {
  // 1. On initialise l'état en vérifiant si un token existe déjà dans le localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    if (isLoggedIn) {
      const el = document.getElementById(activeSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSection, isLoggedIn]);

  // Fonction de déconnexion passée au dashboard
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Si l'admin n'est pas connecté, on affiche uniquement la page de login
  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // Si connecté, on affiche la structure complète
  return (
    <Layout activeSection={activeSection} setActiveSection={setActiveSection}>
      <div id="dashboard">
        {/* On passe handleLogout pour que le bouton du Dashboard fonctionne */}
        <DashboardNational onLogout={handleLogout} />
      </div>
      
      <div id="users" style={{ minHeight: '100vh', padding: '20px' }}>
        <h2 style={{ color: 'white' }}>Gestion des Utilisateurs</h2>
        {/* Tu pourras placer ton composant UserTable ici plus tard */}
      </div>
      
      <div id="analytics" style={{ minHeight: '100vh', padding: '20px' }}>
        <h2 style={{ color: 'white' }}>Analyses de données</h2>
      </div>
    </Layout>
  );
}

export default App;