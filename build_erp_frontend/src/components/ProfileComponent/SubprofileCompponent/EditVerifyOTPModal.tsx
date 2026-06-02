import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../../redux/slice/authslice";
import { resendForUpadteEmailApi, verifyEditEmailOTP } from "../../../api/userprofile";
import { KeyRound, X, RefreshCw } from "lucide-react";

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
        if (otpRef.current) otpRef.current.innerText = "";
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
        otpRef.current.innerText = "CRITICAL: Input signature must be a 6-digit numeric string.";
      }
      return;
    }
    try {
      const response = await verifyEditEmailOTP(otp);
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
          otpRef.current.innerText = `REJECTED: ${response.message}`;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-orange-500 selection:text-white">
      <div className="relative max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Structural Orange Ribbon Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" />

        {/* Exit Window Button Anchor */}
        <button
          onClick={() => setOtpEnable(false)}
          aria-label="Close OTP verification modal"
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          {/* Panel Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                Security Checkpoint
              </h2>
              <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                OTP Secure Authentication
              </p>
            </div>
          </div>

          {/* Form Content Node */}
          <form onSubmit={verifyOTP} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-xs font-mono font-black text-slate-400 uppercase tracking-wider mb-2">
                Authentication Token
              </label>
              <input
                type="text"
                id="otp"
                maxLength={6}
                placeholder="000000"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/[^0-9]/g, ""));
                  if (otpRef.current) otpRef.current.innerText = "";
                }}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:border-orange-500/50 text-slate-200 text-center text-lg font-mono font-black tracking-[0.5em] placeholder:text-slate-800 placeholder:tracking-normal transition-colors"
              />
              <p ref={otpRef} className="text-red-400 text-[10px] font-mono font-bold mt-2 uppercase tracking-wide min-h-[14px]"></p>
            </div>

            {/* Micro Live Terminal Counter */}
            <div className="bg-slate-950 border border-slate-850/60 rounded-xl p-3 text-center text-[11px] font-mono font-bold uppercase tracking-wider">
              {timer < 30 ? (
                <span className="text-slate-400">
                  Window Expires In: <span className="text-orange-400">{30 - timer}s</span>
                </span>
              ) : (
                <span className="text-amber-500">Token frame expired. Request reissue.</span>
              )}
            </div>

            {/* Action Matrix Deck */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="submit"
                disabled={timer >= 30}
                className="w-full px-4 py-3 bg-orange-500 text-slate-950 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-colors disabled:cursor-not-allowed"
              >
                Verify Signature
              </button>
              
              <button
                type="button"
                disabled={!resend}
                onClick={resendOTP}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 disabled:text-slate-700 disabled:border-transparent disabled:bg-transparent rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${!resend ? '' : 'animate-spin-slow'}`} /> Resend Token
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default EditVarifyOTPModal;