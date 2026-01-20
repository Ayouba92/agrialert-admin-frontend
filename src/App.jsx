import { useState } from 'react';
import Layout from './components/Layout';
import DashboardNational from './features/dashboard/DashboardNational';


function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardNational />;
      default:
        return <DashboardNational />;
    }
  };

  return (
    <Layout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderSection()}
    </Layout>
  );
}

export default App;

// Ce fichier gère le changement de page quand on clique sur la Sidebar.