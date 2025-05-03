import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-500 p-4 font-[poppins]">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center mr-2">
            <span className="text-white">🗺️</span>
          </div>
          <span className="text-white">NaviNations</span>
        </Link>

        <div className="hidden md:flex space-x-6 font-[poppins] items-center">
          {isLoggedIn && (
            <>
              <Link to="/search" className="text-white hover:hover:text-blue-700 border-b-2 border-transparent">
                Search
              </Link>
            </>
          )}
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login"
              className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
            >
              Login
            </Link>
          )}
        </div>

        <div className="flex md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/region/all" className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Regions
                </Link>
                <Link to="/search" className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Search
                </Link>
              </>
            )}
            {isLoggedIn ? (
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md w-full text-left"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login"
                className="block px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md w-full text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;