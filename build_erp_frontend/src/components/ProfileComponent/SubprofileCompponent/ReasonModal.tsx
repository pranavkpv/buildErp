import { RejectEstimationApi } from "../../../api/Estimation";
import { useState } from "react";
import { toast } from "react-toastify";
import { AlertTriangle, X } from "lucide-react";

interface prop {
  reasonOn: boolean;
  setReasonOn: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  onSuccess: () => void;
}

function ReasonModal({ reasonOn, setReasonOn, projectId, onSuccess }: prop) {
  const [reason, setReason] = useState("");

  if (!reasonOn) return null;

  const submitReasonFun = async () => {
    if (!reason.trim()) {
      toast.error("Please provide an adjustment reason statement");
      return;
    }

    const response = await RejectEstimationApi({ reason, projectId });
    if (response.success) {
      toast.success(response.message);
      onSuccess();
      setReasonOn(false);
      setReason("");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-orange-500 selection:text-white animate-in fade-in duration-150">
      <div className="relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Structural Incident Amber Ribbon Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" />

        {/* Exit Window Anchor */}
        <button
          type="button"
          onClick={() => {
            setReasonOn(false);
            setReason("");
          }}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Close rejection explanation panel"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          {/* Panel Warning Header */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-850">
            <div className="p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                Estimation Fault Log
              </h2>
              <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                Exception Handling Record Desk
              </p>
            </div>
          </div>

          {/* Form Context Field */}
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="rejection-reason"
                className="block text-xs font-mono font-black text-slate-400 uppercase tracking-wider mb-2.5"
              >
                Specify Project Estimation Rejection Reason
              </label>
              
              <textarea
                id="rejection-reason"
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Provide explicit operational parameters, pricing discrepancies, or structural conflicts causing proposal rejection..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:border-orange-500/50 text-slate-200 text-xs font-mono font-bold placeholder:text-slate-700 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Interface Actions Deck */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6 pt-2">
              <button
                type="button"
                onClick={() => {
                  setReasonOn(false);
                  setReason("");
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors order-2 sm:order-1"
              >
                Abort Rejection
              </button>
              
              <button
                type="button"
                onClick={submitReasonFun}
                className="w-full sm:w-auto px-5 py-2.5 bg-orange-500 text-slate-950 hover:bg-orange-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-colors order-1 sm:order-2"
              >
                Commit Fault Log
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ReasonModal;