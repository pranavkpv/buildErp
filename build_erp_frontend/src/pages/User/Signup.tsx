import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { userSignupApi } from '../../api/User/user';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hide, setHide] = useState(false);
  const [chide, setChide] = useState(false);

  const userRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLParagraphElement>(null);
  const phoneRef = useRef<HTMLParagraphElement>(null);
  const passRef = useRef<HTMLParagraphElement>(null);
  const cpassRef = useRef<HTMLParagraphElement>(null);

  const navigate = useNavigate();

  const signupFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (username.trim() === '') {
      if (userRef.current) {
        userRef.current.innerText = 'Username is required.';
      }
      hasError = true;
    } else {
      if (userRef.current) {
        userRef.current.innerText = '';
      }
    }

    if (!email.includes('@')) {
      if (emailRef.current) {
        emailRef.current.innerText = 'Please enter a valid email address.';
      }
      hasError = true;
    } else {
      if (emailRef.current) {
        emailRef.current.innerText = '';
      }
    }

    if (isNaN(Number(phone))) {
      if (phoneRef.current) {
        phoneRef.current.innerText = 'Please enter a valid phone number.';
      }
      hasError = true;
    } else {
      if (phoneRef.current) {
        phoneRef.current.innerText = '';
      }
    }

    const passCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*^])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (!passCheck.test(password)) {
      if (passRef.current) {
        passRef.current.innerText = 'Password must include uppercase, lowercase, number, special character, and be 8+ characters long.';
      }
      hasError = true;
    } else {
      if (passRef.current) {
        passRef.current.innerText = '';
      }
    }

    if (password !== confirmPassword) {
      if (cpassRef.current) {
        cpassRef.current.innerText = 'Passwords do not match.';
      }
      hasError = true;
    } else {
      if (cpassRef.current) {
        cpassRef.current.innerText = '';
      }
    }

    if (hasError) {
      return;
    }
      const response = await userSignupApi(username,email,phone,password)

      if (response.success) {
        localStorage.setItem('otpEmail', email);
        toast.success(response.message);
        setTimeout(() => {
          navigate('/otp');
        }, 1500);
      } else {
        toast.error(response.message);
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6">
      <form
        onSubmit={signupFormSubmit}
        className="bg-gray-800/95 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-700/30 space-y-1"
      >
        <h1 className="text-2xl font-bold text-center text-teal-400 mb-4 tracking-tight">
          Create Account
        </h1>

        <div className="space-y-1">
          <label htmlFor="username" className="block text-sm font-medium text-gray-200">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-400/70 text-sm"
          />
          <p ref={userRef} className="text-red-400 text-xs min-h-[1rem]"></p>
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-400/70 text-sm"
          />
          <p ref={emailRef} className="text-red-400 text-xs min-h-[1rem]"></p>
        </div>

        <div className="space-y-1">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-200">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-400/70 text-sm"
          />
          <p ref={phoneRef} className="text-red-400 text-xs min-h-[1rem]"></p>
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <div className="relative">
            <input
              type={hide ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-400/70 text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setHide(!hide)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-600/50 transition-colors duration-200 text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-1 focus:ring-offset-gray-800"
              aria-label={hide ? 'Hide password' : 'Show password'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
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
          <p ref={passRef} className="text-red-400 text-xs min-h-[1rem]"></p>
        </div>

        <div className="space-y-1">
          <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-200">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={chide ? 'text' : 'password'}
              id="confirmpassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-400/70 text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setChide(!chide)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-600/50 transition-colors duration-200 text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-1 focus:ring-offset-gray-800"
              aria-label={chide ? 'Hide password' : 'Show password'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                {chide ? (
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
          <p ref={cpassRef} className="text-red-400 text-xs min-h-[1rem]"></p>
        </div>

        <div className="flex justify-between items-center text-sm">
          <Link
            to="/login"
            className="text-teal-400 hover:text-teal-300 transition-colors duration-200 font-medium"
          >
            Already have an account? Login
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;