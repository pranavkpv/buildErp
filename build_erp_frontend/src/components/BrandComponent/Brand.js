import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import AddBrand from "./AddBrand";
import EditBrand from "./EditBrand";
import { deleteBrandData, getbrandList } from "../../api/BrandApi/brand";
import ReUsableTable from "../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableAddButton from "../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
function Brand() {
    const [enableAdd, setEnableAdd] = useState(false);
    const [brandList, setBrandList] = useState([]);
    const [searchBrand, setSearchBrand] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotal] = useState(0);
    const [enableEdit, setEnableEdit] = useState(false);
    const [editData, setEditData] = useState({ _id: "", brand_name: "" });
    const [deleteId, setDeleteId] = useState("");
    const [enableDelete, setEnableDelete] = useState(false);
    const [loadOn, setLoadOn] = useState(false);
    const fetchData = async () => {
        try {
            const search = searchBrand;
            setLoadOn(true);
            const response = await getbrandList({ page, search });
            if (response.success) {
                setLoadOn(false);
                setBrandList(response.data.data);
                setTotal(Math.ceil(response.data.totalPage));
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
        let debounce = setTimeout(() => {
            fetchData();
        }, 500);
        return () => {
            clearInterval(debounce);
        };
    }, [searchBrand, page]);
    const heading = ["Sl No", "Brand Name", "Action"];
    const dataKey = ["brand_name"];
    return (_jsx("div", { className: "p-6 bg-gray-900 min-h-screen", children: _jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-5xl mx-auto border border-gray-700/50", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx(ReUsableSearch, { search: searchBrand, setSearch: setSearchBrand, item: "brand" }), _jsx(ReUsableAddButton, { addFuntion: () => setEnableAdd(true), item: "Brand" })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) })), _jsx(AddBrand, { enable: enableAdd, setEnable: setEnableAdd, onAdd: fetchData }), _jsxs("div", { className: "overflow-x-auto rounded-xl shadow-lg border border-gray-700/50", children: [_jsx(ReUsableTable, { data: brandList, dataKey: dataKey, heading: heading, page: page, setDeleteEnable: setEnableDelete, setDeleteId: setDeleteId, setEditData: setEditData, setEditEnable: setEnableEdit }), _jsx(ReUsablePagination, { page: page, setPage: setPage, totalPage: totalPage })] }), _jsx(EditBrand, { enable: enableEdit, setEnable: setEnableEdit, editData: editData, onUpdate: fetchData }), _jsx(ReUsableDeleteModal, { enable: enableDelete, deleteId: deleteId, setEnable: setEnableDelete, onDeleteSuccess: fetchData, api: deleteBrandData, deleteItem: "Brand" })] }) }));
}
export default Brand;
