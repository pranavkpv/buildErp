import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getUserTransferDataAPI } from "../../api/Sitemanager/transfer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TransferAction from "./SubprofileCompponent/TransferAction";
import { ArrowRight, FileSpreadsheet, Box, RefreshCw } from "lucide-react";
function Transfer() {
    const [transferData, setTransferData] = useState([]);
    const [actionEnable, setActionEnable] = useState(false);
    const [actionData, setActionData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const fetchTransferData = async () => {
        setIsLoading(true);
        try {
            const response = await getUserTransferDataAPI();
            if (response.success) {
                setTransferData(response.data);
            }
            else {
                toast.error(response.message || "Error occurred while fetching transfer data");
            }
        }
        catch (error) {
            toast.error("Failed to fetch transfer data");
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchTransferData();
    }, []);
    const formatDate = (dateString) => {
        if (!dateString)
            return "Not provided";
        const [date] = dateString.split("T");
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    };
    return (_jsx("div", { className: "min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 selection:bg-orange-500 selection:text-white", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-800", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2", children: [_jsx(FileSpreadsheet, { className: "w-6 h-6 text-orange-500" }), "Transfer Request Manifest"] }), _jsx("p", { className: "text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mt-1", children: "Active Material Transit Configuration Registry Logs" })] }), _jsxs("button", { onClick: fetchTransferData, disabled: isLoading, className: "px-4 py-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-orange-500 disabled:text-slate-650 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 hover:bg-slate-950", children: [_jsx(RefreshCw, { className: `w-3.5 h-3.5 ${isLoading ? "animate-spin text-orange-500" : ""}` }), "Refresh Registry"] })] }), _jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full text-xs text-left font-sans border-collapse", children: [_jsx("thead", { className: "bg-slate-950 border-b border-slate-800 text-slate-400 font-mono font-bold uppercase tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "px-5 py-4 text-center w-20", children: "Index Node" }), _jsx("th", { className: "px-5 py-4", children: "Timestamp" }), _jsx("th", { className: "px-5 py-4", children: "Logistics Route Allocation (From / To)" }), _jsx("th", { className: "px-5 py-4", children: "Transfer Manifest ID" }), _jsx("th", { className: "px-5 py-4 w-36", children: "Net Valuation" }), _jsx("th", { className: "px-5 py-4 w-40 text-center", children: "Operational Audit" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-800/60 bg-slate-900/40", children: transferData.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "text-center py-16 text-slate-500", children: _jsxs("div", { className: "flex flex-col items-center justify-center gap-3", children: [_jsx(Box, { className: "w-8 h-8 text-slate-700 stroke-[1.5]" }), _jsx("span", { className: "font-mono font-bold text-xs uppercase tracking-widest text-slate-600", children: "No Active Transfer Assets Found in Node Registry" })] }) }) })) : (transferData.map((element, index) => (_jsxs("tr", { className: "hover:bg-slate-950/50 transition-colors duration-150 group", children: [_jsx("td", { className: "px-5 py-4 text-slate-500 font-mono font-bold text-center border-r border-slate-800/40 group-hover:text-slate-400", children: (index + 1).toString().padStart(3, "0") }), _jsx("td", { className: "px-5 py-4 text-slate-300 font-mono font-medium", children: formatDate(element.date) }), _jsx("td", { className: "px-5 py-4", children: _jsxs("div", { className: "flex items-center gap-3 max-w-md", children: [_jsx("span", { className: "font-sans font-bold text-slate-200 uppercase tracking-wide truncate bg-slate-950 px-2.5 py-1 rounded-md border border-slate-850", children: element.fromproject_name }), _jsx(ArrowRight, { className: "w-3.5 h-3.5 text-orange-500 shrink-0" }), _jsx("span", { className: "font-sans font-bold text-slate-200 uppercase tracking-wide truncate bg-slate-950/40 px-2.5 py-1 rounded-md border border-slate-800/60", children: element.toproject_name })] }) }), _jsx("td", { className: "px-5 py-4", children: _jsx("span", { className: "font-mono font-bold text-orange-400/90 tracking-wider uppercase bg-orange-500/5 px-2 py-1 rounded border border-orange-500/10", children: element.transfer_id }) }), _jsxs("td", { className: "px-5 py-4 font-mono font-black text-white text-sm", children: ["\u20B9", element.finalAmount.toLocaleString("en-IN")] }), _jsx("td", { className: "px-5 py-4 text-center", children: _jsx("button", { type: "button", className: "px-3.5 py-1.5 bg-slate-950 border border-slate-800 text-orange-500 hover:text-white hover:bg-orange-500 hover:border-orange-600 rounded-lg text-xs font-mono font-bold uppercase tracking-wider focus:outline-none transition-all duration-150 shadow-md", "aria-label": `View configurations for asset manifest record ${element.transfer_id}`, onClick: () => {
                                                            setActionData(element);
                                                            setActionEnable(true);
                                                        }, children: "Verify Action" }) })] }, element._id)))) })] }) })] }), _jsx(TransferAction, { actionData: actionData, actionEnable: actionEnable, onActionSuccess: fetchTransferData, setActionEnable: setActionEnable })] }) }));
}
export default Transfer;
