import { UpdatePasswordInCheckCurrentPassword } from "../../api/userprofile";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import type { RootState } from "redux/store";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentRef = useRef<HTMLParagraphElement>(null);
  const passRef = useRef<HTMLParagraphElement>(null);
  const cpassRef = useRef<HTMLParagraphElement>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    let error = false;

    if (currentPassword.trim() === "") {
      if (currentRef.current) currentRef.current.innerText = "Current access credentials required";
      error = true;
    } else if (currentRef.current) currentRef.current.innerText = "";

    if (password.trim() === "") {
      if (passRef.current) passRef.current.innerText = "New target passkey required";
      error = true;
    } else if (passRef.current) passRef.current.innerText = "";

    if (cpassword.trim() === "") {
      if (cpassRef.current) cpassRef.current.innerText = "Verification passkey confirmation required";
      error = true;
    } else if (password !== cpassword) {
      if (cpassRef.current) cpassRef.current.innerText = "Passkey mismatch detected";
      error = true;
    } else if (cpassRef.current) cpassRef.current.innerText = "";

    if (error) return;
    if (!user) {
      toast.error("User identity node could not be authenticated");
      return;
    }
    
    const response = await UpdatePasswordInCheckCurrentPassword({ 
      email: user.email, 
      currentpassword: currentPassword, 
      password 
    });
    
    if (response.success) {
      toast.success(response.message);
      setCurrentPassword("");
      setPassword("");
      setCpassword("");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden">
      
      {/* Structural Card Status Edge Highlight */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-500" />
      
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Module Header Display */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-wider">Security Guard</h2>
            <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Update Security Passkey</p>
          </div>
        </div>

        <form onSubmit={submitForm} className="space-y-4">
          
          {/* Input Block: Current Password */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-1">
              Current Entry Key
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="••••••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-950 text-slate-200 border-2 border-slate-800 rounded-xl placeholder-slate-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                aria-label={showCurrent ? "Hide password" : "Show password"}
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p ref={currentRef} className="text-rose-500 font-mono text-xs font-semibold px-1 min-h-[1rem] pt-0.5"></p>
          </div>

          {/* Input Block: New Password */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-1">
              New Target Key
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showNew ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-950 text-slate-200 border-2 border-slate-800 rounded-xl placeholder-slate-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p ref={passRef} className="text-rose-500 font-mono text-xs font-semibold px-1 min-h-[1rem] pt-0.5"></p>
          </div>

          {/* Input Block: Confirm Password */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-1">
              Confirm Validation Key
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••••••"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-950 text-slate-200 border-2 border-slate-800 rounded-xl placeholder-slate-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p ref={cpassRef} className="text-rose-500 font-mono text-xs font-semibold px-1 min-h-[1rem] pt-0.5"></p>
          </div>

          {/* Action Trigger Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 text-white font-black rounded-xl transition-all duration-300 shadow-lg text-xs uppercase tracking-wider"
            >
              Commit Key Change
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;