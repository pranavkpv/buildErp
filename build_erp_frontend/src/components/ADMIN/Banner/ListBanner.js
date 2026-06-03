import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { deleteBannerDataApi, fetchBannerApi } from "../../../api/banner";
import AddBanner from "./AddBanner";
import BannerEdit from "./EditBanner";
import { toast } from "react-toastify";
import ReUsableTable from "../../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../../components/Loading";
function ListBanner() {
    const [bannerData, setBannerData] = useState([]);
    const [search, setSearch] = useState("");
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    // Delete
    const [deleteEnable, setDeleteEnable] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    // Edit
    const [editData, setEditData] = useState({
        _id: "",
        title: "",
        subtitle: "",
        image: "",
    });
    const [editEnable, setEditEnable] = useState(false);
    // Add
    const [addEnable, setAddEnable] = useState(false);
    const [loadOn, setLoadOn] = useState(false);
    const fetchBannerList = async () => {
        setLoadOn(true);
        const response = await fetchBannerApi({ page, search });
        if (response.success) {
            setLoadOn(false);
            setBannerData(response.data.data);
            setTotalPage(response.data.totalPage);
        }
        else {
            setLoadOn(false);
            toast.error(response.message);
        }
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchBannerList();
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [page, search]);
    const heading = ["Sl No", "Title", "Subtitle", "Image", "Action"];
    const dataKey = ["title", "subtitle", "image"];
    // Custom render function for the table
    const renderCell = (key, value, item) => {
        if (key === "image") {
            return (_jsx("img", { src: value, alt: `${item.title} banner`, className: "h-10 w-16 object-cover rounded-md", onError: (e) => {
                    e.currentTarget.src = "/fallback-image.png";
                } }));
        }
        return value;
    };
    return (_jsxs("div", { className: "p-6 sm:p-8 min-h-screen bg-gray-900 relative", children: [_jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8", children: [_jsx(ReUsableSearch, { search: search, setSearch: setSearch, item: "Banner Title" }), _jsx(ReUsableAddButton, { addFuntion: () => setAddEnable(true), item: "Banner" })] }), _jsxs("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: [_jsx(ReUsableTable, { heading: heading, dataKey: dataKey, data: bannerData, page: page, setEditData: setEditData, setEditEnable: setEditEnable, setDeleteId: setDeleteId, setDeleteEnable: setDeleteEnable, renderCell: renderCell }), _jsx(ReUsablePagination, { page: page, setPage: setPage, totalPage: totalPage })] })] }), _jsx(AddBanner, { enableAdd: addEnable, setEnableAdd: setAddEnable, onAddSuccess: fetchBannerList }), _jsx(BannerEdit, { editData: editData, editEnable: editEnable, setEnableEdit: setEditEnable, onEditSuccess: fetchBannerList }), _jsx(ReUsableDeleteModal, { enable: deleteEnable, deleteId: deleteId, onDeleteSuccess: fetchBannerList, setEnable: setDeleteEnable, api: deleteBannerDataApi, deleteItem: "Banner" }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/50 flex items-center justify-center z-50 rounded-2xl", children: _jsx(Loading, {}) }))] }));
}
export default ListBanner;
