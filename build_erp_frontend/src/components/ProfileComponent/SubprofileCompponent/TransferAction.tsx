import { useState } from "react";
import type { Transfer } from "../Transfer";
import ApproveTransfer from "./ApproveTransfer";
import RejectTransfer from "./RejectTransfer";
import { X, ArrowUpRight, Calendar, FileText, Layers } from "lucide-react";

type EditProps = {
  actionEnable: boolean;
  setActionEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onActionSuccess: () => void;
  actionData: Transfer | undefined;
};

function TransferAction({ actionEnable, setActionEnable, onActionSuccess, actionData }: EditProps) {
  if (!actionEnable) return null;

  const [approveEnable, setApproveEnable] = useState(false);
  const [rejectEnable, setRejectEnable] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div
        className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden max-h-[90vh] flex flex-col transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="transfer-modal-title"
      >
        {/* Top Operational Status Ribbon Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600 z-20" />

        {/* Fixed Header Section */}
        <div className="flex items-center justify-between gap-4 p-6 sm:p-8 border-b border-slate-850 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div>
              <h2 id="transfer-modal-title" className="text-base font-black text-white uppercase tracking-wider">
                Material Transfer Authorization
              </h2>
              <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                Verification & Approval Manifest Terminal
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => setActionEnable(false)}
            className="p-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-500 hover:text-slate-300 rounded-xl transition-colors"
            aria-label="Dismiss transfer window"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950 flex-1">
          
          {/* Metadata Display Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-600" /> Target Destination Project
              </label>
              <div className="w-full px-4 py-2.5 bg-slate-950/40 border border-slate-850 rounded-xl text-slate-200 font-mono text-xs font-bold uppercase tracking-wider">
                {actionData?.toproject_name || "NOT_SPECIFIED"}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-600" /> Dispatch Timestamp Node
              </label>
              <div className="w-full px-4 py-2.5 bg-slate-950/40 border border-slate-850 rounded-xl text-slate-200 font-mono text-xs font-bold">
                {actionData?.date
                  ? new Date(actionData.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).split("/").join("-")
                  : "NOT_STAMPED"}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-1.5 text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-600" /> Administrative Manifest Description / Purpose
              </label>
              <div className="w-full px-4 py-2.5 bg-slate-950/40 border border-slate-850 rounded-xl text-slate-300 font-mono text-xs leading-relaxed">
                {actionData?.description || "No supplemental details provided inside this ledger record entry."}
              </div>
            </div>
          </div>

          {/* Material Ledger Structural Grid Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-850 bg-slate-950/40">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-950 border-b border-slate-850">
                <tr>
                  {["INDEX", "MATERIAL_NOMENCLATURE", "BRAND", "UNIT_INFO", "QTY", "UNIT_RATE", "TOTAL_SUM"].map((header, index) => (
                    <th
                      key={header}
                      scope="col"
                      className={`px-4 py-3 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest ${
                        index >= 4 ? "w-28" : index === 0 ? "w-16" : ""
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 bg-slate-900/10">
                {!actionData || actionData.materialDetails.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-12 font-mono text-xs font-bold text-slate-600 uppercase tracking-widest border border-dashed border-slate-850/60"
                    >
                      CRITICAL: No asset cargo breakdown elements available.
                    </td>
                  </tr>
                ) : (
                  actionData.materialDetails.map((element, idx) => (
                    <tr key={element.sl} className="hover:bg-slate-950/30 group transition-colors">
                      <td className="px-4 py-3.5 font-mono text-xs text-slate-600 font-bold w-16">
                        {(idx + 1).toString().padStart(2, '0')}
                      </td>
                      <td className="px-4 py-3.5 text-xs font-mono font-black text-slate-200 uppercase group-hover:text-orange-400 transition-colors">
                        {element.material_name}
                      </td>
                      <td className="px-4 py-3.5 text-xs font-mono text-slate-400 uppercase">
                        {element.brand_name}
                      </td>
                      <td className="px-4 py-3.5 text-xs font-mono text-slate-400 uppercase">
                        {element.unit_name}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-slate-300 w-28">
                        {element.quantity}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-slate-400 w-28">
                        ₹{element.unit_rate.toLocaleString("en-IN")}.00
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs font-black text-amber-500 w-28">
                        ₹{(element.quantity * element.unit_rate).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fixed Footer Bar Action Controls Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-slate-950/60 border-t border-slate-850 shrink-0">
          <div className="text-slate-400 font-mono text-xs font-bold uppercase tracking-wider">
            Consolidated Value Balance: <span className="text-amber-500 font-black text-sm ml-1">₹{actionData?.finalAmount.toLocaleString("en-IN") || "0.00"}.00</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActionEnable(false)}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none"
            >
              Abort
            </button>
            <button
              type="button"
              onClick={() => setRejectEnable(true)}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-red-500/10 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-slate-950 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all hover:bg-red-500 focus:outline-none"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => setApproveEnable(true)}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-slate-950 rounded-xl font-mono text-xs font-black uppercase tracking-wider shadow-lg shadow-orange-950/20 transition-all focus:outline-none"
            >
              Approve
            </button>
          </div>
        </div>

        {/* Abstract Component Verification Layers Hooks */}
        <ApproveTransfer
          approveData={actionData}
          approveEnable={approveEnable}
          approveId={actionData?._id}
          onApproveSuccess={onActionSuccess}
          setApproveEnable={setApproveEnable}
          setActionEnable={setActionEnable}
        />
        <RejectTransfer
          onRejectSuccess={onActionSuccess}
          rejectEnable={rejectEnable}
          rejectId={actionData?._id}
          setRejectEnable={setRejectEnable}
          setActionEnable={setActionEnable}
        />
      </div>
    </div>
  );
}

export default TransferAction;