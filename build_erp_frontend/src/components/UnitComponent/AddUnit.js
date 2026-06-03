import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Loading from "../../components/Loading";
import { postUnit } from "../../api/UnitApi/unit";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
function AddUnit({ enable, setEnable, onAdd }) {
    const [unit, setUnit] = useState("");
    const [short_name, setShortname] = useState("");
    const unitRef = useRef(null);
    const shortnameRef = useRef(null);
    const [loadOn, setLoadOn] = useState(false);
    const addUnit = async (e) => {
        e.preventDefault();
        let hasError = false;
        if (unit.trim() === "") {
            if (unitRef.current)
                unitRef.current.innerText = "Unit name is required.";
            hasError = true;
        }
        else if (unitRef.current) {
            unitRef.current.innerText = "";
        }
        if (short_name.trim() === "") {
            if (shortnameRef.current)
                shortnameRef.current.innerText = "Short name is required.";
            hasError = true;
        }
        else if (shortnameRef.current) {
            shortnameRef.current.innerText = "";
        }
        if (hasError)
            return;
        try {
            setLoadOn(true);
            const unit_name = unit;
            const data = await postUnit({ unit_name, short_name });
            if (data.success) {
                setLoadOn(false);
                toast.success(data.message);
                onAdd();
                setEnable(false);
            }
            else {
                setLoadOn(false);
                toast.error(data.message);
            }
        }
        catch (error) {
            setLoadOn(false);
        }
    };
    if (!enable)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4", children: _jsxs("form", { onSubmit: addUnit, className: "bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50 space-y-5", children: [_jsx("h2", { className: "text-xl font-semibold text-center text-gray-100 mb-6", children: "Add Unit" }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-200 mb-1.5", children: "Unit Name" }), _jsx("input", { type: "text", placeholder: "Enter unit name", className: "w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium", onChange: (e) => setUnit(e.target.value) }), _jsx("p", { ref: unitRef, className: "text-sm text-red-400 mt-1.5" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-200 mb-1.5", children: "Short Name" }), _jsx("input", { type: "text", placeholder: "Enter short name", className: "w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium", onChange: (e) => setShortname(e.target.value) }), _jsx("p", { ref: shortnameRef, className: "text-sm text-red-400 mt-1.5" })] }), _jsxs("div", { className: "flex justify-end gap-4 pt-4", children: [_jsx("button", { type: "button", className: "bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", onClick: () => setEnable(false), children: "Cancel" }), _jsx("button", { type: "submit", className: "bg-teal-500/90 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", children: "Save" })] })] }) }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }));
}
export default AddUnit;
