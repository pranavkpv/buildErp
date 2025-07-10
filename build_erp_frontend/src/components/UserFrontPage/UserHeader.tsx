import { adminLogout } from "api/Admin/dashboard";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";

function UserHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [logoutEnable, setLogoutEnable] = useState<boolean>(false);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-900">BuildERP</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-900 transition-colors duration-200 text-lg font-medium nav-link"
            >
              Home
            </Link>
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-900 transition-colors duration-200 text-lg font-medium nav-link"
            >
              About
            </a>
            <Link
              to="/project"
              className="text-gray-700 hover:text-blue-900 transition-colors duration-200 text-lg font-medium nav-link"
            >
              Projects
            </Link>
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-900 transition-colors duration-200 text-lg font-medium nav-link"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-900 transition-colors duration-200 text-lg font-medium nav-link"
            >
              Contact
            </a>
            {token ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-900 transition-colors duration-200 text-lg font-medium nav-link"
                >
                  Profile
                </Link>
                <button
                  onClick={() => setLogoutEnable(true)}
                  className="text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 text-lg font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 nav-logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-900 transition-colors duration-200 text-lg font-medium nav-link"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-blue-900 hover:bg-blue-800 transition-colors duration-200 text-lg font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
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
            {token ? (
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