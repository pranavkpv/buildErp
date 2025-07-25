import { adminLogout } from "api/Admin/dashboard";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "../UserFrontPage/LogoutModal";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function UserHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [logoutEnable, setLogoutEnable] = useState<boolean>(false);
  interface TokenPayload {
    userId: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
  }
  const [user, setUser] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      if (decoded.role == "user") {
        setUser(true)
      } else {
        setUser(false)
      }
    }
  },[])
  const navigate = useNavigate();
  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#04a09c] shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white">BuildERP</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-[#22d6d1] transition-colors duration-200 text-lg font-medium nav-link"
            >
              Home
            </Link>
            <a
              href="#about"
              className="text-white hover:text-[#22d6d1] transition-colors duration-200 text-lg font-medium nav-link"
            >
              About
            </a>
            <Link
              to="/project"
              className="text-white hover:text-[#22d6d1] transition-colors duration-200 text-lg font-medium nav-link"
            >
              Projects
            </Link>
            <a
              href="#services"
              className="text-white hover:text-[#22d6d1] transition-colors duration-200 text-lg font-medium nav-link"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-white hover:text-[#22d6d1] transition-colors duration-200 text-lg font-medium nav-link"
            >
              Contact
            </a>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-white hover:text-[#22d6d1] transition-colors duration-200 text-lg font-medium nav-link"
                >
                  Profile
                </Link>
                <button
                  onClick={() => setLogoutEnable(true)}
                  className="text-white bg-[#03b7b1] hover:bg-[#09928e] shadow-lg shadow-black-900 transition-colors duration-200 text-lg font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 nav-logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-blue-900 transition-colors duration-200 text-lg font-medium nav-link"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-[#03b7b1] hover:bg-[#09928e] shadow-lg shadow-black-900 transition-all duration-200 text-lg font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 transform hover:scale-105"
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
              className="text-gray-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 rounded-md p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t transition-all duration-300">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-blue-900 transition-colors duration-200 text-base font-medium nav-link"
            >
              Home
            </Link>
            <a
              href="#about"
              className="block px-3 py-2 text-gray-700 hover:text-blue-900 transition-colors duration-200 text-base font-medium nav-link"
            >
              About
            </a>
            <Link
              to="/project"
              className="block px-3 py-2 text-gray-700 hover:text-blue-900 transition-colors duration-200 text-base font-medium nav-link"
            >
              Projects
            </Link>
            <a
              href="#services"
              className="block px-3 py-2 text-gray-700 hover:text-blue-900 transition-colors duration-200 text-base font-medium nav-link"
            >
              Services
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-gray-700 hover:text-blue-900 transition-colors duration-200 text-base font-medium nav-link"
            >
              Contact
            </a>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-900 transition-colors duration-200 text-base font-medium nav-link"
                >
                  Profile
                </Link>
                <button
                  onClick={() => setLogoutEnable(true)}
                  className="block px-3 py-2 text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 nav-logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-900 transition-colors duration-200 text-base font-medium nav-link"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-white bg-blue-900 hover:bg-blue-800 transition-colors duration-200 text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
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