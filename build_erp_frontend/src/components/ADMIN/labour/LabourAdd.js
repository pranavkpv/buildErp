import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Loading from "../../../components/Loading";
import { postLabour } from "../../../api/Admin/labour";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
function LabourAdd({ addEnable, setAddEnable, onsuccessAdd }) {
    const [labour, setLabour] = useState("");
    const [wage, setWage] = useState(0);
    const labourRef = useRef(null);
    const wageRef = useRef(null);
    const [loadOn, setLoadOn] = useState(false);
    const addLabour = async (e) => {
        e.preventDefault();
        let hasError = false;
        if (labour.trim() === "") {
            if (labourRef.current)
                labourRef.current.innerText = "Labour type is required.";
            hasError = true;
        }
        else {
            if (labourRef.current)
                labourRef.current.innerText = "";
        }
        if (wage <= 0) {
            if (wageRef.current)
                wageRef.current.innerText = "Daily wage must be greater than 0.";
            hasError = true;
        }
        else {
            if (wageRef.current)
                wageRef.current.innerText = "";
        }
        if (hasError) {
            return;
        }
        setLoadOn(true);
        const labour_type = labour;
        const daily_wage = wage;
        const data = await postLabour({ labour_type, daily_wage });
        setLoadOn(false);
        if (data.success) {
            toast.success(data.message);
            setAddEnable(false);
            onsuccessAdd();
            setLabour("");
            setWage(0);
        }
        else {
            toast.error(data.message);
        }
    };
    if (!addEnable)
        return null;
    return (_jsx(_Fragment, { children: _jsx("div", { className: "fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "relative bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50", children: [_jsx("h2", { className: "text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4", children: "Add New Labour Type" }), _jsxs("form", { onSubmit: addLabour, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "labourType", className: "block text-sm font-medium text-gray-200 mb-1", children: "Labour Type" }), _jsx("input", { id: "labourType", type: "text", placeholder: "Enter labour type", value: labour, onChange: (e) => setLabour(e.target.value), className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", disabled: loadOn }), _jsx("p", { ref: labourRef, className: "text-red-400 text-sm mt-1" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "dailyWage", className: "block text-sm font-medium text-gray-200 mb-1", children: "Daily Wage" }), _jsx("input", { id: "dailyWage", type: "number", placeholder: "Enter daily wage", value: wage === 0 ? "" : wage, onChange: (e) => setWage(Number(e.target.value)), className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", disabled: loadOn }), _jsx("p", { ref: wageRef, className: "text-red-400 text-sm mt-1" })] }), _jsxs("div", { className: "flex justify-end gap-4 mt-6", children: [_jsx("button", { type: "button", onClick: () => {
                                            setAddEnable(false);
                                            setLabour("");
                                            setWage(0);
                                            if (labourRef.current)
                                                labourRef.current.innerText = "";
                                            if (wageRef.current)
                                                wageRef.current.innerText = "";
                                        }, className: "bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold", disabled: loadOn, children: "Cancel" }), _jsx("button", { type: "submit", className: "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold", disabled: loadOn, children: "Add Labour" })] })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }) }) }));
}
export default LabourAdd;
