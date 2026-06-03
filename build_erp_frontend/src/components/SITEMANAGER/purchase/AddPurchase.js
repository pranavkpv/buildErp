import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Loading from "../../../components/Loading";
import { getSitemanagersProject } from "../../../api/Sitemanager/profile";
import { fetchBrandCorrespondingMaterialInSitemanager, fetchLastInvoiceApi, fetchUniqueMaterialInSiteManager, fetchUnitCorrespondingMaterialInsitemanager, fetchUnitRateInSitemanager, savePurchaseAPI } from "../../../api/Sitemanager/purchase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
function AddPurchase({ addEnable, setAddEnable, onAddSuccess }) {
    if (!addEnable)
        return null;
    const [material, setMaterial] = useState([]);
    const [brand, setBrand] = useState([]);
    const [unit, setUnit] = useState([]);
    const [index, setIndex] = useState(0);
    const [row, setRow] = useState([]);
    const [project_id, setProjectId] = useState("");
    const [invoice_number, setInvoice] = useState(0);
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [project, setProject] = useState([]);
    const [errors, setErrors] = useState({});
    const [loadOn, setLoadOn] = useState(false);
    const fetchMaterial = async () => {
        const materialList = await fetchUniqueMaterialInSiteManager();
        setMaterial(materialList.data);
    };
    const fetchProject = async () => {
        const response = await getSitemanagersProject();
        setProject(response.data);
    };
    const fetchLastInvoice = async () => {
        const response = await fetchLastInvoiceApi();
        if (response.success) {
            setInvoice(response.data + 1);
        }
        else {
            toast.error(response.message);
        }
    };
    useEffect(() => {
        fetchMaterial();
        fetchProject();
        fetchLastInvoice();
    }, []);
    const giveBrandAndUnit = async (e, idx) => {
        const selectedMaterial = e.target.value;
        if (row.some((item, i) => i !== idx && item.material_name === selectedMaterial)) {
            setErrors((prev) => ({ ...prev, [`material_${idx}`]: "Material already selected" }));
            return;
        }
        setErrors((prev) => ({ ...prev, [`material_${idx}`]: "" }));
        const brandData = await fetchBrandCorrespondingMaterialInSitemanager(selectedMaterial);
        const unitData = await fetchUnitCorrespondingMaterialInsitemanager(selectedMaterial);
        const newRow = [...row];
        newRow[idx].material_name = selectedMaterial;
        newRow[idx].brand_name = "";
        newRow[idx].unit_name = "";
        newRow[idx].unit_rate = 0;
        setRow(newRow);
        setBrand(brandData.data);
        setUnit(unitData.data);
    };
    const unitRateFetch = async (index) => {
        const { material_name, brand_name, unit_name } = row[index];
        if (!material_name || !brand_name || !unit_name)
            return;
        const response = await fetchUnitRateInSitemanager(material_name, unit_name, brand_name);
        const newRow = [...row];
        newRow[index].unit_rate = response.data.unit_rate;
        newRow[index].material_id = response.data.material_id;
        setRow(newRow);
    };
    const validateForm = () => {
        const newErrors = {};
        if (!project_id)
            newErrors.project = "Project is required";
        if (!date)
            newErrors.date = "Purchase date is required";
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
    const addPurchaseFun = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fill all required fields");
            return;
        }
        const materialDetails = row.map((element) => ({
            material_id: element.material_id,
            quantity: element.quantity,
            unit_rate: element.unit_rate,
        }));
        setLoadOn(true);
        const response = await savePurchaseAPI(project_id, invoice_number, date, description, materialDetails);
        setLoadOn(false);
        if (response.success) {
            toast.success(response.message);
            setAddEnable(false);
            onAddSuccess();
        }
        else {
            toast.error(response.message);
        }
    };
    const addMaterialRow = () => {
        setRow([...row, {
                sl: row.length + 1,
                material_name: "",
                brand_name: "",
                unit_name: "",
                unit_rate: 0,
                material_id: "",
                quantity: 0,
            }]);
    };
    const totalAmount = row.reduce((sum, item) => sum + (item.quantity * item.unit_rate), 0);
    return (_jsx("div", { className: "fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 w-ful", children: _jsxs("div", { className: "bg-gray-800 ml-20  rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Add Purchase" }), _jsxs("form", { onSubmit: addPurchaseFun, className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("select", { "aria-label": "Select project", value: project_id, onChange: (e) => setProjectId(e.target.value), className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white", children: [_jsx("option", { value: "", children: "Select Project" }), project.map((element) => (_jsx("option", { value: element._id, children: element.project_name }, element._id)))] }), errors.project && _jsx("p", { className: "text-red-400 text-sm mt-1", children: errors.project })] }), _jsxs("div", { children: [_jsx("input", { type: "text", placeholder: "Invoice Number", value: invoice_number, readOnly: true, className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white" }), errors.invoice && _jsx("p", { className: "text-red-400 text-sm mt-1", children: errors.invoice })] }), _jsxs("div", { children: [_jsx("input", { placeholder: "select date", type: "date", value: date, onChange: (e) => setDate(e.target.value), min: new Date().toISOString().split("T")[0], className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white" }), errors.date && _jsx("p", { className: "text-red-400 text-sm mt-1", children: errors.date })] }), _jsx("div", { children: _jsx("input", { type: "text", placeholder: "Description", value: description, onChange: (e) => setDescription(e.target.value), className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white" }) })] }), _jsxs("div", { className: "overflow-x-auto", children: [_jsxs("table", { className: "min-w-full text-sm text-left", children: [_jsx("thead", { className: "bg-gray-700 text-gray-200 uppercase text-xs font-semibold", children: _jsxs("tr", { children: [_jsx("th", { className: "px-8 py-4 w-[80px]", children: "SL No" }), _jsx("th", { className: "px-8 py-4 w-[500px]", children: "Material" }), _jsx("th", { className: "px-8 py-4 w-[500px]", children: "Brand" }), _jsx("th", { className: "px-8 py-4 w-[550px]", children: "Unit" }), _jsx("th", { className: "px-8 py-4 w-[500px]", children: "Quantity" }), _jsx("th", { className: "px-8 py-4 w-[500px]", children: "Unit Rate" }), _jsx("th", { className: "px-8 py-4 w-[500px]", children: "Total" }), _jsx("th", { className: "px-8 py-4 w-[100px] text-center", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700", children: row.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 8, className: "text-center py-12 text-gray-400 text-sm font-medium", children: "No materials added. Click \"Add Material\" to start." }) })) : (row.map((element, idx) => (_jsxs("tr", { className: "hover:bg-gray-700 transition-colors duration-150", children: [_jsx("td", { className: "px-8 py-4 font-medium text-gray-200 w-[80px]", children: element.sl }), _jsxs("td", { className: "px-8 py-4 w-[600px]", children: [_jsxs("select", { "aria-label": "Select material", value: element.material_name, onChange: (e) => {
                                                                    setIndex(idx);
                                                                    giveBrandAndUnit(e, idx);
                                                                }, className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white", children: [_jsx("option", { value: "", children: "Select Material" }), material.map((mat) => (_jsx("option", { value: mat, children: mat }, mat)))] }), errors[`material_${idx}`] && (_jsx("p", { className: "text-red-400 text-sm mt-1", children: errors[`material_${idx}`] }))] }), _jsxs("td", { className: "px-8 py-4 w-[600px]", children: [_jsxs("select", { "aria-label": "Select brand", value: element.brand_name, onChange: (e) => {
                                                                    const newRow = [...row];
                                                                    newRow[idx].brand_name = e.target.value;
                                                                    setRow(newRow);
                                                                    unitRateFetch(idx);
                                                                }, className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white", children: [_jsx("option", { value: "", children: "Select Brand" }), brand.map((br) => (_jsx("option", { value: br, children: br }, br)))] }), errors[`brand_${idx}`] && (_jsx("p", { className: "text-red-400 text-sm mt-1", children: errors[`brand_${idx}`] }))] }), _jsxs("td", { className: "px-8 py-4 w-[600px]", children: [_jsxs("select", { "aria-label": "Select unit", value: element.unit_name, onChange: (e) => {
                                                                    const newRow = [...row];
                                                                    newRow[idx].unit_name = e.target.value;
                                                                    setRow(newRow);
                                                                    unitRateFetch(idx);
                                                                }, className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white", children: [_jsx("option", { value: "", children: "Select Unit" }), unit.map((un) => (_jsx("option", { value: un, children: un }, un)))] }), errors[`unit_${idx}`] && (_jsx("p", { className: "text-red-400 text-sm mt-1", children: errors[`unit_${idx}`] }))] }), _jsxs("td", { className: "px-8 py-4 w-[300px]", children: [_jsx("input", { type: "number", min: "0", step: "0.01", value: element.quantity || "", placeholder: "Quantity", onChange: (e) => {
                                                                    const newRow = [...row];
                                                                    newRow[idx].quantity = Number(e.target.value);
                                                                    setRow(newRow);
                                                                }, className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white" }), errors[`quantity_${idx}`] && (_jsx("p", { className: "text-red-400 text-sm mt-1", children: errors[`quantity_${idx}`] }))] }), _jsx("td", { className: "px-8 py-4 w-[500px]", children: _jsx("input", { type: "number", min: "0", step: "0.01", value: element.unit_rate || "", placeholder: "Unit Rate", onChange: (e) => {
                                                                const newRow = [...row];
                                                                newRow[idx].unit_rate = Number(e.target.value);
                                                                setRow(newRow);
                                                            }, className: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white" }) }), _jsx("td", { className: "px-8 py-4 text-gray-200 w-[150px]", children: (element.quantity * element.unit_rate).toFixed(2) }), _jsx("td", { className: "px-8 py-4 text-center w-[100px]", children: _jsx("button", { type: "button", onClick: () => {
                                                                const newRow = row.filter((_, i) => i !== idx);
                                                                setRow(newRow.map((item, i) => ({ ...item, sl: i + 1 })));
                                                            }, className: "text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600 transition-all duration-200", "aria-label": `Delete material ${element.material_name || "row"}`, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }) })] }, element.sl)))) })] }), errors.materials && _jsx("p", { className: "text-red-400 text-sm mt-2", children: errors.materials })] }), _jsxs("div", { className: "flex justify-between items-center mt-4", children: [_jsx("div", { children: _jsx("button", { type: "button", onClick: addMaterialRow, className: "px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200", children: "+ Add Material" }) }), _jsxs("div", { className: "text-white font-semibold", children: ["Total Amount: $", totalAmount.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-end space-x-4 mt-6", children: [_jsx("button", { type: "button", onClick: () => setAddEnable(false), className: "px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200", children: "Save Purchase" })] })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }) }));
}
export default AddPurchase;
