import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import AddStage from "./AddStage";
import EditStage from "./EditStage";
import { fetchStageDataAPI, stageDeleteAPI } from "../../../api/Admin/StageSetting";
import ReUsableTable from "../../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../../components/Loading";
function ListStage() {
    const [addEnable, setAddEnable] = useState(false);
    const [datas, setDatas] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState([]);
    //delete data
    const [deleteEnable, setDeleteEnable] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    //edit data 
    const [editEnable, setEditEnable] = useState(false);
    const [editData, setEditData] = useState({ _id: "", project_name: "", start_date: "", end_date: "", budgeted_cost: 0 });
    const [loadOn, setLoadOn] = useState(false);
    const fetchStage = async () => {
        setLoadOn(true);
        const response = await fetchStageDataAPI(search, page);
        setLoadOn(false);
        setDatas(response.data.data);
        let x = [];
        for (let i = 0; i < response.data.totalPage; i++) {
            x.push(i);
        }
        setTotalPage(x);
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchStage();
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [page, search]);
    const heading = ["Sl No", "Project Name", "Start Date", "End Date", "Action"];
    const dataKey = ["project_name", "start_date", "end_date"];
    const renderCell = (key, value, item) => {
        if (key === "start_date") {
            return (_jsx("td", { className: "px-6 py-4 text-gray-100", children: item.start_date.split("T")[0].split("-").reverse().join("-") }));
        }
        if (key === "end_date") {
            return (_jsx("td", { className: "px-6 py-4 text-gray-100", children: item.end_date.split("T")[0].split("-").reverse().join("-") }));
        }
        return value;
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-900 p-4 sm:p-6", children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-100", children: "Stage Setting" }), _jsxs("div", { className: "flex w-full sm:w-auto gap-4", children: [_jsx(ReUsableSearch, { search: search, setSearch: setSearch, item: "Project" }), _jsx(ReUsableAddButton, { addFuntion: () => setAddEnable(true), item: "Stage" })] })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) })), _jsx(AddStage, { addEnable: addEnable, setAddEnable: setAddEnable, onAddSuccess: fetchStage }), _jsxs("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: [_jsx(ReUsableTable, { data: datas, dataKey: dataKey, heading: heading, page: page, setDeleteEnable: setDeleteEnable, setDeleteId: setDeleteId, setEditData: setEditData, setEditEnable: setEditEnable, renderCell: renderCell }), _jsx(ReUsablePagination, { page: page, setPage: setPage, totalPage: totalPage.length }), _jsx(ReUsableDeleteModal, { enable: deleteEnable, deleteId: deleteId, setEnable: setDeleteEnable, onDeleteSuccess: fetchStage, api: stageDeleteAPI, deleteItem: "Stage" }), _jsx(EditStage, { editEnable: editEnable, setEditEnable: setEditEnable, editData: editData, onEditSuccess: fetchStage })] })] }) }));
}
export default ListStage;
