import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getSpecIdandName } from "../../../api/Specification";
import React, { useState, useEffect, useContext } from "react";
import { X, Layers, CircleDot, CheckCircle2 } from "lucide-react";
import RequirementContext from "../../../Context/RequirementContext";
import { toast } from "react-toastify";
function Requirement({ requireOn, setRequireOn, setConfirmEnable, projectId }) {
    const [specs, setSpecs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { spec_id, setSpecId } = useContext(RequirementContext);
    useEffect(() => {
        if (requireOn) {
            const specFetch = async () => {
                setIsLoading(true);
                try {
                    const response = await getSpecIdandName();
                    if (response.success) {
                        setSpecs(response.data);
                    }
                    else {
                        toast.error(response.message);
                    }
                }
                catch (error) {
                    toast.error("Failed to fetch process requirements.");
                    console.error("Error fetching specs:", error);
                }
                finally {
                    setIsLoading(false);
                }
            };
            specFetch();
        }
    }, [requireOn]);
    const handleClose = () => {
        setRequireOn(false);
    };
    const handleSelectAll = () => {
        if (spec_id.length === specs.length) {
            setSpecId([]);
        }
        else {
            setSpecId(specs.map((spec) => spec._id));
        }
    };
    if (!requireOn)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-orange-500 selection:text-white animate-in fade-in duration-150", children: _jsxs("div", { className: "relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" }), _jsx("button", { onClick: handleClose, "aria-label": "Close specification selector panel", className: "absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs("div", { className: "p-6 sm:p-8", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-slate-850", children: [_jsx("div", { className: "p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0", children: _jsx(Layers, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-base font-black text-white uppercase tracking-wider", children: "Specification Matrix Selection" }), _jsx("p", { className: "text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5", children: "Target configuration parameter scope" })] })] }), isLoading ? (_jsxs("div", { className: "flex flex-col justify-center items-center h-48 gap-3", children: [_jsx("div", { className: "animate-spin rounded-full h-7 w-7 border-2 border-slate-800 border-t-orange-500" }), _jsx("p", { className: "text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest animate-pulse", children: "Syncing Matrix Directories..." })] })) : (_jsxs(_Fragment, { children: [specs.length > 0 && (_jsxs("div", { className: "flex justify-between items-center mb-3 px-1", children: [_jsxs("p", { className: "text-[11px] font-mono font-black text-slate-400 uppercase tracking-wider", children: ["Metrics Active: ", _jsx("span", { className: "text-orange-500 font-bold", children: spec_id.length }), " / ", _jsx("span", { className: "text-slate-500", children: specs.length })] }), _jsx("button", { onClick: handleSelectAll, className: "text-[11px] font-mono font-black text-orange-500 hover:text-orange-400 uppercase tracking-wider transition-colors", "aria-label": spec_id.length === specs.length ? "Deselect all specifications" : "Select all specifications", children: spec_id.length === specs.length ? "Clear Matrix" : "Select Global" })] })), _jsx("div", { className: "flex flex-col gap-2 max-h-[40vh] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950", children: specs.length > 0 ? (specs.map((element) => {
                                        const isChecked = spec_id.includes(element._id);
                                        return (_jsxs("div", { onClick: () => {
                                                if (!isChecked) {
                                                    setSpecId([...spec_id, element._id]);
                                                }
                                                else {
                                                    setSpecId(spec_id.filter((id) => id !== element._id));
                                                }
                                            }, className: `flex items-center gap-3.5 p-3.5 border rounded-xl cursor-pointer select-none transition-all ${isChecked
                                                ? "border-orange-500/30 bg-orange-500/[0.02] shadow-inner shadow-orange-950/10"
                                                : "border-slate-850 bg-slate-950 hover:border-slate-800"}`, children: [_jsxs("div", { className: "relative flex items-center justify-center shrink-0", children: [_jsx("input", { type: "checkbox", id: element._id, value: element._id, checked: isChecked, onChange: () => { }, className: "sr-only" }), isChecked ? (_jsx(CheckCircle2, { className: "w-4 h-4 text-orange-500" })) : (_jsx(CircleDot, { className: "w-4 h-4 text-slate-700" }))] }), _jsx("label", { htmlFor: element._id, className: `text-xs font-mono font-bold cursor-pointer flex-1 transition-colors ${isChecked ? "text-white" : "text-slate-400"}`, children: element.spec_name })] }, element._id));
                                    })) : (_jsx("div", { className: "text-center py-12 border border-dashed border-slate-850 rounded-xl bg-slate-950", children: _jsx("p", { className: "text-xs font-mono font-bold text-slate-600 uppercase tracking-wider", children: "No parameter entries found." }) })) }), _jsxs("div", { className: "flex flex-col sm:flex-row justify-end gap-2 mt-6 pt-4 border-t border-slate-850", children: [_jsx("button", { type: "button", onClick: handleClose, className: "w-full sm:w-auto px-5 py-2.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors order-2 sm:order-1", "aria-label": "Cancel profile requirement matrix choice", children: "Abort Action" }), _jsx("button", { type: "button", onClick: () => {
                                                setConfirmEnable(true);
                                                setRequireOn(false);
                                            }, className: "w-full sm:w-auto px-5 py-2.5 bg-orange-500 text-slate-950 hover:bg-orange-600 disabled:bg-slate-850 disabled:text-slate-600 disabled:cursor-not-allowed rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all order-1 sm:order-2", disabled: specs.length === 0 || spec_id.length === 0, "aria-label": "Commit requirement profile parameters to step stack", children: "Commit Sequence" })] })] }))] })] }) }));
}
export default Requirement;
