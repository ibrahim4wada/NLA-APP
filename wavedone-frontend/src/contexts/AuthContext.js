'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For App Router navigation
import { loginUser, registerUser } from '@/services/apiService'; // Import your API service functions

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // For initial auth check
  const [authError, setAuthError] = useState(null); // For login/register errors
  const [authLoading, setAuthLoading] = useState(false); // For login/register specific loading

  const router = useRouter();

  useEffect(() => {
    // Check for existing token in localStorage on initial load
    const storedToken = localStorage.getItem('wavedone_token');
    const storedUser = localStorage.getItem('wavedone_user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        // TODO: Optionally validate token with backend here
      } catch (e) {
        console.error("Error parsing stored user data", e);
        localStorage.removeItem('wavedone_token');
        localStorage.removeItem('wavedone_user');
      }
    }
    setLoading(false); // Initial auth check complete
  }, []);

  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const data = await loginUser({ email, password }); // data = { token, user, message }
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('wavedone_token', data.token);
      localStorage.setItem('wavedone_user', JSON.stringify(data.user));
      setAuthLoading(false);
      router.push('/dashboard'); // Redirect to dashboard
      return true;
    } catch (error) {
      console.error('AuthContext login error:', error);
      setAuthError(error.message || 'Login failed. Please check your credentials.');
      setAuthLoading(false);
      return false;
    }
  };

  const register = async (name, email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const data = await registerUser({ name, email, password }); // data = { user, message }
      // Decide on behavior: auto-login or redirect to login page
      // For now, let's redirect to login with a success message (or auto-login if token was returned)
      setAuthLoading(false);
      // If register API returns token and user (like login), you could auto-login:
      // setUser(data.user);
      // setToken(data.token);
      // localStorage.setItem('wavedone_token', data.token);
      // localStorage.setItem('wavedone_user', JSON.stringify(data.user));
      // router.push('/');

      // For now, assume registration means they then need to login
      router.push('/login?registered=true'); // Redirect to login page with a query param
      return true;
    } catch (error) {
      console.error('AuthContext register error:', error);
      setAuthError(error.message || 'Registration failed. Please try again.');
      setAuthLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('wavedone_token');
    localStorage.removeItem('wavedone_user');
    router.push('/login'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, authError, authLoading, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined || context === null) { // Check for null as well
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
