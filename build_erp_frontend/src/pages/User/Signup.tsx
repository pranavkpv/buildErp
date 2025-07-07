import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

    try {
      const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
      const response = await axios.post(`${baseUrl}/signup`, {
        username,
        email,
        phone,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('otpEmail', email);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/otp');
        }, 1500);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <form
        onSubmit={signupFormSubmit}
        className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700/50 space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-teal-400 mb-6 border-b border-gray-700 pb-4">
          Signup
        </h1>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
          <p ref={userRef} className="text-red-400 text-sm mt-1"></p>
        </div>

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
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
          <p ref={phoneRef} className="text-red-400 text-sm mt-1"></p>
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
          <p ref={passRef} className="text-red-400 text-sm mt-1"></p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            type="text"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
          <p ref={cpassRef} className="text-red-400 text-sm mt-1"></p>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;