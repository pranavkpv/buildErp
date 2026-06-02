import { Bell, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutModal from "../UserFrontPage/LogoutModal";
import { jwtDecode } from "jwt-decode";
import Notification from "../../../components/ADMIN/common/Nofication";
import { toast } from "react-toastify";
import { fetchNotificationByUserApi } from "../../../api/notification";
import { socket } from "../../../api/socket";


interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}


interface notificationData {
  _id: string
  date: Date,
  description: string
  userId: string
  read: boolean
  url: string
}


function UserHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [logoutEnable, setLogoutEnable] = useState<boolean>(false);
  const [user, setUser] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [count, setCount] = useState(0)
  const [notification, setNotification] = useState<notificationData[]>([])



  const displayNotification = async () => {
    const response = await fetchNotificationByUserApi()
    if (response.success) {
      setNotification(response.data)
      setCount(response.data.filter((element: notificationData) => element.read == false).length)
    } else {
      toast.error(response.message)
    }
  }


  socket.on("addNotification",()=>{
    displayNotification()
  })





  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      setUser(decoded.role === "user");
    }
    displayNotification()
  }, []);


  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 border-b-2 border-orange-500/20">
        {/* Top gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent tracking-tight">
                BuildERP
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <Link
                to="/"
                className="relative text-gray-700 hover:text-orange-600 text-base font-semibold transition-colors duration-200 group px-3 py-2"
              >
                Home
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-[calc(100%-24px)] transition-all duration-300 rounded-full"></span>
              </Link>
              <Link
                to="/about"
                className="relative text-gray-700 hover:text-orange-600 text-base font-semibold transition-colors duration-200 group px-3 py-2"
              >
                About
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-[calc(100%-24px)] transition-all duration-300 rounded-full"></span>
              </Link>
              <Link
                to="/project"
                className="relative text-gray-700 hover:text-orange-600 text-base font-semibold transition-colors duration-200 group px-3 py-2"
              >
                Projects
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-[calc(100%-24px)] transition-all duration-300 rounded-full"></span>
              </Link>
              <Link
                to="/service"
                className="relative text-gray-700 hover:text-orange-600 text-base font-semibold transition-colors duration-200 group px-3 py-2"
              >
                Services
                <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-[calc(100%-24px)] transition-all duration-300 rounded-full"></span>
              </Link>
              {user ? (
                <>
                  <Link
                    to="/proposal"
                    className="relative text-gray-700 hover:text-orange-600 text-base font-semibold transition-colors duration-200 group px-3 py-2"
                  >
                    Start Proposal
                    <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-[calc(100%-24px)] transition-all duration-300 rounded-full"></span>
                  </Link>
                  <Link
                    to="/profile"
                    className="relative text-gray-700 hover:text-orange-600 text-base font-semibold transition-colors duration-200 group px-3 py-2"
                  >
                    Profile
                    <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-[calc(100%-24px)] transition-all duration-300 rounded-full"></span>
                  </Link>

                  {/* Notification Button */}
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="relative p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 group"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    {count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg border-2 border-white">
                        {count > 9 ? '9+' : count}
                      </span>
                    )}
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={() => setLogoutEnable(true)}
                    className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center gap-2"
                    aria-label="Logout"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="relative text-gray-700 hover:text-orange-600 text-base font-semibold transition-colors duration-200 group px-3 py-2"
                  >
                    Login
                    <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-[calc(100%-24px)] transition-all duration-300 rounded-full"></span>
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
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
                className="text-gray-700 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-xl p-2 transition-all duration-200 bg-gray-50 hover:bg-orange-50"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X size={24} className="text-orange-600" />
                ) : (
                  <Menu size={24} className="text-orange-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-md border-t-2 border-orange-500/20 transition-all duration-500 ease-in-out shadow-xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link
                to="/"
                onClick={toggleMenu}
                className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl text-base font-semibold transition-all duration-200 border-l-3 border-transparent hover:border-orange-500"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </div>
              </Link>
              <a
                href="#about"
                onClick={toggleMenu}
                className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl text-base font-semibold transition-all duration-200 border-l-3 border-transparent hover:border-orange-500"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About
                </div>
              </a>
              <Link
                to="/project"
                onClick={toggleMenu}
                className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl text-base font-semibold transition-all duration-200 border-l-3 border-transparent hover:border-orange-500"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Projects
                </div>
              </Link>
              <a
                href="#services"
                onClick={toggleMenu}
                className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl text-base font-semibold transition-all duration-200 border-l-3 border-transparent hover:border-orange-500"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Services
                </div>
              </a>
              <Link
                to="/proposal"
                onClick={toggleMenu}
                className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl text-base font-semibold transition-all duration-200 border-l-3 border-transparent hover:border-orange-500"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Start Proposal
                </div>
              </Link>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={toggleMenu}
                    className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl text-base font-semibold transition-all duration-200 border-l-3 border-transparent hover:border-orange-500"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </div>
                  </Link>

                  {/* Notification Button Mobile */}
                  <button
                    onClick={() => {
                      setIsNotificationOpen(!isNotificationOpen);
                      toggleMenu();
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl text-base font-semibold transition-all duration-200 border-l-3 border-transparent hover:border-orange-500 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-orange-500" />
                      Notifications
                    </div>
                    {count > 0 && (
                      <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {count > 9 ? '9+' : count}
                      </span>
                    )}
                  </button>

                  {/* Logout Button Mobile */}
                  <button
                    onClick={() => {
                      setLogoutEnable(true);
                      toggleMenu();
                    }}
                    className="block w-full text-left px-4 py-3 text-white bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 rounded-xl text-base font-bold transition-all duration-300 shadow-lg hover:shadow-xl border-l-4 border-orange-500 flex items-center gap-3"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="block w-full text-center px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl text-base font-semibold transition-all duration-200 border-2 border-gray-200 hover:border-orange-500"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={toggleMenu}
                    className="block w-full text-center px-4 py-3 text-white bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 rounded-xl text-base font-bold transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
      <LogoutModal logoutEnable={logoutEnable} setLogoutEnable={setLogoutEnable} />
      <Notification
        isNotificationOpen={isNotificationOpen}
        setIsNotificationOpen={setIsNotificationOpen}
        notification={notification}
        displayNotification={displayNotification}
      />
    </div>
  );
}


export default UserHeader;