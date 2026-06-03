import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import AddEstimation from "./AddEstimation";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import EditEstimation from "./EditEstimation";
import { fetChEstimation } from "../../../api/Estimation";
import { EyeIcon, SendIcon } from "lucide-react";
import SendEstimation from "./SendEstimation";
import RejectView from "./RejectView";
import ProjectImageUpload from "./ProjectImageUpload";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
function ListEstimation() {
    const [addEnable, setAddEnable] = useState(false);
    const [projectIds, setProjectIds] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState([]);
    const [sendEnable, setSendEnable] = useState(false);
    const [sendProjectId, setSendProjectId] = useState("");
    const [editEnable, setEditEnable] = useState(false);
    const [editProjectId, setEditProjectId] = useState("");
    const [viewRejectOn, setViewRejectOn] = useState(false);
    const [reason, setReason] = useState("");
    const [imageEnable, setImageEnable] = useState(false);
    const [uploadProject, setUploadImage] = useState("");
    const [loadOn, setLoadOn] = useState(false);
    const fetchData = async () => {
        setLoadOn(true);
        const response = await fetChEstimation(search, page);
        setLoadOn(false);
        setData(response.data.data);
        const projects = response.data.data.map((element) => element.projectObjectId);
        let x = [];
        for (let i = 0; i < response.data.totalPage; i++) {
            x.push(i);
        }
        setTotal(x);
        setProjectIds(projects);
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchData();
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [page, search]);
    return (_jsx("div", { className: "min-h-screen bg-gray-900 p-6 sm:p-8 relative", children: _jsxs("div", { className: "max-w-6xl mx-auto bg-gray-800/30 rounded-2xl shadow-xl border border-gray-700/50 p-6 sm:p-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-100 tracking-tight", children: "Estimation" }), _jsxs("div", { className: "flex w-full sm:w-auto gap-4", children: [_jsx(ReUsableSearch, { search: search, setSearch: setSearch, item: "project" }), _jsx(ReUsableAddButton, { addFuntion: () => setAddEnable(true), item: "Estimation" })] })] }), _jsx(AddEstimation, { addEnable: addEnable, setAddEnable: setAddEnable, anAddSuccess: fetchData, projectIds: projectIds }), _jsx(Link, { to: "/admin/stage", className: "inline-block bg-teal-500/90 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 mt-4", "aria-label": "Navigate to Stage Set", children: "Move to Stage Set" }), _jsxs("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50 mt-4", children: [_jsxs("table", { className: "min-w-full text-sm text-left bg-gray-800/50 rounded-xl", children: [_jsx("thead", { className: "bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider sticky top-0 z-10", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 w-[10%] text-center", children: "SL NO" }), _jsx("th", { className: "px-6 py-4 w-[25%]", children: "Project Name" }), _jsx("th", { className: "px-6 py-4 w-[20%]", children: "Budgeted Amount" }), _jsx("th", { className: "px-6 py-4 w-[25%]", children: "Estimated Image" }), _jsx("th", { className: "px-6 py-4 w-[20%] text-center", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700/50", children: data.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "text-center py-12 text-gray-400 text-base font-medium", children: "No estimations available. Click \"Add Estimation\" to create one." }) })) : (data.map((element, index) => (_jsxs("tr", { className: "hover:bg-gray-700/50 transition-colors duration-200", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-200 text-center", children: index + 1 }), _jsx("td", { className: "px-6 py-4 text-gray-100", children: element.projectDetails.project_name }), _jsxs("td", { className: "px-6 py-4 text-gray-100", children: ["\u20B9", element.budgeted_cost.toLocaleString()] }), _jsx("td", { className: "px-6 py-4 flex flex-col items-start gap-3", children: _jsx("button", { onClick: () => {
                                                        setImageEnable(true);
                                                        setUploadImage(element.project_id);
                                                    }, className: "bg-teal-500/90 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400", children: "View Estimated Image" }) }), _jsxs("td", { className: "px-6 py-4 ", children: [_jsx("button", { type: "button", className: "text-teal-400 hover:text-teal-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400", "aria-label": `Edit estimation for ${element.projectDetails.project_name}`, onClick: () => {
                                                            setEditEnable(true);
                                                            setEditProjectId(element.projectObjectId);
                                                        }, children: _jsx(PencilSquareIcon, { className: "h-5 w-5" }) }), _jsx("button", { type: "button", className: "text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400", "aria-label": `Send estimation for ${element.projectDetails.project_name}`, onClick: () => {
                                                            setSendEnable(true);
                                                            setSendProjectId(element.projectObjectId);
                                                        }, children: _jsx(SendIcon, { className: "h-5 w-5" }) }), _jsx("button", { type: "button", className: "text-blue-400 hover:text-blue-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400", "aria-label": `View rejection reason for ${element.projectDetails.project_name}`, onClick: () => {
                                                            setViewRejectOn(true);
                                                            setReason(element.reason);
                                                        }, children: _jsx(EyeIcon, { className: "h-5 w-5" }) })] })] }, element.projectObjectId)))) })] }), _jsx(ReUsablePagination, { page: page, setPage: setPage, totalPage: total.length })] }), _jsx(SendEstimation, { sendEnable: sendEnable, setSendEnable: setSendEnable, projectId: sendProjectId, onSendSuccess: fetchData }), _jsx(EditEstimation, { editEnable: editEnable, setEditEnable: setEditEnable, anEditSuccess: fetchData, projectIds: projectIds, editProjectId: editProjectId }), _jsx(RejectView, { viewRejectOn: viewRejectOn, setViewRejectOn: setViewRejectOn, reason: reason }), _jsx(ProjectImageUpload, { setUploadEnable: setImageEnable, uploadEnable: imageEnable, uploadProjectId: uploadProject }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/50 flex items-center justify-center z-50 rounded-xl", children: _jsx(Loading, {}) }))] }) }));
}
export default ListEstimation;
