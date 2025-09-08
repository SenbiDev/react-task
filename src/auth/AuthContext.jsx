import React, { createContext, useContext, useState, useEffect } from "react";
import * as authApi from "../api/auth"; 

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ambil user dari localStorage (hasil login sebelumnya)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const data = await authApi.login(username, password);
      // simpan user + token ke state & localStorage
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      setIsLoading(false);
      return data.user;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (username, email, password, password2) => {
    setIsLoading(true);
    try {
      const data = await authApi.register(username, email, password, password2);
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear(); 
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};