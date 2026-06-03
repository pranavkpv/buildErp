import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { fetchStockApi } from "../../../api/Sitemanager/dashboard";
import { getSitemanagersProject } from "../../../api/Sitemanager/profile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
function StockManagement() {
    const [project, setProject] = useState([]);
    const [projectId, setProjectId] = useState("");
    const [material, setMaterial] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [stock, setStock] = useState([]);
    const fetchProject = async () => {
        const response = await getSitemanagersProject();
        if (response.success) {
            setProject(response.data);
        }
        else {
            toast.error(response.message);
        }
    };
    const fetchStocks = async () => {
        const response = await fetchStockApi(projectId, material, page);
        if (response.success) {
            setStock(response.data.data);
            setTotalPage(response.data.totalPage);
        }
        else {
            toast.error(response.message);
        }
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchStocks();
        }, 500);
        return () => clearTimeout(handler);
    }, [projectId, material, page]);
    useEffect(() => {
        fetchProject();
    }, []);
    return (_jsxs("div", { className: "max-w-7xl mx-auto mt-8", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-100 mb-6 text-center", children: "Stock Management" }), _jsxs("div", { className: "mb-6 flex flex-col sm:flex-row justify-center gap-4", children: [_jsxs("select", { "aria-label": "Select project", value: projectId, onChange: (e) => {
                            setProjectId(e.target.value);
                            setPage(0);
                        }, className: "w-full sm:w-1/2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white text-sm", children: [_jsx("option", { value: "", children: "Select Project" }), project.map((element) => (_jsx("option", { value: element._id, children: element.project_name }, element._id)))] }), _jsx("input", { type: "text", placeholder: "Search with material...", value: material, onChange: (e) => {
                            setMaterial(e.target.value);
                            setPage(0);
                        }, className: "w-full sm:w-1/2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white text-sm placeholder-gray-400" })] }), _jsx("div", { className: "overflow-x-auto rounded-lg shadow-lg", children: _jsxs("table", { className: "w-full table-fixed bg-slate-700 text-sm text-left", children: [_jsx("thead", { className: "bg-slate-600 text-gray-200 uppercase text-xs font-semibold tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "py-3 px-4 w-[20%]", children: "SL No" }), _jsx("th", { className: "py-3 px-4 w-[20%]", children: "Material" }), _jsx("th", { className: "py-3 px-4 w-[20%]", children: "Brand" }), _jsx("th", { className: "py-3 px-4 w-[20%]", children: "Unit" }), _jsx("th", { className: "py-3 px-4 w-[20%]", children: "Stock" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-600", children: stock.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "text-center py-12 text-gray-400 text-sm font-medium", children: material || projectId
                                        ? "No stock matches your search or project selection."
                                        : "No stock data available." }) })) : (stock.map((element, index) => (_jsxs("tr", { className: "border-t border-slate-600 hover:bg-slate-600 transition-colors duration-200", children: [_jsx("td", { className: "py-3 px-4 text-gray-300 w-[20%]", children: page * 5 + index + 1 }), _jsx("td", { className: "py-3 px-4 text-gray-300 w-[20%] truncate", children: element.material_name || "N/A" }), _jsx("td", { className: "py-3 px-4 text-gray-300 w-[20%] truncate", children: element.brand_name || "N/A" }), _jsx("td", { className: "py-3 px-4 text-gray-300 w-[20%] truncate", children: element.unit_name || "N/A" }), _jsx("td", { className: "py-3 px-4 text-gray-300 w-[20%]", children: element.stock ?? 0 })] }, element._id)))) })] }) }), totalPage >= 1 && (_jsxs("div", { className: "mt-6 flex justify-center items-center gap-4", children: [_jsx("button", { onClick: () => setPage((prev) => Math.max(prev - 1, 0)), disabled: page === 0, className: "px-4 py-2 bg-slate-600 text-white rounded-lg disabled:opacity-50 hover:bg-slate-500 transition-colors duration-200 text-sm font-medium", children: "Previous" }), _jsxs("span", { className: "text-gray-300 text-sm", children: ["Page ", page + 1, " of ", totalPage] }), _jsx("button", { onClick: () => setPage((prev) => Math.min(prev + 1, totalPage - 1)), disabled: page === totalPage - 1, className: "px-4 py-2 bg-slate-600 text-white rounded-lg disabled:opacity-50 hover:bg-slate-500 transition-colors duration-200 text-sm font-medium", children: "Next" })] }))] }));
}
export default StockManagement;
