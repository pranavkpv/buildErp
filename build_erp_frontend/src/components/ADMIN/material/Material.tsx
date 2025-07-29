import { useState, useEffect } from "react";
import MaterialList from "./MaterialList";
import AddMaterial from "./AddMaterial";
import DeleteMaterial from "./Deletematerial";
import { toast } from "react-toastify";
import { materialList } from "../../../api/Admin/material";
import EditMaterial from "./EditMaterial";

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
  const [editEnable,setEditEnable] = useState(false)
  const [editId,setEditId] = useState("")

  const fetchMaterials = async () => {
      const data = await materialList(page,search) 
      setTotal(Math.ceil(data.totalPage))
      setMaterialData(data.data);
  };

  useEffect(() => {
    fetchMaterials();
  }, [page,search]);

  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">

          <h1 className="text-2xl font-bold text-gray-100">Material Management</h1>
        </div>


        <MaterialList
          setEnable={setAddMaterialEnable}
          enable={addMaterialEnable}
          materialData={materialData}
          setDeleteEnable={setDeleteEnable}
          setDeleteId={setDeleteId}
          refreshData={fetchMaterials}
          setPage={setPage}
          setSearch={setSearch}
          search = {search}
          page = {page}
          totalPage = {totalPage}
          setEditEnable ={setEditEnable}
          setEditId = {setEditId}
          editEnable = {editEnable}
        />
        <EditMaterial
        setEditEnable={setEditEnable}
        editEnable = {editEnable}
        setEditId = {setEditId}
        editId = {editId}
        refreshData = {fetchMaterials}
         />

        <AddMaterial
          setEnable={setAddMaterialEnable}
          enable={addMaterialEnable}
          refreshData={fetchMaterials}
        />

        <DeleteMaterial
          enable={deleteEnable}
          setEnable={setDeleteEnable}
          deleteId={deleteId}
          onDeleteSuccess={fetchMaterials}
        />
        
      </div>
    </div>
  );
}

export default Material;