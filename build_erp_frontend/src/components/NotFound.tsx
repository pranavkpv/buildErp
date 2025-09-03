import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4 text-gray-700">Oops! Page not found.</p>
      <p className="text-gray-500 mb-6">The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
