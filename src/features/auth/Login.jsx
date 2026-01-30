import React, { useState } from 'react';
import { authService } from '../../services/authService';

const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // On envoie l'objet simple {email, password}
      await authService.login(credentials);
      
      // Si succès, on déclenche la redirection
      onLoginSuccess();
    } catch (err) {
      // Affiche le message d'erreur précis de Laravel ou un message générique
      const message = err.response?.data?.message || "Identifiants incorrects.";
      setError(message);
      
      // Log pour débogage dans la console du navigateur (F12)
      console.error("Erreur détaillée de Laravel:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          {/* Vérifie bien le chemin de ton logo */}
          <img src="/agri_alert.jpg" alt="AgriAlert Logo" style={styles.logo} />
          <h2 style={styles.title}>AgriAlert Admin</h2>
        </div>
        
        <p style={styles.subtitle}>Connectez-vous pour gérer le panneau.</p>

        {error && (
          <div style={styles.errorAlert}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email professionnel</label>
            <input
              type="email"
              name="email"
              placeholder="admin@agrialert.ml"
              style={styles.input}
              onChange={handleChange}
              value={credentials.email}
              required
              disabled={loading}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              style={styles.input}
              onChange={handleChange}
              value={credentials.password}
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            style={{...styles.button, opacity: loading ? 0.7 : 1}} 
            disabled={loading}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>Problème d'accès ? Contactez le support.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    height: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#1a1d1a' 
  },
  card: { 
    backgroundColor: '#242924', 
    padding: '25px 35px',
    borderRadius: '16px', 
    width: '380px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    border: '1px solid #3d443d'
  },
  logoContainer: { textAlign: 'center', marginBottom: '15px' },
  logo: { width: '50px', marginBottom: '5px', borderRadius: '8px' },
  title: { color: '#4caf50', margin: 0, fontSize: '20px', fontWeight: 'bold' },
  subtitle: { color: '#a0a0a0', textAlign: 'center', marginBottom: '20px', fontSize: '13px' },
  errorAlert: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    color: '#ff4444',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '12px',
    textAlign: 'center',
    marginBottom: '15px',
    border: '1px solid rgba(255, 68, 68, 0.3)'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { color: '#e0e0e0', fontSize: '13px' },
  input: { 
    padding: '10px 12px',
    borderRadius: '8px', 
    border: '1px solid #3d443d', 
    backgroundColor: '#1a1d1a', 
    color: 'white', 
    fontSize: '14px',
    outline: 'none',
  },
  button: { 
    padding: '12px',
    borderRadius: '8px', 
    border: 'none', 
    backgroundColor: '#4caf50', 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: '15px',
    cursor: 'pointer', 
    marginTop: '5px',
    transition: '0.3s'
  },
  footer: { marginTop: '20px', textAlign: 'center', borderTop: '1px solid #3d443d', paddingTop: '15px' },
  footerText: { color: '#666', fontSize: '11px' }
};

export default Login;