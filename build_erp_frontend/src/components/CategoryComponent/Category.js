import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import { categoryList, deleteCategoryData } from "../../api/CategoryApi/category";
import ReUsableTable from "../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableAddButton from "../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../components/Loading";
function Category() {
    const [enableAdd, setEnableAdd] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchCategory, setSearchCat] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotal] = useState(0);
    const [enableEdit, setEnableEdit] = useState(false);
    const [loadOn, setLoadOn] = useState(false);
    //edit data
    const [editData, setEditData] = useState({ _id: '', category_name: '', description: '' });
    const [deleteId, setDeleteId] = useState("");
    const [enableDelete, setEnableDelete] = useState(false);
    const fetchData = async () => {
        try {
            const response = await categoryList({ page, search: searchCategory });
            if (response.success) {
                setLoadOn(false);
                setTotal(Math.ceil(response.data.totalPages) || 0);
                setCategories(response.data.data ?? []);
            }
            else {
                setLoadOn(false);
                toast.error(response.message);
            }
        }
        catch (error) {
            setLoadOn(false);
            toast.error("Failed to fetch categories");
        }
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            setPage(0);
            fetchData();
            setLoadOn(true);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchCategory, page]);
    const heading = ["Sl No", "Category", "Description", "Action"];
    const dataKey = ["category_name", "description"];
    return (_jsx("div", { className: "p-6 sm:p-8 min-h-screen bg-gray-900", children: _jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8", children: [_jsx(ReUsableSearch, { search: searchCategory, setSearch: setSearchCat, item: "Category" }), _jsx(ReUsableAddButton, { addFuntion: () => setEnableAdd(true), item: "Category" })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) })), _jsxs("div", { className: "overflow-x-auto rounded-xl border border-gray-700/50", children: [_jsx(ReUsableTable, { data: categories, dataKey: dataKey, heading: heading, page: page, setDeleteEnable: setEnableDelete, setDeleteId: setDeleteId, setEditData: setEditData, setEditEnable: setEnableEdit }), _jsx(ReUsablePagination, { page: page, setPage: setPage, totalPage: totalPage })] }), _jsx(AddCategory, { enable: enableAdd, setEnable: setEnableAdd, onAdd: fetchData }), _jsx(EditCategory, { editData: editData, enable: enableEdit, setEnable: setEnableEdit, onUpdate: fetchData }), _jsx(ReUsableDeleteModal, { enable: enableDelete, deleteId: deleteId, setEnable: setEnableDelete, onDeleteSuccess: fetchData, api: deleteCategoryData, deleteItem: "Category" })] }) }));
}
export default Category;
