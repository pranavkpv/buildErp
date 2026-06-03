import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getProjectWithCompletionRateApi } from "../../../api/Sitemanager/dashboard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import StockManagement from "./StockManagement";
import ProjectEstimationDetails from "./ProjectDetails";
function SiteDashboard() {
    const [projectList, setProjectList] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [estimateOn, setEstimateOn] = useState(false);
    const [detailId, setDetailId] = useState("");
    const itemsPerPage = 5;
    const navigate = useNavigate();
    const fetchprojectWithCompletionPer = async () => {
        setLoading(true);
        try {
            const response = await getProjectWithCompletionRateApi({ page, search });
            if (response.success) {
                setProjectList(response.data.data);
                setTotalPages(response.data.totalPages);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to fetch projects");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchprojectWithCompletionPer();
        }, 500);
        return () => clearTimeout(handler);
    }, [search, page]);
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6", children: [_jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-10", children: [_jsx("h1", { className: "text-3xl font-bold mb-4 tracking-tight text-center text-gray-100", children: "Quick Links" }), _jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [_jsx("button", { onClick: () => navigate('/site/changepass'), className: "bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400", "aria-label": "Navigate to Change Password", children: "Change Password" }), _jsx("button", { onClick: () => navigate('/site/stage-updation'), className: "bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400", "aria-label": "Navigate to Stage Updation", children: "Stage Updation" }), _jsx("button", { onClick: () => navigate('/site/purchase'), className: "bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400", "aria-label": "Navigate to Add Purchase", children: "Add Purchase" }), _jsx("button", { onClick: () => navigate('/site/transfer'), className: "bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400", "aria-label": "Navigate to Transfer Material", children: "Transfer Material" }), _jsx("button", { onClick: () => navigate('/site/receive'), className: "bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400", "aria-label": "Navigate to Receive Material", children: "Receive Material" }), _jsx("button", { onClick: () => navigate('/site/attendance'), className: "bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400", "aria-label": "Navigate to Labour Attendance", children: "Labour Attendance" }), _jsx("button", { onClick: () => navigate('/site/chat'), className: "bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400", "aria-label": "Navigate to Chat", children: "Chat" })] })] }), _jsx("h1", { className: "text-3xl font-bold mb-8 tracking-tight text-center", children: "Project List" }), _jsx("div", { className: "mb-6 flex justify-center", children: _jsx("input", { type: "text", value: search, onChange: (e) => {
                                setSearch(e.target.value);
                                setPage(0);
                            }, placeholder: "Search by project name...", className: "w-full max-w-md px-4 py-2 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-400", disabled: loading }) }), loading ? (_jsxs("div", { className: "col-span-full text-center py-12", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-6 rounded-full bg-slate-600 flex items-center justify-center animate-pulse", children: _jsx("svg", { className: "w-10 h-10 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M4 5h16M4 12h16M4 18h16" }) }) }), _jsx("p", { className: "text-gray-300", children: "Loading projects..." })] })) : projectList.length === 0 ? (_jsxs("div", { className: "col-span-full text-center py-12", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-6 rounded-full bg-slate-600 flex items-center justify-center", children: _jsx("svg", { className: "w-10 h-10 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }) }), _jsx("h3", { className: "text-lg font-semibold text-gray-300 mb-3", children: "No Projects Available" }), _jsx("p", { className: "text-gray-400 max-w-md mx-auto", children: search
                                    ? "No projects match your search. Try a different query!"
                                    : "No projects available at this time. Check back later!" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full bg-slate-700 rounded-lg shadow-lg", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-600 text-gray-200 text-left", children: [_jsx("th", { className: "py-3 px-4 font-medium", children: "Sl No" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Project Name" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Start Date" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "End Date" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Completion %" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Action" })] }) }), _jsx("tbody", { children: projectList.map((element, index) => (_jsxs("tr", { className: "border-t border-slate-600 hover:bg-slate-600 transition-colors duration-200", children: [_jsx("td", { className: "py-3 px-4 text-gray-300", children: page * itemsPerPage + index + 1 }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.project_name || "Unnamed Project" }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.start_date
                                                            ? new Date(element.start_date).toLocaleDateString()
                                                            : "N/A" }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.end_date
                                                            ? new Date(element.end_date).toLocaleDateString()
                                                            : "N/A" }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-24 bg-slate-600 rounded-full h-2", children: _jsx("div", { className: `bg-gradient-to-r from-green-400 to-teal-400 h-2 rounded-full transition-all duration-500 w-[${element.completion_per}%]` }) }), _jsxs("span", { className: "ml-2", children: [element.completion_per, "%"] })] }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("button", { onClick: () => {
                                                                setDetailId(element._id);
                                                                setEstimateOn(true);
                                                            }, className: "bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-1 px-3 rounded-lg hover:from-green-500 hover:to-teal-500 transition-colors duration-300", disabled: loading, children: "View Details" }) })] }, index))) })] }) }), totalPages >= 1 && (_jsxs("div", { className: "mt-6 flex justify-center items-center gap-4", children: [_jsx("button", { onClick: () => setPage((prev) => Math.max(prev - 1, 0)), disabled: page === 0 || loading, className: "px-4 py-2 bg-slate-600 text-white rounded-lg disabled:opacity-50 hover:bg-slate-500 transition-colors duration-200", children: "Previous" }), _jsxs("span", { className: "text-gray-300", children: ["Page ", page + 1, " of ", totalPages] }), _jsx("button", { onClick: () => setPage((prev) => Math.min(prev + 1, totalPages - 1)), disabled: page === totalPages - 1 || loading, className: "px-4 py-2 bg-slate-600 text-white rounded-lg disabled:opacity-50 hover:bg-slate-500 transition-colors duration-200", children: "Next" })] }))] }))] }), _jsx(StockManagement, {}), _jsx(ProjectEstimationDetails, { estimateOn: estimateOn, setEstimateOn: setEstimateOn, onSuccess: fetchprojectWithCompletionPer, projectId: detailId })] }));
}
export default SiteDashboard;
