import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slice/authslice';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { SignInWithGoogle, userLoginAPI } from '../../api/auth';

type GoogleUser = {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
};

function Login() {
  const [email, setEmail] = useState('');
  const emailRef = useRef<HTMLParagraphElement>(null);
  const [password, setPassword] = useState('');
  const passwordRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();

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
    const response = await userLoginAPI({ email, password });
    if (response.success) {
      toast.success(response.message);
      localStorage.setItem('accessToken', response.data.tokens.accessToken);
      dispatch(
        login({
          _id: response.data.userData._id,
          username: response.data.userData.username,
          email: response.data.userData.email,
          phone: response.data.userData.phone,
          profile_image: response.data?.userData.profile_image,
          token: response.data.tokens.accessToken,
        })
      );
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
      toast.error(response.message);
    }
  };

  const loginWithGoogle = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const user: GoogleUser = jwtDecode(credentialResponse.credential);
      const response = await SignInWithGoogle({
        email: user.email,
        username: user.given_name + user.family_name,
        profile_image: user.picture,
      });
      if (response.success) {
        toast.success(response.message);
        localStorage.setItem('accessToken', response.data.tokens.accessToken);
        dispatch(
          login({
            _id: response.data.userData._id,
            username: response.data.userData.username,
            email: response.data.userData.email,
            phone: response.data.userData.phone,
            profile_image: response.data?.userData.profile_image,
            token: response.data.tokens.accessToken,
          })
        );
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        toast.error(response.message);
      }
    } else {
      console.error("No credential found");
    }
  };

  const handleError = () => {
    console.error("Google login failed");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
      <form
        onSubmit={handleLoginSubmit}
        className="relative bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-sm border border-gray-200 space-y-4"
      >
        {/* Decorative Gradient Border */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-10 rounded-lg blur-md"></div>

        <h1 className="text-2xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Welcome Back
        </h1>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l9 6 9-6M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8" />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-sm"
              aria-label="Email address"
            />
          </div>
          <p ref={emailRef} className="text-red-500 text-xs min-h-[1rem]"></p>
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={hide ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full pl-4 pr-12 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-sm"
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setHide(!hide)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={hide ? "Hide password" : "Show password"}
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
          <p ref={passwordRef} className="text-red-500 text-xs min-h-[1rem]"></p>
        </div>

        <div className="flex justify-end text-sm">
          <Link
            to="/otpsend"
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
            aria-label="Forgot your password?"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Login"
        >
          Login
        </button>

        <div className="flex items-center justify-center gap-3 my-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={loginWithGoogle}
            onError={handleError}
            text="signin_with"
            shape="rectangular"
            size="medium"
            width="250"
          />
        </div>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              aria-label="Sign up for Construction ERP"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;