import { SendOTP } from "../../api/User/user";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


///this page is enter email and send OTP for forgot password
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <form
        onSubmit={otpSendfun}
        className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700/50 space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-teal-400 mb-6 border-b border-gray-700 pb-4">
          Send OTP
        </h1>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
          <p ref={emailRef} className="text-red-400 text-sm mt-1 min-h-[1.5rem]"></p>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}

export default OtpSend;
