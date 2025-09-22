import { useEffect, useState } from "react";
import EditProject from "./ProjectEdit";
import ChangeStatus from "./Status";
import { deleteProjectData, projectListData } from "../../../api/project";
import type { ProjectType } from "../../../ApiInterface/project.interface";
import ReUsableTable from "../../../components/ReUsableComponents/ReUsableTable";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";




function Project() {
  const [projectList, setProjectList] = useState<ProjectType[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0)
  const [totalPage, setTotal] = useState(0)


  // delete
  const [deleteEnable, setDeleteEnable] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // edit

  const [editEnable, setEditEnable] = useState(false);
  const [editData, setEditData] = useState<ProjectType>({
    _id: "", project_name: "", address: "", mobile_number: "", email: "", description: "",
    area: 0, lat: 0, long: 0, userDetails: { _id: "", username: "", email: "", phone: 0 }, status: "",cost:0,floor:0,project_type:""
  })


  // change
  const [changeProjectId, setChangeProjectId] = useState("");
  const [changeStatus, setChangeStatus] = useState("");
  const [changeEnable, setChangeEnable] = useState(false);

  const fetchData = async () => {
    const response = await projectListData(page, search)
    setProjectList(response.data.data);
    setTotal(Math.ceil(response.data.totalPage))
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [page, search]);


  const heading = ["Sl No", "Project Name", "Client Name", "Status", "Action"];
  const dataKey = ["project_name", "email", "status"] as (keyof ProjectType)[];

  const renderCell = (key: keyof ProjectType, value: any, item: ProjectType) => {
    if (key === "email") {
      return (
        <span className="text-gray-200">{item.userDetails.username}</span>
      );
    }
    if (key === "status") {
      return(<td className="px-6 py-4">
        {item.status === "completed" ? (
          <p className="text-gray-200 capitalize">{item.status}</p>
        ) : (
          <select
            aria-label={`Select status for ${ item.project_name }`}
            id={`status-${ item._id }`}
            defaultValue={item.status}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium"
            onChange={(e) => {
              setChangeProjectId(item._id);
              setChangeStatus(e.target.value);
              setChangeEnable(true);
            }}
          >
            <option value={item.status} className="capitalize">
              {item.status}
            </option>
            {item.status === "pending" &&
              ["completed"].map((value) => (
                <option key={value} value={value} className="capitalize">
                  {value}
                </option>
              ))}
            {item.status === "processing" &&
              ["completed"].map((value) => (
                <option key={value} value={value} className="capitalize">
                  {value}
                </option>
              ))}
          </select>
        )}
      </td>)
    }
    return value;
  };


  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="w-full sm:w-1/2">
            <label htmlFor="search" className="sr-only">
              Search project
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search with project name or client name"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-700/50">

          <ReUsableTable<ProjectType>
            data={projectList}
            dataKey={dataKey}
            heading={heading}
            page={page}
            setDeleteEnable={setDeleteEnable}
            setDeleteId={setDeleteId}
            setEditData={setEditData}
            setEditEnable={setEditEnable}
            renderCell={renderCell}
          />

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPage }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
        ${ page === i
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-gray-700 text-gray-300 hover:bg-teal-500 hover:text-white' }
      `}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>


      <ChangeStatus
        project_id={changeProjectId}
        status={changeStatus}
        enable={changeEnable}
        setEnable={setChangeEnable}
        onChangeSuccess={fetchData}
      />

      <EditProject
        editData={editData}
        editEnable={editEnable}
        setEnableEdit={setEditEnable}
        onEditSuccess={fetchData}
      />

      <ReUsableDeleteModal
        enable={deleteEnable}
        deleteId={deleteId}
        setEnable={setDeleteEnable}
        onDeleteSuccess={fetchData}
        api={deleteProjectData}
        deleteItem="Project"
      />
    </div>


  );
}

export default Project;