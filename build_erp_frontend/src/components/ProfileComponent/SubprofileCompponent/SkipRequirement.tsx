import { adminRequireApi } from "../../../api/requirement";
import { toast } from "react-toastify";
import { X, Binary } from "lucide-react";
import { useState } from "react";

interface Prop {
  skipOn: boolean;
  setSkipOn: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

function SkipRequirement({ skipOn, setSkipOn, projectId, setIsSubmitted }: Prop) {
  const [isLoading, setIsLoading] = useState(false);

  if (!skipOn) return null;

  const handleAdminRequired = async () => {
    setIsLoading(true);
    try {
      const response = await adminRequireApi(projectId);
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          setSkipOn(false);
          setIsSubmitted(false);
        }, 3000);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to process default estimation.");
      console.error("Error in adminRequireApi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-amber-500 selection:text-slate-950 animate-in fade-in duration-100"
      role="dialog"
      aria-modal="true"
      aria-labelledby="skip-requirement-title"
    >
      <div className="relative max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all">
        
        {/* System Bypass State Border Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-600" />

        {/* Exit Window Anchor Link */}
        <button
          onClick={() => setSkipOn(false)}
          aria-label="Close default estimation prompt window"
          disabled={isLoading}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 text-center">
          
          {/* Static System Sequence Icon */}
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500 mb-4">
            <Binary className="w-6 h-6" />
          </div>

          {/* Action Call Header */}
          <h3
            id="skip-requirement-title"
            className="text-sm font-mono font-black text-white uppercase tracking-wider mb-2"
          >
            Bypass Specification Step
          </h3>
          
          <p className="text-xs font-mono font-bold text-slate-400 leading-relaxed mb-6 px-2">
            Initialize default features for project token <span className="text-amber-500 font-mono">[{projectId.slice(-6).toUpperCase()}]</span>? Custom input nodes will be skipped.
          </p>

          {/* Control Room Action Matrix Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSkipOn(false)}
              disabled={isLoading}
              className="px-4 py-2.5 bg-slate-950 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none"
              aria-label="Cancel standard fallback setup"
            >
              Abort
            </button>
            <button
              type="button"
              onClick={handleAdminRequired}
              disabled={isLoading}
              className="flex items-center justify-center min-h-[38px] px-4 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 disabled:from-slate-850 disabled:to-slate-850 text-slate-950 disabled:text-slate-600 disabled:cursor-not-allowed rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-amber-950/10 focus:outline-none"
              aria-label="Confirm static parameter overwrite initialization"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-600 border-t-slate-950" />
              ) : (
                "Run Bypass"
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SkipRequirement;