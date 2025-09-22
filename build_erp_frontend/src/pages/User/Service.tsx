import { Link } from "react-router-dom";
import Footer from "../../components/USER/common/Footer";
import UserHeader from "../../components/USER/common/UserHeader";

function Services(){
  return (
   <>
   <UserHeader />
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-4xl mx-auto text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Services</h1>
        <p className="text-lg md:text-xl text-gray-600">Discover the powerful tools and services buildExe offers to supercharge your development journey.</p>
      </header>

      <main className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">What We Offer</h2>
          <p className="text-gray-600 leading-relaxed">
            buildExe provides a suite of services designed to streamline your development process, enhance productivity, and empower you to create innovative solutions. From coding environments to deployment tools, we’ve got you covered.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Our Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Integrated Development Environment</h3>
              <p className="text-gray-600">
                Code seamlessly with our cloud-based IDE, featuring real-time collaboration, syntax highlighting, and support for multiple programming languages.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Automated Build Tools</h3>
              <p className="text-gray-600">
                Simplify your build process with automated pipelines that compile, test, and package your applications with minimal setup.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cross-Platform Deployment</h3>
              <p className="text-gray-600">
                Deploy your projects effortlessly across web, mobile, and desktop platforms with our robust deployment solutions.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Community Collaboration</h3>
              <p className="text-gray-600">
                Join a vibrant community of developers to share projects, get feedback, and collaborate on open-source initiatives.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Ready to Build?</h2>
          <p className="text-gray-600 mb-6">
            Leverage our services to take your projects to the next level. Start exploring buildExe’s capabilities today!
          </p>
          <Link
            to="/proposal"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started with buildExe
          </Link>
        </section>
      </main>

      <footer className="w-full max-w-4xl mx-auto text-center py-6">
        <p className="text-gray-500">&copy; 2025 buildExe. All rights reserved.</p>
      </footer>
    </div>
    <Footer />
   </>
  );
};

export default Services;