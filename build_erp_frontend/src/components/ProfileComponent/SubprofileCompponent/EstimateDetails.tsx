import { getAdditionEstimationApi, getEstimationApi, getLabourEstimationApi, getmaterialEstimationApi } from "../../../api/Estimation";
import { useEffect, useState } from "react";
import RejectModal from "./RejectModal";
import ReasonModal from "./ReasonModal";
import ApproveModal from "./ApproveModal";
import { getStageInUser } from "../../../api/auth";
import { toast } from "react-toastify";
import { getExpectedImageApi } from "../../../api/project";
import { AlertTriangle, Calculator, Hammer, HardHat, ImageIcon, Layers, Loader2, TrendingUp, X } from "lucide-react";

interface prop {
   estimateOn: boolean
   setEstimateOn: React.Dispatch<React.SetStateAction<boolean>>;
   projectId: string
   onSuccess: () => void
   setApprovalStatus:React.Dispatch<React.SetStateAction<boolean>>;
}

interface specs {
   _id: string
   spec_name: string
   quantity: number
   unit_rate: number
   approvalStatus: boolean
}

interface materialSpec {
   _id: string
   material_name: string
   brand_name: string
   unit_name: string
   quantity: number
   unit_rate: number
}

interface labourSpec {
   _id: string
   labour_name: string
   numberoflabour: number
   daily_wage: number
}

interface additionSpec {
   additionalExpense_per: number
   additionalExpense_amount: number
   profit_per: number
   profit_amount: number
}

type StageData = {
   _id: string;
   stage_name: string;
   start_date: string;
   end_date: string;
   stage_amount: number;
   progress: number;
   status_date: string;
};

type imageData = {
   image: string
   title: string
}


