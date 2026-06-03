import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PencilIcon, TrashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { ApproveReceiveAPI, deleteReceiveAPI, getReceiveDataAPI } from "../../../api/Sitemanager/receive";
import AddReceive from "./AddReceive";
import EditReceive from "./EditReceive";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableApproveModal from "../../../components/ReUsableComponents/ReUsableApproveModal";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../../components/Loading";
function ReceiveList() {
    const [receiveData, setReceiveData] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [totalpage, setTotalpage] = useState(0);
    const itemsPerPage = 5;
    // Add
    const [addEnable, setAddEnable] = useState(false);
    // Delete
    const [deleteId, setDeleteId] = useState("");
    const [deleteEnable, setDeleteEnable] = useState(false);
    // Approve
    const [approveId, setApproveId] = useState("");
    const [approveEnable, setApproveEnable] = useState(false);
    const [approveData, setApproveData] = useState();
    // Edit
    const [editId, setEditId] = useState("");
    const [editEnable, setEditEnable] = useState(false);
    const [editData, setEditData] = useState();
    const [loadOn, setLoadOn] = useState(false);
    const fetchRecieveData = async () => {
        setLoadOn(true);
        const response = await getReceiveDataAPI(search, page);
        setLoadOn(false);
        if (response.success) {
            setReceiveData(response.data.data);
            setTotalpage(response.data.totalPage);
        }
        else {
            toast.error("Error occurred while fetching receive data");
        }
    };
    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchRecieveData();
        }, 500);
        return () => {
            clearTimeout(debounce);
        };
    }, [search, page]);
    const formatDate = (dateString) => {
        if (!dateString)
            return "";
        const [date] = dateString.split("T");
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-900 p-4 sm:p-6", children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-100", children: "Purchase List" }), _jsxs("div", { className: "flex w-full sm:w-auto gap-4", children: [_jsx(ReUsableSearch, { search: search, setSearch: setSearch, item: "Project name" }), _jsx(ReUsableAddButton, { addFuntion: () => setAddEnable(true), item: "Receive" })] })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) })), _jsx("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: _jsxs("table", { className: "min-w-full text-sm text-left bg-gray-800/50", children: [_jsx("thead", { className: "bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 w-[10%]", children: "SL NO" }), _jsx("th", { className: "px-6 py-4 w-[20%]", children: "Date" }), _jsx("th", { className: "px-6 py-4 w-[25%]", children: "Project Name" }), _jsx("th", { className: "px-6 py-4 w-[15%]", children: "Net Amount" }), _jsx("th", { className: "px-6 py-4 w-[20%] text-center", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-700/50", children: receiveData.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "text-center py-8 text-gray-400 text-sm font-medium", children: "No purchase records available. Click \"Add Purchase\" to create one." }) })) : (receiveData.map((element, index) => (_jsxs("tr", { className: "hover:bg-gray-700/50 transition-colors duration-150", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-200 text-center", children: index + 1 + page * itemsPerPage }), _jsx("td", { className: "px-6 py-4 text-gray-100", children: formatDate(element.date) }), _jsx("td", { className: "px-6 py-4 text-gray-100", children: element.Toproject_name }), _jsxs("td", { className: "px-6 py-4 text-gray-100", children: ["\u20B9", element.finalAmount.toLocaleString()] }), _jsxs("td", { className: "px-6 py-4 text-center flex justify-center gap-2", children: [_jsx("button", { type: "button", className: "text-teal-400 hover:text-teal-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200", "aria-label": `Edit purchase for ${element.Toproject_name}`, onClick: () => {
                                                        setEditId(element._id);
                                                        const updatedElement = {
                                                            ...element,
                                                            date: element.date.split("T")[0],
                                                            materialDetails: element.materialData.map((item, i) => ({
                                                                ...item,
                                                                sl: i + 1,
                                                            })),
                                                        };
                                                        setEditData(updatedElement);
                                                        setEditEnable(true);
                                                    }, children: _jsx(PencilIcon, { className: "h-5 w-5" }) }), _jsx("button", { type: "button", className: "text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200", "aria-label": `Delete purchase for ${element.Toproject_name}`, onClick: () => {
                                                        setDeleteId(element._id);
                                                        setDeleteEnable(true);
                                                    }, children: _jsx(TrashIcon, { className: "h-5 w-5" }) }), _jsx("button", { type: "button", className: "text-green-400 hover:text-green-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200", "aria-label": `Approve purchase for ${element.Toproject_name}`, onClick: () => {
                                                        setApproveId(element._id);
                                                        setApproveEnable(true);
                                                        const updatedElement = {
                                                            ...element,
                                                            date: element.date.split("T")[0],
                                                            materialDetails: element.materialData.map((item, i) => ({
                                                                ...item,
                                                                sl: i + 1,
                                                            })),
                                                        };
                                                        setApproveData(updatedElement);
                                                    }, children: _jsx(CheckCircleIcon, { className: "h-5 w-5" }) })] })] }, element._id)))) })] }) }), totalpage >= 1 && (_jsx(ReUsablePagination, { page: page, setPage: setPage, totalPage: totalpage })), _jsx(AddReceive, { addEnable: addEnable, setAddEnable: setAddEnable, onAddSuccess: fetchRecieveData }), _jsx(ReUsableDeleteModal, { deleteId: deleteId, onDeleteSuccess: fetchRecieveData, setEnable: setDeleteEnable, enable: deleteEnable, api: deleteReceiveAPI, deleteItem: "Receive" }), _jsx(ReUsableApproveModal, { approveId: approveId, setApproveEnable: setApproveEnable, approveEnable: approveEnable, onApproveSuccess: fetchRecieveData, approveData: approveData, api: ApproveReceiveAPI, approveItem: "Material Receive" }), _jsx(EditReceive, { editId: editId, editEnable: editEnable, setEditEnable: setEditEnable, onEditSuccess: fetchRecieveData, editData: editData })] }) }));
}
export default ReceiveList;
