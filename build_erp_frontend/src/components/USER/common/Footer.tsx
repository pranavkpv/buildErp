import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from "lucide-react";


function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-orange-900 text-white relative overflow-hidden">
      {/* Construction-themed background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 146, 60, 0.3) 35px, rgba(251, 146, 60, 0.3) 70px)`
        }}></div>
      </div>

      {/* Decorative glowing elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-500 rounded-full filter blur-3xl opacity-10"></div>

      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4 tracking-tight">
              BuildERP
            </h3>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              Leading construction ERP solution provider in Kerala, empowering businesses with innovative technology and seamless project management.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+91XXXXXXXXXX"
                className="group inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg text-gray-300 hover:bg-orange-500 hover:text-white transition-all duration-300 border border-white/20 hover:border-orange-400"
                aria-label="Phone number"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="mailto:info@builderp.com"
                className="group inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg text-gray-300 hover:bg-orange-500 hover:text-white transition-all duration-300 border border-white/20 hover:border-orange-400"
                aria-label="Email address"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://maps.google.com"
                className="group inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg text-gray-300 hover:bg-orange-500 hover:text-white transition-all duration-300 border border-white/20 hover:border-orange-400"
                aria-label="Location"
              >
                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://instagram.com"
                className="group inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg text-gray-300 hover:bg-orange-500 hover:text-white transition-all duration-300 border border-white/20 hover:border-orange-400"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://facebook.com"
                className="group inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg text-gray-300 hover:bg-orange-500 hover:text-white transition-all duration-300 border border-white/20 hover:border-orange-400"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://twitter.com"
                className="group inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg text-gray-300 hover:bg-orange-500 hover:text-white transition-all duration-300 border border-white/20 hover:border-orange-400"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-white">Quick Links</h4>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a
                  href="#home"
                  className="relative text-base hover:text-orange-400 transition-colors duration-200 group flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Home</span>
                  <span className="absolute bottom-0 left-5 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="relative text-base hover:text-orange-400 transition-colors duration-200 group flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>About</span>
                  <span className="absolute bottom-0 left-5 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="relative text-base hover:text-orange-400 transition-colors duration-200 group flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Projects</span>
                  <span className="absolute bottom-0 left-5 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="relative text-base hover:text-orange-400 transition-colors duration-200 group flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Services</span>
                  <span className="absolute bottom-0 left-5 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="relative text-base hover:text-orange-400 transition-colors duration-200 group flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Contact</span>
                  <span className="absolute bottom-0 left-5 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            </ul>
          </div>

          {/* ERP Features */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-white">ERP Features</h4>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a
                  href="#project-management"
                  className="relative text-base hover:text-orange-400 transition-colors duration-200 group flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Project Management</span>
                  <span className="absolute bottom-0 left-5 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#budgeting"
                  className="relative text-base hover:text-orange-400 transition-colors duration-200 group flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Budgeting & Cost</span>
                  <span className="absolute bottom-0 left-5 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#analytics"
                  className="relative text-base hover:text-orange-400 transition-colors duration-200 group flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Analytics & Reports</span>
                  <span className="absolute bottom-0 left-5 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#inventory"
                  className="relative text-base hover:text-orange-400 transition-colors duration-200 group flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>Inventory Management</span>
                  <span className="absolute bottom-0 left-5 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="relative text-base hover:text-orange-400 transition-colors duration-200 group flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Team Collaboration</span>
                  <span className="absolute bottom-0 left-5 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-white">Contact Info</h4>
            </div>
            <div className="space-y-4 text-gray-300 text-base">
              <p className="flex items-start group">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg mr-3 flex-shrink-0 border border-white/20 group-hover:bg-orange-500 group-hover:border-orange-400 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <span className="pt-2">Kozhikode, Kerala, India</span>
              </p>
              <p className="flex items-start group">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg mr-3 flex-shrink-0 border border-white/20 group-hover:bg-orange-500 group-hover:border-orange-400 transition-all duration-300">
                  <Phone className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <a href="tel:+91XXXXXXXXXX" className="pt-2 hover:text-orange-400 transition-colors duration-200 font-medium">
                  +91 XXX XXX XXXX
                </a>
              </p>
              <p className="flex items-start group">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg mr-3 flex-shrink-0 border border-white/20 group-hover:bg-orange-500 group-hover:border-orange-400 transition-all duration-300">
                  <Mail className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <a href="mailto:info@builderp.com" className="pt-2 hover:text-orange-400 transition-colors duration-200 font-medium">
                  info@builderp.com
                </a>
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              <a
                href="/signup"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white px-4 py-3 rounded-xl font-bold text-sm hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Get Started Now
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2026 BuildERP. All rights reserved. | Built for construction industry excellence
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-orange-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#terms" className="hover:text-orange-400 transition-colors duration-200">Terms of Service</a>
              <a href="#cookies" className="hover:text-orange-400 transition-colors duration-200">Cookies</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600"></div>
    </footer>
  );
}


export default Footer;