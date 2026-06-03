import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation, useNavigate } from "react-router-dom";
function AdminProjectList() {
    const location = useLocation();
    const projects = location.state || [];
    const navigate = useNavigate();
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold mb-8 tracking-tight text-center", children: projects.length > 0
                        ? projects[0].status === "processing"
                            ? "Ongoing Projects"
                            : projects[0].status === "pending"
                                ? "Pending Projects"
                                : "Completed Projects"
                        : "Project List" }), projects.length === 0 ? (_jsxs("div", { className: "col-span-full text-center py-12", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-6 rounded-full bg-slate-600 flex items-center justify-center", children: _jsx("svg", { className: "w-10 h-10 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }) }), _jsx("h3", { className: "text-lg font-semibold text-gray-300 mb-3", children: "No Projects Available" }), _jsx("p", { className: "text-gray-400 max-w-md mx-auto", children: "No projects are available for this category. Check back later!" })] })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: projects.map((element) => (_jsxs("div", { className: "bg-slate-700 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl", children: [_jsx("img", { src: element.expected_image || "https://via.placeholder.com/300x200?text=No+Image", alt: element.project_name || "Project Image", className: "w-full h-48 object-cover", onError: (e) => {
                                    e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
                                }, loading: "lazy" }), _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-semibold text-white mb-2 line-clamp-2", children: element.project_name || "Unnamed Project" }), _jsx("p", { className: "text-gray-300 text-sm mb-3 line-clamp-3", children: element.description || "No description available." }), _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { className: "text-gray-400", children: [_jsx("span", { className: "font-medium", children: "Area:" }), " ", element.area ? `${element.area.toLocaleString()} sq ft` : "N/A"] }), _jsxs("p", { className: "text-gray-400", children: [_jsx("span", { className: "font-medium", children: "Address:" }), " ", element.address || "No address available"] }), _jsxs("p", { className: "text-gray-400", children: [_jsx("span", { className: "font-medium", children: "Status:" }), " ", _jsx("span", { className: `${element.status === "Completed"
                                                            ? "text-green-400"
                                                            : element.status === "processing"
                                                                ? "text-yellow-400"
                                                                : "text-red-400"} font-medium`, children: element.status || "N/A" })] })] })] }), _jsx("div", { className: "p-4", children: _jsx("button", { onClick: () => {
                                        navigate("/admin/projectDetails", { state: element });
                                    }, className: "w-full bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-colors duration-300", children: "View Details" }) })] }, element._id))) }))] }) }));
}
export default AdminProjectList;
