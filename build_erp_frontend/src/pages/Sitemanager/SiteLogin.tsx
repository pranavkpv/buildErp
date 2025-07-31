import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SiteManagerLoginAPI } from '../../api/Sitemanager/dashboard';

function SiteLogin() {
  const [email, setEmail] = useState('');
  const emailRef = useRef<HTMLParagraphElement>(null);
  const [password, setPassword] = useState('');
  const passwordRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();
   const [hide, setHide] = useState(false)

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
      const response = await SiteManagerLoginAPI(email,password)
      console.log(response)
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          navigate('/site/dashboard');
        }, 3000);
        localStorage.setItem('accessToken', response.token.accessToken);
      } else {
        toast.error(response.message);
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
          <div className="relative w-full max-w-md">
            <input
              type={hide ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-2.5 bg-gray-800/30 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-100 placeholder-gray-400 text-sm pr-12"
            />
            <button type="button"
              onClick={() => setHide(!hide)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-200 text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label={hide ? "Hide password" : "Show password"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                {hide ? (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.39 4.172 5.325 7.178 9.963 7.178 4.638 0 8.573-3.007 9.963-7.178a10.477 10.477 0 0 0-2.046-3.777m-6.917.557a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6.095-2.223L3.98 8.223"
                  />
                )}
              </svg>
            </button>
          </div>
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