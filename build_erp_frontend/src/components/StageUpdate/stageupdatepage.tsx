import { useEffect, useState } from "react";
import { getProject } from "../../api/Admin/project";
import { toast } from "react-toastify";
import { getStage } from "../../api/Sitemanager/stageStatus";
import ConfirmStatus from "./ConfirmStatus";

type Project = {
   _id: string;
   project_name: string;
};

type StageData = {
   _id: string;
   stage_name: string;
   start_date: string;
   end_date: string;
   stage_amount: number;
   status: string;
   status_date: string;
};

function StageUpdatePage() {
   const [project, setProject] = useState<Project[]>([]);
   const [stage, setStage] = useState<StageData[]>([]);
   const [selectedProjectId, setSelectedProjectId] = useState("");

   //status change
   const [statusEnable,setStatusEnable] = useState(false)
   const [editStageId,setEditStage]  = useState("")
   const [newStatus,setNewStatus] = useState("")

   const fetchProject = async () => {
      try {
         const response = await getProject();
         setProject(response);
      } catch (error) {
         console.error("Error fetching projects:", error);
         toast.error("Failed to fetch projects.");
      }
   };

   const fetchStage = async (projectId: string):Promise<void> => {
      try {
         const response = await getStage(projectId);
         if (response.success) {
            setStage(response.data.message);
         } else {
            toast.error(response.message);
         }
      } catch (error) {
         console.error("Error fetching stage data:", error);
         toast.error("Fetching stage data failed.");
      }
   };

   useEffect(() => {
      fetchProject();
   }, []);

   const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const [date] = dateString.split("T");
      const [year, month, day] = date.split("-");
      return `${ day }-${ month }-${ year }`;
   };


   return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
         <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-100 mb-6 text-center">Stage Status Update</h1>
            <div className="mb-8">
               <label htmlFor="projectSelect" className="block text-sm font-medium text-gray-200 mb-1">
                  Select Project
               </label>
               <select
                  id="projectSelect"
                  aria-label="Select a project"
                  className="w-full sm:w-96 px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                  onChange={(e) => {
                     setSelectedProjectId(e.target.value);
                     if (e.target.value) {
                        fetchStage(e.target.value);
                     } else {
                        setStage([]);
                     }
                  }}
                  value={selectedProjectId}
               >
                  <option value="">Select Project</option>
                  {project.map((element) => (
                     <option key={element._id} value={element._id}>
                        {element.project_name}
                     </option>
                  ))}
               </select>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-700/50">
               <table className="min-w-full text-sm text-left bg-gray-800/50">
                  <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
                     <tr>
                        <th className="px-6 py-4 w-[8%]">SL NO</th>
                        <th className="px-6 py-4 w-[20%]">Stage Name</th>
                        <th className="px-6 py-4 w-[15%]">Start Date</th>
                        <th className="px-6 py-4 w-[15%]">End Date</th>
                        <th className="px-6 py-4 w-[15%]">Stage Amount</th>
                        <th className="px-6 py-4 w-[15%]">Last Updated</th>
                        <th className="px-6 py-4 w-[12%]">Status</th>
                        <th className="px-6 py-4 w-[15%] text-center">Upload Image</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                     {stage.length === 0 ? (
                        <tr>
                           <td colSpan={8} className="text-center py-8 text-gray-400 text-sm font-medium">
                              No stages available. Select a project to view stages.
                           </td>
                        </tr>
                     ) : (
                        stage.map((element, index) => (
                           <tr key={element._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                              <td className="px-6 py-4 font-medium text-gray-200 text-center">{index + 1}</td>
                              <td className="px-6 py-4 text-gray-100">{element.stage_name}</td>
                              <td className="px-6 py-4 text-gray-100">{formatDate(element.start_date)}</td>
                              <td className="px-6 py-4 text-gray-100">{formatDate(element.end_date)}</td>
                              <td className="px-6 py-4 text-gray-100">₹{element.stage_amount.toLocaleString()}</td>
                              <td className="px-6 py-4 text-gray-100">{formatDate(element.status_date)}</td>
                              <td className="px-6 py-4">
                                 <select
                                    aria-label={`Select status for ${ element.stage_name }`}
                                    id={`status-${ element._id }`}
                                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 text-sm font-medium"
                                    value={element.status}
                                    onChange={(e) =>{
                                       setStatusEnable(true)
                                       setEditStage(element._id)
                                       setNewStatus(e.target.value)
                                    }}
                                 >
                                    <option value={element.status} className="capitalize">
                                       {element.status}
                                    </option>
                                    {element.status !== "completed" && element.status !== "processing" && (
                                       <>
                                          <option value="processing" className="capitalize">
                                             Processing
                                          </option>
                                          <option value="completed" className="capitalize">
                                             Completed
                                          </option>
                                       </>
                                    )}
                                    {element.status === "processing" && (
                                       <option value="completed" className="capitalize">
                                          Completed
                                       </option>
                                    )}
                                 </select>
                              </td>
                              <td className="px-6 py-4 text-center">
                                 <button
                                    type="button"
                                    className="text-teal-400 hover:text-teal-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200 text-sm font-medium"
                                    onClick={() => toast.info("Image view/upload functionality to be implemented.")}
                                 >
                                    View
                                 </button>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
               <ConfirmStatus
               statusEnable={statusEnable}
               editStageId={editStageId}
               newStatus={newStatus}
               setStatusEnable={setStatusEnable}
               onSuccess = {fetchProject}
               onstatusSuccess={()=>fetchStage(selectedProjectId)}
               selectedProjectId ={selectedProjectId}
                />
            </div>
         </div>
      </div>
   );
}

export default StageUpdatePage;