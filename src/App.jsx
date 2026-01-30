import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import DashboardNational from './features/dashboard/DashboardNational';
import Login from './features/auth/Login';

function App() {
  // État pour gérer la connexion
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Gestion du scroll automatique
  useEffect(() => {
    if (isLoggedIn) {
      const el = document.getElementById(activeSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSection, isLoggedIn]);

  // Si l'admin n'est pas connecté, on affiche uniquement la page de login
  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // Si connecté, on affiche la structure complète
  return (
    <Layout activeSection={activeSection} setActiveSection={setActiveSection}>
      <div id="dashboard">
        <DashboardNational />
      </div>
      
      {/* Conteneurs vides pour le scroll des autres sections */}
      <div id="users" style={{ minHeight: '100vh', padding: '20px' }}>
        <h2 style={{ color: 'white' }}>Gestion des Utilisateurs (À venir)</h2>
      </div>
      <div id="analytics" style={{ minHeight: '100vh', padding: '20px' }}>
        <h2 style={{ color: 'white' }}>Analyses de données (À venir)</h2>
      </div>
    </Layout>
  );
}

export default App;