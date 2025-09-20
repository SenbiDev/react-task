/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, logout as logoutApi } from "../axios/authApi";

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
      const data = await loginUser({ username, password });

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }

      return true;
    } catch (error) {
      console.error("Login gagal:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (newUser) => {
    try {
      const data = await registerUser(newUser);
      return data;
    } catch (error) {
      console.error("Registrasi gagal:", error);
      throw error;
    }
  };

  const logout = () => {
    logoutApi(); 
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
