import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import AddSitemanager from "./Addsitemanager";
import EditSitemanager from "./EditSitemanager";
import { deleteSitemanagerData, fetchSitemanager } from "../../../api/Admin/sitemanager";
import ReUsableTable from "../../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
function SitemanagerList() {
    const [sitedata, setSiteData] = useState([]);
    const [searchSite, setSearchSite] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotal] = useState(0);
    // Add
    const [addEnable, setAddEnable] = useState(false);
    // Edit
    const [editEnable, setEditEnable] = useState(false);
    const [editData, setEditData] = useState({ _id: "", email: "", project_id: "", username: "" });
    // Delete
    const [deleteEnable, setDeleteEnable] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [loadOn, setLoadOn] = useState(false);
    const fetchData = async () => {
        try {
            setLoadOn(true);
            const search = searchSite;
            const response = await fetchSitemanager(page, search);
            if (response.success) {
                setLoadOn(false);
                setTotal(Math.ceil(response.data.totalPage));
                setSiteData(response.data.data);
            }
            else {
                setLoadOn(false);
                toast.error(response.message);
            }
        }
        catch (error) {
            setLoadOn(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [page, searchSite]);
    const heading = ["Sl No", "Site Manager Name", "Email", "Action"];
    const dataKey = ["username", "email"];
    return (_jsxs("div", { className: "p-6 sm:p-8 min-h-screen bg-gray-900", children: [_jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8", children: [_jsx(ReUsableSearch, { search: searchSite, setSearch: setSearchSite, item: "site manager" }), _jsx(ReUsableAddButton, { addFuntion: () => setAddEnable(true), item: "SiteManager" })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) })), _jsxs("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: [_jsx(ReUsableTable, { data: sitedata, dataKey: dataKey, heading: heading, page: page, setDeleteEnable: setDeleteEnable, setDeleteId: setDeleteId, setEditData: setEditData, setEditEnable: setEditEnable }), _jsx(ReUsablePagination, { page: page, setPage: setPage, totalPage: totalPage })] })] }), _jsx(AddSitemanager, { addEnable: addEnable, setAddEnable: setAddEnable, onAddSuccess: fetchData }), _jsx(EditSitemanager, { editData: editData, editEnable: editEnable, setEditEnable: setEditEnable, onEditSuccess: fetchData }), _jsx(ReUsableDeleteModal, { enable: deleteEnable, setEnable: setDeleteEnable, deleteId: deleteId, onDeleteSuccess: fetchData, api: deleteSitemanagerData, deleteItem: "Sitemanager" })] }));
}
export default SitemanagerList;
