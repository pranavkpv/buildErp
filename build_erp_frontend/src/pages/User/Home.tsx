import Banner from "../../components/USER/UserFrontPage/Banner";
import UserHeader from "../../components/USER/common/UserHeader";
import Footer from "../../components/USER/common/Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchStatusandCountApi } from "../../api/project";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";


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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans relative overflow-hidden">
      {/* Construction-themed background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 146, 60, 0.3) 35px, rgba(251, 146, 60, 0.3) 70px)`
        }}></div>
      </div>

      {/* Decorative glowing orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <UserHeader />
      <Banner />

      {/* Why Choose BuildERP Section */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#f97316_0%,transparent_50%),radial-gradient(circle_at_bottom_right,#eab308_0%,transparent_50%)] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg mb-4">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-4 tracking-tight">
              Why Choose BuildERP?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover a seamless ERP solution designed for{" "}
              <span className="font-semibold text-orange-600">ultimate customer satisfaction</span> with innovative workflows, robust analytics, and unparalleled support for construction projects.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%)] bg-[length:60px_60px] opacity-10 animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Our Project Statistics</h3>
            <div className="w-16 h-1 bg-white/30 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ease-out delay-${index * 150} ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-white opacity-0 rounded-xl blur-md group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl p-6 border-2 border-white border-opacity-30 hover:bg-opacity-25 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3 group-hover:bg-white/30 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono tracking-tight">{stat.number}</div>
                    <div className="text-orange-100 text-base md:text-lg font-semibold">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MD's Message Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-4 tracking-tight">MD's Message</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 mx-auto mb-8 rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className={`transition-all duration-700 ease-out delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200">
                <span className="absolute -top-4 -left-2 text-6xl text-orange-300 font-serif">"</span>
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-0 leading-relaxed italic pl-6">
                  Our vision is to deliver exceptional ERP solutions that empower businesses with{" "}
                  <span className="font-semibold text-orange-600 not-italic">innovative technology and seamless integration</span> for construction industry excellence.
                </blockquote>
              </div>
            </div>
            <div className={`transition-all duration-700 ease-out delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 mt-6 border-l-4 border-orange-500">
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  At BuildERP, we prioritize quality, efficiency, and customer-centric design. As a{" "}
                  <span className="font-semibold text-orange-600">leading construction ERP provider</span>, we ensure timely delivery and robust solutions tailored to your project needs. Our team brings decades of construction industry expertise to every implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight Section */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f97316_0%,transparent_50%)] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-4">
                Construction ERP Features
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage construction projects efficiently
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                ),
                title: "Project Management",
                description: "Track multiple construction projects with real-time progress monitoring and resource allocation."
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: "Budget & Cost Control",
                description: "Manage project budgets, track expenses, and control costs with detailed financial analytics."
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                ),
                title: "Team Collaboration",
                description: "Connect field teams, office staff, and stakeholders with seamless communication tools."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${600 + index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-orange-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f97316_0%,transparent_70%)] opacity-10"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg mb-4">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">Construction Business?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore how BuildERP can streamline your construction operations with cutting-edge tools, project tracking, and expert support tailored for the industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/project')}
                className="relative bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2 group"
                aria-label="View available projects"
              >
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
              </button>
              <button
                onClick={() => navigate('/proposal')}
                className="flex items-center gap-2 border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl font-bold text-base hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 bg-opacity-10 hover:bg-opacity-100 shadow-lg"
              >
                <PencilSquareIcon className="w-5 h-5" />
                <span>Start Your Proposal</span>
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