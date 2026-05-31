
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-0 text-indigo-950 font-extrabold text-2xl tracking-tight">
              <span className="text-orange-500 text-3xl">R</span>
              <span>esume Analysis</span>
            </Link>
          </div>

          {/* Middle Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/analyze" className="text-gray-700 hover:text-orange-500 font-medium text-sm transition">Resume Scan</Link>
            <Link to="/services" className="text-gray-700 hover:text-orange-500 font-medium text-sm transition">Resume Services</Link>
            <Link to="/blogs" className="text-gray-700 hover:text-orange-500 font-medium text-sm transition">Career Blogs</Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium text-sm transition">About Us</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium text-sm transition">Dashboard</Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition ml-2">
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 font-semibold text-sm transition">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
