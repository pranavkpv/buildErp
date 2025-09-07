import { SendOTP } from "../../api/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function OtpSend() {
  const [email, setEmail] = useState("");
  const emailRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();

  const otpSendfun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "") {
      if (emailRef.current) {
        emailRef.current.innerText = "Email is required";
      }
      return;
    } else {
      if (emailRef.current) {
        emailRef.current.innerText = "";
      }
    }
    const response = await SendOTP(email);
    if (response.success) {
      localStorage.setItem('otpEmail', email);
      toast.success(response.message);
      setTimeout(() => {
        navigate('/forgototp');
      }, 1500);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
      <form
        onSubmit={otpSendfun}
        className="relative bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-sm border border-gray-200 space-y-4"
      >
        {/* Decorative Gradient Border */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-10 rounded-lg blur-md"></div>

        <h1 className="text-2xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Reset Your Password
        </h1>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Send OTP"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}

export default OtpSend;