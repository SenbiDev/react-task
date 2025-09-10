import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex space-x-4">
        <Link to="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
          Home
        </Link>
        <Link to="/about" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
          About
        </Link>
        <Link to="/signin" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
          Artikel
        </Link>
      </div>
    </nav>
  );
}