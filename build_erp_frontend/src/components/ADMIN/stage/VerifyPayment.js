import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getStageForVerifyPayApi } from "../../../api/Admin/StageSetting";
import VerifyModal from "./VerifyModal";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../../components/Loading";
function VerifyPayment() {
    const [stage, setStage] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState([]);
    const [verifyOn, setVerifyOn] = useState(false);
    const [verifyStage, setVerifyStage] = useState("");
    const [loadOn, setLoadOn] = useState(false);
    const fetchStageForVerifyPay = async () => {
        try {
            setLoadOn(true);
            const response = await getStageForVerifyPayApi(search, page);
            setLoadOn(false);
            if (response.success) {
                setStage(response.data.data);
                const pages = Array.from({ length: response.data.totalPage }, (_, i) => i);
                setTotalPage(pages);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to fetch payment data");
        }
    };
    useEffect(() => {
        fetchStageForVerifyPay();
    }, [page, search]);
    const renderAction = (item) => {
        const buttonText = item.payment_status === "completed"
            ? "Verify"
            : item.payment_status === "pending"
                ? "Pending to Payment"
                : "Verified";
        const buttonColors = {
            Verify: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
            "Pending to Payment": "bg-gray-600",
            Verified: "bg-green-600",
        };
        const isDisabled = item.payment_status !== "completed";
        return (_jsx("td", { className: "px-4 py-3 whitespace-nowrap text-sm", children: _jsx("button", { disabled: isDisabled, className: `w-full px-4 py-2 text-white rounded-md text-sm font-medium transition-all duration-200 
            ${buttonColors[buttonText]} 
            disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900`, onClick: () => {
                    if (item.payment_status === "completed") {
                        setVerifyOn(true);
                        setVerifyStage(item._id);
                    }
                }, children: buttonText }) }));
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8", children: [_jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8", children: [_jsx("h1", { className: "text-3xl font-semibold text-gray-100 tracking-tight", children: "Payment Verification" }), _jsx(ReUsableSearch, { search: search, setSearch: setSearch, item: "project name" })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) })), _jsxs("div", { className: "overflow-x-auto rounded-lg border border-gray-800 shadow-lg", children: [_jsxs("table", { className: "min-w-full divide-y divide-gray-800", children: [_jsx("thead", { className: "bg-gray-900/80", children: _jsx("tr", { children: [
                                                "SL NO",
                                                "Project Name",
                                                "Stage Name",
                                                "Stage Amount",
                                                "Date",
                                                "Action",
                                            ].map((header) => (_jsx("th", { scope: "col", className: "px-4 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider", children: header }, header))) }) }), _jsx("tbody", { className: "bg-gray-900 divide-y divide-gray-800", children: stage.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "px-4 py-8 text-center text-gray-400 text-sm", children: "No payment data found." }) })) : (stage.map((item, index) => (_jsxs("tr", { className: "hover:bg-gray-800/50 transition-colors duration-150", children: [_jsx("td", { className: "px-4 py-3.5 text-gray-100 text-sm", children: index + 1 }), _jsx("td", { className: "px-4 py-3.5 text-gray-100 text-sm", children: item.project_name }), _jsx("td", { className: "px-4 py-3.5 text-gray-100 text-sm", children: item.stage_name }), _jsxs("td", { className: "px-4 py-3.5 text-gray-100 text-sm", children: ["\u20B9", item.stage_amount.toLocaleString()] }), _jsx("td", { className: "px-4 py-3.5 text-gray-100 text-sm", children: new Date(item.payment_date)
                                                        .toISOString()
                                                        .split("T")[0]
                                                        .split("-")
                                                        .reverse()
                                                        .join("-") }), renderAction(item)] }, item._id)))) })] }), totalPage.length > 0 && (_jsx(ReUsablePagination, { page: page, setPage: setPage, totalPage: totalPage.length }))] })] }), _jsx(VerifyModal, { verifyOn: verifyOn, setVerifyOn: setVerifyOn, verifyStage: verifyStage, onSuccess: fetchStageForVerifyPay })] }));
}
export default VerifyPayment;
