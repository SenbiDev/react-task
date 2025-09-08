import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children, redirectTo = "/login", roles }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex items-center space-x-2 text-blue-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  // Belum login → redirect
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Kalau roles dibatasi (misalnya hanya admin)
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />; // redirect ke home
  }

  // Akses diizinkan
  return <>{children}</>;
}