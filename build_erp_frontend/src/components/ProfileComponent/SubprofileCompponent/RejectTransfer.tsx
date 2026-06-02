import { rejectTransferApi } from "../../../api/Sitemanager/transfer";
import { toast } from "react-toastify";
import { RadioTower, X } from "lucide-react";

type RejectProp = {
  rejectId: string | undefined;
  onRejectSuccess: () => void;
  setRejectEnable: React.Dispatch<React.SetStateAction<boolean>>;
  rejectEnable: boolean;
  setActionEnable: React.Dispatch<React.SetStateAction<boolean>>;
};

function RejectTransfer({ rejectId, setRejectEnable, rejectEnable, onRejectSuccess, setActionEnable }: RejectProp) {
  if (!rejectEnable || !rejectId) return null;

  const rejectFun = async (targetId: string) => {
    try {
      const response = await rejectTransferApi(targetId);
      if (response.success) {
        toast.success(response.message);
        setRejectEnable(false);
        setActionEnable(false);
        onRejectSuccess();
      } else {
        toast.error(response.message || "Failed to reject transfer");
      }
    } catch (error) {
      toast.error("An error occurred while rejecting the transfer");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-red-500 selection:text-white animate-in fade-in duration-100">
      <div
        className="relative max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Destructive Critical State Border Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600" />

        {/* Exit Window Anchor Line */}
        <button
          type="button"
          onClick={() => setRejectEnable(false)}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Abort transmission cancellation"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 text-center">
          
          {/* Isolation State Icon */}
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 mb-4 animate-pulse">
            <RadioTower className="w-6 h-6" />
          </div>

          {/* Action Call Monospace Identity */}
          <h2
            id="modal-title"
            className="text-sm font-mono font-black text-white uppercase tracking-wider mb-2"
          >
            Intercept Logistic Allocation
          </h2>
          
          <p className="text-xs font-mono font-bold text-slate-400 leading-relaxed mb-6 px-4">
            Confirm terminal rejection for asset transfer node token <span className="text-red-400 font-mono">[{rejectId.slice(-6).toUpperCase()}]</span>? This action is logged.
          </p>

          {/* Control Room Intercept Array */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="px-4 py-2.5 bg-slate-950 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none"
              onClick={() => setRejectEnable(false)}
            >
              Abort Void
            </button>
            <button
              type="button"
              className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-red-950/20 focus:outline-none"
              onClick={() => rejectFun(rejectId)}
            >
              Void Transfer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RejectTransfer;