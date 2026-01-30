import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.email !== "" && credentials.password !== "") {
        onLoginSuccess();
    } else {
        alert("Veuillez remplir tous les champs");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <img src="/agri_alert.jpg" alt="AgriAlert Logo" style={styles.logo} />
          <h2 style={styles.title}>AgriAlert Admin</h2>
        </div>
        
        <p style={styles.subtitle}>Connectez-vous pour gérer le panneau.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email professionnel</label>
            <input
              type="email"
              name="email"
              placeholder="admin@agrialert.ml"
              style={styles.input}
              onChange={handleChange}
              required
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
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Se connecter
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
    padding: '25px 35px', // Réduit (était 40px)
    borderRadius: '16px', 
    width: '380px', // Légèrement plus étroit
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    border: '1px solid #3d443d'
  },
  logoContainer: { textAlign: 'center', marginBottom: '15px' }, // Réduit (était 20px)
  logo: { width: '50px', marginBottom: '5px' }, // Logo plus petit
  title: { color: '#4caf50', margin: 0, fontSize: '20px', fontWeight: 'bold' },
  subtitle: { color: '#a0a0a0', textAlign: 'center', marginBottom: '20px', fontSize: '13px' }, // Réduit
  form: { display: 'flex', flexDirection: 'column', gap: '15px' }, // Gap réduit (était 20px)
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' }, // Gap réduit
  label: { color: '#e0e0e0', fontSize: '13px' },
  input: { 
    padding: '10px 12px', // Moins haut (était 14px)
    borderRadius: '8px', 
    border: '1px solid #3d443d', 
    backgroundColor: '#1a1d1a', 
    color: 'white', 
    fontSize: '14px',
    outline: 'none',
  },
  button: { 
    padding: '12px', // Réduit (était 14px)
    borderRadius: '8px', 
    border: 'none', 
    backgroundColor: '#4caf50', 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: '15px',
    cursor: 'pointer', 
    marginTop: '5px',
  },
  footer: { marginTop: '20px', textAlign: 'center', borderTop: '1px solid #3d443d', paddingTop: '15px' }, // Réduit
  footerText: { color: '#666', fontSize: '11px' }
};

export default Login;