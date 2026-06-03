import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { fetchBugetAPI, stageSaveAPI } from "../../../api/Admin/StageSetting";
import { getPendingAllProject } from "../../../api/project";
import Loading from "../../../components/Loading";
function AddStage({ addEnable, setAddEnable, onAddSuccess }) {
    if (!addEnable)
        return null;
    const [project, setProject] = useState([]);
    const [cost, setCost] = useState(0);
    const [projectId, setProjectId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [stages, setStages] = useState([]);
    const projectRef = useRef(null);
    const startRef = useRef(null);
    const endRef = useRef(null);
    const [loadOn, setLoadOn] = useState(false);
    const fetchProject = async () => {
        const response = await getPendingAllProject();
        setProject(response.data);
    };
    const fetchBudgetedCost = async (projectId) => {
        const data = await fetchBugetAPI(projectId);
        if (data.success) {
            setCost(data.data);
        }
        else {
            setProjectId("");
            setCost(0);
            toast.error(data.message);
        }
    };
    useEffect(() => {
        fetchProject();
    }, []);
    const addStageRow = () => {
        setStages([...stages, { stage_name: "", start_date: "", end_date: "", stage_percentage: 0, stage_amount: 0 }]);
    };
    const saveStageFun = async () => {
        if (projectId == "") {
            projectRef.current ? projectRef.current.innerText = "project name is required" : "";
            return;
        }
        else {
            projectRef.current ? projectRef.current.innerText = "" : "project name is required";
        }
        if (startDate == "") {
            startRef.current ? startRef.current.innerText = "start date is required" : "";
            return;
        }
        else {
            startRef.current ? startRef.current.innerText = "" : "start date is required";
        }
        if (endDate == "") {
            endRef.current ? endRef.current.innerText = "end date is required" : "";
            return;
        }
        else {
            endRef.current ? endRef.current.innerText = "" : "end date is required";
        }
        let sum = 0;
        for (let element of stages) {
            sum += element.stage_amount;
            if (element.stage_name.trim() == "") {
                toast.warning("should enter stage name");
                return;
            }
            if (element.start_date == "") {
                toast.warning("should enter start date of stage");
                return;
            }
            if (element.end_date == "") {
                toast.warning("should enter end date of stage");
                return;
            }
            if (element.stage_amount == 0) {
                toast.warning("stage amount must be greater than 0");
                return;
            }
        }
        if (sum != cost) {
            toast.warning("Must set all stages in corresponding project");
            return;
        }
        setLoadOn(true);
        const data = await stageSaveAPI({ stages, projectId, startDate, endDate, cost });
        setLoadOn(false);
        if (data.success) {
            toast.success(data.message);
            setAddEnable(false);
            onAddSuccess();
        }
        else {
            toast.error(data.message);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6", children: _jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-5xl max-h-[95vh] overflow-y-auto border border-gray-700/50", children: [_jsx("h1", { className: "text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4", children: "Stage Setting" }), _jsxs("div", { className: "grid grid-cols-1 gap-6 mb-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "projectSelect", className: "block text-sm font-medium text-gray-200 mb-1", children: "Project" }), _jsxs("select", { id: "projectSelect", "aria-label": "Select a project", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", onChange: (e) => {
                                                setProjectId(e.target.value);
                                                if (e.target.value) {
                                                    fetchBudgetedCost(e.target.value);
                                                }
                                            }, value: projectId, children: [_jsx("option", { value: "", children: "Select Project" }), project.map((element) => (_jsx("option", { value: element._id, children: element.project_name }, element._id)))] }), _jsx("p", { ref: projectRef })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "budgetedCost", className: "block text-sm font-medium text-gray-200 mb-1", children: "Budgeted Cost" }), _jsx("input", { id: "budgetedCost", type: "text", placeholder: "Budgeted cost", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 text-sm", value: cost === 0 ? "" : cost.toLocaleString(), readOnly: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "startDate", className: "block text-sm font-medium text-gray-200 mb-1", children: "Start Date" }), _jsx("input", { onChange: (e) => setStartDate(e.target.value), id: "startDate", type: "date", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", placeholder: "Start date", min: new Date().toISOString().split("T")[0] }), _jsx("p", { ref: startRef })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "endDate", className: "block text-sm font-medium text-gray-200 mb-1", children: "End Date" }), _jsx("input", { onChange: (e) => {
                                                if (e.target.value < startDate) {
                                                    toast.warning("end date must be greater than start date");
                                                    e.target.value = "";
                                                    return;
                                                }
                                                else {
                                                    setEndDate(e.target.value);
                                                }
                                            }, id: "endDate", type: "date", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", placeholder: "End date", min: new Date().toISOString().split("T")[0] }), _jsx("p", { ref: endRef })] })] }), _jsxs("div", { className: "mb-4 pt-4 border-t border-gray-700", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-100", children: "Stages" }), _jsxs("button", { onClick: addStageRow, type: "button", className: "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2", children: [_jsx(PlusCircleIcon, { className: "h-5 w-5" }), " Add Stage"] })] }), _jsx("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: _jsxs("table", { className: "min-w-full text-sm text-left bg-gray-800/50", children: [_jsx("thead", { className: "bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 w-[25%]", children: "Stage Name" }), _jsx("th", { className: "px-6 py-4 w-[20%]", children: "Start Date" }), _jsx("th", { className: "px-6 py-4 w-[20%]", children: "End Date" }), _jsx("th", { className: "px-6 py-4 w-[15%]", children: "Stage %" }), _jsx("th", { className: "px-6 py-4 w-[20%]", children: "Stage Amount" }), _jsx("th", { className: "px-6 py-4 w-[10%] text-center", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700/50", children: stages.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "text-center py-8 text-gray-400 text-sm font-medium", children: "Click \"Add Stage\" to add a stage." }) })) : (stages.map((stage, index) => (_jsxs("tr", { className: "hover:bg-gray-700/50 transition-colors duration-150", children: [_jsx("td", { className: "px-6 py-4 w-[25%]", children: _jsx("input", { type: "text", className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", placeholder: "Enter stage name", value: stage.stage_name, onChange: (e) => {
                                                                    const updatedStages = [...stages];
                                                                    updatedStages[index].stage_name = e.target.value;
                                                                    setStages(updatedStages);
                                                                } }) }), _jsx("td", { className: "px-6 py-4 w-[20%]", children: _jsx("input", { placeholder: "enter startdate", type: "date", min: new Date().toISOString().split("T")[0], className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", value: stage.start_date, onChange: (e) => {
                                                                    const updatedStages = [...stages];
                                                                    updatedStages[index].start_date = e.target.value;
                                                                    setStages(updatedStages);
                                                                } }) }), _jsx("td", { className: "px-6 py-4 w-[20%]", children: _jsx("input", { placeholder: "enter end date", type: "date", className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", value: stage.end_date, min: new Date().toISOString().split("T")[0], onChange: (e) => {
                                                                    const updatedStages = [...stages];
                                                                    if (e.target.value < updatedStages[index].start_date) {
                                                                        toast.warning("end date must be greater than start date");
                                                                        e.target.value = "";
                                                                        return;
                                                                    }
                                                                    updatedStages[index].end_date = e.target.value;
                                                                    setStages(updatedStages);
                                                                } }) }), _jsx("td", { className: "px-6 py-4 w-[15%]", children: _jsx("input", { type: "number", className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", placeholder: "Enter stage %", value: stage.stage_percentage === 0 ? "" : stage.stage_percentage, onChange: (e) => {
                                                                    const updatedStages = [...stages];
                                                                    updatedStages[index].stage_percentage = Number(e.target.value);
                                                                    updatedStages[index].stage_amount = (cost * Number(e.target.value)) / 100;
                                                                    setStages(updatedStages);
                                                                } }) }), _jsx("td", { className: "px-6 py-4 w-[20%]", children: _jsx("input", { type: "number", className: "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 text-sm", value: stage.stage_amount === 0 ? "" : stage.stage_amount, readOnly: true, placeholder: "Stage Amount" }) }), _jsx("td", { className: "px-6 py-4 w-[10%] text-center", children: _jsx("button", { type: "button", className: "text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200", "aria-label": "Delete stage row", onClick: () => {
                                                                    const updatedStages = stages.filter((_, i) => i !== index);
                                                                    setStages(updatedStages);
                                                                }, children: _jsx(MinusCircleIcon, { className: "h-5 w-5" }) }) })] }, index)))) })] }) })] }), _jsxs("div", { className: "flex justify-between items-center mt-8 pt-4 border-t border-gray-700", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsxs("p", { className: "text-lg font-semibold text-gray-100", children: ["Total Amount: \u20B9", stages.reduce((sum, stage) => sum + stage.stage_amount, 0).toLocaleString()] }), _jsxs("p", { className: "text-lg font-semibold text-gray-100", children: ["Balance Amount: \u20B9", (cost - stages.reduce((sum, stage) => sum + stage.stage_amount, 0)).toLocaleString()] })] }), _jsxs("div", { className: "flex justify-end gap-4", children: [_jsx("button", { type: "button", className: "bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", onClick: () => setAddEnable(false), children: "Cancel" }), _jsx("button", { type: "button", className: "bg-teal-500/90 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", onClick: saveStageFun, children: "Save" })] })] })] }) }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }));
}
export default AddStage;
