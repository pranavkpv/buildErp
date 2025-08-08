import { useEffect, useState } from "react";
import ProjectAdd from "./ProjectAdd";
import DeleteProject from "./ProjectDelete";
import EditProject from "./ProjectEdit";
import ChangeStatus from "./Status";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { projectListData } from "../../../api/Admin/project";

type ProjectType = {
  _id: string;
  project_name: string;
  address: string;
  mobile_number: string;
  email: string;
  description: string;
  area: number;
  userDetails: {
    _id: string;
    username: string;
    email?: string;
    phone?: number;
  }[];
  status: string;
};

function Project() {
  const [projectList, setProjectList] = useState<ProjectType[]>([]);
  const [search, setSearch] = useState("");
  const [addEnable, setAddEnable] = useState(false);
  const [page, setPage] = useState(0)
  const [totalPage, setTotal] = useState(0)


  // delete
  const [deleteEnable, setDeleteEnable] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // edit
  const [editProject, setEditProject] = useState("");
  const [editUserId, setEditUserId] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editArea, setEditArea] = useState<number>(0);
  const [editEnable, setEditEnable] = useState(false);
  const [editProjectId, setEditProjectId] = useState("");


  // change
  const [changeProjectId, setChangeProjectId] = useState("");
  const [changeStatus, setChangeStatus] = useState("");
  const [changeEnable, setChangeEnable] = useState(false);

  const fetchData = async () => {
      const data = await projectListData(page,search)
      setProjectList(data.data);
      setTotal(Math.ceil(data.totalPage)/5 )
  };

  useEffect(() => {
    fetchData();
  }, [page,search]);

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
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            onClick={() => setAddEnable(true)}
          >
            + Add Project
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">SL No</th>
                <th className="px-6 py-4">Project Name</th>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {projectList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400 text-sm font-medium">
                    No Projects Found.
                  </td>
                </tr>
              ) : (
                projectList.map((element, index) => (
                    <tr key={element._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="px-6 py-4 font-medium text-gray-200">{(index + 1)+(page*5)}</td>
                      <td className="px-6 py-4 text-gray-200">{element.project_name}</td>
                      <td className="px-6 py-4 text-gray-200">{element.userDetails[0]?.username}</td>
                      <td className="px-6 py-4">
                        {element.status === "completed" ? (
                          <p className="text-gray-200 capitalize">{element.status}</p>
                        ) : (
                          <select
                            aria-label={`Select status for ${ element.project_name }`}
                            id={`status-${ element._id }`}
                            defaultValue={element.status}
                            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium"
                            onChange={(e) => {
                              setChangeProjectId(element._id);
                              setChangeStatus(e.target.value);
                              setChangeEnable(true);
                            }}
                          >
                            <option value={element.status} className="capitalize">
                              {element.status}
                            </option>
                            {element.status === "pending" &&
                              ["processing", "completed"].map((value) => (
                                <option key={value} value={value} className="capitalize">
                                  {value}
                                </option>
                              ))}
                            {element.status === "processing" &&
                              ["completed"].map((value) => (
                                <option key={value} value={value} className="capitalize">
                                  {value}
                                </option>
                              ))}
                          </select>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center space-x-3">
                        <button
                          onClick={() => {
                            setEditProject(element.project_name);
                            setEditUserId(element.userDetails[0]?._id || "");
                            setEditUserName(element.userDetails[0]?.username || "");
                            setEditAddress(element.address);
                            setEditEmail(element.email);
                            setEditPhone(element.mobile_number);
                            setEditDescription(element.description);
                            setEditArea(element.area);
                            setEditEnable(true);
                            setEditProjectId(element._id);
                          }}
                          className="text-yellow-400 hover:text-yellow-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                          aria-label={`Edit project ${ element.project_name }`}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteEnable(true);
                            setDeleteId(element._id);
                          }}
                          className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                          aria-label={`Delete project ${ element.project_name }`}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
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


          <ProjectAdd enableAdd={addEnable} setEnableAdd={setAddEnable} onAddSuccess={fetchData} />
        </div>


        <ChangeStatus
          project_id={changeProjectId}
          status={changeStatus}
          enable={changeEnable}
          setEnable={setChangeEnable}
          onChangeSuccess={fetchData}
        />

        <EditProject
          editProject={editProject}
          editUserId={editUserId}
          edituserName={editUserName}
          editAddress={editAddress}
          editEmail={editEmail}
          editPhone={editPhone}
          editDescription={editDescription}
          editArea={editArea}
          editEnable={editEnable}
          setEnableEdit={setEditEnable}
          onEditSuccess={fetchData}
          editProjectId={editProjectId}
        />

        <DeleteProject
          enable={deleteEnable}
          deleteId={deleteId}
          setEnable={setDeleteEnable}
          onDeleteSuccess={fetchData}
        />
      </div>
    </div>


  );
}

export default Project;