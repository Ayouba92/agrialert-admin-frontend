import api from '../api/axios';

export const authService = {
  login: async (credentials) => {
    try {
      const payload = {
        login: credentials.email,      
        motdepasse: credentials.password,
        source: 'admin_dashboard' // Identifiant pour le LoginController
      };

      const response = await api.post('/auth/login', payload);

      if (response.data.access_token) {
        // Sauvegarde du Token pour l'intercepteur Axios
        localStorage.setItem('admin_token', response.data.access_token);  
        // Sauvegarde de l'objet utilisateur (nom, role, etc.)
        localStorage.setItem('admin_user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Déconnecte l'administrateur
   * Invalide le token côté serveur (Sanctum) et nettoie le localStorage
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Erreur API lors de la déconnexion:", error);
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('admin_user');
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Vérifie si l'admin dispose d'un token en session
   */
  isAuthenticated: () => {
    const token = localStorage.getItem('admin_token');
    return token !== null && token !== undefined;
  },

  /**
   * Récupère le token brut stocké
   */
  getToken: () => {
    return localStorage.getItem('admin_token');
  }
};