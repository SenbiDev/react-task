import React, { createContext, useContext, useState, useEffect } from "react";
import { useLogin, useRegister } from "../hooks/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false); 
  }, []);

  const login = async (username, password) => {
    const data = await loginMutation.mutateAsync({ username, password });
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    return data.user;
  };

  const register = async (username, email, password, password2) => {
    const data = await registerMutation.mutateAsync({
      username,
      email,
      password,
      password2,
    });
    if (data.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout }} 
    >
      {children}
    </AuthContext.Provider>
  );
};