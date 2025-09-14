import { useEffect, useState } from "react";
import AddStage from "./AddStage";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import DeleteStage from "./DeleteStage";
import EditStage from "./EditStage";
import { fetchStageDataAPI } from "../../../api/Admin/StageSetting";
import ReUsableTable from "../../../components/ReUsableComponents/ReUsableTable";
import type { stageDatas } from "ApiInterface/stageApi.interface";



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
  const [editData, setEditData] = useState<stageDatas>({ _id: "", project_name: "", start_date: "", end_date: "" ,budgeted_cost:0})

  const fetchStage = async () => {
    const response = await fetchStageDataAPI(search, page);
    setDatas(response.data.data);
    let x = []
    for (let i = 0; i < response.data.totalPage; i++) {
      x.push(i)
    }
    setTotalPage(x)
  };

  useEffect(() => {
    fetchStage();
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
            <div className="w-full sm:w-96">
              <label htmlFor="search" className="sr-only">
                Search project
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search with project name"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => setAddEnable(true)}
              type="button"
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2"
            >
              <PlusCircleIcon className="h-5 w-5" /> Add Stage
            </button>
          </div>
        </div>

        <AddStage
          addEnable={addEnable}
          setAddEnable={setAddEnable}
          onAddSuccess={fetchStage}
        />

        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <ReUsableTable<stageDatas>
            data={datas}
            dataKey={dataKey}
            heading={heading}
            page={page}
            setDeleteEnable={setDeleteEnable}
            setDeleteId={setDeleteId}
            setEditData={setEditData}
            setEditEnable={setEditEnable}
            renderCell={renderCell}
          />

          <div className="flex justify-center items-center gap-2 p-4 bg-gray-800/50 rounded-b-xl border-t border-gray-700/50">
            {totalPage.map((element) => (
              <button
                key={element}
                onClick={() => setPage(element)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 
          ${ page === element
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 hover:text-teal-300'
                  } focus:outline-none focus:ring-2 focus:ring-teal-400`}
              >
                {element + 1}
              </button>
            ))}
          </div>
          <DeleteStage
            enable={deleteEnable}
            deleteId={deleteId}
            setEnable={setDeleteEnable}
            onDeleteSuccess={fetchStage}
          />
          <EditStage
            editEnable={editEnable}
            setEditEnable={setEditEnable}
            editData={editData}
            onEditSuccess={fetchStage}
          />
        </div>
      </div>
    </div>
  );
}

export default ListStage;