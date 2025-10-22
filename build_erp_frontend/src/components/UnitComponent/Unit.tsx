import { useEffect, useState } from "react";
import AddUnit from "./AddUnit";
import EditUnit from "./EditUnit";
import { deleteUnitData, getUnit } from "../../api/UnitApi/unit";
import type { unitInput } from "ApiInterface/UnitApiInterface";
import ReUsableTable from "../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableAddButton from "../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";



function Unit() {
  const [enableAdd, setEnableAdd] = useState(false);
  const [unitList, setUnitList] = useState<unitInput[]>([]);
  const [searchUnit, setSearchUnit] = useState<string>("");
  const [page, setPage] = useState(0)
  const [totalPage, setTotal] = useState(0)
  const [loadOn, setLoadOn] = useState(false)


  const [enableEdit, setEnableEdit] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editData, setEditData] = useState<unitInput>({ _id: "", short_name: "", unit_name: "" })
  const [enableDelete, setEnableDelete] = useState(false);

  const fetchData = async () => {
    try {
      setLoadOn(true)
      const search = searchUnit
      const response = await getUnit({ page, search })
      if (response.success) {
        setLoadOn(false)
        setTotal(Math.ceil(response.data.totalPage))
        setUnitList(response.data.data);
      } else {
        setLoadOn(false)
        toast.error(response.message)
      }
    } catch (error) {
      setLoadOn(false)
    }
  };

  useEffect(() => {
    let debounce = setTimeout(() => {
      fetchData();
    }, 500)
    return () => {
      clearTimeout(debounce)
    }
  }, [page, searchUnit]);

  const heading = ["Sl No", "Unit", "Short Unit", "Action"];
  const dataKey = ["unit_name", "short_name"] as (keyof unitInput)[];

  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <ReUsableSearch search={searchUnit} setSearch={setSearchUnit} item="Unit" />

          <ReUsableAddButton addFuntion={() => setEnableAdd(true)} item="Unit" />

        </div>
        {loadOn && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50">
              <Loading />
            </div>
          )}

        <AddUnit enable={enableAdd} setEnable={setEnableAdd} onAdd={fetchData} />

        <div className="overflow-x-auto rounded-xl border border-gray-700/50">

          <ReUsableTable data={unitList} dataKey={dataKey} heading={heading} page={page} setDeleteEnable={setEnableDelete}
            setDeleteId={setDeleteId} setEditData={setEditData} setEditEnable={setEnableEdit} />

          <ReUsablePagination page={page} setPage={setPage} totalPage={totalPage} />

        </div>
      </div>

      <EditUnit enable={enableEdit} setEnable={setEnableEdit} editData={editData} onUpdate={fetchData} />

      <ReUsableDeleteModal enable={enableDelete} deleteId={deleteId} setEnable={setEnableDelete} onDeleteSuccess={fetchData} api={deleteUnitData} deleteItem="Unit" />

    </div>
  );
}

export default Unit;