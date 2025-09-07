import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">Asset Homes</h3>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              Leading real estate builders in Kochi, Kerala, crafting homes that elevate your lifestyle with quality and innovation.
            </p>
            <div className="flex space-x-4">
              <a
                href="tel:+91XXXXXXXXXX"
                className="group text-gray-300 hover:text-blue-400 transition-all duration-300"
                aria-label="Phone number"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="mailto:info@assethomes.in"
                className="group text-gray-300 hover:text-blue-400 transition-all duration-300"
                aria-label="Email address"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://maps.google.com"
                className="group text-gray-300 hover:text-blue-400 transition-all duration-300"
                aria-label="Location"
              >
                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://instagram.com"
                className="group text-gray-300 hover:text-blue-400 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://facebook.com"
                className="group text-gray-300 hover:text-blue-400 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://twitter.com"
                className="group text-gray-300 hover:text-blue-400 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a
                  href="#home"
                  className="relative text-base hover:text-blue-400 transition-colors duration-200 group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="relative text-base hover:text-blue-400 transition-colors duration-200 group"
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="relative text-base hover:text-blue-400 transition-colors duration-200 group"
                >
                  Projects
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="relative text-base hover:text-blue-400 transition-colors duration-200 group"
                >
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            </ul>
          </div>
          {/* Property Types */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Property Types</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a
                  href="#apartments"
                  className="relative text-base hover:text-blue-400 transition-colors duration-200 group"
                >
                  Apartments
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#villas"
                  className="relative text-base hover:text-blue-400 transition-colors duration-200 group"
                >
                  Villas
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#luxury"
                  className="relative text-base hover:text-blue-400 transition-colors duration-200 group"
                >
                  Luxury Homes
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a
                  href="#budget"
                  className="relative text-base hover:text-blue-400 transition-colors duration-200 group"
                >
                  Budget Homes
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-300 text-base">
              <p className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                Kochi, Kerala, India
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-400" />
                <a href="tel:+91XXXXXXXXXX" className="hover:text-blue-400 transition-colors duration-200">
                  +91 XXX XXX XXXX
                </a>
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-400" />
                <a href="mailto:info@assethomes.in" className="hover:text-blue-400 transition-colors duration-200">
                  info@assethomes.in
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Asset Homes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;