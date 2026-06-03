import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { getSitemanagersProject } from "../../../api/Sitemanager/profile";
import { labourDataFetchInsitemanager, takeAttendanceAPI } from "../../../api/Sitemanager/attendance";
import Loading from "../../../components/Loading";
function AddAttendance({ addEnable, setAddEnable, onAddSuccess }) {
    if (!addEnable)
        return null;
    const [project, setProject] = useState([]);
    const [row, setRow] = useState([]);
    const [labour, setLabour] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [projectError, setProjectError] = useState("");
    const [dateError, setDateError] = useState("");
    const [loadOn, setLoadOn] = useState(false);
    const fetchProject = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token)
            return;
        const response = await getSitemanagersProject();
        setProject(response.data);
    };
    const fetchLabour = async () => {
        const response = await labourDataFetchInsitemanager();
        setLabour(response.data);
    };
    useEffect(() => {
        fetchProject();
        fetchLabour();
    }, []);
    const setSalaryFun = (labourId, index) => {
        const selectedLabour = labour.find((element) => element._id === labourId);
        if (!selectedLabour)
            return;
        const salary = Number(selectedLabour.daily_wage);
        const updatedRow = [...row];
        updatedRow[index].labour_type = labourId;
        updatedRow[index].wage = salary;
        updatedRow[index].total = salary * updatedRow[index].number;
        setRow(updatedRow);
    };
    const attendanceTakeFun = async () => {
        let hasError = false;
        if (!selectedProject) {
            setProjectError("Project must be selected.");
            hasError = true;
        }
        else {
            setProjectError("");
        }
        if (!selectedDate) {
            setDateError("Date must be selected.");
            hasError = true;
        }
        else {
            setDateError("");
        }
        if (row.some((element) => element.total === 0)) {
            toast.warning("One or more rows have a total value of 0. Please ensure all rows have valid data.");
            hasError = true;
        }
        if (hasError)
            return;
        setLoadOn(true);
        const response = await takeAttendanceAPI(selectedProject, selectedDate, row);
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
    return (_jsxs("div", { className: "fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6", children: [_jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-gray-700/50", children: [_jsx("h1", { className: "text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4", children: "Attendance Mark Based on Project" }), _jsxs("div", { className: "grid grid-cols-1 gap-6 mb-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "attendanceDate", className: "block text-sm font-medium text-gray-200 mb-1", children: "Date" }), _jsx("input", { id: "attendanceDate", type: "date", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", placeholder: "Select date", value: selectedDate, onChange: (e) => setSelectedDate(e.target.value), min: new Date().toISOString().split("T")[0] }), dateError && _jsx("p", { className: "text-red-400 text-sm mt-1", children: dateError })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "projectSelect", className: "block text-sm font-medium text-gray-200 mb-1", children: "Project" }), _jsxs("select", { id: "projectSelect", "aria-label": "Select a project", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", value: selectedProject, onChange: (e) => setSelectedProject(e.target.value), children: [_jsx("option", { value: "", children: "Select Project" }), project.map((element) => (_jsx("option", { value: element._id, children: element.project_name }, element._id)))] }), projectError && _jsx("p", { className: "text-red-400 text-sm mt-1", children: projectError })] })] }), _jsxs("div", { className: "mb-4 pt-4 border-t border-gray-700", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-100", children: "Labour Details" }), _jsxs("button", { onClick: () => {
                                            setRow([...row, { labour_type: "", wage: 0, number: 0, total: 0 }]);
                                        }, type: "button", className: "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2", children: [_jsx(PlusCircleIcon, { className: "h-5 w-5" }), " Add Labour Type"] })] }), _jsx("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: _jsxs("table", { className: "min-w-full text-sm text-left bg-gray-800/50", children: [_jsx("thead", { className: "bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 w-[8%]", children: "SL NO" }), _jsx("th", { className: "px-6 py-4 w-[25%]", children: "Labour Type" }), _jsx("th", { className: "px-6 py-4 w-[15%]", children: "Wage" }), _jsx("th", { className: "px-6 py-4 w-[20%]", children: "No. of Labour" }), _jsx("th", { className: "px-6 py-4 w=[20%]", children: "Total" }), _jsx("th", { className: "px-6 py-4 w=[12%] text-center", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700/50", children: row.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "text-center py-8 text-gray-400 text-sm font-medium", children: "Click \"Add Labour Type\" to add labour details." }) })) : (row.map((element, index) => (_jsxs("tr", { className: "hover:bg-gray-700/50 transition-colors duration-150", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-200 text-center", children: index + 1 }), _jsx("td", { className: "px-6 py-4", children: _jsxs("select", { "aria-label": "Select labour type", className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", value: element.labour_type, onChange: (e) => {
                                                                for (let item of row) {
                                                                    if (item.labour_type === e.target.value && item.labour_type !== element.labour_type) {
                                                                        toast.error("Labour type already exists.");
                                                                        return;
                                                                    }
                                                                }
                                                                setSalaryFun(e.target.value, index);
                                                            }, children: [_jsx("option", { value: "", children: "Select Labour Type" }), labour.map((labourItem) => (_jsx("option", { value: labourItem._id, children: labourItem.labour_type }, labourItem._id)))] }) }), _jsxs("td", { className: "px-6 py-4 text-gray-100", children: ["\u20B9", element.wage.toLocaleString()] }), _jsx("td", { className: "px-6 py-4", children: _jsx("input", { type: "number", className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", placeholder: "Enter number", value: element.number === 0 ? "" : element.number, onChange: (e) => {
                                                                const updatedRow = [...row];
                                                                updatedRow[index].number = Number(e.target.value);
                                                                updatedRow[index].total = element.wage * Number(e.target.value);
                                                                setRow(updatedRow);
                                                            } }) }), _jsxs("td", { className: "px-6 py-4 text-gray-100", children: ["\u20B9", element.total.toLocaleString()] }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsx("button", { type: "button", className: "text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200", "aria-label": "Delete labour row", onClick: () => {
                                                                const updatedRow = row.filter((_, i) => i !== index);
                                                                setRow(updatedRow);
                                                            }, children: _jsx(MinusCircleIcon, { className: "h-5 w-5" }) }) })] }, index)))) })] }) })] }), _jsxs("div", { className: "flex justify-end gap-4 mt-8 pt-4 border-t border-gray-700", children: [_jsx("button", { type: "button", className: "bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", onClick: () => setAddEnable(false), children: "Cancel" }), _jsx("button", { type: "button", className: "bg-teal-500/90 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", onClick: attendanceTakeFun, children: "Save" })] })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }));
}
export default AddAttendance;
