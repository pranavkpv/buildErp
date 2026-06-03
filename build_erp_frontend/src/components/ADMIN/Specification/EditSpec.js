import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { fetchUnitData } from "../../../api/UnitApi/unit";
import AppContext from "../../../Context/AppContext";
import { useContext, useEffect, useState } from "react";
function EditSpec() {
    const { editSpecEnable, setEditSpecEnable, setEditMaterialEnable, seteditSpec_id, setEditSpec_name, setEditSpecUnit, setEditDescription, editSpec_id, editSpec_name, editSpec_unit, editDescription, } = useContext(AppContext);
    if (!editSpecEnable)
        return null;
    const [unit, setUnit] = useState([]);
    const [localSpecId, setLocalSpecId] = useState(editSpec_id || "");
    const [localSpecName, setLocalSpecName] = useState(editSpec_name || "");
    const [localSpecUnit, setLocalSpecUnit] = useState(editSpec_unit || "");
    const [localDescription, setLocalDescription] = useState(editDescription || "");
    const [errors, setErrors] = useState({});
    const getUnit = async () => {
        const response = await fetchUnitData();
        setUnit(response.data);
    };
    useEffect(() => {
        getUnit();
    }, []);
    useEffect(() => {
        setLocalSpecId(editSpec_id || "");
        setLocalSpecName(editSpec_name || "");
        setLocalSpecUnit(editSpec_unit || "");
        setLocalDescription(editDescription || "");
    }, [editSpec_id, editSpec_name, editSpec_unit, editDescription]);
    const validateForm = () => {
        const newErrors = {};
        if (!localSpecId.trim()) {
            newErrors.specId = "Specification ID is required";
        }
        if (!localSpecName.trim()) {
            newErrors.specName = "Specification Name is required";
        }
        if (!localSpecUnit) {
            newErrors.specUnit = "Unit is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleNext = () => {
        if (validateForm()) {
            seteditSpec_id(localSpecId);
            setEditSpec_name(localSpecName);
            setEditSpecUnit(localSpecUnit);
            setEditDescription(localDescription);
            setEditSpecEnable(false);
            setEditMaterialEnable(true);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-gray-800/90 border border-gray-700/50 rounded-2xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl", children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-100 mb-6", children: "Edit Specification" }), _jsxs("form", { className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "specId", className: "sr-only", children: "Specification ID" }), _jsx("input", { id: "specId", type: "text", value: localSpecId, placeholder: "Enter specification ID", onChange: (e) => setLocalSpecId(e.target.value), className: `w-full px-4 py-3 bg-gray-800/50 border ${errors.specId ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium` }), errors.specId && (_jsx("p", { className: "mt-1 text-red-500 text-xs", children: errors.specId }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "specName", className: "sr-only", children: "Specification Name" }), _jsx("input", { id: "specName", type: "text", value: localSpecName, placeholder: "Enter specification name", onChange: (e) => setLocalSpecName(e.target.value), className: `w-full px-4 py-3 bg-gray-800/50 border ${errors.specName ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium` }), errors.specName && (_jsx("p", { className: "mt-1 text-red-500 text-xs", children: errors.specName }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "specUnit", className: "sr-only", children: "Select Unit" }), _jsxs("select", { id: "specUnit", value: localSpecUnit, "aria-label": "Select unit", onChange: (e) => setLocalSpecUnit(e.target.value), className: `w-full px-4 py-3 bg-gray-800/50 border ${errors.specUnit ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium`, children: [_jsx("option", { value: "", className: "text-gray-400", children: "Select unit" }), unit.map((element) => (_jsx("option", { value: element._id, className: "text-gray-100", children: element.unit_name }, element._id)))] }), errors.specUnit && (_jsx("p", { className: "mt-1 text-red-500 text-xs", children: errors.specUnit }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "specDescription", className: "sr-only", children: "Description" }), _jsx("textarea", { id: "specDescription", value: localDescription, placeholder: "Enter description", onChange: (e) => setLocalDescription(e.target.value), className: "w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium resize-y min-h-[100px]" })] }), _jsxs("div", { className: "flex justify-end gap-3", children: [_jsx("button", { type: "button", onClick: () => setEditSpecEnable(false), className: "px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-200 font-semibold text-sm", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleNext, className: "px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm", children: "Next" })] })] })] }) }));
}
export default EditSpec;
