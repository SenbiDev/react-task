import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center space-x-4">
        <Link
          to="/home"
          className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
        >
          About
        </Link>
        <Link
          to="/artikel-api"
          className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
        >
          Artikel Api
        </Link>

        <div className="ml-auto flex items-center space-x-3">
          {user ? (
            <>
              <span className="text-gray-300 text-sm">
                {user.name} ({user.email})
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}