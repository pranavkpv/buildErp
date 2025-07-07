import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function UserHeader() {


   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
   const [activeSlide, setActiveSlide] = useState<number>(0);


   const toggleMenu = (): void => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <header className="bg-white shadow-lg sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
               <div className="flex items-center">
                  <div className="text-2xl font-bold text-blue-900">
                     BuildERP
                  </div>
               </div>

               {/* Desktop Navigation */}
               <nav className="hidden md:flex space-x-8">
                  <Link to="/"className="text-gray-700 hover:text-blue-900 transition-colors">Home</Link>
                  <a href="#about" className="text-gray-700 hover:text-blue-900 transition-colors">About</a>
                   <Link to="/project"className="text-gray-700 hover:text-blue-900 transition-colors">Projects</Link>
                  <a href="#services" className="text-gray-700 hover:text-blue-900 transition-colors">Services</a>
                  <a href="#contact" className="text-gray-700 hover:text-blue-900 transition-colors">Contact</a>
                   <Link to="/profile" className="text-gray-700 hover:text-blue-900 transition-colors">Profile</Link>
               </nav>

               {/* Mobile menu button */}
               <div className="md:hidden">
                  <button

                     onClick={toggleMenu}
                     className="text-gray-700 hover:text-blue-900"

                  >
                     {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile Navigation */}
         {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
               <div className="px-2 pt-2 pb-3 space-y-1">
                  <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-900">Home</a>
                  <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-900">About</a>
                  <a href="#projects" className="block px-3 py-2 text-gray-700 hover:text-blue-900">Projects</a>
                  <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-blue-900">Services</a>
                  <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-900">Contact</a>
               </div>
            </div>
         )}
      </header>
   )
}

export default UserHeader

