import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Loading from "../../../components/Loading";
import { getProjectBaseTransferAPI } from "../../../api/Sitemanager/transfer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
function TransferModal({ projectId, date, setOpen, open, setTransferId, transferId, setMaterials }) {
    if (!open)
        return null;
    const [transferData, setTransferData] = useState([]);
    const [loadOn, setLoadOn] = useState(false);
    const fetchTransferData = async () => {
        setLoadOn(true);
        const response = await getProjectBaseTransferAPI(projectId, date);
        setLoadOn(false);
        if (response.success) {
            setTransferData(response.data);
        }
        else {
            toast.error(response.message);
        }
    };
    useEffect(() => {
        fetchTransferData();
    }, [projectId, date]);
    const formatDate = (dateString) => {
        if (!dateString)
            return "";
        const [date] = dateString.split("T");
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    };
    const handleSelectTransfer = (transfer) => {
        if (transferId.includes(transfer._id)) {
            setTransferId(transferId.filter((id) => id !== transfer._id));
            setMaterials((prev) => prev.filter((material) => !transfer.materialDetails.some((m) => m.material_id === material.material_id)));
        }
        else {
            setTransferId([...transferId, transfer._id]);
            setMaterials((prev) => [
                ...prev,
                ...transfer.materialDetails.map((m, index) => ({
                    ...m,
                    sl: prev.length + index + 1,
                })),
            ]);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 w-full", children: _jsxs("div", { className: "bg-gray-800 rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Transfer List" }), _jsx("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: _jsxs("table", { className: "min-w-full text-sm text-left bg-gray-800/50", children: [_jsx("thead", { className: "bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 w-[5%]", children: "Select" }), _jsx("th", { className: "px-6 py-4 w-[10%]", children: "SL NO" }), _jsx("th", { className: "px-6 py-4 w-[20%]", children: "Date" }), _jsx("th", { className: "px-6 py-4 w-[25%]", children: "From Project" }), _jsx("th", { className: "px-6 py-4 w-[20%]", children: "TransferId" }), _jsx("th", { className: "px-6 py-4 w-[15%]", children: "Net Amount" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700/50", children: transferData.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "text-center py-8 text-gray-400 text-sm font-medium", children: "No transfer records available." }) })) : (transferData.map((element, index) => (_jsxs("tr", { className: "hover:bg-gray-700/50 transition-colors duration-150", children: [_jsx("td", { className: "px-6 py-4 text-center", children: _jsx("input", { placeholder: "select", type: "checkbox", checked: transferId.includes(element._id), onChange: () => handleSelectTransfer(element), className: "h-4 w-4 text-teal-500 focus:ring-teal-400 border-gray-600 rounded" }) }), _jsx("td", { className: "px-6 py-4 font-medium text-gray-200 text-center", children: index + 1 }), _jsx("td", { className: "px-6 py-4 text-gray-100", children: formatDate(element.date) }), _jsx("td", { className: "px-6 py-4 text-gray-100", children: element.fromproject_name }), _jsx("td", { className: "px-6 py-4 text-gray-100", children: element.transfer_id }), _jsxs("td", { className: "px-6 py-4 text-gray-100", children: ["\u20B9", element.finalAmount] })] }, element._id)))) })] }) }), _jsx("div", { className: "flex justify-end space-x-4 mt-6", children: _jsx("button", { type: "button", onClick: () => setOpen(false), className: "px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200", children: "Add" }) })] }) }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }));
}
export default TransferModal;
