import Banner from "../../components/USER/UserFrontPage/Banner";
import UserHeader from "../../components/USER/common/UserHeader";
import Footer from "../../components/USER/common/Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchStatusandCountApi } from "../../api/project";
import { useNavigate } from "react-router-dom";

interface Stat {
  number: string;
  label: string;
}

function Home() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const fetchStatusAndCountofProject = async () => {
    const response = await fetchStatusandCountApi();
    if (response.success) {
      setStats(response.data);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    fetchStatusAndCountofProject();
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <UserHeader />
      <Banner />

      {/* Why Choose BuildERP Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-400 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Why Choose BuildERP?
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
              Our comprehensive solution helps achieve ultimate{" "}
              <span className="font-semibold text-indigo-600">customer satisfaction</span> through innovative design, quality construction, and exceptional service
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white opacity-5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 delay-${index * 200} ${
                  isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
                }`}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-white opacity-10 rounded-2xl blur-xl group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="text-4xl md:text-6xl font-bold text-white mb-3 font-mono tracking-tight">
                      {stat.number}
                    </div>
                    <div className="text-blue-100 text-lg font-medium tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MD's Message Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                MD's Message
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto mb-12 rounded-full"></div>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="relative">
                  {/* Quote Icon */}
                  <div className="absolute -top-6 -left-4 text-6xl text-teal-200 font-serif">"</div>
                  
                  <blockquote className="text-2xl md:text-3xl text-gray-800 mb-8 leading-relaxed font-light italic pl-8">
                    We bring you a new array of apartments, flats, and villas that match your requirements and complement your lifestyle. We differ from other home builders in Kerala with our{" "}
                    <span className="font-semibold text-teal-600 not-italic">unique styles and perceptions.</span>
                  </blockquote>
                </div>
              </div>
              
              <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    Our unique designs with assured quality checks of process and materials ensure you a perfect home. We are one of the{" "}
                    <span className="font-semibold text-blue-600">leading home builders in Kochi, Kerala</span> who have undertaken several projects and have successfully completed these projects on time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 bg-gradient-to-br from-gray-800 via-gray-700 to-slate-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-teal-500 opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 opacity-5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Find Your{" "}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Dream Home?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Let us help you find the perfect property that matches your lifestyle and budget with our expert guidance and quality assurance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => navigate('/project')}
                className="group relative bg-gradient-to-r from-teal-500 to-blue-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg min-w-[200px]"
                aria-label="View available properties"
              >
                <span className="relative z-10">View Properties</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => navigate('/contact')}
                className="group relative border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white bg-opacity-10 hover:shadow-2xl shadow-lg min-w-[200px]"
                aria-label="Contact us for more information"
              >
                <span className="relative z-10">Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;