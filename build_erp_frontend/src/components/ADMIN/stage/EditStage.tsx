import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { getStage } from "../../../api/Sitemanager/stageStatus";
import { getProject } from "../../../api/Admin/project";
import { editStageAPI, fetchBugetAPI, getStageInAdmin } from "../../../api/Admin/StageSetting";


type Project = {
   _id: string;
   project_name: string;
};

type stageProp = {
   editEnable: boolean;
   setEditEnable: React.Dispatch<React.SetStateAction<boolean>>;
   onEditSuccess: () => void
   editId: string
};

function EditStage({ editEnable, setEditEnable, editId, onEditSuccess }: stageProp) {
   if (!editEnable) return null;

   const [project, setProject] = useState<Project[]>([]);
   const [cost, setCost] = useState(0);
   const [projectId, setProjectId] = useState(editId);
   const [startDate, setStartDate] = useState("")
   const [endDate, setEndDate] = useState("")
   const [stages, setStages] = useState<{ stage_name: string; start_date: string; end_date: string; stage_percentage: number; stage_amount: number }[]>([]);

   const projectRef = useRef<HTMLParagraphElement>(null)
   const startRef = useRef<HTMLParagraphElement>(null)
   const endRef = useRef<HTMLParagraphElement>(null)

   const fetchStage = async (projectId: string): Promise<void> => {
         const response = await getStageInAdmin(projectId);
         if (response.success) {
             const updatedStage = []
            for (let element of response.data) {
               updatedStage.push({stage_name:element.stage_name,start_date:element.start_date.split("T")[0],end_date:element.end_date.split("T")[0],stage_percentage:element.stage_per,stage_amount:element.stage_amount})
            }
            setStages(updatedStage)
         } else {
            toast.error(response.message);
         }
   };


   const fetchProject = async () => {
         const response = await getProject();
         const filteredProject = response.data.find((element: any) => element._id == editId)
         setCost(filteredProject.budgeted_cost)
         setStartDate(filteredProject.start_date.split("T")[0])
         setEndDate(filteredProject.end_date.split("T")[0])
         setProject(response.data);
   };

   const fetchBudgetedCost = async (projectId: string) => {
         const data = await fetchBugetAPI(projectId);
         if (data.success) {
            setCost(data.message);
         } else {
            setProjectId("")
            setCost(0)
            toast.error(data.message);
         }
   };

   useEffect(() => {
      fetchProject();
   },[editId]);
   useEffect(()=>{
      fetchStage(editId);
   },[cost])

   const addStageRow = () => {
      setStages([...stages, { stage_name: "", start_date: "", end_date: "", stage_percentage: 0, stage_amount: 0 }]);
   };

   const saveStageFun = async () => {
         if (projectId == "") {
            projectRef.current ? projectRef.current.innerText = "project name is required" : ""
            return
         } else {
            projectRef.current ? projectRef.current.innerText = "" : "project name is required"
         }

         if (startDate == "") {
            startRef.current ? startRef.current.innerText = "start date is required" : ""
            return
         } else {
            startRef.current ? startRef.current.innerText = "" : "start date is required"
         }
         if (endDate == "") {
            endRef.current ? endRef.current.innerText = "end date is required" : ""
            return
         } else {
            endRef.current ? endRef.current.innerText = "" : "end date is required"
         }

         let sum = 0
         for (let element of stages) {
            sum += element.stage_amount
            if (element.stage_name.trim() == "") {
               toast.warning("should enter stage name")
               return
            }
            if (element.start_date == "") {
               toast.warning("should enter start date of stage")
               return
            }
            if (element.end_date == "") {
               toast.warning("should enter end date of stage")
               return
            }
            if (element.stage_amount == 0) {
               toast.warning("stage amount must be greater than 0")
               return
            }
         }
         if (sum != cost) {
            toast.warning("Must set all stages in corresponding project")
            return
         }

         const data = await editStageAPI(stages, projectId, startDate, endDate, cost)
         if (data.success) {
            toast.success(data.message)
            setEditEnable(false)
            onEditSuccess()
         } else {
            toast.error(data.message)
         }
   }

   return (
      <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6">
         <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-5xl max-h-[95vh] overflow-y-auto border border-gray-700/50">
            <h1 className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4">
               Stage Setting
            </h1>

            <div className="grid grid-cols-1 gap-6 mb-6">
               {/* Project Selection */}
               <div>
                  <label htmlFor="projectSelect" className="block text-sm font-medium text-gray-200 mb-1">
                     Project
                  </label>
                  <select
                     id="projectSelect"
                     aria-label="Select a project"
                     className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                     onChange={(e) => {
                        setProjectId(e.target.value);
                        if (e.target.value) {
                           fetchBudgetedCost(e.target.value);
                        }
                     }}
                     value={projectId}
                  >

                     <option value="">Select Project</option>
                     {project.map((element) => (
                        <option key={element._id} value={element._id}>
                           {element.project_name}
                        </option>
                     ))}
                  </select>
                  <p ref={projectRef}></p>
               </div>

               {/* Budgeted Cost */}
               <div>
                  <label htmlFor="budgetedCost" className="block text-sm font-medium text-gray-200 mb-1">
                     Budgeted Cost
                  </label>
                  <input
                     id="budgetedCost"
                     type="text"
                     placeholder="Budgeted cost"
                     className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 text-sm"
                     value={cost === 0 ? "" : cost.toLocaleString()}
                     readOnly
                  />
               </div>

               {/* Start Date */}
               <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-200 mb-1">
                     Start Date
                  </label>
                  <input
                  value={startDate}
                     onChange={(e) => setStartDate(e.target.value)}
                     id="startDate"
                     type="date"
                     className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                     placeholder="Start date"
                  />
                  <p ref={startRef}></p>
               </div>

               {/* End Date */}
               <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-200 mb-1">
                     End Date
                  </label>
                  <input
                  value={endDate}
                     onChange={(e) => {
                        if (e.target.value < startDate) {
                           toast.warning("end date must be greater than start date")
                           e.target.value = ""
                           return
                        } else {
                           setEndDate(e.target.value)
                        }
                     }}
                     id="endDate"
                     type="date"
                     className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                     placeholder="End date"
                  />
                  <p ref={endRef}></p>
               </div>
            </div>

            {/* Stages Section */}
            <div className="mb-4 pt-4 border-t border-gray-700">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-100">Stages</h3>
                  <button
                     onClick={addStageRow}
                     type="button"
                     className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2"
                  >
                     <PlusCircleIcon className="h-5 w-5" /> Add Stage
                  </button>
               </div>

               <div className="overflow-x-auto rounded-xl border border-gray-700/50">
                  <table className="min-w-full text-sm text-left bg-gray-800/50">
                     <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
                        <tr>
                           <th className="px-6 py-4 w-[25%]">Stage Name</th>
                           <th className="px-6 py-4 w-[20%]">Start Date</th>
                           <th className="px-6 py-4 w-[20%]">End Date</th>
                           <th className="px-6 py-4 w-[15%]">Stage %</th>
                           <th className="px-6 py-4 w-[20%]">Stage Amount</th>
                           <th className="px-6 py-4 w-[10%] text-center">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-700/50">
                        {stages.length === 0 ? (
                           <tr>
                              <td colSpan={6} className="text-center py-8 text-gray-400 text-sm font-medium">
                                 Click "Add Stage" to add a stage.
                              </td>
                           </tr>
                        ) : (
                           stages.map((stage, index) => (
                              <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-150">
                                 <td className="px-6 py-4 w-[25%]">
                                    <input
                                       type="text"
                                       className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                                       placeholder="Enter stage name"
                                       value={stage.stage_name}
                                       onChange={(e) => {
                                          const updatedStages = [...stages];
                                          updatedStages[index].stage_name = e.target.value;
                                          setStages(updatedStages);
                                       }}
                                    />
                                 </td>
                                 <td className="px-6 py-4 w-[20%]">
                                    <input placeholder="enter startdate"
                                       type="date"
                                       className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                                       value={stage.start_date}
                                       onChange={(e) => {
                                          const updatedStages = [...stages];
                                          updatedStages[index].start_date = e.target.value;
                                          setStages(updatedStages);
                                       }}
                                    />
                                 </td>
                                 <td className="px-6 py-4 w-[20%]">
                                    <input placeholder="enter end date"
                                       type="date"
                                       className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                                       value={stage.end_date}
                                       onChange={(e) => {
                                          const updatedStages = [...stages];
                                          if (e.target.value < updatedStages[index].start_date) {
                                             toast.warning("end date must be greater than start date")
                                             e.target.value = ""
                                             return
                                          }
                                          updatedStages[index].end_date = e.target.value;
                                          setStages(updatedStages);
                                       }}
                                    />
                                 </td>
                                 <td className="px-6 py-4 w-[15%]">
                                    <input
                                       type="number"
                                       className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                                       placeholder="Enter stage %"
                                       value={stage.stage_percentage === 0 ? "" : stage.stage_percentage}
                                       onChange={(e) => {
                                          const updatedStages = [...stages];
                                          updatedStages[index].stage_percentage = Number(e.target.value);
                                          updatedStages[index].stage_amount = (cost * Number(e.target.value)) / 100;
                                          setStages(updatedStages);
                                       }}
                                    />
                                 </td>
                                 <td className="px-6 py-4 w-[20%]">
                                    <input
                                       type="number"
                                       className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 text-sm"
                                       value={stage.stage_amount === 0 ? "" : stage.stage_amount}
                                       readOnly
                                       placeholder="Stage Amount"
                                    />
                                 </td>
                                 <td className="px-6 py-4 w-[10%] text-center">
                                    <button
                                       type="button"
                                       className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                                       aria-label="Delete stage row"
                                       onClick={() => {
                                          console.log("haiiii")
                                          const updatedStages = stages.filter((_, i) => i !== index);
                                          setStages(updatedStages);
                                       }}
                                    >
                                       <MinusCircleIcon className="h-5 w-5" />
                                    </button>
                                 </td>
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Total and Balance Amount */}
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-700">
               <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold text-gray-100">
                     Total Amount: ₹{stages.reduce((sum, stage) => sum + stage.stage_amount, 0).toLocaleString()}
                  </p>
                  <p className="text-lg font-semibold text-gray-100">
                     Balance Amount: ₹{(cost - stages.reduce((sum, stage) => sum + stage.stage_amount, 0)).toLocaleString()}
                  </p>
               </div>
               <div className="flex justify-end gap-4">
                  <button
                     type="button"
                     className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
                     onClick={() => setEditEnable(false)}
                  >
                     Cancel
                  </button>
                  <button
                     type="button"
                     className="bg-teal-500/90 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
                     onClick={saveStageFun}
                  >
                     Save
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default EditStage;