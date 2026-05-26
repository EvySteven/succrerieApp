import { useState, useCallback, useEffect } from 'react';
import { adminAPI } from './adminAPI';

interface AdminAuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

/**
 * Hook for managing admin authentication with backend
 */
export const useAdminAuth = () => {
  const [state, setState] = useState<AdminAuthState>(() => {
    // Initialize from localStorage
    try {
      const stored = localStorage.getItem('bombo_admin_token');
      if (stored) {
        return {
          isAuthenticated: true,
          token: stored,
          error: null,
          isLoading: false,
        };
      }
    } catch (e) {
      console.error('Failed to read from localStorage:', e);
    }

    return {
      isAuthenticated: false,
      token: null,
      error: null,
      isLoading: false,
    };
  });

  // Verify token on mount
  useEffect(() => {
    const verifyStoredToken = async () => {
      if (state.token) {
        const isValid = await adminAPI.verifyToken(state.token);
        if (!isValid) {
          // Token expired or invalid
          localStorage.removeItem('bombo_admin_token');
          setState({
            isAuthenticated: false,
            token: null,
            error: 'Session expirée',
            isLoading: false,
          });
        }
      }
    };

    verifyStoredToken();
  }, []);

  const login = useCallback(
    async (password: string) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const result = await adminAPI.login(password);

      if (result.success && result.token) {
        // Store token securely (httpOnly would be better with backend support)
        localStorage.setItem('bombo_admin_token', result.token);

        setState({
          isAuthenticated: true,
          token: result.token,
          error: null,
          isLoading: false,
        });

        return { success: true };
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || 'Erreur d\'authentification',
        }));

        return { success: false, error: result.error };
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem('bombo_admin_token');
    setState({
      isAuthenticated: false,
      token: null,
      error: null,
      isLoading: false,
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    logout,
    clearError,
  };
};

export default useAdminAuth;
