import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import MaterialList from "./MaterialList";
import AddMaterial from "./AddMaterial";
import EditMaterial from "./EditMaterial";
import { deleteMaterial, materialList } from "../../../api/Admin/material";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";
import { toast } from "react-toastify";
function Material() {
    const [addMaterialEnable, setAddMaterialEnable] = useState(false);
    const [materialData, setMaterialData] = useState([]);
    const [deleteId, setDeleteId] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    // deletedata
    const [deleteEnable, setDeleteEnable] = useState(false);
    //editData
    const [editEnable, setEditEnable] = useState(false);
    const [editId, setEditId] = useState("");
    const [loadOn, setLoadOn] = useState(false);
    const fetchMaterials = async () => {
        try {
            setLoadOn(true);
            const response = await materialList(page, search);
            if (response.success) {
                setLoadOn(false);
                setTotal(Math.ceil(response.data.totalPage));
                setMaterialData(response.data.data);
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
        const handler = setTimeout(() => {
            fetchMaterials();
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [page, search]);
    return (_jsxs("div", { className: "p-6 sm:p-8 min-h-screen bg-gray-900", children: [_jsx(MaterialList, { setEnable: setAddMaterialEnable, enable: addMaterialEnable, materialData: materialData, setDeleteEnable: setDeleteEnable, setDeleteId: setDeleteId, refreshData: fetchMaterials, setPage: setPage, setSearch: setSearch, search: search, page: page, totalPage: totalPage, setEditEnable: setEditEnable, setEditId: setEditId, editEnable: editEnable, loadOn: loadOn }), _jsx(EditMaterial, { setEditEnable: setEditEnable, editEnable: editEnable, setEditId: setEditId, editId: editId, refreshData: fetchMaterials }), _jsx(AddMaterial, { setEnable: setAddMaterialEnable, enable: addMaterialEnable, refreshData: fetchMaterials }), _jsx(ReUsableDeleteModal, { enable: deleteEnable, setEnable: setDeleteEnable, deleteId: deleteId, onDeleteSuccess: fetchMaterials, api: deleteMaterial, deleteItem: "Material" })] }));
}
export default Material;
