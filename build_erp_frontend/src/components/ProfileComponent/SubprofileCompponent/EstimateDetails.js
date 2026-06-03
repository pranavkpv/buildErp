import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getAdditionEstimationApi, getEstimationApi, getLabourEstimationApi, getmaterialEstimationApi } from "../../../api/Estimation";
import { useEffect, useState } from "react";
import RejectModal from "./RejectModal";
import ReasonModal from "./ReasonModal";
import ApproveModal from "./ApproveModal";
import { getStageInUser } from "../../../api/auth";
import { toast } from "react-toastify";
import { getExpectedImageApi } from "../../../api/project";
import { AlertTriangle, Calculator, Hammer, HardHat, ImageIcon, Layers, Loader2, TrendingUp, X } from "lucide-react";
function EstimationDetails({ estimateOn, setEstimateOn, projectId, onSuccess, setApprovalStatus }) {
    if (!estimateOn)
        return null;
    const [specData, setSpecData] = useState([]);
    const [specmaterial, setSpecmaterial] = useState([]);
    const [specLabour, setSpecLabour] = useState([]);
    const [specAddition, setSpecAddition] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState([]);
    const [rejectOn, setRejectOn] = useState(false);
    const [approveOn, setApproveOn] = useState(false);
    const [reasonOn, setReasonOn] = useState(false);
    const [stage, setStage] = useState([]);
    const fetchEstimation = async () => {
        const response = await getEstimationApi(projectId);
        if (response.success) {
            setSpecData(response.data);
            if (response.data && response.data.length > 0) {
                setApprovalStatus(response.data[0].approvalStatus);
            }
        }
        else {
            throw new Error(response.message);
        }
    };
    const fetchmaterialEstimation = async () => {
        const response = await getmaterialEstimationApi(projectId);
        if (response.success) {
            setSpecmaterial(response.data);
        }
        else {
            throw new Error(response.message);
        }
    };
    const fetchLabourEstimation = async () => {
        const response = await getLabourEstimationApi(projectId);
        if (response.success) {
            setSpecLabour(response.data);
        }
        else {
            throw new Error(response.message);
        }
    };
    const fetchAdditionalEstimation = async () => {
        const response = await getAdditionEstimationApi(projectId);
        if (response.success) {
            setSpecAddition(response.data);
        }
        else {
            throw new Error(response.message);
        }
    };
    const fetchStage = async () => {
        const response = await getStageInUser(projectId);
        if (response.success) {
            setStage(response.data);
        }
        else {
            toast.error(response.message);
        }
    };
    const fetchExpectedImage = async () => {
        const response = await getExpectedImageApi(projectId);
        if (response.success) {
            setImage(response.data);
        }
        else {
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
            }
            catch (err) {
                setError(err.message || "Failed to parse architectural engine specs.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [projectId]);
    if (loading) {
        return (_jsx("div", { className: "fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center space-y-4", children: [_jsx("div", { className: "flex justify-center", children: _jsx(Loader2, { className: "h-8 w-8 text-orange-500 animate-spin" }) }), _jsx("p", { className: "font-mono text-xs font-bold text-slate-400 uppercase tracking-widest", children: "Parsing Structural Project Estimates..." })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6", children: [_jsxs("div", { className: "flex items-center gap-3 pb-4 border-b border-slate-850", children: [_jsx("div", { className: "p-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl", children: _jsx(AlertTriangle, { className: "w-5 h-5" }) }), _jsx("p", { className: "font-mono text-sm font-black text-red-500 uppercase tracking-wider", children: "System Execution Fault" })] }), _jsx("p", { className: "font-mono text-xs text-slate-400 bg-slate-950 p-4 rounded-xl border border-slate-850 break-words leading-relaxed", children: error }), _jsx("button", { onClick: () => setEstimateOn(false), className: "w-full py-2.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors", children: "Close Operational Port" })] }) }));
    }
    return (_jsx("div", { className: "fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 selection:bg-orange-500 selection:text-white animate-in fade-in duration-150", children: _jsxs("div", { className: "relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden transform transition-all", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600 z-20" }), _jsxs("div", { className: "flex items-center justify-between gap-4 p-6 sm:p-8 border-b border-slate-850 shrink-0", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0", children: _jsx(Calculator, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-base font-black text-white uppercase tracking-wider", children: "Project Bill of Quantities Ledger" }), _jsx("p", { className: "text-[11px] font-mono font-bold text-slate-500 tracking-widest uppercase mt-0.5", children: "Analytical Scope Valuation Breakdown Matrix" })] })] }), _jsx("button", { type: "button", onClick: () => setEstimateOn(false), className: "p-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-500 hover:text-slate-300 rounded-xl transition-colors", "aria-label": "Close configuration board", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "p-6 sm:p-8 overflow-y-auto space-y-10 flex-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950 bg-slate-900/40", children: [_jsxs("section", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Layers, { className: "w-4 h-4 text-orange-500" }), _jsx("h2", { className: "font-mono text-xs font-black text-slate-400 uppercase tracking-widest", children: "01 / Structural Specification Elements" })] }), _jsx("div", { className: "overflow-x-auto rounded-xl border border-slate-850 bg-slate-950/40", children: _jsxs("table", { className: "min-w-full border-collapse", children: [_jsx("thead", { className: "bg-slate-950 border-b border-slate-850", children: _jsx("tr", { children: ["INDEX", "SPECIFICATION_FIELD", "QTY", "UNIT_RATE"].map((h) => (_jsx("th", { className: "px-5 py-3 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest", children: h }, h))) }) }), _jsx("tbody", { className: "divide-y divide-slate-850 bg-slate-900/10", children: specData.length > 0 ? (specData.map((element, index) => (_jsxs("tr", { className: "hover:bg-slate-950/30 transition-colors", children: [_jsx("td", { className: "px-5 py-3.5 font-mono text-xs text-slate-600 font-bold", children: (index + 1).toString().padStart(2, '0') }), _jsx("td", { className: "px-5 py-3.5 font-mono text-xs font-black text-slate-200 uppercase", children: element.spec_name }), _jsx("td", { className: "px-5 py-3.5 font-mono text-xs text-slate-300", children: element.quantity }), _jsxs("td", { className: "px-5 py-3.5 font-mono text-xs font-black text-amber-500", children: ["\u20B9", element.unit_rate.toLocaleString("en-IN", { minimumFractionDigits: 2 })] })] }, element._id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "px-5 py-8 text-center font-mono text-xs font-bold text-slate-600 uppercase tracking-widest", children: "No specifications listed inside scope." }) })) })] }) })] }), _jsxs("section", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Hammer, { className: "w-4 h-4 text-orange-500" }), _jsx("h2", { className: "font-mono text-xs font-black text-slate-400 uppercase tracking-widest", children: "02 / Raw Asset Inventory Allocations" })] }), _jsx("div", { className: "overflow-x-auto rounded-xl border border-slate-850 bg-slate-950/40", children: _jsxs("table", { className: "min-w-full border-collapse", children: [_jsx("thead", { className: "bg-slate-950 border-b border-slate-850", children: _jsx("tr", { children: ["INDEX", "MATERIAL_NOMENCLATURE", "BRAND", "UNIT_INFO", "QTY", "UNIT_RATE"].map((h) => (_jsx("th", { className: "px-5 py-3 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest", children: h }, h))) }) }), _jsx("tbody", { className: "divide-y divide-slate-850 bg-slate-900/10", children: specmaterial.length > 0 ? (specmaterial.map((element, index) => (_jsxs("tr", { className: "hover:bg-slate-950/30 transition-colors", children: [_jsx("td", { className: "px-5 py-3.5 font-mono text-xs text-slate-600 font-bold", children: (index + 1).toString().padStart(2, '0') }), _jsx("td", { className: "px-5 py-3.5 font-mono text-xs font-black text-slate-200 uppercase", children: element.material_name }), _jsx("td", { className: "px-5 py-3.5 font-mono text-xs text-slate-400 uppercase", children: element.brand_name }), _jsx("td", { className: "px-5 py-3.5 font-mono text-xs text-slate-400 uppercase", children: element.unit_name }), _jsx("td", { className: "px-5 py-3.5 font-mono text-xs text-slate-300", children: element.quantity }), _jsxs("td", { className: "px-5 py-3.5 font-mono text-xs font-black text-amber-500", children: ["\u20B9", element.unit_rate.toLocaleString("en-IN", { minimumFractionDigits: 2 })] })] }, element._id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "px-5 py-8 text-center font-mono text-xs font-bold text-slate-600 uppercase tracking-widest", children: "No explicit cargo raw entries filed." }) })) })] }) })] }), _jsxs("section", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(HardHat, { className: "w-4 h-4 text-orange-500" }), _jsx("h2", { className: "font-mono text-xs font-black text-slate-400 uppercase tracking-widest", children: "03 / Human Capital Overhead Projections" })] }), _jsx("div", { className: "overflow-x-auto rounded-xl border border-slate-850 bg-slate-950/40", children: _jsxs("table", { className: "min-w-full border-collapse", children: [_jsx("thead", { className: "bg-slate-950 border-b border-slate-850", children: _jsx("tr", { children: ["INDEX", "CREW_ROLE_CLASS", "PERSONNEL_COUNT", "DAILY_WAGE_BASE"].map((h) => (_jsx("th", { className: "px-5 py-3 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest", children: h }, h))) }) }), _jsx("tbody", { className: "divide-y divide-slate-850 bg-slate-900/10", children: specLabour.length > 0 ? (specLabour.map((element, index) => (_jsxs("tr", { className: "hover:bg-slate-950/30 transition-colors", children: [_jsx("td", { className: "px-5 py-3.5 font-mono text-xs text-slate-600 font-bold", children: (index + 1).toString().padStart(2, '0') }), _jsx("td", { className: "px-5 py-3.5 font-mono text-xs font-black text-slate-200 uppercase", children: element.labour_name }), _jsx("td", { className: "px-5 py-3.5 font-mono text-xs text-slate-300", children: element.numberoflabour }), _jsxs("td", { className: "px-5 py-3.5 font-mono text-xs font-black text-amber-500", children: ["\u20B9", element.daily_wage.toLocaleString("en-IN", { minimumFractionDigits: 2 })] })] }, element._id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "px-5 py-8 text-center font-mono text-xs font-bold text-slate-600 uppercase tracking-widest", children: "No task group labor profiles flagged." }) })) })] }) })] }), _jsxs("section", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Layers, { className: "w-4 h-4 text-orange-500" }), _jsx("h2", { className: "font-mono text-xs font-black text-slate-400 uppercase tracking-widest", children: "04 / Micro-Milestone Allocation Map" })] }), _jsx("div", { className: "overflow-x-auto rounded-xl border border-slate-850 bg-slate-950/40", children: _jsxs("table", { className: "min-w-full border-collapse", children: [_jsx("thead", { className: "bg-slate-950 border-b border-slate-850", children: _jsx("tr", { children: ["INDEX", "STAGE_NOMENCLATURE", "START_DATE", "DEADLINE_DATE", "ESCROW_VOLUME"].map((h) => (_jsx("th", { className: "px-5 py-3 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest", children: h }, h))) }) }), _jsx("tbody", { className: "divide-y divide-slate-850 bg-slate-900/10", children: stage.length > 0 ? (stage.map((element, index) => (_jsxs("tr", { className: "hover:bg-slate-950/30 transition-colors", children: [_jsx("td", { className: "px-5 py-3.5 font-mono text-xs text-slate-600 font-bold", children: (index + 1).toString().padStart(2, '0') }), _jsx("td", { className: "px-5 py-3.5 font-mono text-xs font-black text-slate-200 uppercase", children: element.stage_name }), _jsx("td", { className: "px-5 py-3.5 font-mono text-xs text-slate-400", children: element.start_date.split("T")[0].split('-').reverse().join('-') }), _jsx("td", { className: "px-5 py-3.5 font-mono text-xs text-slate-400", children: element.end_date.split("T")[0].split('-').reverse().join('-') }), _jsxs("td", { className: "px-5 py-3.5 font-mono text-xs font-black text-amber-500", children: ["\u20B9", element.stage_amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })] })] }, element._id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "px-5 py-8 text-center font-mono text-xs font-bold text-slate-600 uppercase tracking-widest", children: "No sequential development stages mapped." }) })) })] }) })] }), _jsxs("section", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(ImageIcon, { className: "w-4 h-4 text-orange-500" }), _jsx("h2", { className: "font-mono text-xs font-black text-slate-400 uppercase tracking-widest", children: "05 / CAD Blueprints & Target Renders" })] }), image.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: image.map((element, index) => (_jsxs("div", { className: "bg-slate-950/50 border border-slate-850 rounded-xl overflow-hidden group hover:border-slate-700 transition-all", children: [_jsx("div", { className: "relative h-44 bg-slate-950 overflow-hidden", children: _jsx("img", { src: element.image, alt: element.title, className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105", onError: (e) => {
                                                        e.currentTarget.src = 'https://via.placeholder.com/300?text=Render+Offline';
                                                    } }) }), _jsx("div", { className: "p-4 bg-slate-900 border-t border-slate-850", children: _jsx("p", { className: "font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider truncate", children: element.title }) })] }, index))) })) : (_jsx("div", { className: "p-6 text-center border border-dashed border-slate-850 rounded-xl bg-slate-950/20", children: _jsx("p", { className: "font-mono text-xs font-bold text-slate-600 uppercase tracking-widest", children: "No graphical visual anchors attached." }) }))] }), _jsxs("section", { className: "p-6 bg-slate-950/60 border border-slate-850 rounded-xl space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-4 h-4 text-orange-500" }), _jsx("h2", { className: "font-mono text-xs font-black text-white uppercase tracking-widest", children: "Consolidated Balance Clearing Ledger" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs uppercase tracking-wider", children: [_jsxs("div", { className: "p-4 bg-slate-900 border border-slate-850 rounded-xl", children: [_jsx("span", { className: "block text-[10px] text-slate-500 font-bold mb-1", children: "AGGREGATE SUPPLEMENTAL SURCHARGE" }), _jsxs("span", { className: "text-sm font-black text-slate-300", children: ["\u20B9", specAddition.length > 0
                                                            ? specAddition.reduce((sum, num) => sum + (num.additionalExpense_amount + num.profit_amount), 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                                            : "0.00"] })] }), _jsxs("div", { className: "p-4 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl shadow-inner", children: [_jsx("span", { className: "block text-[10px] text-orange-500/70 font-black mb-1", children: "TOTAL PROJECT BUDGET DEPLOYMENT" }), _jsxs("span", { className: "text-base font-black text-orange-400", children: ["\u20B9", (specmaterial.reduce((sum, num) => sum + (num.quantity * num.unit_rate), 0) +
                                                            specLabour.reduce((sum, num) => sum + (num.daily_wage * num.numberoflabour), 0) +
                                                            specAddition.reduce((sum, num) => sum + (num.additionalExpense_amount + num.profit_amount), 0)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })] })] })] })] })] }), _jsx("div", { className: "flex justify-end gap-2 p-6 bg-slate-950/60 border-t border-slate-850 shrink-0", children: specData.length > 0 && specData[0].approvalStatus === false ? (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", onClick: () => setEstimateOn(false), className: "px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors", children: "Cancel" }), _jsx("button", { type: "button", onClick: () => setRejectOn(true), className: "px-5 py-2.5 bg-red-500/10 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-slate-950 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all hover:bg-red-500", children: "Reject Scope" }), _jsx("button", { type: "button", onClick: () => setApproveOn(true), className: "px-5 py-2.5 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-slate-950 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-orange-950/20", children: "Approve Scope" })] })) : (_jsx("button", { type: "button", onClick: () => setEstimateOn(false), className: "px-5 py-2.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors", children: "Close Ledger Terminal" })) }), _jsx(RejectModal, { rejectOn: rejectOn, setRejectOn: setRejectOn, setReasonOn: setReasonOn }), _jsx(ReasonModal, { reasonOn: reasonOn, setReasonOn: setReasonOn, projectId: projectId, onSuccess: () => {
                        onSuccess();
                        setEstimateOn(false);
                    } }), _jsx(ApproveModal, { approveOn: approveOn, setApproveOn: setApproveOn, projectId: projectId, onSuccess: () => {
                        onSuccess();
                        setEstimateOn(false);
                    } })] }) }));
}
export default EstimationDetails;
