import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getStageInUser } from "../../../api/auth";
import { X, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
function ProjectImage({ imageEnable, setImageEnable, projectId }) {
    const [stage, setStage] = useState([]);
    const [count, setCount] = useState(0);
    const fetchStage = async () => {
        try {
            const response = await getStageInUser(projectId);
            if (response.success) {
                let x = [];
                for (let element of response.data) {
                    if (!element.stage_image)
                        continue;
                    for (let item of element.stage_image) {
                        if (!item.image)
                            continue;
                        for (let char of item.image) {
                            x.push({ date: item.date, image: char });
                        }
                    }
                }
                setStage(x);
                setCount(0); // Reset index on project switch
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to fetch project image feeds");
            console.error(error);
        }
    };
    useEffect(() => {
        if (imageEnable) {
            fetchStage();
        }
    }, [projectId, imageEnable]);
    if (!imageEnable)
        return null;
    const currentLog = stage[count];
    const totalLogs = stage.length;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-orange-500 selection:text-white animate-in fade-in duration-200", children: _jsxs("div", { className: "relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600 z-10" }), _jsx("button", { title: "Close Feed", onClick: () => setImageEnable(false), className: "absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors z-10 p-1.5 hover:bg-slate-950/60 rounded-xl border border-transparent hover:border-slate-800", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs("div", { className: "p-6 sm:p-8", children: [_jsxs("div", { className: "flex items-center gap-3 mb-5 pb-4 border-b border-slate-850", children: [_jsx("div", { className: "p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0", children: _jsx(Eye, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-base font-black text-white uppercase tracking-wider", children: "Telemetry Media Viewer" }), _jsx("p", { className: "text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5", children: "On-Site Blueprint Progress Capture" })] })] }), totalLogs > 0 ? (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsx("div", { className: "bg-slate-950/60 border border-slate-850 rounded-xl py-2 px-4 text-center", children: _jsxs("span", { className: "text-xs font-mono font-black text-slate-400 uppercase tracking-widest", children: ["LOG_TIMESTAMP: ", _jsx("span", { className: "text-orange-400", children: currentLog?.date?.split('T')[0] || "RAW_DATA" })] }) }), _jsxs("div", { className: "relative w-full h-[26rem] sm:h-[32rem] bg-slate-950 border border-slate-850 rounded-xl overflow-hidden flex items-center justify-center group/canvas", children: [_jsx("div", { className: "absolute inset-0 border border-slate-900/40 pointer-events-none bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" }), _jsx("img", { src: currentLog?.image, alt: "Site progression data frame", className: "w-full h-full object-contain transition-transform duration-300 group-hover/canvas:scale-[1.02]", loading: "eager" })] }), _jsxs("div", { className: "flex items-center justify-between gap-4 mt-2 bg-slate-950 p-2.5 border border-slate-850 rounded-xl", children: [_jsxs("button", { onClick: () => setCount((prev) => Math.max(prev - 1, 0)), disabled: count === 0, className: "flex-1 max-w-[140px] flex items-center justify-center gap-1 px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:text-slate-700 disabled:border-slate-900/50 disabled:bg-slate-900/20 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all disabled:cursor-not-allowed", children: [_jsx(ChevronLeft, { className: "w-4 h-4" }), " Prev Node"] }), _jsxs("div", { className: "font-mono text-xs font-black text-slate-500 uppercase tracking-widest bg-slate-900 px-4 py-2 rounded-lg border border-slate-850", children: ["FRAME: ", _jsx("span", { className: "text-orange-500", children: (count + 1).toString().padStart(2, '0') }), " / ", totalLogs.toString().padStart(2, '0')] }), _jsxs("button", { onClick: () => setCount((prev) => Math.min(prev + 1, totalLogs - 1)), disabled: count === totalLogs - 1, className: "flex-1 max-w-[140px] flex items-center justify-center gap-1 px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:text-slate-700 disabled:border-slate-900/50 disabled:bg-slate-900/20 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all disabled:cursor-not-allowed", children: ["Next Node ", _jsx(ChevronRight, { className: "w-4 h-4" })] })] })] })) : (
                        /* System Empty Fallback Canvas */
                        _jsx("div", { className: "border border-dashed border-slate-800 rounded-xl p-16 text-center bg-slate-950/40", children: _jsx("p", { className: "font-mono text-xs font-bold text-slate-500 uppercase tracking-widest", children: "CRITICAL: No image feeds attached to this construction node." }) }))] })] }) }));
}
export default ProjectImage;
