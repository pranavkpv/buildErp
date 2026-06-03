import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getAllProjectInUserSideApi } from "../../../../api/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../../components/Loading";
function CountProject() {
    const [project, setProject] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [loadOn, setLoadOn] = useState(false);
    const navigate = useNavigate();
    const fetchProjectAndItsStatus = async () => {
        setLoadOn(true);
        const response = await getAllProjectInUserSideApi();
        setLoadOn(false);
        if (response.success) {
            setAllProjects(response.data);
            let map = [
                { status: "processing", count: 0 },
                { status: "pending", count: 0 },
                { status: "completed", count: 0 }
            ];
            for (let element of response.data) {
                for (let item of map) {
                    if (element.status === item.status) {
                        item.count += 1;
                        break;
                    }
                }
            }
            setProject(map);
        }
        else {
            toast.error(response.message);
        }
    };
    useEffect(() => {
        fetchProjectAndItsStatus();
    }, []);
    const handleBoxClick = (status) => {
        let statusBaseProjects = allProjects.filter((element) => element.status === status);
        navigate('/admin/ProjectList', { state: statusBaseProjects });
    };
    if (loadOn) {
        return (_jsx("div", { className: "flex justify-center items-center min-h-[200px]", children: _jsx(Loading, {}) }));
    }
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: project.map((element) => (_jsxs("div", { className: "bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-slate-700 hover:border-blue-500", onClick: () => handleBoxClick(element.status), role: "button", tabIndex: 0, onKeyDown: (e) => { if (e.key === "Enter")
                handleBoxClick(element.status); }, children: [_jsxs("h1", { className: "text-xl font-semibold text-white capitalize", children: [element.status, " Projects"] }), _jsx("p", { className: "text-3xl font-bold text-blue-400 mt-2", children: element.count })] }, element.status))) }));
}
export default CountProject;
