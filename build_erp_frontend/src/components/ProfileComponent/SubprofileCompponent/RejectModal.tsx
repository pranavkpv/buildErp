import { ShieldAlert, X } from "lucide-react";

interface prop {
  rejectOn: boolean;
  setRejectOn: React.Dispatch<React.SetStateAction<boolean>>;
  setReasonOn: React.Dispatch<React.SetStateAction<boolean>>;
}

function RejectModal({ rejectOn, setRejectOn, setReasonOn }: prop) {
  if (!rejectOn) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-red-500 selection:text-white animate-in fade-in duration-100">
      <div className="relative max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Destructive Critical State Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600" />

        {/* Exit Window Anchor */}
        <button
          type="button"
          onClick={() => setRejectOn(false)}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Abort cancellation prompt"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 text-center">
          
          {/* Severity Icon Deployment */}
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 mb-4 animate-bounce">
            <ShieldAlert className="w-6 h-6" />
          </div>

          {/* Action Call Header */}
          <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider mb-2">
            Interlock Override Request
          </h3>
          
          <p className="text-xs font-mono font-bold text-slate-400 leading-relaxed mb-6 px-2">
            Are you certain you want to reject the current structural estimate data? This operation halts deployment pipelines.
          </p>

          {/* Action Trigger Interface Grid */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRejectOn(false)}
              className="px-4 py-2.5 bg-slate-950 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="button"
              onClick={() => {
                setReasonOn(true);
                setRejectOn(false);
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-red-950/20"
            >
              Confirm
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RejectModal;