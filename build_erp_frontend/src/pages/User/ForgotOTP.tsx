import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Lock, RefreshCw } from 'lucide-react';
import { resendOTPApi, verifyForgotApi } from '../../api/auth';

function ForgotOTP() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [resend, setResend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const otpRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();

  const otpEmail = localStorage.getItem('otpEmail');

  useEffect(() => {
    let interval: number;

    if (timer < 30) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setResend(true);
      if (timerRef.current) {
        timerRef.current.innerText = 'Time out. You can now resend OTP.';
      }
    }

    return () => clearInterval(interval);
  }, [timer]);

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
        otpRef.current.innerText = 'No email found. Please try again.';
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await verifyForgotApi({ otp, email: otpEmail });
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          navigate('/newPassword');
        }, 1500);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred during verification.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOTP = async () => {
    if (!otpEmail) {
      toast.error('No email found. Please try again.');
      return;
    }

    const response = await resendOTPApi(otpEmail);
    if (response.success) {
      toast.success(response.message);
      setTimer(0);
      setResend(false);
      if (timerRef.current) {
        timerRef.current.innerText = '';
      }
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Construction-themed background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 146, 60, 0.3) 35px, rgba(251, 146, 60, 0.3) 70px)`
            }}
          ></div>
        </div>

        {/* Decorative glowing orbs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-yellow-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative max-w-md w-full mx-auto z-10">
          
          {/* Header Icon Block */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl shadow-2xl mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-2 tracking-tight">
              Security Verification
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 mx-auto rounded-full"></div>
            {otpEmail && (
              <p className="mt-3 text-sm text-gray-300 max-w-xs mx-auto font-medium">
                We sent a 6-digit confirmation code to <span className="text-orange-400 font-semibold">{otpEmail}</span>
              </p>
            )}
          </div>

          {/* Core Panel Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-orange-500/20">
            <form onSubmit={verifyOTP} className="space-y-6">
              
              <div>
                <label htmlFor="otp" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Secure OTP Code <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="otp"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-center tracking-[0.2em] font-mono text-xl text-center w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 hover:border-orange-300"
                    aria-label="6-digit OTP"
                  />
                </div>
                <p ref={otpRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium"></p>
              </div>

              {/* Countdown Dynamic Notice */}
              <div className="text-center text-sm font-medium text-gray-600">
                {timer < 30 ? (
                  <div className="flex items-center justify-center gap-2 text-slate-700 bg-slate-100 py-2 px-3 rounded-xl border border-slate-200">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                    <span>Resend code available in: <strong className="text-orange-600 font-bold">{30 - timer}s</strong></span>
                  </div>
                ) : null}
                <p ref={timerRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium"></p>
              </div>

              {/* Actions Grid */}
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none shadow-lg disabled:shadow-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Confirm & Verify Code</span>
                  )}
                </button>

                <button
                  type="button"
                  disabled={!resend}
                  onClick={resendOTP}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 disabled:from-gray-200 disabled:to-gray-300 text-white disabled:text-gray-400 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none shadow-md disabled:shadow-none flex items-center justify-center gap-2 border border-transparent disabled:border-gray-200"
                  aria-label="Resend OTP"
                >
                  <RefreshCw className={`w-4 h-4 ${!resend ? '' : 'animate-spin-slow'}`} />
                  Resend Code
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}

export default ForgotOTP;