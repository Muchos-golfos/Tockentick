import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recuperar sesión al recargar
    const token = localStorage.getItem('tokentick_token');
    const savedUser = localStorage.getItem('tokentick_user');

    if (token && savedUser) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          // Token expirado — limpiar
          localStorage.removeItem('tokentick_token');
          localStorage.removeItem('tokentick_user');
          setUser(null);
        } else {
          setUser(JSON.parse(savedUser));
        }
      } catch {
        localStorage.removeItem('tokentick_token');
        localStorage.removeItem('tokentick_user');
        setUser(null);
      }
    }

    setIsLoading(false);
  }, []);

  // login devuelve el usuario — la navegación la hace el componente que llama
  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user: userData } = response.data;

    localStorage.setItem('tokentick_token', token);
    localStorage.setItem('tokentick_user', JSON.stringify(userData));
    setUser(userData);

    return userData; // El componente Login se encarga de navegar
  };

  const logout = () => {
    localStorage.removeItem('tokentick_token');
    localStorage.removeItem('tokentick_user');
    setUser(null);
    // La navegación la hace el componente que llama a logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
