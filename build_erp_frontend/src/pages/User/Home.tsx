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
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <UserHeader />
      <Banner />

      {/* Why Choose BuildERP Section */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#38BDF8_0%,transparent_50%),radial-gradient(circle_at_bottom_right,#10B981_0%,transparent_50%)] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Why Choose BuildERP?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover a seamless ERP solution designed for{" "}
              <span className="font-semibold text-blue-600">ultimate customer satisfaction</span> with innovative workflows, robust analytics, and unparalleled support.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-blue-600 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%)] bg-[length:60px_60px] opacity-10 animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ease-out delay-${index * 150} ${
                  isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
                }`}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-white opacity-0 rounded-xl blur-md group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono">{stat.number}</div>
                    <div className="text-blue-100 text-base md:text-lg font-medium">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MD's Message Section */}
      <section className="relative py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">MD's Message</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto mb-8 rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className={`transition-all duration-700 ease-out delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative">
                <span className="absolute -top-4 -left-2 text-5xl text-blue-200 font-serif">"</span>
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed italic pl-6">
                  Our vision is to deliver exceptional ERP solutions that empower businesses with{" "}
                  <span className="font-semibold text-blue-600 not-italic">innovative technology and seamless integration.</span>
                </blockquote>
              </div>
            </div>
            <div className={`transition-all duration-700 ease-out delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  At BuildERP, we prioritize quality, efficiency, and customer-centric design. As a{" "}
                  <span className="font-semibold text-blue-600">leading ERP provider</span>, we ensure timely delivery and robust solutions tailored to your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#38BDF8_0%,transparent_70%)] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Business?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore how BuildERP can streamline your operations with cutting-edge tools and expert support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/project')}
                className="relative bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-3 rounded-full font-semibold text-base hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                aria-label="View available projects"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 rounded-full transition-opacity duration-300"></div>
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="relative border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-base hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105 bg-opacity-10 hover:bg-opacity-20"
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