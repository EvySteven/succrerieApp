/**
 * API client for Bômbô admin backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const adminAPI = {
  /**
   * Login with password
   */
  async login(password: string): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Erreur d\'authentification',
        };
      }

      return {
        success: true,
        token: data.token,
      };
    } catch (error) {
      return {
        success: false,
        error: `Erreur réseau: ${error instanceof Error ? error.message : 'Vérifiez la connexion au serveur'}`,
      };
    }
  },

  /**
   * Verify if token is still valid
   */
  async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      return response.ok;
    } catch {
      return false;
    }
  },

  /**
   * Get admin logs (requires valid token)
   */
  async getLogs(token: string): Promise<{ accessLogs: string[]; errorLogs: string[] } | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/logs`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.data || null;
    } catch {
      return null;
    }
  },

  /**
   * Get admin status
   */
  async getStatus(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch {
      return false;
    }
  },
};

export default adminAPI;