function EstimationDetails({ estimateOn, setEstimateOn, projectId, onSuccess, setApprovalStatus }: prop) {
   if (!estimateOn) return null;

   const [specData, setSpecData] = useState<specs[]>([]);
   const [specmaterial, setSpecmaterial] = useState<materialSpec[]>([]);
   const [specLabour, setSpecLabour] = useState<labourSpec[]>([]);
   const [specAddition, setSpecAddition] = useState<additionSpec[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [image, setImage] = useState<imageData[]>([]);
   const [rejectOn, setRejectOn] = useState(false);
   const [approveOn, setApproveOn] = useState(false);
   const [reasonOn, setReasonOn] = useState(false);
   const [stage, setStage] = useState<StageData[]>([]);

   const fetchEstimation = async () => {
      const response = await getEstimationApi(projectId);
      if (response.success) {
         setSpecData(response.data);
         if (response.data && response.data.length > 0) {
            setApprovalStatus(response.data[0].approvalStatus);
         }
      } else {
         throw new Error(response.message);
      }
   };

   const fetchmaterialEstimation = async () => {
      const response = await getmaterialEstimationApi(projectId);
      if (response.success) {
         setSpecmaterial(response.data);
      } else {
         throw new Error(response.message);
      }
   };

   const fetchLabourEstimation = async () => {
      const response = await getLabourEstimationApi(projectId);
      if (response.success) {
         setSpecLabour(response.data);
      } else {
         throw new Error(response.message);
      }
   };

   const fetchAdditionalEstimation = async () => {
      const response = await getAdditionEstimationApi(projectId);
      if (response.success) {
         setSpecAddition(response.data);
      } else {
         throw new Error(response.message);
      }
   };

   const fetchStage = async (): Promise<void> => {
      const response = await getStageInUser(projectId);
      if (response.success) {
         setStage(response.data);
      } else {
         toast.error(response.message);
      }
   };

   const fetchExpectedImage = async () => {
      const response = await getExpectedImageApi(projectId);
      if (response.success) {
         setImage(response.data);
      } else {
         toast.error(response.message);
      }
   };

   useEffect(() => {
      const fetchAllData = async () => {
         try {
            setLoading(true);
            setError(null);
            await Promise.all([
               fetchEstimation(),
               fetchmaterialEstimation(),
               fetchLabourEstimation(),
               fetchAdditionalEstimation(),
               fetchStage(),
               fetchExpectedImage()
            ]);
         } catch (err: any) {
            setError(err.message || "Failed to parse architectural engine specs.");
         } finally {
            setLoading(false);
         }
      };
      fetchAllData();
   }, [projectId]);

   if (loading) {
      return (
         <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center space-y-4">
               <div className="flex justify-center">
                  <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
               </div>
               <p className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Parsing Structural Project Estimates...
               </p>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6">
               <div className="flex items-center gap-3 pb-4 border-b border-slate-850">
                  <div className="p-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
                     <AlertTriangle className="w-5 h-5" />
                  </div>
                  <p className="font-mono text-sm font-black text-red-500 uppercase tracking-wider">
                     System Execution Fault
                  </p>
               </div>
               <p className="font-mono text-xs text-slate-400 bg-slate-950 p-4 rounded-xl border border-slate-850 break-words leading-relaxed">
                  {error}
               </p>
               <button
                  onClick={() => setEstimateOn(false)}
                  className="w-full py-2.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors"
               >
                  Close Operational Port
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 selection:bg-orange-500 selection:text-white animate-in fade-in duration-150">
         <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden transform transition-all">
            
            {/* Top Operational Status Ribbon Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600 z-20" />

            {/* Master Terminal Header Area */}
            <div className="flex items-center justify-between gap-4 p-6 sm:p-8 border-b border-slate-850 shrink-0">
               <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0">
                     <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                     <h1 className="text-base font-black text-white uppercase tracking-wider">
                        Project Bill of Quantities Ledger
                     </h1>
                     <p className="text-[11px] font-mono font-bold text-slate-500 tracking-widest uppercase mt-0.5">
                        Analytical Scope Valuation Breakdown Matrix
                     </p>
                  </div>
               </div>
               <button
                  type="button"
                  onClick={() => setEstimateOn(false)}
                  className="p-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-500 hover:text-slate-300 rounded-xl transition-colors"
                  aria-label="Close configuration board"
               >
                  <X className="w-4 h-4" />
               </button>
            </div>

            {/* Master Scroll Directory Container */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-10 flex-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950 bg-slate-900/40">
               
               {/* SECTION 1: Specification Details */}
               <section>
                  <div className="flex items-center gap-2 mb-4">
                     <Layers className="w-4 h-4 text-orange-500" />
                     <h2 className="font-mono text-xs font-black text-slate-400 uppercase tracking-widest">
                        01 / Structural Specification Elements
                     </h2>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-850 bg-slate-950/40">
                     <table className="min-w-full border-collapse">
                        <thead className="bg-slate-950 border-b border-slate-850">
                           <tr>
                              {["INDEX", "SPECIFICATION_FIELD", "QTY", "UNIT_RATE"].map((h) => (
                                 <th key={h} className="px-5 py-3 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">{h}</th>
                              ))}
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850 bg-slate-900/10">
                           {specData.length > 0 ? (
                              specData.map((element, index) => (
                                 <tr key={element._id} className="hover:bg-slate-950/30 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-slate-600 font-bold">{(index + 1).toString().padStart(2, '0')}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs font-black text-slate-200 uppercase">{element.spec_name}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs text-slate-300">{element.quantity}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs font-black text-amber-500">₹{element.unit_rate.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                                 </tr>
                              ))
                           ) : (
                              <tr>
                                 <td colSpan={4} className="px-5 py-8 text-center font-mono text-xs font-bold text-slate-600 uppercase tracking-widest">No specifications listed inside scope.</td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </section>

               {/* SECTION 2: Material Details */}
               <section>
                  <div className="flex items-center gap-2 mb-4">
                     <Hammer className="w-4 h-4 text-orange-500" />
                     <h2 className="font-mono text-xs font-black text-slate-400 uppercase tracking-widest">
                        02 / Raw Asset Inventory Allocations
                     </h2>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-850 bg-slate-950/40">
                     <table className="min-w-full border-collapse">
                        <thead className="bg-slate-950 border-b border-slate-850">
                           <tr>
                              {["INDEX", "MATERIAL_NOMENCLATURE", "BRAND", "UNIT_INFO", "QTY", "UNIT_RATE"].map((h) => (
                                 <th key={h} className="px-5 py-3 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">{h}</th>
                              ))}
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850 bg-slate-900/10">
                           {specmaterial.length > 0 ? (
                              specmaterial.map((element, index) => (
                                 <tr key={element._id} className="hover:bg-slate-950/30 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-slate-600 font-bold">{(index + 1).toString().padStart(2, '0')}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs font-black text-slate-200 uppercase">{element.material_name}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs text-slate-400 uppercase">{element.brand_name}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs text-slate-400 uppercase">{element.unit_name}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs text-slate-300">{element.quantity}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs font-black text-amber-500">₹{element.unit_rate.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                                 </tr>
                              ))
                           ) : (
                              <tr>
                                 <td colSpan={6} className="px-5 py-8 text-center font-mono text-xs font-bold text-slate-600 uppercase tracking-widest">No explicit cargo raw entries filed.</td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </section>

               {/* SECTION 3: Labour Details */}
               <section>
                  <div className="flex items-center gap-2 mb-4">
                     <HardHat className="w-4 h-4 text-orange-500" />
                     <h2 className="font-mono text-xs font-black text-slate-400 uppercase tracking-widest">
                        03 / Human Capital Overhead Projections
                     </h2>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-850 bg-slate-950/40">
                     <table className="min-w-full border-collapse">
                        <thead className="bg-slate-950 border-b border-slate-850">
                           <tr>
                              {["INDEX", "CREW_ROLE_CLASS", "PERSONNEL_COUNT", "DAILY_WAGE_BASE"].map((h) => (
                                 <th key={h} className="px-5 py-3 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">{h}</th>
                              ))}
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850 bg-slate-900/10">
                           {specLabour.length > 0 ? (
                              specLabour.map((element, index) => (
                                 <tr key={element._id} className="hover:bg-slate-950/30 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-slate-600 font-bold">{(index + 1).toString().padStart(2, '0')}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs font-black text-slate-200 uppercase">{element.labour_name}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs text-slate-300">{element.numberoflabour}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs font-black text-amber-500">₹{element.daily_wage.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                                 </tr>
                              ))
                           ) : (
                              <tr>
                                 <td colSpan={4} className="px-5 py-8 text-center font-mono text-xs font-bold text-slate-600 uppercase tracking-widest">No task group labor profiles flagged.</td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </section>

               {/* SECTION 4: Stage Details */}
               <section>
                  <div className="flex items-center gap-2 mb-4">
                     <Layers className="w-4 h-4 text-orange-500" />
                     <h2 className="font-mono text-xs font-black text-slate-400 uppercase tracking-widest">
                        04 / Micro-Milestone Allocation Map
                     </h2>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-850 bg-slate-950/40">
                     <table className="min-w-full border-collapse">
                        <thead className="bg-slate-950 border-b border-slate-850">
                           <tr>
                              {["INDEX", "STAGE_NOMENCLATURE", "START_DATE", "DEADLINE_DATE", "ESCROW_VOLUME"].map((h) => (
                                 <th key={h} className="px-5 py-3 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">{h}</th>
                              ))}
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850 bg-slate-900/10">
                           {stage.length > 0 ? (
                              stage.map((element, index) => (
                                 <tr key={element._id} className="hover:bg-slate-950/30 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-slate-600 font-bold">{(index + 1).toString().padStart(2, '0')}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs font-black text-slate-200 uppercase">{element.stage_name}</td>
                                    <td className="px-5 py-3.5 font-mono text-xs text-slate-400">
                                       {element.start_date.split("T")[0].split('-').reverse().join('-')}
                                    </td>
                                    <td className="px-5 py-3.5 font-mono text-xs text-slate-400">
                                       {element.end_date.split("T")[0].split('-').reverse().join('-')}
                                    </td>
                                    <td className="px-5 py-3.5 font-mono text-xs font-black text-amber-500">₹{element.stage_amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                                 </tr>
                              ))
                           ) : (
                              <tr>
                                 <td colSpan={5} className="px-5 py-8 text-center font-mono text-xs font-bold text-slate-600 uppercase tracking-widest">No sequential development stages mapped.</td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </section>

               {/* SECTION 5: Image Gallery */}
               <section>
                  <div className="flex items-center gap-2 mb-4">
                     <ImageIcon className="w-4 h-4 text-orange-500" />
                     <h2 className="font-mono text-xs font-black text-slate-400 uppercase tracking-widest">
                        05 / CAD Blueprints & Target Renders
                     </h2>
                  </div>
                  {image.length > 0 ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {image.map((element, index) => (
                           <div key={index} className="bg-slate-950/50 border border-slate-850 rounded-xl overflow-hidden group hover:border-slate-700 transition-all">
                              <div className="relative h-44 bg-slate-950 overflow-hidden">
                                 <img
                                    src={element.image}
                                    alt={element.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                       e.currentTarget.src = 'https://via.placeholder.com/300?text=Render+Offline';
                                    }}
                                 />
                              </div>
                              <div className="p-4 bg-slate-900 border-t border-slate-850">
                                 <p className="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider truncate">{element.title}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <div className="p-6 text-center border border-dashed border-slate-850 rounded-xl bg-slate-950/20">
                        <p className="font-mono text-xs font-bold text-slate-600 uppercase tracking-widest">No graphical visual anchors attached.</p>
                     </div>
                  )}
               </section>

               {/* SECTION 6: Financial Summary Metrics */}
               <section className="p-6 bg-slate-950/60 border border-slate-850 rounded-xl space-y-4">
                  <div className="flex items-center gap-2">
                     <TrendingUp className="w-4 h-4 text-orange-500" />
                     <h2 className="font-mono text-xs font-black text-white uppercase tracking-widest">
                        Consolidated Balance Clearing Ledger
                     </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs uppercase tracking-wider">
                     <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl">
                        <span className="block text-[10px] text-slate-500 font-bold mb-1">AGGREGATE SUPPLEMENTAL SURCHARGE</span>
                        <span className="text-sm font-black text-slate-300">
                           ₹{specAddition.length > 0
                              ? specAddition.reduce((sum, num) => sum + (num.additionalExpense_amount + num.profit_amount), 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                              : "0.00"}
                        </span>
                     </div>
                     <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl shadow-inner">
                        <span className="block text-[10px] text-orange-500/70 font-black mb-1">TOTAL PROJECT BUDGET DEPLOYMENT</span>
                        <span className="text-base font-black text-orange-400">
                           ₹{(
                              specmaterial.reduce((sum, num) => sum + (num.quantity * num.unit_rate), 0) +
                              specLabour.reduce((sum, num) => sum + (num.daily_wage * num.numberoflabour), 0) +
                              specAddition.reduce((sum, num) => sum + (num.additionalExpense_amount + num.profit_amount), 0)
                           ).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                     </div>
                  </div>
               </section>

            </div>

            {/* Master Administrative Control Bar */}
            <div className="flex justify-end gap-2 p-6 bg-slate-950/60 border-t border-slate-850 shrink-0">
               {specData.length > 0 && specData[0].approvalStatus === false ? (
                  <>
                     <button
                        type="button"
                        onClick={() => setEstimateOn(false)}
                        className="px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                     >
                        Cancel
                     </button>
                     <button
                        type="button"
                        onClick={() => setRejectOn(true)}
                        className="px-5 py-2.5 bg-red-500/10 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-slate-950 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all hover:bg-red-500"
                     >
                        Reject Scope
                     </button>
                     <button
                        type="button"
                        onClick={() => setApproveOn(true)}
                        className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-slate-950 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-orange-950/20"
                     >
                        Approve Scope
                     </button>
                  </>
               ) : (
                  <button
                     type="button"
                     onClick={() => setEstimateOn(false)}
                     className="px-5 py-2.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                     Close Ledger Terminal
                  </button>
               )}
            </div>

            {/* Downstream Sign-off Modal Pipeline Targets */}
            <RejectModal rejectOn={rejectOn} setRejectOn={setRejectOn} setReasonOn={setReasonOn} />
            <ReasonModal
               reasonOn={reasonOn}
               setReasonOn={setReasonOn}
               projectId={projectId}
               onSuccess={() => {
                  onSuccess();
                  setEstimateOn(false);
               }}
            />
            <ApproveModal
               approveOn={approveOn}
               setApproveOn={setApproveOn}
               projectId={projectId}
               onSuccess={() => {
                  onSuccess();
                  setEstimateOn(false);
               }}
            />
         </div>
      </div>
   );
}

export default EstimationDetails;