import React, { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function SiteLogin() {
  const [email, setEmail] = useState('');
  const emailRef = useRef<HTMLParagraphElement>(null);
  const [password, setPassword] = useState('');
  const passwordRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (email.trim() === '') {
      if (emailRef.current) {
        emailRef.current.innerText = 'Email is required. Please enter your email address.';
      }
      hasError = true;
    } else {
      if (emailRef.current) {
        emailRef.current.innerText = '';
      }
    }

    if (password.trim() === '') {
      if (passwordRef.current) {
        passwordRef.current.innerText = 'Password is required. Please enter your password.';
      }
      hasError = true;
    } else {
      if (passwordRef.current) {
        passwordRef.current.innerText = '';
      }
    }

    if (hasError) {
      return;
    }

    try {
      const response = await axios.post(`${ import.meta.env.VITE_BASE_URL }/site/login`, { email, password }, {
        withCredentials: true
      });
      console.log(response.data)

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/site/dashboard');
        }, 3000);
        localStorage.setItem('accessToken', response.data.token.accessToken);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <form
        onSubmit={handleLoginSubmit}
        className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700/50 space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-teal-400 mb-6 border-b border-gray-700 pb-4">
         Sitemanager Login
        </h1>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
          <p ref={emailRef} className="text-red-400 text-sm mt-1"></p>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="text"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
          <p ref={passwordRef} className="text-red-400 text-sm mt-1"></p>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default SiteLogin;