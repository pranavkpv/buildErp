import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "../UserFrontPage/LogoutModal";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

function UserHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [logoutEnable, setLogoutEnable] = useState<boolean>(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      setUser(decoded.role === "user");
    }
  }, []);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold text-blue-900 tracking-tight">
              BuildERP
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="relative text-gray-700 hover:text-blue-600 text-base font-medium transition-colors duration-200 group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a
              href="#about"
              className="relative text-gray-700 hover:text-blue-600 text-base font-medium transition-colors duration-200 group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <Link
              to="/project"
              className="relative text-gray-700 hover:text-blue-600 text-base font-medium transition-colors duration-200 group"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a
              href="#services"
              className="relative text-gray-700 hover:text-blue-600 text-base font-medium transition-colors duration-200 group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <Link
              to="/contact"
              className="relative text-gray-700 hover:text-blue-600 text-base font-medium transition-colors duration-200 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="relative text-gray-700 hover:text-blue-600 text-base font-medium transition-colors duration-200 group"
                >
                  Profile
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <button
                  onClick={() => setLogoutEnable(true)}
                  className="relative bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-full font-medium text-base hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="relative text-gray-700 hover:text-blue-600 text-base font-medium transition-colors duration-200 group"
                >
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/signup"
                  className="relative bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-full font-medium text-base hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Signup
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} className="text-blue-600" /> : <Menu size={24} className="text-blue-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t transition-all duration-500 ease-in-out">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link
              to="/"
              onClick={toggleMenu}
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md text-base font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <a
              href="#about"
              onClick={toggleMenu}
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md text-base font-medium transition-colors duration-200"
            >
              About
            </a>
            <Link
              to="/project"
              onClick={toggleMenu}
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md text-base font-medium transition-colors duration-200"
            >
              Projects
            </Link>
            <a
              href="#services"
              onClick={toggleMenu}
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md text-base font-medium transition-colors duration-200"
            >
              Services
            </a>
            <Link
              to="/contact"
              onClick={toggleMenu}
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md text-base font-medium transition-colors duration-200"
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md text-base font-medium transition-colors duration-200"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setLogoutEnable(true);
                    toggleMenu();
                  }}
                  className="block w-full text-left px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 rounded-md text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md text-base font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleMenu}
                  className="block px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 rounded-md text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      <LogoutModal logoutEnable={logoutEnable} setLogoutEnable={setLogoutEnable} />
    </header>
  );
}

export default UserHeader;