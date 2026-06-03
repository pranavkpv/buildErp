import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Calendar, MapPin, Square, IndianRupee, ChevronDown, ChevronUp, Image as ImageIcon, ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectImage from "./SubprofileCompponent/ProjectImage";
import ProgressBar from "./SubprofileCompponent/ProgressBar";
import { fetchUserProjectAPI } from "../../api/userprofile";
import EstimationDetails from "./SubprofileCompponent/EstimateDetails";
import { toast } from "react-toastify";
import { getStageInUser } from "../../api/auth";
import StagePayment from "./SubprofileCompponent/StagePayment";
import Requirement from "./SubprofileCompponent/Requirement";
import ConfirmBrandSelection from "./SubprofileCompponent/ConfirmBrandSelection";
import SkipRequirement from "./SubprofileCompponent/SkipRequirement";
import ExpectedImageUpload from "./SubprofileCompponent/ExpectedImageUpload";
function ProjectDetails() {
    const [project, setProject] = useState([]);
    const [progressEnable, setProgressEnable] = useState(false);
    const [imageEnable, setImageEnable] = useState(false);
    const [count, setCount] = useState(0);
    const [estimateOn, setEstimateOn] = useState(false);
    const [, setStage] = useState([]); // Preserved matching state tree variables
    const [, setApprovalStatus] = useState(false);
    const [stagePayOn, setStagePayOn] = useState(false);
    const [requireOn, setRequireOn] = useState(false);
    const [skipOn, setSkipOn] = useState(false);
    const [uploadProject, setUploadImage] = useState("");
    const [confirmEnable, setConfirmEnable] = useState(false);
    const [, setIsSubmitted] = useState(false);
    const fetchUserProject = async () => {
        try {
            const response = await fetchUserProjectAPI();
            if (response.success) {
                setProject(response.data);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to fetch projects");
        }
    };
    const fetchStage = async (projectId) => {
        try {
            const response = await getStageInUser(projectId);
            if (response.success) {
                setStage(response.data);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to fetch stages");
        }
    };
    useEffect(() => {
        fetchUserProject();
    }, []);
    useEffect(() => {
        if (project[count]?._id) {
            fetchStage(project[count]._id);
        }
    }, [count, project]);
    const getStatusStyles = (status) => {
        switch (status) {
            case "pending":
                return "bg-orange-500/10 text-orange-400 border-orange-500/20";
            case "processing":
                return "bg-sky-500/10 text-sky-400 border-sky-500/20";
            case "completed":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            default:
                return "bg-slate-800 text-slate-400 border-slate-700";
        }
    };
    const handlePrev = () => {
        if (count > 0)
            setCount(count - 1);
    };
    const handleNext = () => {
        if (count < project.length - 1)
            setCount(count + 1);
    };
    const currentProject = project[count];
    return (_jsx("div", { className: "min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-orange-500 selection:text-white", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center mb-12 pb-4 border-b border-slate-900", children: [_jsxs("h1", { className: "text-3xl font-black text-white uppercase tracking-wider flex items-center justify-center gap-2", children: [_jsx(Briefcase, { className: "w-8 h-8 text-orange-500" }), "Project Deployment Registry"] }), _jsx("p", { className: "text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mt-2", children: "System Configuration logs and master operational parameters" })] }), project.length === 0 && (_jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center text-slate-500 relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-orange-500" }), _jsx("span", { className: "font-mono font-bold text-xs uppercase tracking-widest text-slate-600", children: "No project configurations registered in cloud nodes." })] })), currentProject && (_jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" }), _jsxs("div", { className: "flex flex-col lg:flex-row gap-8 lg:gap-10", children: [_jsx("div", { className: "w-full lg:w-80 shrink-0", children: _jsxs("div", { className: "relative group overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-2", children: [_jsx("img", { src: currentProject.expected_image ||
                                                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop", alt: currentProject.project_name || "Project configuration master view", className: "rounded-lg shadow-inner w-full h-56 lg:h-64 object-cover opacity-80 group-hover:opacity-100 transition-all duration-300" }), _jsx("div", { className: "absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded border border-slate-800 text-center", children: _jsx("span", { className: "text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider", children: "Blueprint Master View" }) })] }) }), _jsxs("div", { className: "flex-1 flex flex-col justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/60", children: [_jsx("h2", { className: "text-xl sm:text-2xl font-black text-white uppercase tracking-tight", children: currentProject.project_name }), _jsx("span", { className: `self-start sm:self-auto px-3 py-1 rounded-full text-[10px] font-mono font-black border uppercase tracking-widest ${getStatusStyles(currentProject.status)}`, children: currentProject.status })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs", children: [_jsxs("div", { className: "flex items-center p-3 bg-slate-950 rounded-xl border border-slate-850", children: [_jsx(MapPin, { className: "w-4 h-4 mr-3 text-orange-500 shrink-0" }), _jsx("span", { className: "font-sans font-medium text-slate-300 truncate", children: currentProject.address })] }), _jsxs("div", { className: "flex items-center p-3 bg-slate-950 rounded-xl border border-slate-850", children: [_jsx(Square, { className: "w-4 h-4 mr-3 text-orange-500 shrink-0" }), _jsxs("span", { className: "font-mono font-bold text-slate-300", children: [currentProject.area?.toLocaleString(), " ", _jsx("span", { className: "text-slate-500 uppercase text-[10px]", children: "SQ.FT" })] })] }), _jsxs("div", { className: "flex items-center p-3 bg-slate-950 rounded-xl border border-slate-850", children: [_jsx(IndianRupee, { className: "w-4 h-4 mr-3 text-orange-500 shrink-0" }), _jsxs("span", { className: "font-mono font-bold text-slate-300", children: ["\u20B9", currentProject.budgeted_cost?.toLocaleString("en-IN")] })] }), _jsxs("div", { className: "flex items-center p-3 bg-slate-950 rounded-xl border border-slate-850", children: [_jsx(Calendar, { className: "w-4 h-4 mr-3 text-orange-500 shrink-0" }), _jsxs("span", { className: "font-mono font-bold text-slate-300", children: [currentProject.start_date ? currentProject.start_date.split("T")[0].split("-").reverse().join("-") : "--", _jsx("span", { className: "text-slate-600 px-1", children: "/" }), currentProject.end_date ? currentProject.end_date.split("T")[0].split("-").reverse().join("-") : "--"] })] })] }), _jsx("p", { className: "text-slate-400 text-xs leading-relaxed mt-5 p-3 bg-slate-950/40 rounded-xl border border-slate-850/60 font-sans", children: currentProject.description })] }), _jsx("div", { className: "mt-8 pt-4 border-t border-slate-800/60", children: !currentProject.start_date ? (_jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [_jsx("button", { onClick: () => setRequireOn(true), className: "flex-1 px-4 py-2.5 bg-orange-500 text-slate-950 hover:bg-orange-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-colors shadow-md", children: "Configure Requirements" }), _jsx("button", { onClick: () => setSkipOn(true), className: "px-4 py-2.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors", children: "Bypass System Setup" }), _jsx("button", { onClick: () => {
                                                            setImageEnable(true);
                                                            setUploadImage(currentProject._id);
                                                        }, className: "px-4 py-2.5 bg-slate-950 border border-slate-800 text-orange-500 hover:bg-slate-900 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors", children: "Upload Specs Target" })] })) : (_jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx("button", { onClick: () => setProgressEnable(!progressEnable), className: "flex items-center px-4 py-2 bg-slate-950 border border-slate-800 text-slate-300 hover:text-orange-500 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all", children: progressEnable ? (_jsxs(_Fragment, { children: [_jsx(ChevronUp, { className: "w-4 h-4 mr-2 text-orange-500" }), " Close Tracker"] })) : (_jsxs(_Fragment, { children: [_jsx(ChevronDown, { className: "w-4 h-4 mr-2 text-orange-500" }), " Track Progress"] })) }), _jsxs("button", { onClick: () => {
                                                            setImageEnable(!imageEnable);
                                                            setUploadImage(currentProject._id);
                                                        }, className: "flex items-center px-4 py-2 bg-slate-950 border border-slate-800 text-slate-300 hover:text-orange-500 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all", children: [_jsx(ImageIcon, { className: "w-4 h-4 mr-2 text-orange-500" }), imageEnable ? "Hide Blueprints" : "View Blueprints"] }), currentProject.estimateStatus && (_jsxs("button", { onClick: () => setEstimateOn(true), className: "flex items-center px-4 py-2 bg-orange-500 text-slate-950 hover:bg-orange-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all", children: [_jsx(ImageIcon, { className: "w-4 h-4 mr-2" }), "Evaluation Logs"] })), _jsxs("button", { onClick: () => setStagePayOn(true), className: "flex items-center px-4 py-2 bg-slate-950 border border-slate-800 text-slate-300 hover:text-orange-500 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all", children: [_jsx(IndianRupee, { className: "w-4 h-4 mr-2 text-orange-500" }), "Billing Schedule"] })] })) })] })] }), _jsx(ProgressBar, { progressEnable: progressEnable, projectId: currentProject._id }), _jsx(ProjectImage, { imageEnable: imageEnable, setImageEnable: setImageEnable, projectId: currentProject._id }), _jsx(EstimationDetails, { estimateOn: estimateOn, setEstimateOn: setEstimateOn, projectId: currentProject._id, onSuccess: fetchUserProject, setApprovalStatus: setApprovalStatus }), _jsx(StagePayment, { stagePayOn: stagePayOn, setStagePayOn: setStagePayOn, projectId: currentProject._id }), _jsx(Requirement, { requireOn: requireOn, setRequireOn: setRequireOn, setConfirmEnable: setConfirmEnable, projectId: currentProject._id }), _jsx(ConfirmBrandSelection, { confirmEnable: confirmEnable, setConfirmEnable: setConfirmEnable, projectId: currentProject._id, setIsSubmitted: setIsSubmitted }), _jsx(SkipRequirement, { skipOn: skipOn, setSkipOn: setSkipOn, projectId: currentProject._id, setIsSubmitted: setIsSubmitted }), _jsx(ExpectedImageUpload, { setUploadEnable: setImageEnable, uploadEnable: imageEnable, uploadProjectId: uploadProject })] })), project.length > 1 && (_jsxs("div", { className: "mt-6 flex justify-between items-center bg-slate-900 border border-slate-800 rounded-xl p-3 px-4 shadow-lg", children: [_jsxs("button", { onClick: handlePrev, disabled: count === 0, className: "px-4 py-2 bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-slate-400 hover:text-orange-500 hover:border-slate-700 disabled:text-slate-700 disabled:border-transparent disabled:bg-transparent rounded-lg transition-all flex items-center gap-1 uppercase tracking-wider", children: [_jsx(ChevronLeft, { className: "w-4 h-4" }), " Prev Registry"] }), _jsxs("span", { className: "text-xs font-mono font-bold text-slate-400 uppercase tracking-widest", children: ["Config Node ", _jsx("span", { className: "text-orange-500 font-black", children: count + 1 }), " / ", project.length] }), _jsxs("button", { onClick: handleNext, disabled: count === project.length - 1, className: "px-4 py-2 bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-slate-400 hover:text-orange-500 hover:border-slate-700 disabled:text-slate-700 disabled:border-transparent disabled:bg-transparent rounded-lg transition-all flex items-center gap-1 uppercase tracking-wider", children: ["Next Registry ", _jsx(ChevronRight, { className: "w-4 h-4" })] })] }))] }) }));
}
export default ProjectDetails;
