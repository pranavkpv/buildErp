import { useEffect, useState } from "react";
import AddEstimation from "./AddEstimation";
import { PencilSquareIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import DeleteEstimation from "./DeleteEstimation";
import UploadConfirm from "./Uploadconfirm";
import EditEstimation from "./EditEstimation";
import { fetChEstimation } from "../../../api/Admin/Estimation";

type project = {
   project_name: string;
   expected_image: string;
};

type specdata = {
   project_id: string;
   projectObjectId: string;
   budgeted_cost: number;
   projectDetails: project;
};

function ListEstimation() {
   const [addEnable, setAddEnable] = useState(false);
   const [projectIds, setProjectIds] = useState<string[]>([]);
   const [data, setData] = useState<specdata[]>([]);
   const [search, setSearch] = useState("");
   const [page, setPage] = useState(0)
   const [total, setTotal] = useState<number[]>([])

   const [deleteEnable, setdeleteEnable] = useState(false);
   const [deleteProjectId, setDeleteProjectId] = useState("");

   // Upload image
   const [file, setFile] = useState<File | null>(null);
   const [uploadEnable, setUploadEnable] = useState(false);
   const [uploadProjectId, setUploadProjectId] = useState("");

   //edit estimation
   const [editEnable,setEditEnable] = useState(false)
   const [editProjectId,setEditProjectId] = useState("")

   const fetchData = async () => {
         const response = await fetChEstimation(search, page);
         setData(response.data);
         const projects = response.data.map((element: specdata) => element.projectObjectId);
         let x = []
         for (let i = 0; i < response.totalPage; i++) {
            x.push(i)
         }
         setTotal(x)
         setProjectIds(projects);
   };

   useEffect(() => {
      fetchData();
   }, [page, search]);

   return (
      <div className="min-h-screen bg-gray-900 p-6 sm:p-8">
         <div className="max-w-6xl mx-auto bg-gray-800/30 rounded-2xl shadow-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
               <h1 className="text-3xl font-bold text-gray-100 tracking-tight">Estimation</h1>
               <div className="flex w-full sm:w-auto gap-4">
                  <div className="w-full sm:w-80">
                     <label htmlFor="search" className="sr-only">
                        Search project
                     </label>
                     <input
                        id="search"
                        type="text"
                        placeholder="Search with project name"
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                     />
                  </div>
                  <button
                     onClick={() => setAddEnable(true)}
                     type="button"
                     className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold text-sm flex items-center gap-2"
                  >
                     <PlusCircleIcon className="h-5 w-5" /> Add Estimation
                  </button>
               </div>
            </div>

            <AddEstimation
               addEnable={addEnable}
               setAddEnable={setAddEnable}
               anAddSuccess={fetchData}
               projectIds={projectIds}
            />

            <div className="overflow-x-auto rounded-xl border border-gray-700/50">
               <table className="min-w-full text-sm text-left bg-gray-800/50 rounded-xl">
                  <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider sticky top-0 z-10">
                     <tr>
                        <th className="px-6 py-4 w-[10%] text-center">SL NO</th>
                        <th className="px-6 py-4 w-[25%]">Project Name</th>
                        <th className="px-6 py-4 w-[20%]">Budgeted Amount</th>
                        <th className="px-6 py-4 w-[25%]">Estimated Image</th>
                        <th className="px-6 py-4 w-[20%] text-center">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                     {data.length === 0 ? (
                        <tr>
                           <td colSpan={5} className="text-center py-12 text-gray-400 text-base font-medium">
                              No estimations available. Click "Add Estimation" to create one.
                           </td>
                        </tr>
                     ) : (
                        data.map((element, index) => (
                           <tr key={element.projectObjectId} className="hover:bg-gray-700/50 transition-colors duration-200">
                              <td className="px-6 py-4 font-medium text-gray-200 text-center">{index + 1}</td>
                              <td className="px-6 py-4 text-gray-100">{element.projectDetails.project_name}</td>
                              <td className="px-6 py-4 text-gray-100">₹{element.budgeted_cost.toLocaleString()}</td>
                              <td className="px-6 py-4 flex flex-col items-start gap-3">
                                 <div className="w-full">
                                    <label htmlFor={`file-upload-${ element.projectObjectId }`} className="sr-only">
                                       Upload estimated image for {element.projectDetails.project_name}
                                    </label>
                                    <input
                                       id={`file-upload-${ element.projectObjectId }`}
                                       type="file"
                                       accept="image/*"
                                       className="w-30 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-teal-500 file:text-white file:hover:bg-teal-600"
                                       onChange={(e) => {
                                          if (e.target.files && e.target.files.length > 0) {
                                             setFile(e.target.files[0]);
                                             setUploadEnable(true);
                                             setUploadProjectId(element.projectObjectId);
                                          }
                                       }}
                                    />
                                 </div>
                                 {element.projectDetails.expected_image && (
                                    <img
                                       src={element.projectDetails.expected_image}
                                       alt={`Estimated for ${ element.projectDetails.project_name }`}
                                       className="h-16 w-16 object-cover rounded-md border border-gray-600 shadow-sm"
                                    />
                                 )}
                              </td>
                              <td>
                                 <td className="px-6 py-4 text-center flex justify-center gap-3">
                                    <button
                                       type="button"
                                       className="text-teal-400 hover:text-teal-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                       aria-label={`Edit estimation for ${ element.projectDetails.project_name }`}
                                       onClick={() =>{
                                          setEditEnable(true)
                                          setEditProjectId(element.projectObjectId)
                                       }}
                                    >
                                       <PencilSquareIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                       type="button"
                                       className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                                       aria-label={`Delete estimation for ${ element.projectDetails.project_name }`}
                                       onClick={() => {
                                          setdeleteEnable(true);
                                          setDeleteProjectId(element.projectObjectId);
                                       }}
                                    >
                                       <TrashIcon className="h-5 w-5" />
                                    </button>
                                 </td>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
               <div className="flex justify-center items-center gap-2 p-4 bg-gray-800/50 rounded-b-xl border-t border-gray-700/50">
                  {total.map((element) => (
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
            </div>

            <DeleteEstimation
               deleteEnable={deleteEnable}
               setdeleteEnable={setdeleteEnable}
               projectId={deleteProjectId}
               onDeleteSuccess={fetchData}
            />

            <UploadConfirm
               file={file}
               uploadEnable={uploadEnable}
               setUploadEnable={setUploadEnable}
               setFile={setFile}
               uploadProjectId={uploadProjectId}
               uploadSuccess={fetchData}
            />
            <EditEstimation
            editEnable={editEnable}
            setEditEnable={setEditEnable}
            anEditSuccess={fetchData}
            projectIds={projectIds}
            editProjectId={editProjectId}
             />
         </div>
      </div>
   );
}

export default ListEstimation;