import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { fetchUnitData } from "../../../api/UnitApi/unit";
import AppContext from "../../../Context/AppContext";
import { useContext, useEffect, useState } from "react";
function AddSpec() {
    const { AddEnable, setAddEnable, setAddMaterialEnable, setSpecId, setSpecname, setSpecUnit, setSpecDescription, } = useContext(AppContext);
    if (!AddEnable)
        return null;
    const [unit, setUnit] = useState([]);
    const [specId, setLocalSpecId] = useState("");
    const [specName, setLocalSpecName] = useState("");
    const [specUnit, setLocalSpecUnit] = useState("");
    const [specDescription, setLocalSpecDescription] = useState("");
    const [errors, setErrors] = useState({});
    const getUnit = async () => {
        const response = await fetchUnitData();
        setUnit(response.data);
    };
    useEffect(() => {
        getUnit();
    }, []);
    const validateForm = () => {
        const newErrors = {};
        if (!specId.trim()) {
            newErrors.specId = "Specification ID is required";
        }
        if (!specName.trim()) {
            newErrors.specName = "Specification Name is required";
        }
        if (!specUnit) {
            newErrors.specUnit = "Unit is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleNext = () => {
        if (validateForm()) {
            setSpecId(specId);
            setSpecname(specName);
            setSpecUnit(specUnit);
            setSpecDescription(specDescription);
            setAddEnable(false);
            setAddMaterialEnable(true);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-gray-800/90 border border-gray-700/50 rounded-2xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl", children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-100 mb-6", children: "Add Specification" }), _jsxs("form", { className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "specId", className: "sr-only", children: "Specification ID" }), _jsx("input", { id: "specId", type: "text", placeholder: "Enter specification ID", value: specId, onChange: (e) => setLocalSpecId(e.target.value), className: `w-full px-4 py-3 bg-gray-800/50 border ${errors.specId ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium` }), errors.specId && (_jsx("p", { className: "mt-1 text-red-500 text-xs", children: errors.specId }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "specName", className: "sr-only", children: "Specification Name" }), _jsx("input", { id: "specName", type: "text", placeholder: "Enter specification name", value: specName, onChange: (e) => setLocalSpecName(e.target.value), className: `w-full px-4 py-3 bg-gray-800/50 border ${errors.specName ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium` }), errors.specName && (_jsx("p", { className: "mt-1 text-red-500 text-xs", children: errors.specName }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "specUnit", className: "sr-only", children: "Select Unit" }), _jsxs("select", { id: "specUnit", "aria-label": "Select unit", value: specUnit, onChange: (e) => setLocalSpecUnit(e.target.value), className: `w-full px-4 py-3 bg-gray-800/50 border ${errors.specUnit ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium`, children: [_jsx("option", { value: "", className: "text-gray-400", children: "Select unit" }), unit.map((element) => (_jsx("option", { value: element._id, className: "text-gray-100", children: element.unit_name }, element._id)))] }), errors.specUnit && (_jsx("p", { className: "mt-1 text-red-500 text-xs", children: errors.specUnit }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "specDescription", className: "sr-only", children: "Description" }), _jsx("textarea", { id: "specDescription", placeholder: "Enter description", value: specDescription, onChange: (e) => setLocalSpecDescription(e.target.value), className: "w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium resize\u5F7C\u6B64\r\n\r\nSystem: font-medium resize-y min-h-[100px]" })] }), _jsxs("div", { className: "flex justify-end gap-3", children: [_jsx("button", { type: "button", onClick: () => setAddEnable(false), className: "px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-200 font-semibold text-sm", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleNext, className: "px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm", children: "Next" })] })] })] }) }));
}
export default AddSpec;
