import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resendOTPApi, verifyOTPAPI } from '../../api/auth';

function Otp() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(() => {
    const saved = localStorage.getItem("timer");
    return saved ? Number(saved) : 0;
  });
  const [resend, setResend] = useState(false);
  const [send, setSend] = useState(true);
  const otpRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();

  const otpEmail = localStorage.getItem('otpEmail');

  useEffect(() => {
    let start = Number(localStorage.getItem('timer')) || 0;

    const interval = setInterval(() => {
      if (start < 30) {
        start += 1;
        setTimer(start);
        localStorage.setItem('timer', String(start));
      } else {
        setResend(true);
        setSend(false);
        if (timerRef.current) {
          timerRef.current.innerText = 'Time out. You can now resend OTP.';
        }
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resend]);

  const verifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (otp.trim() === '') {
      if (otpRef.current) otpRef.current.innerText = 'Please enter OTP.';
      hasError = true;
    } else if (!/^\d{6}$/.test(otp)) {
      if (otpRef.current) otpRef.current.innerText = 'OTP must be a 6-digit number.';
      hasError = true;
    } else {
      if (otpRef.current) otpRef.current.innerText = '';
    }

    if (hasError || !otpEmail) {
      if (!otpEmail && otpRef.current) {
        otpRef.current.innerText = 'No email found. Please sign up again.';
      }
      return;
    }

    const response = await verifyOTPAPI({ otp, email: otpEmail });
    if (response.success) {
      toast.success(response.message);
      localStorage.removeItem('otpEmail');
      localStorage.removeItem('timer');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      toast.error(response.message);
    }
  };

  const resendOTP = async () => {
    if (!otpEmail) {
      toast.error('No email found. Please sign up again.');
      return;
    }

    const response = await resendOTPApi(otpEmail);
    if (response.success) {
      toast.success(response.message);
      setTimer(0);
      localStorage.setItem('timer', '0');
      setResend(false);
      setSend(true);
      if (timerRef.current) timerRef.current.innerText = '';
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
      <form
        onSubmit={verifyOTP}
        className="relative bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-sm border border-gray-200 space-y-4"
      >
        {/* Decorative Gradient Border */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-10 rounded-lg blur-md"></div>

        <h1 className="text-2xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Verify OTP
        </h1>

        <div className="space-y-1">
          <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">
            OTP
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="otp"
              placeholder="Enter your 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              pattern="[0-9]*"
              maxLength={6}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-sm"
              aria-label="6-digit OTP"
            />
          </div>
          <p ref={otpRef} className="text-red-500 text-xs min-h-[1rem]"></p>
        </div>

        <div className="text-center text-sm text-gray-600">
          {timer < 30 ? `Time remaining: ${30 - timer} seconds` : ''}
          <p ref={timerRef} className="text-red-500 text-xs min-h-[1rem]"></p>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            disabled={timer >= 30}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Verify OTP"
          >
            Verify OTP
          </button>
          <button
            type="button"
            disabled={!resend}
            onClick={resendOTP}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Resend OTP"
          >
            Resend OTP
          </button>
        </div>
      </form>
    </div>
  );
}

export default Otp;