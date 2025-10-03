import { useEffect, useState } from "react";
import AddStage from "./AddStage";
import EditStage from "./EditStage";
import { fetchStageDataAPI, stageDeleteAPI } from "../../../api/Admin/StageSetting";
import ReUsableTable from "../../../components/ReUsableComponents/ReUsableTable";
import type { stageDatas } from "ApiInterface/stageApi.interface";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../../components/Loading";



function ListStage() {
  const [addEnable, setAddEnable] = useState(false);
  const [datas, setDatas] = useState<stageDatas[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState<number[]>([])

  //delete data
  const [deleteEnable, setDeleteEnable] = useState(false)
  const [deleteId, setDeleteId] = useState("")


  //edit data 
  const [editEnable, setEditEnable] = useState(false)
  const [editData, setEditData] = useState<stageDatas>({ _id: "", project_name: "", start_date: "", end_date: "", budgeted_cost: 0 })
  const [loadOn, setLoadOn] = useState(false)

  const fetchStage = async () => {
    setLoadOn(true)
    const response = await fetchStageDataAPI(search, page);
    setLoadOn(false)
    setDatas(response.data.data);
    let x = []
    for (let i = 0; i < response.data.totalPage; i++) {
      x.push(i)
    }
    setTotalPage(x)
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
  const dataKey = ["project_name", "start_date", "end_date"] as (keyof stageDatas)[];


  const renderCell = (key: keyof stageDatas, value: string, item: stageDatas) => {
    if (key === "start_date") {
      return (
        <td className="px-6 py-4 text-gray-100">
          {item.start_date.split("T")[0].split("-").reverse().join("-")}
        </td>
      );
    }
    if (key === "end_date") {
      return (
        <td className="px-6 py-4 text-gray-100">
          {item.end_date.split("T")[0].split("-").reverse().join("-")}
        </td>
      );
    }
    return value;
  };


  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-100">Stage Setting</h1>
          <div className="flex w-full sm:w-auto gap-4">
            <ReUsableSearch search={search} setSearch={setSearch} item="Project" />
            <ReUsableAddButton addFuntion={() => setAddEnable(true)} item="Stage" />
          </div>
        </div>
        <Loading loadOn={loadOn} />
        <AddStage addEnable={addEnable} setAddEnable={setAddEnable} onAddSuccess={fetchStage} />
        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <ReUsableTable<stageDatas> data={datas} dataKey={dataKey} heading={heading} page={page} setDeleteEnable={setDeleteEnable}
            setDeleteId={setDeleteId} setEditData={setEditData} setEditEnable={setEditEnable} renderCell={renderCell} />

          <ReUsablePagination page={page} setPage={setPage} totalPage={totalPage.length} />

          <ReUsableDeleteModal enable={deleteEnable} deleteId={deleteId} setEnable={setDeleteEnable} onDeleteSuccess={fetchStage} api={stageDeleteAPI} deleteItem="Stage" />

          <EditStage editEnable={editEnable} setEditEnable={setEditEnable} editData={editData} onEditSuccess={fetchStage} />

        </div>
      </div>
    </div>
  );
}

export default ListStage;