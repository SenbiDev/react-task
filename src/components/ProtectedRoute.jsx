import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access");

  if (!token) {
    return <Navigate to="/signin/" replace />;
  }

  return <>{children}</>;
};
