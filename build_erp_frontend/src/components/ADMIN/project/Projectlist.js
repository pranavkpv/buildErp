import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import EditProject from "./ProjectEdit";
import ChangeStatus from "./Status";
import { deleteProjectData, projectListData } from "../../../api/project";
import ReUsableTable from "../../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../../components/Loading";
function Project() {
    const [projectList, setProjectList] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotal] = useState(0);
    // delete
    const [deleteEnable, setDeleteEnable] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    // edit
    const [editEnable, setEditEnable] = useState(false);
    const [editData, setEditData] = useState({
        _id: "", project_name: "", address: "", mobile_number: "", email: "", description: "",
        area: 0, lat: 0, long: 0, userDetails: { _id: "", username: "", email: "", phone: 0 }, status: "", cost: 0, floor: 0, project_type: ""
    });
    // change
    const [changeProjectId, setChangeProjectId] = useState("");
    const [changeStatus, setChangeStatus] = useState("");
    const [changeEnable, setChangeEnable] = useState(false);
    const [loadOn, setLoadOn] = useState(false);
    const fetchData = async () => {
        setLoadOn(true);
        const response = await projectListData(page, search);
        setLoadOn(false);
        setProjectList(response.data.data);
        setTotal(Math.ceil(response.data.totalPage));
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchData();
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [page, search]);
    const heading = ["Sl No", "Project Name", "Client Name", "Status", "Action"];
    const dataKey = ["project_name", "email", "status"];
    const renderCell = (key, value, item) => {
        if (key === "email") {
            return (_jsx("span", { className: "text-gray-200", children: item.userDetails.username }));
        }
        if (key === "status") {
            return (_jsx("td", { className: "px-6 py-4", children: item.status === "completed" ? (_jsx("p", { className: "text-gray-200 capitalize", children: item.status })) : (_jsxs("select", { "aria-label": `Select status for ${item.project_name}`, id: `status-${item._id}`, defaultValue: item.status, className: "w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium", onChange: (e) => {
                        setChangeProjectId(item._id);
                        setChangeStatus(e.target.value);
                        setChangeEnable(true);
                    }, children: [_jsx("option", { value: item.status, className: "capitalize", children: item.status }), item.status === "pending" &&
                            ["completed"].map((value) => (_jsx("option", { value: value, className: "capitalize", children: value }, value))), item.status === "processing" &&
                            ["completed"].map((value) => (_jsx("option", { value: value, className: "capitalize", children: value }, value)))] })) }));
        }
        return value;
    };
    return (_jsxs("div", { className: "p-6 sm:p-8 min-h-screen bg-gray-900", children: [_jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50", children: [_jsx("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8", children: _jsx(ReUsableSearch, { search: search, setSearch: setSearch, item: "project" }) }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) })), _jsxs("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: [_jsx(ReUsableTable, { data: projectList, dataKey: dataKey, heading: heading, page: page, setDeleteEnable: setDeleteEnable, setDeleteId: setDeleteId, setEditData: setEditData, setEditEnable: setEditEnable, renderCell: renderCell }), _jsx(ReUsablePagination, { page: page, setPage: setPage, totalPage: totalPage })] })] }), _jsx(ChangeStatus, { project_id: changeProjectId, status: changeStatus, enable: changeEnable, setEnable: setChangeEnable, onChangeSuccess: fetchData }), _jsx(EditProject, { editData: editData, editEnable: editEnable, setEnableEdit: setEditEnable, onEditSuccess: fetchData }), _jsx(ReUsableDeleteModal, { enable: deleteEnable, deleteId: deleteId, setEnable: setDeleteEnable, onDeleteSuccess: fetchData, api: deleteProjectData, deleteItem: "Project" })] }));
}
export default Project;
