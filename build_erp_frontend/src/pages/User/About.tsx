import { Link } from "react-router-dom";
import Footer from "../../components/USER/common/Footer";
import UserHeader from "../../components/USER/common/UserHeader";


function About() {
   return (
      <>
        <UserHeader />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Construction-themed background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 146, 60, 0.3) 35px, rgba(251, 146, 60, 0.3) 70px)`
            }}></div>
          </div>

          {/* Decorative glowing orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <header className="w-full text-center py-12 mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl shadow-2xl mb-6">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-4 tracking-tight">
                About BuildERP
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
                Empowering construction businesses to create, build, and execute innovative projects with cutting-edge ERP technology.
              </p>
            </header>

            {/* Main Content */}
            <main className="w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 border-2 border-orange-500/20">
              {/* What is BuildERP Section */}
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent">
                    What is BuildERP?
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-l-4 border-orange-500">
                  <p className="text-gray-700 leading-relaxed text-lg font-medium">
                    BuildERP is a cutting-edge <span className="font-bold text-orange-600">construction industry ERP platform</span> designed to streamline project management, budgeting, and team collaboration for builders, contractors, and developers. Whether you're managing large-scale construction projects, tracking materials, automating workflows, or coordinating teams, BuildERP provides the comprehensive tools and environment to bring your construction projects to life with ease, efficiency, and superior control.
                  </p>
                </div>
              </section>

              {/* Mission Section */}
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent">
                    Our Mission
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-l-4 border-yellow-500">
                  <p className="text-gray-700 leading-relaxed text-lg font-medium">
                    At BuildERP, our mission is to <span className="font-bold text-orange-600">empower construction businesses</span> by offering a seamless, intuitive, and powerful platform for project management and execution. We aim to simplify complex construction workflows, foster innovation and collaboration, and enable builders to focus on what matters most—delivering exceptional construction projects on time and within budget. Our team brings decades of construction industry expertise to every solution we build.
                  </p>
                </div>
              </section>

              {/* Why Choose BuildERP Section */}
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent">
                    Why Choose BuildERP?
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      ),
                      title: "Streamlined Workflow",
                      description: "Intuitive construction management tools to accelerate project development and reduce delays."
                    },
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      ),
                      title: "Cross-Platform Support",
                      description: "Manage construction projects across office, field, and mobile environments seamlessly."
                    },
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      ),
                      title: "Community-Driven",
                      description: "Collaborate with contractors, builders, and professionals in a vibrant construction community."
                    },
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      ),
                      title: "Scalable Solutions",
                      description: "From small residential projects to large commercial construction, BuildERP scales with your business."
                    }
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-300"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {feature.icon}
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Industry Features Section */}
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent">
                    Construction ERP Features
                  </h2>
                </div>
                <ul className="space-y-3">
                  {[
                    "Real-time project tracking and progress monitoring",
                    "Budget management and cost control with financial analytics",
                    "Material inventory and supply chain management",
                    "Team collaboration and field communication tools",
                    "Document management and contract tracking",
                    "Safety compliance and quality control reporting"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 group">
                      <div className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-base font-medium group-hover:text-orange-600 transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Get Started Section */}
              <section className="text-center">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent">
                    Get Started Today
                  </h2>
                </div>
                <p className="text-gray-600 mb-8 text-lg font-medium max-w-2xl mx-auto">
                  Ready to transform your construction business? Join the BuildERP community and start building smarter, faster, and more efficiently today!
                </p>
                <Link
                  to='/proposal'
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white font-bold py-4 px-8 rounded-xl hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Explore BuildERP
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </section>
            </main>

            {/* Trust Badges Section */}
            <section className="mt-12 text-center">
              <p className="text-gray-400 text-sm mb-6 font-medium">Trusted by construction professionals across Kerala</p>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { number: "500+", label: "Projects Managed" },
                  { number: "100+", label: "Construction Companies" },
                  { number: "99%", label: "Customer Satisfaction" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-orange-500/20">
                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </>
   );
};


export default About;