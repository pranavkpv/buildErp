import { SendOTP } from "../../api/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail } from 'lucide-react';


function OtpSend() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);
    try {
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
    } catch (error) {
      toast.error("An error occurred while transmitting the confirmation request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Construction-themed background stripe pattern */}
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
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-2 tracking-tight">
              Identify Account
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 mx-auto rounded-full"></div>
            <p className="mt-3 text-sm text-gray-300 max-w-xs mx-auto font-medium">
              Provide your registered address layout to authorize a secure verification dispatch.
            </p>
          </div>

          {/* Core Panel Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-orange-500/20">
            <form onSubmit={otpSendfun} className="space-y-5">
              
              {/* Field Block */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Account Email Address <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300"
                    aria-label="Email address"
                  />
                </div>
                <p ref={emailRef} className="text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium"></p>
              </div>

              {/* Form Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none shadow-lg disabled:shadow-none flex items-center justify-center space-x-2"
                  aria-label="Send OTP"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Transmitting Key...</span>
                    </>
                  ) : (
                    <span>Request Verification Code</span>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}

export default OtpSend;