import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import AddSiteToProject from "./AddSiteToproject";
import DeleteSiteToProject from "./DeleteSiteToproject";
import { listOfsitemanager } from "../../../api/Admin/addSiteToproject";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
function ListSiteToProject() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    // Delete data
    const [deleteEnable, setDeleteEnable] = useState(false);
    const [deleteProjectId, setDeleteProjectId] = useState("");
    const [deleteSiteManagerId, setDeleteSiteManagerId] = useState("");
    // Add data
    const [addEnable, setAddEnable] = useState(false);
    const [loadOn, setLoadOn] = useState(false);
    const fetchData = async () => {
        try {
            setLoadOn(true);
            const response = await listOfsitemanager(page, search);
            if (response.success) {
                setLoadOn(false);
                setTotalPage(Math.ceil(response.data.totalPage));
                setData(response.data.data);
            }
            else {
                setLoadOn(false);
                toast.error(response.message);
            }
        }
        catch (error) {
            setLoadOn(false);
        }
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchData();
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [page, search]);
    return (_jsx("div", { className: "p-6 sm:p-8 min-h-screen bg-gray-900", children: _jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-6xl mx-auto border border-gray-700/50", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8", children: [_jsx(ReUsableSearch, { search: search, setSearch: setSearch, item: "project or site manager" }), _jsx(ReUsableAddButton, { addFuntion: () => setAddEnable(true), item: "Site Assignment" })] }), loadOn ? _jsx(Loading, {}) : _jsxs("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: [_jsxs("table", { className: "min-w-full text-sm text-left bg-gray-800/50", children: [_jsx("thead", { className: "bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4", children: "SL No" }), _jsx("th", { className: "px-6 py-4", children: "Project Name" }), _jsx("th", { className: "px-6 py-4", children: "Site Manager" }), _jsx("th", { className: "px-6 py-4 text-center", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700/50", children: data.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "text-center py-12 text-gray-400 text-sm font-medium", children: "No site assignments found." }) })) : (data.map((element, index) => (_jsxs("tr", { className: "hover:bg-gray-700/50 transition-colors duration-150", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-200", children: index + 1 }), _jsx("td", { className: "px-6 py-4 text-gray-200", children: element.project_name }), _jsx("td", { className: "px-6 py-4 text-gray-200", children: element?.sitemanagerDetails[0]?.username || "-" }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsx("button", { onClick: () => {
                                                        setDeleteEnable(true);
                                                        setDeleteProjectId(element._id);
                                                        setDeleteSiteManagerId(element?.sitemanagerDetails[0]?._id || "");
                                                    }, className: "text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200", "aria-label": `Delete assignment for ${element.project_name}`, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }) })] }, element._id)))) })] }), _jsx(ReUsablePagination, { page: page, setPage: setPage, totalPage: totalPage })] }), _jsx(AddSiteToProject, { addEnable: addEnable, setAddEnable: setAddEnable, onAddSuccess: fetchData }), _jsx(DeleteSiteToProject, { deleteEnable: deleteEnable, setDeleteEnable: setDeleteEnable, deleteProjectId: deleteProjectId, deleteSiteManagerId: deleteSiteManagerId, onDeleteSuccess: fetchData })] }) }));
}
export default ListSiteToProject;
