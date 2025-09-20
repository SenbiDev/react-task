import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between">
      {/* Menu Kiri */}
      <div className="container mx-auto flex space-x-4">
        <Link
          to="/"
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
          to="/artikel"
          className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
        >
          Artikel
        </Link>
      </div>

      {/* Menu User */}
      {user && (
        <div className="flex items-center gap-[40px]">
          <div className="flex items-center space-x-3">
            {/* Kalau kamu belum ada avatar di API, bagian ini bisa dihapus */}
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.name || "User"}
                className="w-8 h-8 rounded-full bg-gray-200"
              />
            )}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-200">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-white hover:text-blue-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}
