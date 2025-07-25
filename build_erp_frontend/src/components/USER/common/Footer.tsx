import { Mail, MapPin, Phone } from "lucide-react"

function Footer() {
   return (
      <footer className="bg-[#048e8a] text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               <div>
                  <h3 className="text-2xl font-bold mb-4">ASSET HOMES</h3>
                  <p className="text-gray-200 mb-4">
                     Leading real estate builders in Kochi, Kerala, creating homes that complement your lifestyle.
                  </p>
                  <div className="flex space-x-4">
                     <Phone className="w-5 h-5 text-white" aria-label="Phone" />
                     <Mail className="w-5 h-5 text-white" aria-label="Email" />
                     <MapPin className="w-5 h-5 text-white" aria-label="Location" />
                  </div>
               </div>
               <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-200">
                     <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                     <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                     <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
                     <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-lg font-semibold mb-4">Property Types</h4>
                  <ul className="space-y-2 text-gray-200">
                     <li><a href="#apartments" className="hover:text-white transition-colors">Apartments</a></li>
                     <li><a href="#villas" className="hover:text-white transition-colors">Villas</a></li>
                     <li><a href="#luxury" className="hover:text-white transition-colors">Luxury Homes</a></li>
                     <li><a href="#budget" className="hover:text-white transition-colors">Budget Homes</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                  <div className="space-y-2 text-gray-200">
                     <p>Kochi, Kerala, India</p>
                     <p>Phone: +91 XXX XXX XXXX</p>
                     <p>Email: info@assethomes.in</p>
                  </div>
               </div>
            </div>
            <div className="border-t border-[#025956] mt-8 pt-8 text-center text-gray-200">
               <p>&copy; 2025 Asset Homes. All rights reserved.</p>
            </div>
         </div>
      </footer>
   )
}

export default Footer