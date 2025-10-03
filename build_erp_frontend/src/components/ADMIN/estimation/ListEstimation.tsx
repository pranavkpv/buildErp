import { useEffect, useState } from "react";
import AddEstimation from "./AddEstimation";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import EditEstimation from "./EditEstimation";
import { fetChEstimation } from "../../../api/Estimation";
import { EyeIcon, SendIcon } from "lucide-react";
import SendEstimation from "./SendEstimation";
import RejectView from "./RejectView";
import ProjectImageUpload from "./ProjectImageUpload";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../../components/Loading";

type project = {
   project_name: string;
   expected_image: string;
};

type specdata = {
   project_id: string;
   projectObjectId: string;
   budgeted_cost: number;
   reason: string
   projectDetails: project;
};

function ListEstimation() {
   const [addEnable, setAddEnable] = useState(false);
   const [projectIds, setProjectIds] = useState<string[]>([]);
   const [data, setData] = useState<specdata[]>([]);
   const [search, setSearch] = useState("");
   const [page, setPage] = useState(0)
   const [total, setTotal] = useState<number[]>([])

   const [sendEnable, setSendEnable] = useState(false);
   const [sendProjectId, setSendProjectId] = useState("");


   //edit estimation
   const [editEnable, setEditEnable] = useState(false)
   const [editProjectId, setEditProjectId] = useState("")

   const [viewRejectOn, setViewRejectOn] = useState(false)
   const [reason, setReason] = useState('')


   //image upload 
   const [imageEnable, setImageEnable] = useState(false)
   const [uploadProject, setUploadImage] = useState("")
   const [loadOn, setLoadOn] = useState(false)



   const fetchData = async () => {
      setLoadOn(true)
      const response = await fetChEstimation(search, page);
      setLoadOn(false)
      setData(response.data.data);
      const projects = response.data.data.map((element: specdata) => element.projectObjectId);
      let x = []
      for (let i = 0; i < response.data.totalPage; i++) {
         x.push(i)
      }
      setTotal(x)
      setProjectIds(projects);
   };

   useEffect(() => {
      const handler = setTimeout(() => {
         fetchData();
      }, 500);
      return () => {
         clearTimeout(handler);
      };
   }, [page, search]);

   return (
      <div className="min-h-screen bg-gray-900 p-6 sm:p-8">
         <div className="max-w-6xl mx-auto bg-gray-800/30 rounded-2xl shadow-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
               <h1 className="text-3xl font-bold text-gray-100 tracking-tight">Estimation</h1>
               <div className="flex w-full sm:w-auto gap-4">
                  <ReUsableSearch search={search} setSearch={setSearch} item="project" />
                  <ReUsableAddButton addFuntion={() => setAddEnable(true)} item="Estimation" />
               </div>
            </div>
            <Loading loadOn={loadOn} />
            <AddEstimation addEnable={addEnable} setAddEnable={setAddEnable} anAddSuccess={fetchData} projectIds={projectIds} />
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
                                 <button
                                    onClick={() => {
                                       setImageEnable(true);
                                       setUploadImage(element.project_id);
                                    }}
                                    className="bg-teal-500/90 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400"
                                 >
                                    Upload Estimated Image
                                 </button>
                              </td>
                              <td className="px-6 py-4 ">
                                 <button
                                    type="button"
                                    className="text-teal-400 hover:text-teal-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    aria-label={`Edit estimation for ${ element.projectDetails.project_name }`}
                                    onClick={() => {
                                       setEditEnable(true)
                                       setEditProjectId(element.projectObjectId)
                                    }}
                                 >
                                    <PencilSquareIcon className="h-5 w-5" />
                                 </button>
                                 <button
                                    type="button"
                                    className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    aria-label={`Send estimation for ${ element.projectDetails.project_name }`}
                                    onClick={() => {
                                       setSendEnable(true);
                                       setSendProjectId(element.projectObjectId);
                                    }}
                                 >
                                    <SendIcon className="h-5 w-5" />
                                 </button>
                                 <button
                                    type="button"
                                    className="text-blue-400 hover:text-blue-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    aria-label={`View rejection reason for ${ element.projectDetails.project_name }`}
                                    onClick={() => {
                                       setViewRejectOn(true)
                                       setReason(element.reason)
                                    }}
                                 >
                                    <EyeIcon className="h-5 w-5" />
                                 </button>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
               <ReUsablePagination page={page} setPage={setPage} totalPage={total.length} />
            </div>

            <SendEstimation sendEnable={sendEnable} setSendEnable={setSendEnable} projectId={sendProjectId} onSendSuccess={fetchData} />

            <EditEstimation editEnable={editEnable} setEditEnable={setEditEnable} anEditSuccess={fetchData} projectIds={projectIds} editProjectId={editProjectId} />

            <RejectView viewRejectOn={viewRejectOn} setViewRejectOn={setViewRejectOn} reason={reason} />

            <ProjectImageUpload setUploadEnable={setImageEnable} uploadEnable={imageEnable} uploadProjectId={uploadProject} />
         </div>
      </div>
   );
}

export default ListEstimation;