import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import UserHeader from '../USER/common/UserHeader';
import MapIntegrationApp from './Map/Map';
import { postProject } from '../../api/project';
import { toast } from 'react-toastify';
import Requirement from './SubprofileCompponent/Requirement';
import ConfirmBrandSelection from './SubprofileCompponent/ConfirmBrandSelection';
import SkipRequirement from './SubprofileCompponent/SkipRequirement';
import ExpectedImageUpload from './SubprofileCompponent/ExpectedImageUpload';
import Footer from '../../components/USER/common/Footer';
function ProjectProposal() {
    const [project, setProject] = useState("");
    const [type, setType] = useState("");
    const [floor, setFloor] = useState(0);
    const [cost, setCost] = useState(0);
    const [area, setArea] = useState(0);
    const [onMap, setOnMap] = useState(false);
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [requireOn, setRequireOn] = useState(false);
    const [confirmEnable, setConfirmEnable] = useState(false);
    const [skipOn, setSkipOn] = useState(false);
    const [selectProject, setSelectProject] = useState("");
    const [imageEnable, setImageEnable] = useState(false);
    const [uploadProject, setUploadImage] = useState("");
    const projectRef = useRef(null);
    const typeRef = useRef(null);
    const floorRef = useRef(null);
    const costRef = useRef(null);
    const areaRef = useRef(null);
    const addressRef = useRef(null);
    const descriptionRef = useRef(null);
    const addFormSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;
        // Validation
        if (project.trim() === "") {
            if (projectRef.current)
                projectRef.current.innerText = "Please enter a valid project name.";
            hasError = true;
        }
        else if (projectRef.current) {
            projectRef.current.innerText = "";
        }
        if (type.trim() === "") {
            if (typeRef.current)
                typeRef.current.innerText = "Please select a project type.";
            hasError = true;
        }
        else if (typeRef.current) {
            typeRef.current.innerText = "";
        }
        if (floor <= 0) {
            if (floorRef.current)
                floorRef.current.innerText = "Number of floors must be greater than zero.";
            hasError = true;
        }
        else if (floorRef.current) {
            floorRef.current.innerText = "";
        }
        if (cost <= 0) {
            if (costRef.current)
                costRef.current.innerText = "Budget must be greater than zero.";
            hasError = true;
        }
        else if (costRef.current) {
            costRef.current.innerText = "";
        }
        if (area <= 0) {
            if (areaRef.current)
                areaRef.current.innerText = "Area must be greater than zero.";
            hasError = true;
        }
        else if (areaRef.current) {
            areaRef.current.innerText = "";
        }
        if (address.trim() === "") {
            if (addressRef.current)
                addressRef.current.innerText = "Please enter a valid address.";
            hasError = true;
        }
        else if (addressRef.current) {
            addressRef.current.innerText = "";
        }
        if (description.trim() === "") {
            if (descriptionRef.current)
                descriptionRef.current.innerText = "Please provide a project description.";
            hasError = true;
        }
        else if (descriptionRef.current) {
            descriptionRef.current.innerText = "";
        }
        if (!selectedLocation) {
            if (addressRef.current)
                addressRef.current.innerText = "Please select a location on the map.";
            hasError = true;
        }
        if (hasError)
            return;
        let latitude = selectedLocation?.lat;
        let longitude = selectedLocation?.lng;
        if (!latitude || !longitude) {
            if (addressRef.current)
                addressRef.current.innerText = "Please select a valid location on the map.";
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await postProject({
                project_name: project,
                type,
                floor,
                cost,
                address,
                area,
                description,
                latitude,
                longitude
            });
            if (response.success) {
                setIsSubmitted(true);
                setSelectProject(response.data);
                toast.success(response.message);
                setTimeout(() => {
                    setProject("");
                    setType("");
                    setFloor(0);
                    setCost(0);
                    setArea(0);
                    setAddress("");
                    setDescription("");
                    setSelectedLocation(null);
                }, 3000);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("An error occurred while submitting the proposal.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    if (isSubmitted) {
        return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-5 pointer-events-none", children: _jsx("div", { className: "absolute inset-0", style: {
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 146, 60, 0.3) 35px, rgba(251, 146, 60, 0.3) 70px)`
                        } }) }), _jsx("div", { className: "absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse" }), _jsx("div", { className: "absolute bottom-20 right-10 w-72 h-72 bg-yellow-500 rounded-full filter blur-3xl opacity-10 animate-pulse", style: { animationDelay: '1s' } }), _jsxs("div", { className: "bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full text-center relative z-10 border-2 border-orange-500/20", children: [_jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg", children: _jsx(CheckCircle, { className: "w-10 h-10 text-white" }) }), _jsx("h2", { className: "text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-3", children: "Submission Successful!" }), _jsx("p", { className: "text-gray-600 mb-6 text-sm sm:text-base font-medium", children: "Your project proposal has been sent successfully. We will review and respond within 24 hours." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [_jsxs("button", { onClick: () => setRequireOn(true), className: "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg focus:ring-4 focus:ring-orange-200 flex items-center justify-center gap-2", "aria-label": "Add project requirements", children: [_jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" }) }), "Add Requirements"] }), _jsx("button", { onClick: () => setSkipOn(true), className: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg focus:ring-4 focus:ring-gray-200", "aria-label": "Skip adding project requirements", children: "Skip Requirements" }), _jsxs("button", { onClick: () => {
                                        setImageEnable(true);
                                        setUploadImage(selectProject);
                                    }, className: "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-bold transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 flex items-center justify-center gap-2", children: [_jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }), "Upload Expected Image"] })] })] }), _jsx(Requirement, { requireOn: requireOn, setRequireOn: setRequireOn, setConfirmEnable: setConfirmEnable, projectId: selectProject }), _jsx(ConfirmBrandSelection, { confirmEnable: confirmEnable, setConfirmEnable: setConfirmEnable, projectId: selectProject, setIsSubmitted: setIsSubmitted }), _jsx(SkipRequirement, { skipOn: skipOn, setSkipOn: setSkipOn, projectId: selectProject, setIsSubmitted: setIsSubmitted }), _jsx(ExpectedImageUpload, { setUploadEnable: setImageEnable, uploadEnable: imageEnable, uploadProjectId: uploadProject })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(UserHeader, {}), _jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-5 pointer-events-none", children: _jsx("div", { className: "absolute inset-0", style: {
                                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 146, 60, 0.3) 35px, rgba(251, 146, 60, 0.3) 70px)`
                            } }) }), _jsx("div", { className: "absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse" }), _jsx("div", { className: "absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl opacity-10 animate-pulse", style: { animationDelay: '1s' } }), _jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl shadow-2xl mb-6", children: _jsx("svg", { className: "w-10 h-10 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }) }) }), _jsx("h2", { className: "text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-4 tracking-tight", children: "Project Proposal Form" }), _jsx("div", { className: "w-24 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 mx-auto mb-6 rounded-full" }), _jsx("p", { className: "text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-medium", children: "Submit your construction project details below, and our team will get in touch to discuss your vision and bring it to life." })] }), _jsxs("div", { className: "bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 max-w-4xl mx-auto border-2 border-orange-500/20", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: "inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg", children: _jsx("svg", { className: "w-6 h-6 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }) }), _jsx("h3", { className: "text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent", children: "Project Details" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs("label", { htmlFor: "projectName", className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: ["Project Name ", _jsx("span", { className: "text-orange-500", children: "*" })] }), _jsx("input", { type: "text", id: "projectName", name: "projectName", value: project, onChange: (e) => setProject(e.target.value), className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300", placeholder: "Enter project name" }), _jsx("p", { ref: projectRef, className: "text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium" })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "type", className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: ["Project Type ", _jsx("span", { className: "text-orange-500", children: "*" })] }), _jsxs("select", { id: "type", name: "type", value: type, onChange: (e) => setType(e.target.value), className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 font-medium hover:border-orange-300 appearance-none cursor-pointer", children: [_jsx("option", { value: "", children: "Select project type" }), _jsx("option", { value: "residential", children: "Residential" }), _jsx("option", { value: "commercial", children: "Commercial" }), _jsx("option", { value: "industrial", children: "Industrial" }), _jsx("option", { value: "mixed-use", children: "Mixed-Use" })] }), _jsx("p", { ref: typeRef, className: "text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium" })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs("label", { htmlFor: "floors", className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: ["Number of Floors ", _jsx("span", { className: "text-orange-500", children: "*" })] }), _jsx("input", { type: "number", id: "floors", name: "floors", value: floor, onChange: (e) => setFloor(Number(e.target.value)), min: "1", className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300", placeholder: "Enter number of floors" }), _jsx("p", { ref: floorRef, className: "text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium" })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "budget", className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: ["Budget (\u20B9) ", _jsx("span", { className: "text-orange-500", children: "*" })] }), _jsx("input", { type: "number", id: "budget", name: "budget", value: cost, onChange: (e) => setCost(Number(e.target.value)), min: "0", step: "0.01", className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300", placeholder: "Enter project budget" }), _jsx("p", { ref: costRef, className: "text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium" })] })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "area", className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: ["Area (sqft) ", _jsx("span", { className: "text-orange-500", children: "*" })] }), _jsx("input", { type: "number", id: "area", name: "area", value: area, onChange: (e) => setArea(Number(e.target.value)), min: "0", step: "0.01", className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300", placeholder: "Enter area in square feet" }), _jsx("p", { ref: areaRef, className: "text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium" })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "locationType", className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: ["Location & Address ", _jsx("span", { className: "text-orange-500", children: "*" })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("input", { type: "text", id: "locationType", name: "locationType", value: address, onChange: (e) => setAddress(e.target.value), className: "flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300", placeholder: "Enter location and address" }), _jsxs("button", { type: "button", onClick: () => setOnMap(true), className: "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 whitespace-nowrap", children: [_jsxs("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })] }), "Select on Map"] })] }), _jsx("p", { ref: addressRef, className: "text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium" })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "description", className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: ["Project Description ", _jsx("span", { className: "text-orange-500", children: "*" })] }), _jsx("textarea", { id: "description", name: "description", value: description, onChange: (e) => setDescription(e.target.value), className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 resize-none min-h-[120px] font-medium hover:border-orange-300", placeholder: "Describe the project objectives, scope, and key features..." }), _jsx("p", { ref: descriptionRef, className: "text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium" })] }), _jsx("div", { children: _jsx("button", { onClick: addFormSubmit, disabled: isSubmitting, className: "w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg disabled:shadow-none flex items-center justify-center space-x-2", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white" }), _jsx("span", { children: "Submitting..." })] })) : (_jsxs(_Fragment, { children: [_jsx(Send, { className: "w-5 h-5" }), _jsx("span", { children: "Submit Proposal" })] })) }) })] })] })] }), onMap && (_jsx("div", { className: "fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6", children: _jsx("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 border-2 border-orange-500/20", children: _jsx(MapIntegrationApp, { address: address, onMap: onMap, setOnMap: setOnMap, setSelectedLocation: setSelectedLocation, selectedLocation: selectedLocation, setAddress: setAddress }) }) }))] }), _jsx(Footer, {})] }));
}
export default ProjectProposal;
