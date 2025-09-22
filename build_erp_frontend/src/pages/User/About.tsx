import { Link } from "react-router-dom";
import Footer from "../../components/USER/common/Footer";
import UserHeader from "../../components/USER/common/UserHeader";

function About() {
   return (
      <>
         <UserHeader />
         <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <header className="w-full max-w-4xl mx-auto text-center py-8">
               <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About buildExe</h1>
               <p className="text-lg md:text-xl text-gray-600">Empowering developers to create, build, and execute innovative projects.</p>
            </header>

            <main className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
               <section className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">What is buildExe?</h2>
                  <p className="text-gray-600 leading-relaxed">
                     buildExe is a cutting-edge platform designed to streamline the development process for coders, creators, and innovators.
                     Whether you're building web applications, automating workflows, or experimenting with new ideas, buildExe provides the tools
                     and environment to bring your projects to life with ease and efficiency.
                  </p>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                  <p className="text-gray-600 leading-relaxed">
                     At buildExe, our mission is to empower developers by offering a seamless, intuitive, and powerful platform for coding and
                     project execution. We aim to simplify complex workflows, foster creativity, and enable developers to focus on what matters
                     most—building amazing software.
                  </p>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Why Choose buildExe?</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                     <li><span className="font-medium">Streamlined Workflow:</span> Intuitive tools to accelerate development.</li>
                     <li><span className="font-medium">Cross-Platform Support:</span> Build and execute projects across multiple environments.</li>
                     <li><span className="font-medium">Community-Driven:</span> Collaborate and share with a vibrant developer community.</li>
                     <li><span className="font-medium">Scalable Solutions:</span> From small scripts to large-scale applications, buildExe scales with you.</li>
                  </ul>
               </section>

               <section className="text-center">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Get Started Today</h2>
                  <p className="text-gray-600 mb-6">
                     Ready to transform your ideas into reality? Join the buildExe community and start building today!
                  </p>
                  <Link
                     to='/proposal'
                     className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                     Explore buildExe
                  </Link>
               </section>
            </main>
         </div>
         <Footer />
      </>
   );
};

export default About;