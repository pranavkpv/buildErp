import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { fetchExistEstimationInUser, getStageInUser } from "../../../api/auth";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import Loading from "../../../components/Loading";
function AdminProjectDetails() {
    const location = useLocation();
    const { _id, project_name, expected_image, finalImage, area, address, status, description, latitude, longitude, } = location.state || {};
    const [spec, setSpec] = useState([]);
    const [stage, setStage] = useState([]);
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchSpec = async () => {
        const response = await fetchExistEstimationInUser(_id);
        setSpec(response.data || []);
    };
    const fetchStage = async () => {
        const response = await getStageInUser(_id);
        if (response.success) {
            setStage(response.data || []);
            let x = [];
            for (let element of response.data) {
                for (let item of element.stage_image || []) {
                    for (let char of item.image || []) {
                        x.push({ date: item.date, url: char });
                    }
                }
            }
            setImage(x);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchSpec();
            await fetchStage();
            setLoading(false);
        };
        fetchData();
    }, [_id]);
    const calculateProjectProgress = () => {
        if (stage.length > 0) {
            const totalProgress = stage.reduce((sum, num) => sum + num.progress, 0) || 0;
            return (totalProgress / (stage.length * 100)) * 100;
        }
        return 0;
    };
    const MapViewUpdater = ({ latitude, longitude }) => {
        const map = useMap();
        useEffect(() => {
            if (latitude && longitude) {
                map.setView([latitude, longitude], 13);
            }
        }, [latitude, longitude, map]);
        return null;
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800", children: _jsx(Loading, {}) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-8 tracking-tight text-center", children: project_name || "Project Overview" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "flex flex-col justify-center", children: [_jsx("p", { className: "text-gray-300 text-base leading-relaxed mb-4", children: description || "No description available." }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 bg-slate-700 rounded-lg", children: [_jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" }) }), _jsx("span", { className: "text-sm font-medium text-gray-300", children: area ? `${area.toLocaleString()} sqft` : "N/A" })] }), _jsx("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 bg-slate-700 rounded-lg", children: _jsxs("span", { className: "text-sm font-medium text-gray-300", children: ["Status:", " ", _jsx("span", { className: `${status === "Completed"
                                                                    ? "text-green-400"
                                                                    : status === "In Progress"
                                                                        ? "text-yellow-400"
                                                                        : "text-red-400"} font-medium`, children: status || "N/A" })] }) })] }), _jsxs("p", { className: "text-gray-400 mt-4", children: [_jsx("span", { className: "font-medium", children: "Overall Progress:" }), " ", calculateProjectProgress().toFixed(1), "%"] })] }), _jsx("div", { className: "flex justify-center", children: _jsx("img", { src: expected_image || "https://via.placeholder.com/300x200?text=No+Image", alt: project_name || "Project Image", className: "rounded-lg shadow-lg w-full max-w-md h-64 object-cover transition-transform duration-300 hover:scale-105", onError: (e) => {
                                            e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
                                        }, loading: "lazy" }) })] })] }), _jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-8 tracking-tight text-center", children: "Specifications" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: spec.length > 0 ? (spec.map((element, index) => (_jsxs("div", { className: "bg-slate-700 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl", children: [_jsx("h3", { className: "text-lg font-semibold text-white mb-2 line-clamp-2", children: element.specDetails.spec_name || "Unnamed Specification" }), _jsx("p", { className: "text-gray-300 text-sm line-clamp-4", children: element.specDetails.description || "No description available." })] }, index)))) : (_jsxs("div", { className: "col-span-full text-center py-12", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-6 rounded-full bg-slate-600 flex items-center justify-center", children: _jsx("svg", { className: "w-10 h-10 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }) }), _jsx("h3", { className: "text-lg font-semibold text-gray-300 mb-3", children: "No Specifications Available" }), _jsx("p", { className: "text-gray-400 max-w-md mx-auto", children: "Specifications for this project are being updated. Check back soon!" })] })) })] }), _jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-8 tracking-tight text-center", children: "Gallery" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: image.length > 0 ? (image.map((src, index) => (_jsxs("div", { className: "relative", children: [_jsx("img", { src: src.url || "https://via.placeholder.com/300x200?text=No+Image", alt: `Project Gallery ${index + 1}`, className: "w-full h-60 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105", onError: (e) => {
                                            e.currentTarget.src =
                                                "https://via.placeholder.com/300x200?text=No+Image";
                                        }, loading: "lazy" }), _jsx("p", { className: "absolute bottom-2 left-2 text-xs text-white bg-black/60 px-2 py-1 rounded-md", children: new Date(src.date).toLocaleDateString() })] }, index)))) : (_jsxs("div", { className: "col-span-full text-center py-12", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-6 rounded-full bg-slate-600 flex items-center justify-center", children: _jsx("svg", { className: "w-10 h-10 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M4 5h16M4 12h16M4 18h16" }) }) }), _jsx("h3", { className: "text-lg font-semibold text-gray-300 mb-3", children: "No Images Available" }), _jsx("p", { className: "text-gray-400 max-w-md mx-auto", children: "The gallery for this project is being updated. Check back soon!" })] })) })] }), _jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-8 tracking-tight text-center", children: "Work Plans" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: stage.length > 0 ? (stage.map((element, index) => (_jsxs("div", { className: "bg-slate-700 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("p", { className: "text-lg font-semibold text-white line-clamp-1", children: element.stage_name || "Unnamed Stage" }), _jsxs("div", { className: "flex items-center text-sm text-gray-300", children: [_jsx(Calendar, { className: "w-4 h-4 mr-2 text-gray-400" }), _jsxs("span", { children: [new Date(element.start_date).toLocaleDateString(), " -", " ", new Date(element.end_date).toLocaleDateString()] })] })] }), _jsx("div", { className: "w-full bg-slate-600 rounded-full h-2 mt-2", children: _jsx("div", { className: `bg-gradient-to-r from-green-400 to-teal-400 h-2 rounded-full transition-all duration-50 w-[${element.progress}%]` }) }), _jsxs("p", { className: "text-sm text-gray-300 mt-2", children: ["Progress: ", element.progress, "% | Amount: \u20B9", element.stage_amount.toLocaleString()] })] }, index)))) : (_jsxs("div", { className: "col-span-full text-center py-12", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-6 rounded-full bg-slate-600 flex items-center justify-center", children: _jsx("svg", { className: "w-10 h-10 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }) }), _jsx("h3", { className: "text-lg font-semibold text-gray-300 mb-3", children: "No Work Plans Available" }), _jsx("p", { className: "text-gray-400 max-w-md mx-auto", children: "Work plans for this project are being updated. Check back soon!" })] })) })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-8 tracking-tight text-center", children: "Location" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "flex flex-col justify-center", children: [_jsx("p", { className: "text-gray-300 text-base leading-relaxed mb-4", children: address || "No address available." }), _jsxs("ul", { className: "text-gray-400 list-disc pl-5 text-sm", children: [_jsx("li", { children: "Proximity to major highways and metro stations" }), _jsx("li", { children: "Close to upscale shopping and entertainment destinations" }), _jsx("li", { children: "Near reputed educational institutions" })] })] }), _jsx("div", { className: "flex justify-center", children: _jsxs(MapContainer, { center: [latitude || 0, longitude || 0], zoom: 13, style: { height: "320px", width: "100%", borderRadius: "8px" }, className: "border border-slate-600 shadow-lg", children: [_jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }), _jsx(MapViewUpdater, { latitude: latitude || 0, longitude: longitude || 0 }), _jsx(Marker, { position: [latitude || 0, longitude || 0], children: _jsx(Popup, { children: address || "Project Location" }) })] }) })] })] })] }) }));
}
export default AdminProjectDetails;
