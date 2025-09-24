import { Navigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"

export default function ProtectedRoute({ children, redirectTo = "/", roles }) {
  const { user, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex items-center space-x-2 text-blue-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg">Loading...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />
  }

  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to="/app" replace />
  }

  return <>{children}</>
}