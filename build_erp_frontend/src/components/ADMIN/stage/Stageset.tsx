import { useEffect, useState } from "react";
import AddStage from "./AddStage";
import { fetchStageDataAPI } from "../../../api/Admin/StageSetting";
import { PlusCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import DeleteStage from "./DeleteStage";
import EditStage from "./EditStage";

type stageData = {
  _id: string
  project_name: string;
  start_date: string;
  end_date: string;
};

function ListStage() {
  const [addEnable, setAddEnable] = useState(false);
  const [datas, setDatas] = useState<stageData[]>([]);
  const [search, setSearch] = useState("");
  const [page,setPage] = useState(0)
  const [totalPage,setTotalPage] = useState<number[]>([])

  //delete data
  const [deleteEnable, setDeleteEnable] = useState(false)
  const [deleteId, setDeleteId] = useState("")


  //edit data 
  const [editEnable,setEditEnable] = useState(false)
  const [editId,setEditId] = useState("")

  const fetchStage = async () => {
    try {
      const data = await fetchStageDataAPI(search,page);
      console.log(data)
      setDatas(data.data);
      let x = []
      for(let i=0;i<data.totalPage;i++){
         x.push(i)
      }
      setTotalPage(x)
      
    } catch (error) {
      console.error("Error fetching stage data:", error);
      toast.error("Failed to fetch stage data.");
    }
  };

  useEffect(() => {
    fetchStage();
  }, [page,search]);

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
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4 w-[10%]">SL NO</th>
                <th className="px-6 py-4 w-[25%]">Project Name</th>
                <th className="px-6 py-4 w-[20%]">Start Date</th>
                <th className="px-6 py-4 w-[20%]">End Date</th>
                <th className="px-6 py-4 w-[25%] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {datas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400 text-sm font-medium">
                    No stages available. Click "Add Stage" to create one.
                  </td>
                </tr>
              ) : (
                datas.map((element, index) => (
                  <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-200 text-center">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-100">{element.project_name}</td>
                    <td className="px-6 py-4 text-gray-100">
                     {element.start_date}
                    </td>
                    <td className="px-6 py-4 text-gray-100">
                      {element.end_date}
                    </td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      <button
                        type="button"
                        className="text-teal-400 hover:text-teal-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Edit stage for ${ element.project_name }`}
                        onClick={() => {
                         setEditEnable(true)
                         setEditId(element._id)
                        }}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Delete stage for ${ element.project_name }`}
                        onClick={() => {
                          setDeleteEnable(true)
                          setDeleteId(element._id)
                        }}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
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
            onDeleteSuccess={ fetchStage }
          />
          <EditStage
          editEnable={editEnable}
          setEditEnable ={setEditEnable}
          editId ={editId}
          onEditSuccess={fetchStage}
           />
        </div>
      </div>
    </div>
  );
}

export default ListStage;