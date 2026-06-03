import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSitemanagersProject } from "../../../api/Sitemanager/profile";
import TransferModal from "./TransferModal";
import { updateReceiveAPI } from "../../../api/Sitemanager/receive";
import Loading from "../../../components/Loading";
function EditReceive({ editId, editEnable, setEditEnable, onEditSuccess, editData }) {
    if (!editEnable || !editData)
        return null;
    const [row, setRow] = useState(editData.materialData || []);
    const [project_id, setProjectId] = useState(editData.project_id || "");
    const [date, setDate] = useState(editData.date || "");
    const [description, setDescription] = useState(editData.description || "");
    const [project, setProject] = useState([]);
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const [transferId, setTransferId] = useState(editData.transferDetails.map((t) => t._id) || []);
    const [loadOn, setLoadOn] = useState(false);
    const fetchProject = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            toast.error("No access token found");
            return;
        }
        const response = await getSitemanagersProject();
        if (response.success) {
            setProject(response.data);
        }
        else {
            toast.error("Error fetching projects");
        }
    };
    useEffect(() => {
        fetchProject();
    }, []);
    const validateShowButton = () => {
        const newErrors = {};
        if (!project_id)
            newErrors.project = "Please select a project";
        if (!date)
            newErrors.date = "Please select a date";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleShowTransferList = () => {
        if (!validateShowButton()) {
            toast.error("Please fill project name and date");
            return;
        }
        setOpen(true);
    };
    const validateForm = () => {
        const newErrors = {};
        if (!project_id)
            newErrors.project = "Project is required";
        if (!date)
            newErrors.date = "Purchase date is required";
        if (row.length === 0)
            newErrors.materials = "At least one material is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleUpdateReceive = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            if (row.length === 0) {
                toast.error("Please add at least one material before saving", {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
            else {
                toast.error("Please fill all required fields");
            }
            return;
        }
        const materialDetails = row.map((element) => ({
            material_id: element.material_id,
            quantity: element.quantity,
            unit_rate: element.unit_rate,
        }));
        setLoadOn(true);
        const response = await updateReceiveAPI(editId, project_id, date, description, materialDetails, transferId);
        setLoadOn(false);
        if (response.success) {
            toast.success(response.message);
            setEditEnable(false);
            onEditSuccess();
        }
        else {
            toast.error(response.message);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 w-full", children: _jsxs("div", { className: "bg-gray-800 ml-20 rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Edit Purchase" }), _jsxs("form", { onSubmit: handleUpdateReceive, className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("select", { "aria-label": "Select project", value: project_id, onChange: (e) => setProjectId(e.target.value), className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white", children: [_jsx("option", { value: editData.project_id, children: editData.Toproject_name }), project.map((element) => (_jsx("option", { value: element._id, children: element.project_name }, element._id)))] }), errors.project && _jsx("p", { className: "text-red-400 text-sm mt-1", children: errors.project })] }), _jsxs("div", { children: [_jsx("input", { placeholder: "Select date", type: "date", value: date, min: new Date().toISOString().split("T")[0], onChange: (e) => setDate(e.target.value), className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white" }), errors.date && _jsx("p", { className: "text-red-400 text-sm mt-1", children: errors.date })] }), _jsx("div", { children: _jsx("input", { type: "text", placeholder: "Description", value: description, onChange: (e) => setDescription(e.target.value), className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white" }) }), _jsx("div", { children: _jsx("button", { type: "button", onClick: handleShowTransferList, className: "px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200", children: "Show Transfer List" }) })] }), _jsx(TransferModal, { projectId: project_id, date: date, setOpen: setOpen, open: open, setTransferId: setTransferId, transferId: transferId, setMaterials: setRow }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) })), _jsxs("div", { className: "overflow-x-auto", children: [_jsxs("table", { className: "min-w-full text-sm text-left", children: [_jsx("thead", { className: "bg-gray-700 text-gray-200 uppercase text-xs font-semibold", children: _jsxs("tr", { children: [_jsx("th", { className: "px-8 py-4 w-[80px]", children: "SL No" }), _jsx("th", { className: "px-8 py-4 w-[500px]", children: "Material" }), _jsx("th", { className: "px-8 py-4 w-[500px]", children: "Brand" }), _jsx("th", { className: "px-8 py-4 w-[550px]", children: "Unit" }), _jsx("th", { className: "px-8 py-4 w-[500px]", children: "Quantity" }), _jsx("th", { className: "px-8 py-4 w-[500px]", children: "Unit Rate" }), _jsx("th", { className: "px-8 py-4 w-[500px]", children: "Total" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700", children: row.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 8, className: "text-center py-12 text-gray-400 text-sm font-medium", children: "No materials added. Select a transfer to populate materials." }) })) : (row.map((element, idx) => (_jsxs("tr", { className: "hover:bg-gray-700 transition-colors duration-150", children: [_jsx("td", { className: "px-8 py-4 font-medium text-gray-200 w-[80px]", children: idx + 1 }), _jsxs("td", { className: "px-8 py-4 w-[600px]", children: [_jsx("select", { "aria-label": "Select material", value: element.material_name, className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white", disabled: true, children: _jsx("option", { value: element.material_id, children: element.material_name }) }), errors[`material_${idx}`] && (_jsx("p", { className: "text-red-400 text-sm mt-1", children: errors[`material_${idx}`] }))] }), _jsxs("td", { className: "px-8 py-4 w-[600px]", children: [_jsx("select", { "aria-label": "Select brand", value: element.brand_name, className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white", disabled: true, children: _jsx("option", { value: element.brand_name, children: element.brand_name }) }), errors[`brand_${idx}`] && (_jsx("p", { className: "text-red-400 text-sm mt-1", children: errors[`brand_${idx}`] }))] }), _jsxs("td", { className: "px-8 py-4 w-[600px]", children: [_jsx("select", { "aria-label": "Select unit", value: element.unit_name, className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white", disabled: true, children: _jsx("option", { value: element.unit_name, children: element.unit_name }) }), errors[`unit_${idx}`] && (_jsx("p", { className: "text-red-400 text-sm mt-1", children: errors[`unit_${idx}`] }))] }), _jsxs("td", { className: "px-8 py-4 w-[300px]", children: [_jsx("input", { type: "number", min: "0", step: "0.01", value: element.quantity || "", placeholder: "Quantity", className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white", disabled: true }), errors[`quantity_${idx}`] && (_jsx("p", { className: "text-red-400 text-sm mt-1", children: errors[`quantity_${idx}`] }))] }), _jsx("td", { className: "px-8 py-4 w-[500px]", children: _jsx("input", { type: "number", min: "0", step: "0.01", value: element.unit_rate || "", placeholder: "Unit Rate", className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white", disabled: true }) }), _jsx("td", { className: "px-8 py-4 text-gray-200 w-[150px]", children: (element.quantity * element.unit_rate).toFixed(2) })] }, element.sl)))) })] }), errors.materials && _jsx("p", { className: "text-red-400 text-sm mt-2", children: errors.materials })] }), _jsxs("div", { className: "flex justify-end space-x-4 mt-6", children: [_jsx("button", { type: "button", onClick: () => setEditEnable(false), className: "px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200", children: "Update Purchase" })] })] })] }) }));
}
export default EditReceive;
