import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import LabourAdd from "./LabourAdd";
import LabourEdit from "./LabourEdit";
import { deleteLabourData, getLabour } from "../../../api/Admin/labour";
import ReUsableTable from "../../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../../components/Loading";
function LabourList() {
    const [labour, setLabour] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    // Add
    const [addEnable, setAddEnable] = useState(false);
    // Edit
    const [editEnable, setEditEnable] = useState(false);
    const [editData, setEditData] = useState({ _id: "", daily_wage: 0, labour_type: "" });
    // Delete
    const [deleteId, setDeleteId] = useState("");
    const [deleteEnable, setdeleteEnable] = useState(false);
    const [loadOn, setLoadOn] = useState(false);
    const fetchData = async () => {
        setLoadOn(true);
        try {
            const response = await getLabour({ page, search });
            setLabour(response.data.data);
            setTotal(Math.ceil(response.data.totalPage));
        }
        catch (error) {
            // Optionally handle fetch error here
        }
        finally {
            setLoadOn(false);
        }
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchData();
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [page, search]);
    const heading = ["Sl No", "Labour Type", "Daily Wage", "Actions"];
    const dataKey = ["labour_type", "daily_wage"];
    const renderCell = (key, value) => {
        if (key === "daily_wage") {
            return `₹${value.toFixed(2)}`;
        }
        return value;
    };
    return (_jsxs("div", { className: "p-6 bg-gray-900 min-h-screen relative", children: [_jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-5xl mx-auto border border-gray-700/50", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8", children: [_jsx(ReUsableSearch, { search: search, setSearch: setSearch, item: "labour type" }), _jsx(ReUsableAddButton, { addFuntion: () => setAddEnable(true), item: "Labour" })] }), _jsxs("div", { className: "overflow-x-auto rounded-xl shadow-lg border border-gray-700/50", children: [_jsx(ReUsableTable, { heading: heading, dataKey: dataKey, data: labour, page: page, setEditData: setEditData, setEditEnable: setEditEnable, setDeleteId: setDeleteId, setDeleteEnable: setdeleteEnable, renderCell: renderCell }), _jsx(ReUsablePagination, { page: page, setPage: setPage, totalPage: totalPage })] })] }), _jsx(LabourAdd, { addEnable: addEnable, setAddEnable: setAddEnable, onsuccessAdd: fetchData }), _jsx(LabourEdit, { editEnable: editEnable, setEditEnable: setEditEnable, editData: editData, onSuccessEdit: fetchData }), _jsx(ReUsableDeleteModal, { enable: deleteEnable, setEnable: setdeleteEnable, deleteId: deleteId, onDeleteSuccess: fetchData, api: deleteLabourData, deleteItem: "Labour" }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl z-50 pointer-events-none", children: _jsx(Loading, {}) }))] }));
}
export default LabourList;
