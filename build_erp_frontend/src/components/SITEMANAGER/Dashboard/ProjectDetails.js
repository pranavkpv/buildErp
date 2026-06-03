import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getStageInUser } from "../../../api/auth";
import { toast } from "react-toastify";
import { getSiteAdditionEstimationApi, getSiteEstimationApi, getSiteExpectedImageApi, getSiteLabourEstimationApi, getSitematerialEstimationApi } from "../../../api/Sitemanager/dashboard";
function ProjectEstimationDetails({ estimateOn, setEstimateOn, projectId, onSuccess }) {
    if (!estimateOn)
        return null;
    const [specData, setSpecData] = useState([]);
    const [specmaterial, setSpecmaterial] = useState([]);
    const [specLabour, setSpecLabour] = useState([]);
    const [specAddition, setSpecAddition] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState([]);
    const [stage, setStage] = useState([]);
    const fetchEstimation = async () => {
        const response = await getSiteEstimationApi(projectId);
        if (response.success) {
            setSpecData(response.data);
        }
        else {
            throw new Error(response.message);
        }
    };
    const fetchmaterialEstimation = async () => {
        const response = await getSitematerialEstimationApi(projectId);
        if (response.success) {
            setSpecmaterial(response.data);
        }
        else {
            throw new Error(response.message);
        }
    };
    const fetchLabourEstimation = async () => {
        const response = await getSiteLabourEstimationApi(projectId);
        if (response.success) {
            setSpecLabour(response.data);
        }
        else {
            throw new Error(response.message);
        }
    };
    const fetchAdditionalEstimation = async () => {
        const response = await getSiteAdditionEstimationApi(projectId);
        if (response.success) {
            setSpecAddition(response.data);
        }
        else {
            throw new Error(response.message);
        }
    };
    const fetchStage = async () => {
        const response = await getStageInUser(projectId);
        if (response.success) {
            setStage(response.data);
        }
        else {
            toast.error(response.message);
        }
    };
    const fetchExpectedImage = async () => {
        const response = await getSiteExpectedImageApi(projectId);
        if (response.success) {
            setImage(response.data);
        }
        else {
            toast.error(response.message);
        }
    };
    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            setError(null);
            await Promise.all([
                fetchEstimation(),
                fetchmaterialEstimation(),
                fetchLabourEstimation(),
                fetchAdditionalEstimation(),
                fetchStage(),
                fetchExpectedImage(),
            ]);
            setLoading(false);
        };
        fetchAllData();
    }, [projectId]);
    if (loading) {
        return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50", children: _jsx("div", { className: "bg-slate-700 rounded-xl shadow-lg max-w-md w-full p-6", children: _jsxs("div", { className: "flex items-center justify-center space-x-3", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400" }), _jsx("p", { className: "text-lg font-semibold text-gray-200", children: "Loading estimation data..." })] }) }) }));
    }
    if (error) {
        return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-slate-700 rounded-xl shadow-lg max-w-md w-full p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("svg", { className: "w-6 h-6 text-red-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }), _jsx("p", { className: "text-lg font-semibold text-red-400", children: error })] }), _jsx("button", { onClick: () => setEstimateOn(false), className: "w-full py-2 bg-slate-600 text-gray-200 rounded-lg hover:bg-slate-500 transition duration-200 font-medium", children: "Close" })] }) }));
    }
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-slate-700 rounded-xl shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-100", children: "Estimation Details" }), _jsx("button", { type: "button", onClick: () => setEstimateOn(false), className: "text-gray-400 hover:text-gray-200 transition duration-200", "aria-label": "Close", children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) })] }), _jsxs("section", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-200 mb-4", children: "Specification Details" }), _jsx("div", { className: "overflow-x-auto border border-slate-600 rounded-lg", children: _jsxs("table", { className: "w-full bg-slate-800", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-700 text-gray-200 text-left", children: [_jsx("th", { className: "py-3 px-4 font-medium", children: "Sl No" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Specification" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Quantity" })] }) }), _jsx("tbody", { children: specData.length > 0 ? (specData.map((element, index) => (_jsxs("tr", { className: "border-t border-slate-600 hover:bg-slate-700 transition-colors duration-200", children: [_jsx("td", { className: "py-3 px-4 text-gray-300", children: index + 1 }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.spec_name }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.quantity })] }, element._id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 3, className: "px-6 py-4 text-sm text-gray-500 text-center", children: "No specification data available" }) })) })] }) })] }), _jsxs("section", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-200 mb-4", children: "Used Materials" }), _jsx("div", { className: "overflow-x-auto border border-slate-600 rounded-lg", children: _jsxs("table", { className: "w-full bg-slate-800", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-700 text-gray-200 text-left", children: [_jsx("th", { className: "py-3 px-4 font-medium", children: "Sl No" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Material Name" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Brand Name" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Unit Name" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Quantity" })] }) }), _jsx("tbody", { children: specmaterial.length > 0 ? (specmaterial.map((element, index) => (_jsxs("tr", { className: "border-t border-slate-600 hover:bg-slate-700 transition-colors duration-200", children: [_jsx("td", { className: "py-3 px-4 text-gray-300", children: index + 1 }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.material_name }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.brand_name }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.unit_name }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.quantity })] }, element._id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "px-6 py-4 text-sm text-gray-500 text-center", children: "No material data available" }) })) })] }) })] }), _jsxs("section", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-200 mb-4", children: "Used Labour" }), _jsx("div", { className: "overflow-x-auto border border-slate-600 rounded-lg", children: _jsxs("table", { className: "w-full bg-slate-800", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-700 text-gray-200 text-left", children: [_jsx("th", { className: "py-3 px-4 font-medium", children: "Sl No" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Labour Name" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Number of Labour" })] }) }), _jsx("tbody", { children: specLabour.length > 0 ? (specLabour.map((element, index) => (_jsxs("tr", { className: "border-t border-slate-600 hover:bg-slate-700 transition-colors duration-200", children: [_jsx("td", { className: "py-3 px-4 text-gray-300", children: index + 1 }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.labour_name }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.numberoflabour })] }, element._id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 3, className: "px-6 py-4 text-sm text-gray-500 text-center", children: "No labour data available" }) })) })] }) })] }), _jsxs("section", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-200 mb-4", children: "Project Stages" }), _jsx("div", { className: "overflow-x-auto border border-slate-600 rounded-lg", children: _jsxs("table", { className: "w-full bg-slate-800", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-700 text-gray-200 text-left", children: [_jsx("th", { className: "py-3 px-4 font-medium", children: "Sl No" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Stage Name" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "Start Date" }), _jsx("th", { className: "py-3 px-4 font-medium", children: "End Date" })] }) }), _jsx("tbody", { children: stage.length > 0 ? (stage.map((element, index) => (_jsxs("tr", { className: "border-t border-slate-600 hover:bg-slate-700 transition-colors duration-200", children: [_jsx("td", { className: "py-3 px-4 text-gray-300", children: index + 1 }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.stage_name }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.start_date.split("T")[0].split('-').reverse().join('-') }), _jsx("td", { className: "py-3 px-4 text-gray-300", children: element.end_date.split("T")[0].split('-').reverse().join('-') })] }, element._id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "px-6 py-4 text-sm text-gray-500 text-center", children: "No stage data available" }) })) })] }) })] }), _jsxs("section", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-200 mb-4", children: "Project Images" }), image.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: image.map((element, index) => (_jsxs("div", { className: "bg-slate-800 rounded-lg overflow-hidden shadow-md", children: [_jsx("img", { src: element.image, alt: element.title, className: "w-full h-48 object-cover", onError: (e) => {
                                            e.currentTarget.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
                                        } }), _jsx("div", { className: "p-4", children: _jsx("p", { className: "text-sm font-medium text-gray-300", children: element.title }) })] }, index))) })) : (_jsx("p", { className: "text-sm text-gray-500", children: "No images available" }))] }), _jsx("div", { className: "flex justify-end space-x-4", children: _jsx("button", { onClick: () => setEstimateOn(false), className: "px-6 py-2 bg-slate-600 text-gray-200 rounded-lg hover:bg-slate-500 transition duration-200 font-medium", children: "Close" }) })] }) }));
}
export default ProjectEstimationDetails;
