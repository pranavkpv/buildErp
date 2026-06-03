import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { fetchUser, putProject } from "../../../api/project";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import MapIntegrationApp from "../../ProfileComponent/Map/Map";
import Loading from "../../../components/Loading";
function EditProject({ editData, editEnable, setEnableEdit, onEditSuccess, }) {
    if (!editEnable)
        return null;
    const [project_name, setProjectName] = useState(editData.project_name);
    const [user_id, setUserId] = useState(editData.userDetails._id);
    const [address, setAddress] = useState(editData.address);
    const [email, setEmail] = useState(editData.email);
    const [mobile_number, setMobile] = useState(editData.mobile_number);
    const [description, setDescription] = useState(editData.description);
    const [area, setArea] = useState(editData.area);
    const [cost, setCost] = useState(editData.cost || 0);
    const [floors, setFloors] = useState(editData.floor || 1);
    const [userList, setUserList] = useState([]);
    const [onMap, setOnMap] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({ lat: editData.lat, lng: editData.long, name: editData.address });
    const [type, setType] = useState("");
    const projectRef = useRef(null);
    const userRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);
    const mobileRef = useRef(null);
    const areaRef = useRef(null);
    const costRef = useRef(null);
    const floorsRef = useRef(null);
    const descriptionRef = useRef(null);
    const [loadOn, setLoadOn] = useState(false);
    useEffect(() => {
        setProjectName(editData.project_name);
        setUserId(editData.userDetails._id);
        setAddress(editData.address);
        setEmail(editData.email);
        setMobile(editData.mobile_number);
        setDescription(editData.description);
        setArea(editData.area);
        setCost(editData.cost || 0);
        setFloors(editData.floor || 1);
        setSelectedLocation({ lat: editData.lat, lng: editData.long, name: editData.address });
        setType(editData.project_type);
    }, [editData]);
    useEffect(() => {
        const fetchUsers = async () => {
            const data = await fetchUser();
            setUserList(data.data);
        };
        fetchUsers();
    }, []);
    const editFormSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;
        if (project_name.trim() === "") {
            if (projectRef.current)
                projectRef.current.innerText = "Project name is required.";
            hasError = true;
        }
        else if (projectRef.current) {
            projectRef.current.innerText = "";
        }
        if (!user_id) {
            if (userRef.current)
                userRef.current.innerText = "Please select a user.";
            hasError = true;
        }
        else if (userRef.current) {
            userRef.current.innerText = "";
        }
        if (address.trim() === "") {
            if (addressRef.current)
                addressRef.current.innerText = "Address is required.";
            hasError = true;
        }
        else if (addressRef.current) {
            addressRef.current.innerText = "";
        }
        if (email.trim() === "") {
            if (emailRef.current)
                emailRef.current.innerText = "Email is required.";
            hasError = true;
        }
        else if (emailRef.current) {
            emailRef.current.innerText = "";
        }
        if (mobile_number === "") {
            if (mobileRef.current)
                mobileRef.current.innerText = "Mobile number is required.";
            hasError = true;
        }
        else if (mobileRef.current) {
            mobileRef.current.innerText = "";
        }
        if (area <= 0) {
            if (areaRef.current)
                areaRef.current.innerText = "Area must be greater than zero.";
            hasError = true;
        }
        else if (areaRef.current) {
            areaRef.current.innerText = "";
        }
        if (cost <= 0) {
            if (costRef.current)
                costRef.current.innerText = "Cost must be greater than zero.";
            hasError = true;
        }
        else if (costRef.current) {
            costRef.current.innerText = "";
        }
        if (floors <= 0) {
            if (floorsRef.current)
                floorsRef.current.innerText = "Number of floors must be greater than zero.";
            hasError = true;
        }
        else if (floorsRef.current) {
            floorsRef.current.innerText = "";
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
        if (!latitude || !longitude)
            return;
        setLoadOn(true);
        const data = await putProject({
            _id: editData._id,
            project_name,
            type,
            user_id,
            address,
            mobile_number: Number(mobile_number),
            email,
            area,
            cost,
            floor: floors,
            description,
            latitude,
            longitude
        });
        setLoadOn(false);
        if (data.success) {
            toast.success(data.message);
            setEnableEdit(false);
            setProjectName("");
            setUserId("");
            setAddress("");
            setEmail("");
            setMobile("");
            setDescription("");
            setArea(0);
            setCost(0);
            setFloors(1);
            setSelectedLocation(null);
            onEditSuccess();
        }
        else {
            toast.error(data.message);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6", children: _jsxs("form", { onSubmit: editFormSubmit, className: "bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-4xl p-6 sm:p-8 border border-gray-700/50 max-h-[90vh] overflow-y-auto", children: [_jsx("h1", { className: "text-2xl sm:text-3xl font-bold text-center text-gray-100 mb-6 sm:mb-8 border-b border-gray-700 pb-4", children: "Edit Project" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "projectName", className: "block text-sm font-medium text-gray-200 mb-2", children: "Project Name" }), _jsx("input", { id: "projectName", type: "text", value: project_name, onChange: (e) => setProjectName(e.target.value), placeholder: "Enter project name", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base" }), _jsx("p", { ref: projectRef, className: "text-sm text-red-400 mt-2" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "type", className: "block text-sm font-medium text-gray-200 mb-2", children: "Project Type *" }), _jsxs("select", { id: "type", name: "type", onChange: (e) => {
                                                setType(e.target.value);
                                            }, value: type, className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base", children: [_jsx("option", { value: "", children: "Select project type" }), _jsx("option", { value: "residential", children: "Residential" }), _jsx("option", { value: "commercial", children: "Commercial" }), _jsx("option", { value: "industrial", children: "Industrial" }), _jsx("option", { value: "mixed-use", children: "Mixed-Use" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "clientSelect", className: "block text-sm font-medium text-gray-200 mb-2", children: "Client" }), _jsxs("select", { id: "clientSelect", value: user_id, onChange: (e) => setUserId(e.target.value), className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base", children: [_jsx("option", { value: "", children: "Select a client" }), userList.map((user) => (_jsx("option", { value: user._id, children: user.username }, user._id)))] }), _jsx("p", { ref: userRef, className: "text-sm text-red-400 mt-2" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "address", className: "block text-sm font-medium text-gray-200 mb-2", children: "Address" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { id: "address", type: "text", value: address, onChange: (e) => setAddress(e.target.value), placeholder: "Enter address", className: "flex-grow px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base" }), _jsx("button", { type: "button", onClick: () => setOnMap(true), className: "bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200", children: "Select on Map" })] }), _jsx("p", { ref: addressRef, className: "text-sm text-red-400 mt-2" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "mobileNumber", className: "block text-sm font-medium text-gray-200 mb-2", children: "Mobile Number" }), _jsx("input", { id: "mobileNumber", type: "text", value: mobile_number, onChange: (e) => setMobile(e.target.value), placeholder: "Enter mobile number", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base" }), _jsx("p", { ref: mobileRef, className: "text-sm text-red-400 mt-2" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-200 mb-2", children: "Email" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Enter email", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base" }), _jsx("p", { ref: emailRef, className: "text-sm text-red-400 mt-2" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "area", className: "block text-sm font-medium text-gray-200 mb-2", children: "Area (sqft)" }), _jsx("input", { id: "area", type: "number", value: area, onChange: (e) => setArea(Number(e.target.value)), placeholder: "Enter area", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base" }), _jsx("p", { ref: areaRef, className: "text-sm text-red-400 mt-2" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "cost", className: "block text-sm font-medium text-gray-200 mb-2", children: "Budget Cost ($)" }), _jsx("input", { id: "cost", type: "number", value: cost, onChange: (e) => setCost(Number(e.target.value)), placeholder: "Enter budget cost", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base" }), _jsx("p", { ref: costRef, className: "text-sm text-red-400 mt-2" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "floors", className: "block text-sm font-medium text-gray-200 mb-2", children: "Number of Floors" }), _jsx("input", { id: "floors", type: "number", value: floors, onChange: (e) => setFloors(Number(e.target.value)), placeholder: "Enter number of floors", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base" }), _jsx("p", { ref: floorsRef, className: "text-sm text-red-400 mt-2" })] })] }), _jsxs("div", { className: "mt-6 sm:mt-8", children: [_jsx("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-200 mb-2", children: "Description" }), _jsx("textarea", { id: "description", value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Enter project description", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base min-h-[120px]" }), _jsx("p", { ref: descriptionRef, className: "text-sm text-red-400 mt-2" })] }), _jsxs("div", { className: "flex justify-end gap-4 pt-6 sm:pt-8", children: [_jsx("button", { type: "button", onClick: () => {
                                        setEnableEdit(false);
                                        setProjectName("");
                                        setUserId("");
                                        setAddress("");
                                        setEmail("");
                                        setMobile("");
                                        setDescription("");
                                        setArea(0);
                                        setCost(0);
                                        setFloors(1);
                                        setSelectedLocation(null);
                                    }, className: "bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200", children: "Cancel" }), _jsx("button", { type: "submit", className: "bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200", children: "Save" })] }), onMap && (_jsx("div", { className: "fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6", children: _jsx("div", { className: "bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8", children: _jsx(MapIntegrationApp, { address: address, onMap: onMap, setOnMap: setOnMap, setSelectedLocation: setSelectedLocation, selectedLocation: selectedLocation, setAddress: setAddress }) }) }))] }) }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }));
}
export default EditProject;
