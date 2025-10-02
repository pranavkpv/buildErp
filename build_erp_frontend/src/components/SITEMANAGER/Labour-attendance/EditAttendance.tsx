import { MinusCircleIcon, PlusCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { editAttendanceAPI, getAttendanceBYIdAPI, labourDataFetchInsitemanager } from "../../../api/Sitemanager/attendance";
import { getSitemanagersProject } from "../../../api/Sitemanager/profile";
import Loading from "../../../components/Loading";


type Project = {
   _id: string;
   project_name: string;
};
type editProp = {
   editId: string
   editEnable: boolean
   setEditEnable: React.Dispatch<React.SetStateAction<boolean>>
   onEditSuccess: () => void
}
type labourtype = {
   labour_id: string
   daily_wage: number
   numberOflabour: number
}
type fetchtype = {
   _id: string
   project_id: string
   date: string
   labourDetails: labourtype[]

}

type Rowdata = {
   labour_type: string;
   wage: number;
   number: number;
   total: number;
};

type Labour = {
   _id: string;
   labour_type: string;
   daily_wage: string;
};

type JwtPayload = {
   userId: string;
   iat: number;
   exp: number;
};


function EditAttendance({ editId, editEnable, setEditEnable, onEditSuccess }: editProp) {
   if (!editEnable) return null
   const [data, setData] = useState<fetchtype | null>(null)
   const [projectError, setProjectError] = useState("");
   const [dateError, setDateError] = useState("");

   //edited data
   const [selectedDate, setSelectedDate] = useState("")
   const [selectedProject, setSelectedProject] = useState("")

   //fetch project
   const [project, setProject] = useState<Project[]>([])
   const [row, setRow] = useState<Rowdata[]>([]);

   //fetch labour
   const [labour, setLabour] = useState<Labour[]>([])
   const [loadOn, setLoadOn] = useState(false)

   const fetchLabour = async () => {
      const response = await labourDataFetchInsitemanager();
      setLabour(response.data);
   };

   const fetchAttendanceBYID = async () => {
      const result = await getAttendanceBYIdAPI(editId)
      setData(result.data)
   }

   const fetchProject = async () => {
      const token = localStorage.getItem("accessToken")
      if (!token) return
      const response = await getSitemanagersProject();
      setProject(response.data);
   };

   useEffect(() => {
      fetchAttendanceBYID();
      fetchProject()
      fetchLabour()
   }, []);


   useEffect(() => {
      if (data?.date) {
         setSelectedDate(data.date.toString().split("T")[0]);
      }
      if (data?.project_id) {
         setSelectedProject(data.project_id)
      }
      if (data?.labourDetails) {
         const sampleRow = []
         for (let item of data.labourDetails) {
            sampleRow.push({ labour_type: item.labour_id, wage: item.daily_wage, number: item.numberOflabour, total: item.daily_wage * item.numberOflabour })
         }
         setRow(sampleRow)
      }
   }, [data]);


   const setSalaryFun = (labourId: string, index: number) => {
      const selectedLabour = labour.find((element) => element._id === labourId);
      if (!selectedLabour) return;

      const salary = Number(selectedLabour.daily_wage);
      const updatedRow = [...row];
      updatedRow[index].labour_type = labourId;
      updatedRow[index].wage = salary;
      updatedRow[index].total = salary * updatedRow[index].number;
      setRow(updatedRow);
   };


   const editAttendanceFun = async () => {
      let hasError = false;

      if (!selectedProject) {
         setProjectError("Project must be selected.");
         hasError = true;
      } else {
         setProjectError("");
      }

      if (!selectedDate) {
         setDateError("Date must be selected.");
         hasError = true;
      } else {
         setDateError("");
      }

      if (row.some((element) => element.total === 0)) {
         toast.warning("One or more rows have a total value of 0. Please ensure all rows have valid data.");
         hasError = true;
      }

      if (hasError) return;
      setLoadOn(true)
      const response = await editAttendanceAPI(editId, selectedProject, selectedDate, row);
      setLoadOn(false)
      if (response.success) {
         toast.success(response.message);
         setEditEnable(false);
         onEditSuccess();
      } else {
         toast.error(response.message);
      }
   }


   return (
      <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6">
         <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-gray-700/50">
            <h1 className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4">
               Edit Attendance Mark Based on Project
            </h1>

            <div className="grid grid-cols-1 gap-6 mb-6">

               <div>
                  <label htmlFor="attendanceDate" className="block text-sm font-medium text-gray-200 mb-1">
                     Date
                  </label>
                  <input
                     id="attendanceDate"
                     type="date"
                     className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                     placeholder="Select date"
                     value={selectedDate}
                     onChange={(e) => setSelectedDate(e.target.value)}
                     min={new Date().toISOString().split("T")[0]}
                  />
                  {dateError && <p className="text-red-400 text-sm mt-1">{dateError}</p>}
               </div>

               {/* Project Selection */}
               <div>
                  <label htmlFor="projectSelect" className="block text-sm font-medium text-gray-200 mb-1">
                     Project
                  </label>
                  <select
                     id="projectSelect"
                     aria-label="Select a project"
                     className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                     value={selectedProject}
                     onChange={(e) => setSelectedProject(e.target.value)}
                  >
                     <option value="">Select Project</option>
                     {project.map((element) => (
                        <option key={element._id} value={element._id}>
                           {element.project_name}
                        </option>
                     ))}
                  </select>
                  {projectError && <p className="text-red-400 text-sm mt-1">{projectError}</p>}
               </div>
            </div>

            {/* Labour Rows Section */}
            <div className="mb-4 pt-4 border-t border-gray-700">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-100">Labour Details</h3>
                  <button
                     onClick={() => {
                        setRow([...row, { labour_type: "", wage: 0, number: 0, total: 0 }]);
                     }}
                     type="button"
                     className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2"
                  >
                     <PlusCircleIcon className="h-5 w-5" /> Add Labour Type
                  </button>
               </div>

               <div className="overflow-x-auto rounded-xl border border-gray-700/50">
                  <table className="min-w-full text-sm text-left bg-gray-800/50">
                     <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
                        <tr>
                           <th className="px-6 py-4 w-[8%]">SL NO</th>
                           <th className="px-6 py-4 w-[25%]">Labour Type</th>
                           <th className="px-6 py-4 w-[15%]">Wage</th>
                           <th className="px-6 py-4 w-[20%]">No. of Labour</th>
                           <th className="px-6 py-4 w=[20%]">Total</th>
                           <th className="px-6 py-4 w=[12%] text-center">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-700/50">
                        {row.length === 0 ? (
                           <tr>
                              <td colSpan={6} className="text-center py-8 text-gray-400 text-sm font-medium">
                                 Click "Add Labour Type" to add labour details.
                              </td>
                           </tr>
                        ) : (
                           row.map((element, index) => (
                              <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-150">
                                 <td className="px-6 py-4 font-medium text-gray-200 text-center">{index + 1}</td>
                                 <td className="px-6 py-4">
                                    <select
                                       aria-label="Select labour type"
                                       className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                                       value={element.labour_type}
                                       onChange={(e) => {
                                          for (let item of row) {
                                             if (item.labour_type === e.target.value && item.labour_type !== element.labour_type) {
                                                toast.error("Labour type already exists.");
                                                return;
                                             }
                                          }
                                          setSalaryFun(e.target.value, index);
                                       }}
                                    >
                                       <option value="">Select Labour Type</option>
                                       {labour.map((labourItem) => (
                                          <option key={labourItem._id} value={labourItem._id}>
                                             {labourItem.labour_type}
                                          </option>
                                       ))}
                                    </select>
                                 </td>
                                 <td className="px-6 py-4 text-gray-100">₹{element.wage.toLocaleString()}</td>
                                 <td className="px-6 py-4">
                                    <input
                                       type="number"
                                       className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                                       placeholder="Enter number"
                                       value={element.number === 0 ? "" : element.number}
                                       onChange={(e) => {
                                          const updatedRow = [...row];
                                          updatedRow[index].number = Number(e.target.value);
                                          updatedRow[index].total = element.wage * Number(e.target.value);
                                          setRow(updatedRow);
                                       }}
                                    />
                                 </td>
                                 <td className="px-6 py-4 text-gray-100">₹{element.total.toLocaleString()}</td>
                                 <td className="px-6 py-4 text-center">
                                    <button
                                       type="button"
                                       className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                                       aria-label="Delete labour row"
                                       onClick={() => {
                                          const updatedRow = row.filter((_, i) => i !== index);
                                          setRow(updatedRow);
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

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-700">
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
                  onClick={editAttendanceFun}
               >
                  Save
               </button>
            </div>
         </div>
         <Loading loadOn={loadOn} />
      </div>
   )
}

export default EditAttendance