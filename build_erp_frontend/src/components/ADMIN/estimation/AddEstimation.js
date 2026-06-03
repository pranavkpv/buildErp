import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { getSpec, sumOfLabourFun, sumOfMaterialFun } from "../../../api/Specification";
import { getPendingAllProject } from "../../../api/project";
import { EstimationSave } from "../../../api/Estimation";
import Loading from "../../../components/Loading";
function AddEstimation({ addEnable, setAddEnable, anAddSuccess, projectIds }) {
    if (!addEnable)
        return null;
    const [project, setProject] = useState([]);
    const [spec, setSpec] = useState([]);
    const [row, setRow] = useState([]);
    const [finalAmount, setFinalAmount] = useState(0);
    const [projectId, setProjectId] = useState("");
    const [loadOn, setLoadOn] = useState(false);
    const fetchProject = async () => {
        const response = await getPendingAllProject();
        setProject(response.data);
    };
    const fetchSpec = async () => {
        const response = await getSpec();
        setSpec(response.data);
    };
    async function fetchSumOfMat(materialDetails) {
        const data = await sumOfMaterialFun(materialDetails);
        return data.data;
    }
    async function fetSumOfLabour(labourDetails) {
        const data = await sumOfLabourFun(labourDetails);
        return data.data;
    }
    const findSpecRate = async (materialDetails, labourDetails, additionalExpense_per, profit_per, index, specId, specname) => {
        for (let element of row) {
            if (element.spec_id === specId && row[index].spec_id !== specId) {
                toast.error("Specification already selected in another row");
                return;
            }
        }
        const sumOfMaterial = await fetchSumOfMat(materialDetails);
        const sumOfLabour = await fetSumOfLabour(labourDetails);
        const sum = sumOfMaterial + sumOfLabour;
        const finalAmount = sum + (sum * additionalExpense_per) / 100 + (sum + (sum * additionalExpense_per) / 100) * (profit_per / 100);
        const updateRow = [...row];
        updateRow[index].unitrate = finalAmount;
        updateRow[index].spec_id = specId;
        updateRow[index].spec_name = specname;
        updateRow[index].total = updateRow[index].unitrate * updateRow[index].quantity || 0;
        setRow(updateRow);
    };
    useEffect(() => {
        fetchProject();
    }, []);
    useEffect(() => {
        fetchSpec();
    }, []);
    useEffect(() => {
        let sum = 0;
        for (let char of row) {
            sum += char.total;
        }
        setFinalAmount(sum);
    }, [row]);
    const SaveEstimation = async () => {
        if (!projectId) {
            toast.error("Please select a project.");
            return;
        }
        const specIds = row.map((r) => r.spec_id);
        const uniqueSpecIds = new Set(specIds);
        if (uniqueSpecIds.size !== specIds.length) {
            toast.error("Duplicate specification IDs detected. Each row must have a unique specification.");
            return;
        }
        if (row.some((r) => r.total === 0)) {
            toast.error("All specification rows must have a total greater than 0.");
            return;
        }
        if (row.some((r) => r.spec_id === "")) {
            toast.error("Please select a specification ID for all rows.");
            return;
        }
        setLoadOn(true);
        const response = await EstimationSave(projectId, row);
        setLoadOn(false);
        if (response.success) {
            toast.success(response.message);
            setAddEnable(false);
            anAddSuccess();
        }
        else {
            toast.error(response.message);
        }
    };
    return (_jsx(_Fragment, { children: _jsx("div", { className: "fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6", children: _jsxs("div", { className: "relative bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-gray-700/50", children: [_jsx("h1", { className: "text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4", children: "Add Estimation" }), _jsx("div", { className: "grid grid-cols-1 gap-6 mb-6", children: _jsxs("div", { children: [_jsx("label", { htmlFor: "projectSelect", className: "block text-sm font-medium text-gray-200 mb-1", children: "Project" }), _jsxs("select", { id: "projectSelect", "aria-label": "Select a project", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", onChange: (e) => {
                                        if (projectIds.includes(e.target.value)) {
                                            toast.error("Project already exists");
                                            e.target.value = "";
                                            return;
                                        }
                                        setProjectId(e.target.value);
                                    }, value: projectId, disabled: loadOn, children: [_jsx("option", { value: "", children: "Select Project" }), project.map((element) => (_jsx("option", { value: element._id, children: element.project_name }, element._id)))] })] }) }), _jsxs("div", { className: "mb-4 pt-4 border-t border-gray-700", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-100", children: "Specification Details" }), _jsxs("button", { disabled: loadOn, onClick: () => {
                                            setRow([...row, { spec_id: "", spec_name: "", unitrate: 0, quantity: 0, total: 0 }]);
                                        }, type: "button", className: "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2", children: [_jsx(PlusCircleIcon, { className: "h-5 w-5" }), " Add Specification Row"] })] }), _jsx("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: _jsxs("table", { className: "min-w-full text-sm text-left bg-gray-800/50", children: [_jsx("thead", { className: "bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4", children: "Spec ID" }), _jsx("th", { className: "px-6 py-4", children: "Spec Name" }), _jsx("th", { className: "px-6 py-4", children: "Unit Rate" }), _jsx("th", { className: "px-6 py-4", children: "Quantity" }), _jsx("th", { className: "px-6 py-4", children: "Total" }), _jsx("th", { className: "px-6 py-4 text-center", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700/50", children: row.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "text-center py-8 text-gray-400 text-sm font-medium", children: "Click \"Add Specification Row\" to add specifications." }) })) : (row.map((element, index) => (_jsxs("tr", { className: "hover:bg-gray-700/50 transition-colors duration-150", children: [_jsx("td", { className: "px-6 py-4", children: _jsxs("select", { "aria-label": "Select a specification", className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", onChange: (e) => {
                                                                const x = spec.find((item) => item.spec_id === e.target.value);
                                                                if (x) {
                                                                    findSpecRate(x.materialDetails, x.labourDetails, x.additionalExpense_per || 0, x.profit_per || 0, index, x.spec_id, x.spec_name);
                                                                }
                                                            }, value: element.spec_id, disabled: loadOn, children: [_jsx("option", { value: "", children: "Select Spec ID" }), spec.map((item) => (_jsx("option", { value: item.spec_id, children: item.spec_id }, item.spec_id)))] }) }), _jsx("td", { className: "px-6 py-4", children: _jsx("input", { type: "text", className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 text-sm", value: element.spec_name, readOnly: true, placeholder: "Spec Name" }) }), _jsx("td", { className: "px-6 py-4", children: _jsx("input", { type: "number", className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 text-sm", value: element.unitrate === 0 ? "" : element.unitrate, placeholder: "Unit Rate", readOnly: true }) }), _jsx("td", { className: "px-6 py-4", children: _jsx("input", { type: "text", className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", placeholder: "Enter quantity", onChange: (e) => {
                                                                const updateRow = [...row];
                                                                updateRow[index].quantity = Number(e.target.value);
                                                                updateRow[index].total = updateRow[index].unitrate * updateRow[index].quantity;
                                                                setRow(updateRow);
                                                            }, value: element.quantity === 0 ? "" : element.quantity, disabled: loadOn }) }), _jsx("td", { className: "px-6 py-4", children: _jsx("input", { type: "number", className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 text-sm", value: element.total === 0 ? "" : element.total, placeholder: "Total", readOnly: true }) }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsx("button", { type: "button", disabled: loadOn, className: "text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200", "aria-label": "Delete specification row", onClick: () => {
                                                                const updateRow = row.filter((_, itemIndex) => itemIndex !== index);
                                                                setRow(updateRow);
                                                            }, children: _jsx(MinusCircleIcon, { className: "h-5 w-5" }) }) })] }, index)))) })] }) })] }), _jsxs("div", { className: "flex justify-between items-center mt-8 pt-4 border-t border-gray-700", children: [_jsxs("p", { className: "text-lg font-semibold text-gray-100", children: ["Final Amount: \u20B9", finalAmount.toLocaleString()] }), _jsxs("div", { className: "flex justify-end gap-4", children: [_jsx("button", { type: "button", className: "bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", onClick: () => setAddEnable(false), disabled: loadOn, children: "Cancel" }), _jsx("button", { type: "button", onClick: SaveEstimation, disabled: loadOn, className: "bg-teal-500/90 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", children: "Save Estimation" })] })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none", children: _jsx(Loading, {}) }))] }) }) }));
}
export default AddEstimation;
