import { toast } from "react-toastify";
import { ApproveTransferAPI } from "../../../api/Sitemanager/transfer";
import type { Transfer } from "../Transfer";
import { ArrowLeftRight, CheckCircle2, XCircle, Box } from "lucide-react";

type ApproveProp = {
  approveId: string | undefined;
  onApproveSuccess: () => void;
  setApproveEnable: React.Dispatch<React.SetStateAction<boolean>>;
  approveEnable: boolean;
  approveData: Transfer | undefined;
  setActionEnable: React.Dispatch<React.SetStateAction<boolean>>;
};

function ApproveTransfer({ approveId, setApproveEnable, approveEnable, onApproveSuccess, approveData, setActionEnable }: ApproveProp) {
  if (!approveEnable || !approveId || !approveData) return null;

  const approveFun = async (approveId: string) => {
    try {
      const response = await ApproveTransferAPI(approveId, approveData);
      if (response.success) {
        toast.success(response.message);
        setApproveEnable(false);
        setActionEnable(false);
        onApproveSuccess();
      } else {
        toast.error(response.message || "Failed to approve transfer");
      }
    } catch (error) {
      toast.error("An error occurred while approving the transfer");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-orange-500 selection:text-white">
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Structural High-Alert Accent Top Edge Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />

        <div className="p-6">
          {/* Modal Operational Header Warning Frame */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 shrink-0">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="modal-title"
                className="text-sm font-black text-white uppercase tracking-wider"
              >
                Authorize Asset Transfer
              </h2>
              <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                Logistics Chain Manifest Dispatch
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-xs font-sans font-medium text-slate-300 leading-relaxed">
              Are you sure you want to verify and sign off on this inventory relocation? This action updates global storage registries.
            </p>

            {/* Asset Manifest Data Box */}
            <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Box className="w-3 h-3 text-orange-500" /> Manifest Item
                </span>
                <span className="text-[11px] font-black text-orange-400 tracking-wider uppercase">
                  {approveId.slice(-8)}...
                </span>
              </div>
              
              {/* Optional property fallbacks if they exist inside your Transfer type */}
              {"item_name" in approveData && (
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Resource:</span>
                  <span className="text-slate-300 font-bold uppercase">{(approveData as any).item_name}</span>
                </div>
              )}
              {"quantity" in approveData && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Allocated Vol:</span>
                  <span className="text-slate-300 font-bold">{(approveData as any).quantity} units</span>
                </div>
              )}
            </div>
          </div>

          {/* Control Interface Buttons Block */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-2">
            <button
              type="button"
              className="w-full sm:w-auto px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              onClick={() => setApproveEnable(false)}
            >
              <XCircle className="w-3.5 h-3.5 text-slate-500" />
              Abort Action
            </button>
            <button
              type="button"
              className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-slate-950 hover:bg-orange-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/10"
              onClick={() => approveFun(approveId)}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verify Dispatch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApproveTransfer;