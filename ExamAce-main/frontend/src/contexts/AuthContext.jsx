import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = apiService.getAuthToken();
        if (token) {
          const userData = await apiService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        apiService.removeAuthToken();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await apiService.login(credentials);
      apiService.setAuthToken(response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await apiService.register(userData);
      apiService.setAuthToken(response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
    setError(null);
  };

  const updateProfile = async (userData) => {
    try {
      setError(null);
      const updatedUser = await apiService.updateProfile(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 