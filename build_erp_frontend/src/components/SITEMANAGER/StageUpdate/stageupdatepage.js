import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmStatus from "./ConfirmStatus";
import ImageUpload from "./ImageUpload";
import { getSitemanagersProject } from "../../../api/Sitemanager/profile";
import { getStageInSitemanager } from "../../../api/Sitemanager/stageStatus";
import Loading from "../../../components/Loading";
function StageUpdatePage() {
    const [project, setProject] = useState([]);
    const [stage, setStage] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    //status change
    const [statusEnable, setStatusEnable] = useState(false);
    const [editStageId, setEditStage] = useState("");
    const [newProgress, setNewProgress] = useState(0);
    const progress = [0, 25, 50, 75, 100];
    //imageupload
    const [uploadEnable, setUploadEnable] = useState(false);
    const [uploadStageId, setUploadStageId] = useState("");
    const [loadOn, setLoadOn] = useState(false);
    const fetchProject = async () => {
        const response = await getSitemanagersProject();
        setProject(response.data);
    };
    const fetchStage = async (projectId) => {
        setLoadOn(true);
        const response = await getStageInSitemanager(projectId);
        setLoadOn(false);
        if (response.success) {
            setStage(response.data);
        }
        else {
            toast.error(response.message);
        }
    };
    useEffect(() => {
        fetchProject();
    }, []);
    const formatDate = (dateString) => {
        if (!dateString)
            return "";
        const [date] = dateString.split("T");
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-900 p-4 sm:p-6", children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-100 mb-6 text-center", children: "Stage Status Update" }), _jsxs("div", { className: "mb-8", children: [_jsx("label", { htmlFor: "projectSelect", className: "block text-sm font-medium text-gray-200 mb-1", children: "Select Project" }), _jsxs("select", { id: "projectSelect", "aria-label": "Select a project", className: "w-full sm:w-96 px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", onChange: (e) => {
                                setSelectedProjectId(e.target.value);
                                if (e.target.value) {
                                    fetchStage(e.target.value);
                                }
                                else {
                                    setStage([]);
                                }
                            }, value: selectedProjectId, children: [_jsx("option", { value: "", children: "Select Project" }), project.map((element) => (_jsx("option", { value: element._id, children: element.project_name }, element._id)))] })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) })), _jsxs("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: [_jsxs("table", { className: "min-w-full text-sm text-left bg-gray-800/50", children: [_jsx("thead", { className: "bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 w-[8%]", children: "SL NO" }), _jsx("th", { className: "px-6 py-4 w-[20%]", children: "Stage Name" }), _jsx("th", { className: "px-6 py-4 w-[15%]", children: "Start Date" }), _jsx("th", { className: "px-6 py-4 w-[15%]", children: "End Date" }), _jsx("th", { className: "px-6 py-4 w-[15%]", children: "Stage Amount" }), _jsx("th", { className: "px-6 py-4 w-[15%]", children: "Last Updated" }), _jsx("th", { className: "px-6 py-4 w-[12%]", children: "Status" }), _jsx("th", { className: "px-6 py-4 w-[15%] text-center", children: "Upload Image" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700/50", children: stage.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 8, className: "text-center py-8 text-gray-400 text-sm font-medium", children: "No stages available. Select a project to view stages." }) })) : (stage.map((element, index) => (_jsxs("tr", { className: "hover:bg-gray-700/50 transition-colors duration-150", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-200 text-center", children: index + 1 }), _jsx("td", { className: "px-6 py-4 text-gray-100", children: element.stage_name }), _jsx("td", { className: "px-6 py-4 text-gray-100", children: formatDate(element.start_date) }), _jsx("td", { className: "px-6 py-4 text-gray-100", children: formatDate(element.end_date) }), _jsxs("td", { className: "px-6 py-4 text-gray-100", children: ["\u20B9", element.stage_amount.toLocaleString()] }), _jsx("td", { className: "px-6 py-4 text-gray-100", children: formatDate(element.status_date) }), _jsx("td", { className: "px-4 py-3 sm:px-6 sm:py-4", children: _jsxs("select", { name: "progress", id: "progress-select", "aria-label": "Select project progress", onChange: (e) => {
                                                        setNewProgress(Number(e.target.value));
                                                        setStatusEnable(true);
                                                        setEditStage(element._id);
                                                    }, className: "w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-sm cursor-pointer hover:bg-gray-600/50", children: [_jsx("option", { value: element.progress, className: "bg-gray-800 text-gray-100", children: element.progress }), progress.filter((x) => x > element.progress).map((item, index) => (_jsx("option", { value: item, className: "bg-gray-800 text-gray-100", children: item }, index)))] }) }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsx("button", { type: "button", className: "text-teal-400 hover:text-teal-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200 text-sm font-medium", onClick: () => {
                                                        setUploadEnable(true);
                                                        setUploadStageId(element._id);
                                                    }, children: "View" }) })] }, element._id)))) })] }), _jsx(ConfirmStatus, { statusEnable: statusEnable, editStageId: editStageId, newProgress: newProgress, setStatusEnable: setStatusEnable, onSuccess: fetchProject, onstatusSuccess: () => fetchStage(selectedProjectId), selectedProjectId: selectedProjectId }), _jsx(ImageUpload, { setUploadEnable: setUploadEnable, uploadEnable: uploadEnable, uploadStageId: uploadStageId })] })] }) }));
}
export default StageUpdatePage;
