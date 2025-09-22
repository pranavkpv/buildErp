import { useState, useEffect } from "react";
import MaterialList from "./MaterialList";
import AddMaterial from "./AddMaterial";
import EditMaterial from "./EditMaterial";
import { deleteMaterial, materialList } from "../../../api/Admin/material";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";

function Material() {
  const [addMaterialEnable, setAddMaterialEnable] = useState(false);
  const [materialData, setMaterialData] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [page, setPage] = useState(0)
  const [totalPage, setTotal] = useState(0)
  const [search, setSearch] = useState("");



  // deletedata
  const [deleteEnable, setDeleteEnable] = useState(false);

  //editData
  const [editEnable, setEditEnable] = useState(false)
  const [editId, setEditId] = useState("")

  const fetchMaterials = async () => {
    const response = await materialList(page, search)
    setTotal(Math.ceil(response.data.totalPage))
    setMaterialData(response.data.data);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchMaterials();
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [page, search]);


  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <MaterialList
          setEnable={setAddMaterialEnable}
          enable={addMaterialEnable}
          materialData={materialData}
          setDeleteEnable={setDeleteEnable}
          setDeleteId={setDeleteId}
          refreshData={fetchMaterials}
          setPage={setPage}
          setSearch={setSearch}
          search={search}
          page={page}
          totalPage={totalPage}
          setEditEnable={setEditEnable}
          setEditId={setEditId}
          editEnable={editEnable}
        />
        <EditMaterial
          setEditEnable={setEditEnable}
          editEnable={editEnable}
          setEditId={setEditId}
          editId={editId}
          refreshData={fetchMaterials}
        />

        <AddMaterial
          setEnable={setAddMaterialEnable}
          enable={addMaterialEnable}
          refreshData={fetchMaterials}
        />

        <ReUsableDeleteModal
          enable={deleteEnable}
          setEnable={setDeleteEnable}
          deleteId={deleteId}
          onDeleteSuccess={fetchMaterials}
          api={deleteMaterial}
          deleteItem="Material"
        />
    </div>
  );
}

export default Material;