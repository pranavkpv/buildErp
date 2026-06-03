import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getSitemanageridandname } from "../../../api/sitemanager";
import { postSitemanagerToProject } from "../../../api/Admin/addSiteToproject";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProjectidandname } from "../../../api/project";
import Loading from "../../../components/Loading";
function AddSiteToProject({ addEnable, setAddEnable, onAddSuccess }) {
    const [siteManager, setSiteManager] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState([]);
    const [selectedSiteManager, setSelectedSiteManager] = useState("");
    const [siteManagerError, setSiteManagerError] = useState("");
    const [projectError, setProjectError] = useState("");
    const [loadOn, setLoadOn] = useState(false);
    // Fetch site managers on component mount
    useEffect(() => {
        const fetchSiteManager = async () => {
            const data = await getSitemanageridandname();
            setSiteManager(data.data);
        };
        fetchSiteManager();
    }, []);
    // Fetch projects on component mount
    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getProjectidandname();
            setProjectList(data.data);
        };
        fetchProjects();
    }, []);
    // Handle saving site to project
    const saveAddSite = async (e) => {
        e.preventDefault();
        // Input validation
        if (!selectedSiteManager) {
            setSiteManagerError("Please select a site manager.");
            return;
        }
        if (selectedProject.length === 0) {
            setProjectError("Please select at least one project.");
            return;
        }
        setSiteManagerError("");
        setProjectError("");
        try {
            setLoadOn(true);
            const siteManager_id = selectedSiteManager;
            const selectedproject = selectedProject;
            const data = await postSitemanagerToProject(siteManager_id, selectedproject);
            if (data.success) {
                setLoadOn(false);
                toast.success(data.message || "Site assignment added successfully");
                onAddSuccess();
                setAddEnable(false);
                setSelectedSiteManager("");
                setSelectedProject([]);
                setSiteManager([]);
                setProjectList([]);
            }
            else {
                setLoadOn(false);
                toast.error(data.message || "Failed to add site assignment");
            }
        }
        catch (error) {
            setLoadOn(false);
        }
    };
    if (!addEnable)
        return null;
    return (_jsxs(_Fragment, { children: [loadOn && _jsx(Loading, {}), _jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300", role: "dialog", "aria-modal": "true", "aria-labelledby": "add-site-title", "aria-describedby": "add-site-description", children: _jsxs("form", { onSubmit: saveAddSite, className: "bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 space-y-6 border border-gray-700/50 transform transition-all duration-300 scale-100", children: [_jsx("h2", { id: "add-site-title", className: "text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4", children: "Add Site Assignment" }), _jsxs("div", { children: [_jsx("label", { htmlFor: "siteManager", className: "block text-sm font-medium text-gray-200 mb-1", children: "Site Manager" }), _jsxs("select", { id: "siteManager", value: selectedSiteManager, onChange: (e) => setSelectedSiteManager(e.target.value), className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 text-sm", "aria-describedby": "site-manager-error", autoFocus: true, children: [_jsx("option", { value: "", children: "Select Site Manager" }), siteManager.map((element) => (_jsx("option", { value: element._id, children: element.username }, element._id)))] }), siteManagerError && (_jsx("p", { id: "site-manager-error", className: "text-red-400 text-sm mt-1", children: siteManagerError }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-200 mb-1", children: "Projects" }), _jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: projectList.map((element) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", id: `project-${element._id}`, checked: selectedProject.includes(element._id), onChange: (e) => {
                                                    if (e.target.checked) {
                                                        setSelectedProject([...selectedProject, element._id]);
                                                    }
                                                    else {
                                                        setSelectedProject(selectedProject.filter((id) => id !== element._id));
                                                    }
                                                }, value: element._id, className: "h-4 w-4 text-teal-500 focus:ring-teal-500 border-gray-600 rounded" }), _jsx("label", { htmlFor: `project-${element._id}`, className: "text-gray-200 text-sm", children: element.project_name })] }, element._id))) }), projectError && (_jsx("p", { id: "project-error", className: "text-red-400 text-sm mt-1", children: projectError }))] }), _jsxs("div", { className: "flex justify-end gap-4 pt-4", children: [_jsx("button", { type: "button", onClick: () => {
                                        setAddEnable(false);
                                        setSelectedSiteManager("");
                                        setSelectedProject([]);
                                        setSiteManagerError("");
                                        setProjectError("");
                                    }, className: "bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold text-sm", "aria-label": "Cancel adding site assignment", children: "Cancel" }), _jsx("button", { type: "submit", className: "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm", "aria-label": "Add site assignment", children: "Save" })] })] }) })] }));
}
export default AddSiteToProject;
