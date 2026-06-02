import { ApproveEstimationApi } from "../../../api/Estimation"
import { toast } from "react-toastify"
import { ShieldAlert, CheckCircle2, XCircle } from "lucide-react"

interface prop {
   approveOn: boolean
   setApproveOn: React.Dispatch<React.SetStateAction<boolean>>
   projectId: string
   onSuccess: () => void
}

function ApproveModal({ approveOn, setApproveOn, projectId, onSuccess }: prop) {
   if (!approveOn) return null

   const approveEstimationFun = async () => {
      const response = await ApproveEstimationApi(projectId)
      if (response.success) {
         toast.success(response.message)
         onSuccess();
         setApproveOn(false)
      } else {
         toast.error(response.message)
      }
   }

   return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 selection:bg-orange-500 selection:text-white">
         <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
            
            {/* Structural High-Alert Accent Top Edge Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
            
            <div className="p-6">
               {/* Modal Operational Header Warning Frame */}
               <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 shrink-0">
                     <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                     <h3 className="text-sm font-black text-white uppercase tracking-wider">
                        Authorization Required
                     </h3>
                     <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                        System Evaluation Sign-off Request
                     </p>
                  </div>
               </div>

               {/* Central Action Prompt */}
               <div className="space-y-4 mb-6">
                  <p className="text-xs font-sans font-medium text-slate-300 leading-relaxed">
                     Are you sure you want to certify and lock this estimation framework into active project logs? This will initiate the subsequent downstream billing matrices.
                  </p>
                  
                  {/* Parameter Reference Tag */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between">
                     <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Project ID Target</span>
                     <span className="text-[11px] font-mono font-black text-orange-400 tracking-wider bg-orange-500/5 px-2 py-0.5 rounded border border-orange-500/10 uppercase">
                        {projectId.slice(-8)}...
                     </span>
                  </div>
               </div>

               {/* Control Interface Buttons Block */}
               <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-2">
                  <button
                     type="button"
                     onClick={() => setApproveOn(false)}
                     className="w-full sm:w-auto px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                     <XCircle className="w-3.5 h-3.5 text-slate-500" />
                     Abort Action
                  </button>
                  <button
                     type="button"
                     onClick={approveEstimationFun}
                     className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-slate-950 hover:bg-orange-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/10"
                  >
                     <CheckCircle2 className="w-3.5 h-3.5" />
                     Verify Approval
                  </button>
               </div>

            </div>
         </div>
      </div>
   )
}

export default ApproveModal