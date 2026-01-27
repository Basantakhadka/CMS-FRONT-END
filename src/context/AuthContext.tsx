import React, { createContext, useContext, useState } from 'react';
import { PERMISSION_KEY, JWT_TOKEN, BASE_URL } from '../constants';
import { getLocalStorage, setLocalStorage, clearLocalStorage } from '../utils/storageUtils'
import axios from 'axios';

interface User {
  username: string;
  // you can add other user fields from API response if needed
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { username: string; password: string }) => any;
  logout: () => void;
  isAuthenticated: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load token & user from localStorage on mount

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await axios.post(`${ BASE_URL }/auth/login`, credentials);
      if (response) {
        // Save token and user info
        setLocalStorage(JWT_TOKEN, response?.data?.data?.loginInfo?.accessToken);
        setLocalStorage(PERMISSION_KEY, response?.data?.data?.loginInfo?.permissions);
        setToken(response?.data?.data?.loginInfo?.accessToken)
        return response.data;
      } else {
        return response;
      }
    } catch (error: any) {
      console.error('Login failed', error);
      return error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearLocalStorage(JWT_TOKEN);
    clearLocalStorage(PERMISSION_KEY);
  };
  const isAuthenticated = !!getLocalStorage(JWT_TOKEN);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
