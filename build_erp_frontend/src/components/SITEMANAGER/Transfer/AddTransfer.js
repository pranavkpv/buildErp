import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getSitemanagersProject } from "../../../api/Sitemanager/profile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchFullStockApi, getLastTransferId, saveTransferApI, ToProjectFetchAPI } from "../../../api/Sitemanager/transfer";
import Loading from "../../../components/Loading";
function AddTransfer({ addEnable, setAddEnable, onAddSuccess }) {
    if (!addEnable)
        return null;
    const [row, setRow] = useState([]);
    const [fromProjectId, setFromProjectId] = useState("");
    const [toProjectId, setToProjectId] = useState("");
    const [transferId, setTransferId] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [fromProject, setFromProject] = useState([]);
    const [toProject, setToProject] = useState([]);
    const [errors, setErrors] = useState({});
    const [loadOn, setLoadOn] = useState(false);
    const fetchProject = async () => {
        try {
            const response = await getSitemanagersProject();
            if (response.success) {
                setFromProject(response.data);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to fetch projects");
        }
    };
    const fetchLastTransferId = async () => {
        try {
            const response = await getLastTransferId();
            if (response.success) {
                setTransferId(response.data);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to fetch TransferId");
        }
    };
    useEffect(() => {
        fetchProject();
        fetchLastTransferId();
    }, []);
    const validateForm = () => {
        const newErrors = {};
        if (!fromProjectId)
            newErrors.project = "From Project is required";
        if (!toProjectId)
            newErrors.toProject = "To Project is required";
        if (!transferId)
            newErrors.invoice = "Transfer ID is required";
        if (!date)
            newErrors.date = "Transfer date is required";
        if (row.length === 0)
            newErrors.materials = "At least one material is required";
        row.forEach((item, idx) => {
            if (!item.material_name)
                newErrors[`material_${idx}`] = "Material is required";
            if (!item.brand_name)
                newErrors[`brand_${idx}`] = "Brand is required";
            if (!item.unit_name)
                newErrors[`unit_${idx}`] = "Unit is required";
            if (!item.quantity || item.quantity <= 0)
                newErrors[`quantity_${idx}`] = "Valid quantity is required";
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const sendRequestFun = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fill all required fields");
            return;
        }
        const materialDetails = row
            .filter((element) => element.select)
            .map((element) => ({
            material_id: element.material_id,
            quantity: element.quantity,
            unit_rate: element.unit_rate,
        }));
        try {
            setLoadOn(true);
            const response = await saveTransferApI(fromProjectId, toProjectId, transferId, date, description, materialDetails);
            setLoadOn(false);
            if (response.success) {
                toast.success(response.message);
                setAddEnable(false);
                onAddSuccess();
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            setLoadOn(false);
            toast.error("Failed to save transfer");
        }
    };
    const fetchToProject = async (projectId) => {
        try {
            const response = await ToProjectFetchAPI(projectId);
            if (response.success) {
                setToProject(response.data);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to fetch target projects");
        }
    };
    const fetchStock = async (projectId) => {
        try {
            const response = await fetchFullStockApi(projectId);
            if (response.success) {
                setRow(response.data);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to fetch stock");
        }
    };
    const totalAmount = row
        .filter((element) => element.select)
        .reduce((sum, item) => sum + item.quantity * item.unit_rate, 0);
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm transition-opacity duration-300", children: [_jsxs("div", { className: "bg-gray-900 rounded-lg shadow-xl w-full max-w-5xl mx-4 p-6 max-h-[90vh] overflow-y-auto", role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title", children: [_jsx("h2", { id: "modal-title", className: "text-2xl font-semibold text-gray-100 mb-6 tracking-tight", children: "Add Material Transfer" }), _jsxs("form", { onSubmit: sendRequestFun, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "from-project", className: "block text-sm font-medium text-gray-300 mb-1", children: "From Project" }), _jsxs("select", { id: "from-project", "aria-label": "Select From project", value: fromProjectId, onChange: (e) => {
                                                    setFromProjectId(e.target.value);
                                                    fetchToProject(e.target.value);
                                                    fetchStock(e.target.value);
                                                }, className: "w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-md \r\n                  focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm", children: [_jsx("option", { value: "", children: "Select Project" }), fromProject.map((element) => (_jsx("option", { value: element._id, children: element.project_name }, element._id)))] }), errors.project && (_jsx("p", { className: "text-red-400 text-sm mt-1", children: errors.project }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "to-project", className: "block text-sm font-medium text-gray-300 mb-1", children: "To Project" }), _jsxs("select", { id: "to-project", "aria-label": "Select To project", value: toProjectId, onChange: (e) => setToProjectId(e.target.value), className: "w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-md \r\n                  focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm", children: [_jsx("option", { value: "", children: "Select Project" }), toProject.map((element) => (_jsx("option", { value: element._id, children: element.project_name }, element._id)))] }), errors.toProject && (_jsx("p", { className: "text-red-400 text-sm mt-1", children: errors.toProject }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "transfer-id", className: "block text-sm font-medium text-gray-300 mb-1", children: "Transfer ID" }), _jsx("input", { id: "transfer-id", type: "text", placeholder: "Enter Transfer ID", value: transferId, disabled: true, className: "w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-md \r\n                  focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm" }), errors.invoice && (_jsx("p", { className: "text-red-400 text-sm mt-1", children: errors.invoice }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "date", className: "block text-sm font-medium text-gray-300 mb-1", children: "Transfer Date" }), _jsx("input", { id: "date", type: "date", value: date, onChange: (e) => setDate(e.target.value), min: new Date().toISOString().split("T")[0], className: "w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-md \r\n                  focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm" }), errors.date && (_jsx("p", { className: "text-red-400 text-sm mt-1", children: errors.date }))] }), _jsxs("div", { className: "sm:col-span-2", children: [_jsx("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-300 mb-1", children: "Description" }), _jsx("input", { id: "description", type: "text", placeholder: "Enter description (optional)", value: description, onChange: (e) => setDescription(e.target.value), className: "w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-md \r\n                  focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm" })] })] }), _jsxs("div", { className: "overflow-x-auto rounded-lg border border-gray-800 shadow-lg", children: [_jsxs("table", { className: "min-w-full text-sm text-left", children: [_jsx("thead", { className: "bg-gray-900/80 text-gray-300 uppercase text-xs font-semibold", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3.5 w-16", children: "SL No" }), _jsx("th", { className: "px-4 py-3.5", children: "Material" }), _jsx("th", { className: "px-4 py-3.5", children: "Brand" }), _jsx("th", { className: "px-4 py-3.5", children: "Unit" }), _jsx("th", { className: "px-4 py-3.5", children: "Stock" }), _jsx("th", { className: "px-4 py-3.5 w-32", children: "Quantity" }), _jsx("th", { className: "px-4 py-3.5 w-32", children: "Unit Rate" }), _jsx("th", { className: "px-4 py-3.5 w-24", children: "Total" }), _jsx("th", { className: "px-4 py-3.5 w-16 text-center", children: "Select" })] }) }), _jsx("tbody", { className: "bg-gray-900 divide-y divide-gray-800", children: row.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 9, className: "text-center py-8 text-gray-400 text-sm font-medium", children: "No materials available. Select a project to load stock." }) })) : (row.map((element, idx) => (_jsxs("tr", { className: "hover:bg-gray-800/50 transition-colors duration-150", children: [_jsx("td", { className: "px-4 py-3.5 text-gray-100 w-16", children: idx + 1 }), _jsxs("td", { className: "px-4 py-3.5 text-gray-100", children: [element.material_name, errors[`material_${idx}`] && (_jsx("p", { className: "text-red-400 text-xs mt-1", children: errors[`material_${idx}`] }))] }), _jsxs("td", { className: "px-4 py-3.5 text-gray-100", children: [element.brand_name, errors[`brand_${idx}`] && (_jsx("p", { className: "text-red-400 text-xs mt-1", children: errors[`brand_${idx}`] }))] }), _jsxs("td", { className: "px-4 py-3.5 text-gray-100", children: [element.unit_name, errors[`unit_${idx}`] && (_jsx("p", { className: "text-red-400 text-xs mt-1", children: errors[`unit_${idx}`] }))] }), _jsx("td", { className: "px-4 py-3.5 text-gray-100", children: element.stock }), _jsxs("td", { className: "px-4 py-3.5 w-32", children: [_jsx("input", { type: "number", min: "0", step: "0.01", value: element.quantity || "", placeholder: "Qty", onChange: (e) => {
                                                                        const newRow = [...row];
                                                                        newRow[idx].quantity = Number(e.target.value);
                                                                        setRow(newRow);
                                                                    }, className: "w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md \r\n                            focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm" }), errors[`quantity_${idx}`] && (_jsx("p", { className: "text-red-400 text-xs mt-1", children: errors[`quantity_${idx}`] }))] }), _jsx("td", { className: "px-4 py-3.5 w-32", children: _jsx("input", { type: "number", min: "0", step: "0.01", value: element.unit_rate || "", placeholder: "Rate", onChange: (e) => {
                                                                    const newRow = [...row];
                                                                    newRow[idx].unit_rate = Number(e.target.value);
                                                                    setRow(newRow);
                                                                }, className: "w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md \r\n                            focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm" }) }), _jsx("td", { className: "px-4 py-3.5 text-gray-100 w-24", children: (element.quantity * element.unit_rate).toFixed(2) || 0 }), _jsx("td", { className: "px-4 py-3.5 text-center w-16", children: _jsx("input", { "aria-label": "select stock", type: "checkbox", checked: element.select, onChange: () => {
                                                                    const newRow = [...row];
                                                                    newRow[idx].select = !newRow[idx].select;
                                                                    setRow(newRow);
                                                                }, className: "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-800" }) })] }, element.material_id)))) })] }), errors.materials && (_jsx("p", { className: "text-red-400 text-sm mt-2", children: errors.materials }))] }), _jsx("div", { className: "flex justify-between items-center mt-4", children: _jsxs("div", { className: "text-gray-100 font-semibold text-sm", children: ["Total Amount: \u20B9", totalAmount.toFixed(2)] }) }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx("button", { type: "button", onClick: () => setAddEnable(false), className: "px-4 py-2 bg-gray-700 text-gray-200 rounded-md text-sm font-medium \r\n                hover:bg-gray-600 hover:text-indigo-300 transition-all duration-200 \r\n                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium \r\n                hover:bg-indigo-700 transition-all duration-200 \r\n                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900", children: "Send Request" })] })] })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }));
}
export default AddTransfer;
