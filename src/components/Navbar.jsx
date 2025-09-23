import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
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

      <button 
      onClick={handleLogout}
      className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
        Logout
      </button>
    </nav>
  );
}
