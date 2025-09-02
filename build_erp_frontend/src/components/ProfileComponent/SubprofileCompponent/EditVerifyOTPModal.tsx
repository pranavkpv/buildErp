import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../../redux/slice/authslice";
import { resendForUpadteEmailApi, verifyEditEmailOTP } from "../../../api/userprofile";

type OtpEnableProp = {
  setOtpEnable: React.Dispatch<React.SetStateAction<boolean>>;
  OtpEnable: boolean;
};

function EditVarifyOTPModal({ setOtpEnable, OtpEnable }: OtpEnableProp) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState(0);
  const [resend, setResend] = useState(false);
  const otpRef = useRef<HTMLParagraphElement>(null);

  const resendOTP = async () => {
    try {
      const response = await resendForUpadteEmailApi();
      if (response.success) {
        toast.success(response.message);
        setTimer(0);
        setResend(false);
        localStorage.setItem("timer", "0");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
      console.error("Error resending OTP:", error);
    }
  };

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.match(/^\d{6}$/)) {
      if (otpRef.current) {
        otpRef.current.innerText = "Please enter a valid 6-digit OTP";
      }
      return;
    }
    try {
      const response = await verifyEditEmailOTP(otp);
      console.log(response)
      if (response.success) {
        toast.success(response.message);
        dispatch(
          login({
            _id: response.data._id,
            username: response.data.username,
            email: response.data.email,
            phone: response.data.phone,
            profile_image: response.data?.profile_image,
            token: localStorage.getItem("accessToken") || "",
          })
        );
        setOtpEnable(false);
        setTimer(0);
        localStorage.removeItem("timer");
      } else {
        toast.error(response.message);
        if (otpRef.current) {
          otpRef.current.innerText = response.message;
        }
      }
    } catch (error) {
      toast.error("Failed to verify OTP");
      console.error("Error verifying OTP:", error);
    }
  };

  useEffect(() => {
    if (!OtpEnable) return;
    const savedTimer = Number(localStorage.getItem("timer")) || 0;
    setTimer(savedTimer);

    const interval = setInterval(() => {
      setTimer((prev) => {
        const newTimer = prev + 1;
        if (newTimer >= 30) {
          setResend(true);
          localStorage.setItem("timer", "30");
          clearInterval(interval);
          return 30;
        }
        localStorage.setItem("timer", String(newTimer));
        return newTimer;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [OtpEnable]);

  if (!OtpEnable) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/90 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm border border-gray-700/50">
        <h2 className="text-xl font-semibold text-gray-100 mb-6">OTP Verification</h2>
        <form onSubmit={verifyOTP} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-1">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter your 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm"
            />
            <p ref={otpRef} className="text-red-400 text-sm mt-1"></p>
          </div>
          <div className="text-center text-gray-400 text-sm">
            {timer < 30 ? `Time remaining: ${30 - timer} seconds` : "Time out. You can now resend OTP."}
          </div>
          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={timer >= 30}
              className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify OTP
            </button>
            <button
              type="button"
              disabled={!resend}
              onClick={resendOTP}
              className="w-full px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditVarifyOTPModal;