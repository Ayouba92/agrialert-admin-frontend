import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import DashboardNational from './features/dashboard/DashboardNational';


function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Scroll vers la section correspondante (id="dashboard", "users", "analytics", "reports")
  useEffect(() => {
    const el = document.getElementById(activeSection);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeSection]);

  return (
    <Layout activeSection={activeSection} setActiveSection={setActiveSection}>
      <DashboardNational />
    </Layout>
  );
}

export default App;

// Ce fichier gère le changement de page quand on clique sur la Sidebar.