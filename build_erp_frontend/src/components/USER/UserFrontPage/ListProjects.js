import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search, Layers, XCircle, ChevronLeft, ChevronRight, HardHat, Hammer, CheckCircle2 } from "lucide-react";
import ProjectCard from "./ProjectCard";
import UserHeader from "../common/UserHeader";
import Footer from "../common/Footer";
import { fetchStatusBaseProject } from "../../../api/auth";
function ListProject() {
    const location = useLocation();
    const state = location.state;
    const [project, setProject] = useState([]);
    const [area, setArea] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    const [selectedArea, setSelectedArea] = useState(0);
    const [totalPage, setTotalPage] = useState([]);
    const [page, setPage] = useState(0);
    const fetchProject = async () => {
        const response = await fetchStatusBaseProject({ state, searchItem, selectedArea, page });
        setProject(response.data.projectData);
        setArea(response.data.areas);
        let y = [];
        for (let i = 0; i < response.totalPage; i++) {
            y.push(0);
        }
        setTotalPage(y);
    };
    useEffect(() => {
        fetchProject();
    }, [searchItem, page, selectedArea]);
    // Determine industrial section configurations dynamically based on layout pipeline status
    const getSectionConfig = (status) => {
        switch (status) {
            case "pending":
                return {
                    title: "Upcoming Blueprints",
                    subtitle: "Projects in the optimization planning and layout phase",
                    gradient: "from-amber-500 via-orange-500 to-yellow-600",
                    iconColor: "text-amber-500",
                    accentColor: "border-amber-500/30",
                    icon: _jsx(HardHat, { className: "w-8 h-8" })
                };
            case "processing":
                return {
                    title: "Ongoing Deployments",
                    subtitle: "Active operational environments currently under structural construction",
                    gradient: "from-orange-500 via-yellow-500 to-orange-600",
                    iconColor: "text-orange-500",
                    accentColor: "border-orange-500/30",
                    icon: _jsx(Hammer, { className: "w-8 h-8" })
                };
            default:
                return {
                    title: "Completed Structures",
                    subtitle: "Successfully engineered architectures delivered to client database specifications",
                    gradient: "from-emerald-500 via-teal-500 to-blue-600",
                    iconColor: "text-emerald-500",
                    accentColor: "border-emerald-500/30",
                    icon: _jsx(CheckCircle2, { className: "w-8 h-8" })
                };
        }
    };
    const config = getSectionConfig(state);
    return (_jsxs("div", { className: "min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between", children: [_jsxs("div", { children: [_jsx(UserHeader, {}), _jsx("div", { className: "h-1.5 w-full", style: {
                            backgroundImage: `repeating-linear-gradient(45deg, #f97316, #f97316 10px, #1e293b 10px, #1e293b 20px)`
                        } }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6", children: _jsx("div", { className: "bg-slate-900/90 backdrop-blur-md rounded-2xl border-2 border-slate-800 shadow-2xl p-6", children: _jsxs("div", { className: "flex flex-col lg:flex-row gap-6 items-end", children: [_jsxs("div", { className: "flex-1 w-full", children: [_jsx("label", { className: "block text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-2", children: "System Search / Project Query" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none", children: _jsx(Search, { className: "h-5 w-5 text-slate-500" }) }), _jsx("input", { type: "text", placeholder: "Search metrics by project identifier, title or blueprint coordinates...", value: searchItem, onChange: (e) => setSearchItem(e.target.value), className: "w-full pl-12 pr-4 py-3 bg-slate-950 border-2 border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-slate-100 placeholder-slate-500 font-medium", "aria-label": "Search projects" })] })] }), _jsxs("div", { className: "w-full lg:w-72", children: [_jsx("label", { className: "block text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-2", children: "Filter Footprint / Area Size" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none", children: _jsx(Layers, { className: "h-5 w-5 text-slate-500" }) }), _jsxs("select", { value: selectedArea, onChange: (e) => setSelectedArea(Number(e.target.value)), className: "w-full pl-12 pr-10 py-3 bg-slate-950 border-2 border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-slate-100 appearance-none cursor-pointer font-medium", "aria-label": "Filter by area", children: [_jsx("option", { value: "0", className: "bg-slate-950 text-slate-300", children: "All Scopes / Dimensions" }), area.map((element, index) => (_jsxs("option", { value: element, className: "bg-slate-950 text-slate-100", children: [element.toLocaleString(), " SQFT"] }, index)))] }), _jsx("div", { className: "absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500", children: _jsx("svg", { className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }) })] })] }), _jsxs("button", { type: "button", onClick: () => {
                                            setSearchItem("");
                                            setSelectedArea(0);
                                        }, className: "px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold rounded-xl transition-all duration-300 border border-slate-700 w-full lg:w-auto flex items-center justify-center gap-2 text-sm uppercase tracking-wider", "aria-label": "Clear filters", children: [_jsx(XCircle, { className: "w-4 h-4" }), "Clear Matrix Filters"] })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsx("div", { className: "relative mb-10", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-4", children: [_jsx("div", { className: `p-4 rounded-xl bg-slate-900 shadow-xl border-2 ${config.accentColor} ${config.iconColor} transition-transform duration-300 self-start`, children: config.icon }), _jsxs("div", { children: [_jsx("h1", { className: `text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent uppercase`, children: config.title }), _jsx("p", { className: "text-slate-400 text-sm md:text-base mt-1 font-medium", children: config.subtitle })] }), _jsx("div", { className: "hidden md:block flex-1 h-0.5 bg-slate-800 ml-6 relative overflow-hidden", children: _jsx("div", { className: `absolute inset-0 bg-gradient-to-r ${config.gradient}` }) })] }) }), project.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", children: project.map((p, index) => (_jsx("div", { className: "transform transition-all duration-300 hover:-translate-y-2 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800/80 shadow-xl hover:shadow-orange-500/5 hover:border-slate-700", children: _jsx(ProjectCard, { ...p, index: index }) }, p._id))) })) : (
                            /* Null Matrix Dataset Status State */
                            _jsxs("div", { className: "text-center py-20 bg-slate-900/40 rounded-2xl border-2 border-dashed border-slate-800 max-w-4xl mx-auto", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 shadow-inner", children: _jsx(Layers, { className: "w-10 h-10 stroke-[1.5]" }) }), _jsx("h3", { className: "text-xl font-extrabold text-slate-300 uppercase tracking-wider mb-2", children: "No Records Found" }), _jsx("p", { className: "text-slate-500 max-w-md mx-auto text-sm font-medium", children: "No active structures match your designated configuration fields. Adjust your filters or retry later." })] })), totalPage.length > 1 && (_jsxs("div", { className: "flex justify-center items-center gap-2.5 mt-16", children: [_jsx("button", { onClick: () => setPage((prev) => Math.max(prev - 1, 0)), disabled: page === 0, className: `p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 transition-all duration-300 shadow-md ${page === 0
                                            ? "opacity-30 cursor-not-allowed"
                                            : "hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white hover:border-orange-500"}`, "aria-label": "Previous page", children: _jsx(ChevronLeft, { className: "w-5 h-5 stroke-[2.5]" }) }), totalPage.map((_, index) => (_jsx("button", { onClick: () => setPage(index), className: `w-11 h-11 rounded-xl border font-bold text-sm transition-all duration-300 shadow-md ${page === index
                                            ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-orange-500"
                                            : "bg-slate-950 text-slate-400 border-slate-800 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white hover:border-orange-500"}`, "aria-label": `Go to page ${index + 1}`, children: String(index + 1).padStart(2, '0') }, index))), _jsx("button", { onClick: () => setPage((prev) => Math.min(prev + 1, totalPage.length - 1)), disabled: page === totalPage.length - 1, className: `p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 transition-all duration-300 shadow-md ${page === totalPage.length - 1
                                            ? "opacity-30 cursor-not-allowed"
                                            : "hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white hover:border-orange-500"}`, "aria-label": "Next page", children: _jsx(ChevronRight, { className: "w-5 h-5 stroke-[2.5]" }) })] }))] })] }), _jsx(Footer, {})] }));
}
export default ListProject;
