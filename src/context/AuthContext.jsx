import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const checkRole = (allowedRoles) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    registerUser,
    checkRole,
    isAdmin: user?.role?.toLowerCase() === 'admin',
    isSales: ['sales_user', 'sales user', 'admin', 'business_owner', 'business owner', 'inventory_manager', 'inventory manager'].includes(user?.role?.toLowerCase() || ''),
    isPurchase: ['purchase_user', 'purchase user', 'admin', 'business_owner', 'business owner', 'inventory_manager', 'inventory manager'].includes(user?.role?.toLowerCase() || ''),
    isManufacturing: ['manufacturing_user', 'manufacturing user', 'admin', 'business_owner', 'business owner', 'inventory_manager', 'inventory manager'].includes(user?.role?.toLowerCase() || ''),
    isInventory: ['inventory_manager', 'inventory manager', 'admin', 'business_owner', 'business owner'].includes(user?.role?.toLowerCase() || ''),
    isOwner: ['business_owner', 'business owner'].includes(user?.role?.toLowerCase() || ''),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
