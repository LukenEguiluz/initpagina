import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";
import { config } from "../config";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(config.TOKEN_KEY);
      const userData = localStorage.getItem(config.USER_KEY);

      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          setUser(user);
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem(config.TOKEN_KEY);
          localStorage.removeItem(config.REFRESH_TOKEN_KEY);
          localStorage.removeItem(config.USER_KEY);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);

      localStorage.setItem(config.TOKEN_KEY, response.access_token);
      localStorage.setItem(config.REFRESH_TOKEN_KEY, response.refresh_token);
      localStorage.setItem(config.USER_KEY, JSON.stringify(response.user));

      setUser(response.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (credentials) => {
    try {
      const response = await authAPI.register(credentials);

      localStorage.setItem(config.TOKEN_KEY, response.access_token);
      localStorage.setItem(config.REFRESH_TOKEN_KEY, response.refresh_token);
      localStorage.setItem(config.USER_KEY, JSON.stringify(response.user));

      setUser(response.user);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
