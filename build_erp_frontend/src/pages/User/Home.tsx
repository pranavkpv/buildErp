import axios from "axios";

import { ArrowRight, Award, Clock, Mail, MapPin, Menu, Phone, Star, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../../components/USER/UserFrontPage/Banner";
import UserHeader from "../../components/USER/common/UserHeader";
import Footer from "../../components/USER/common/Footer";

interface Stat {
  number: string;
  label: string;
}

function Home() {

  const stats: Stat[] = [
    { number: '01', label: 'Years of Excellence' },
    { number: '90', label: 'Projects Completed' },
    { number: '117', label: 'Happy Families' },
    { number: '8K+', label: 'Satisfied Customers' }
  ];


  return (
    <div className="min-h-screen bg-white">

      <UserHeader />
      <Banner />

      {/* Celebrity Endorsement Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
                  alt="Celebrity endorsement for Asset Homes"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg" />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Trusted by Celebrities
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                "Being one of the top real estate home builders in Kochi, Kerala, Asset Homes brings you a new array of apartments, flats, and villas that match your requirements and complement your lifestyle."
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex text-yellow-400" role="img" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">Trusted by thousands</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#0ba7a4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MD's Message Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              MD's Message
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                "We bring you a new array of apartments, flats, and villas that match your requirements and complement your lifestyle. We differ from other home builders in Kerala with our unique styles and perceptions."
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                "Our unique designs with assured quality checks of process and materials ensure you a perfect home. We are one of the leading home builders in Kochi, Kerala who have undertaken several projects and have successfully completed these projects on time."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let us help you find the perfect property that matches your lifestyle and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              aria-label="View available properties"
            >
              View Properties
            </button>
            <button
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              aria-label="Contact us for more information"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;