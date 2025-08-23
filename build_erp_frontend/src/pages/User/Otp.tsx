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
    console.log(response)
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <form
        onSubmit={verifyOTP}
        className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700/50 space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-teal-400 mb-6 border-b border-gray-700 pb-4">
          OTP Verification
        </h1>

        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-1">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            placeholder="Enter your 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            pattern="[0-9]*"
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
          <p ref={otpRef} className="text-red-400 text-sm mt-1"></p>
        </div>

        <div className="text-center text-gray-300 text-sm">
          {timer < 30 ? `Time remaining: ${30 - timer} seconds` : ''}
          <p ref={timerRef} className="text-red-400 text-sm mt-1"></p>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            disabled={timer >= 30}
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify OTP
          </button>
          <button
            type="button"
            disabled={!resend}
            onClick={resendOTP}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Resend OTP
          </button>
        </div>
      </form>
    </div>
  );
}

export default Otp;
