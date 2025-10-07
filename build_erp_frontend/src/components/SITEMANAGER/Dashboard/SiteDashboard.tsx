import { getProjectWithCompletionRateApi } from "../../../api/Sitemanager/dashboard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import StockManagement from "./StockManagement";
import ProjectEstimationDetails from "./ProjectDetails";

type projectData = {
   _id: string
   project_name: string;
   start_date: Date;
   end_date: Date;
   completion_per: number;
};

function SiteDashboard() {
   const [projectList, setProjectList] = useState<projectData[]>([]);
   const [search, setSearch] = useState("");
   const [page, setPage] = useState(0);
   const [totalPages, setTotalPages] = useState(1);
   const [loading, setLoading] = useState(false);
   const [estimateOn, setEstimateOn] = useState(false)
   const [detailId, setDetailId] = useState("")
   const itemsPerPage = 5;
   const navigate = useNavigate();

   const fetchprojectWithCompletionPer = async () => {
      setLoading(true);
      try {
         const response = await getProjectWithCompletionRateApi({ page, search });
         if (response.success) {
            setProjectList(response.data.data);
            setTotalPages(response.data.totalPages);
         } else {
            toast.error(response.message);
         }
      } catch (error) {
         toast.error("Failed to fetch projects");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      const handler = setTimeout(() => {
         fetchprojectWithCompletionPer();
      }, 500);

      return () => clearTimeout(handler);
   }, [search, page]);

   return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">
         <div className="max-w-7xl mx-auto">
            <div className="mb-10">
               <h1 className="text-3xl font-bold mb-4 tracking-tight text-center text-gray-100">
                  Quick Links
               </h1>
               <div className="flex flex-wrap justify-center gap-4">
                  <button
                     onClick={() => navigate('/site/changepass')}
                     className="bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                     aria-label="Navigate to Change Password"
                  >
                     Change Password
                  </button>
                  <button
                     onClick={() => navigate('/site/stage-updation')}
                     className="bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                     aria-label="Navigate to Stage Updation"
                  >
                     Stage Updation
                  </button>
                  <button
                     onClick={() => navigate('/site/purchase')}
                     className="bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                     aria-label="Navigate to Add Purchase"
                  >
                     Add Purchase
                  </button>
                  <button
                     onClick={() => navigate('/site/transfer')}
                     className="bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                     aria-label="Navigate to Transfer Material"
                  >
                     Transfer Material
                  </button>
                  <button
                     onClick={() => navigate('/site/receive')}
                     className="bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                     aria-label="Navigate to Receive Material"
                  >
                     Receive Material
                  </button>
                  <button
                     onClick={() => navigate('/site/attendance')}
                     className="bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                     aria-label="Navigate to Labour Attendance"
                  >
                     Labour Attendance
                  </button>
                  <button
                     onClick={() => navigate('/site/chat')}
                     className="bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                     aria-label="Navigate to Chat"
                  >
                     Chat
                  </button>
               </div>
            </div>
            <h1 className="text-3xl font-bold mb-8 tracking-tight text-center">
               Project List
            </h1>

            <div className="mb-6 flex justify-center">
               <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                     setSearch(e.target.value);
                     setPage(0);
                  }}
                  placeholder="Search by project name..."
                  className="w-full max-w-md px-4 py-2 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={loading}
               />
            </div>

            {loading ? (
               <div className="col-span-full text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-600 flex items-center justify-center animate-pulse">
                     <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={1.5}
                           d="M4 5h16M4 12h16M4 18h16"
                        />
                     </svg>
                  </div>
                  <p className="text-gray-300">Loading projects...</p>
               </div>
            ) : projectList.length === 0 ? (
               <div className="col-span-full text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-600 flex items-center justify-center">
                     <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={1.5}
                           d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                     </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-3">
                     No Projects Available
                  </h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                     {search
                        ? "No projects match your search. Try a different query!"
                        : "No projects available at this time. Check back later!"}
                  </p>
               </div>
            ) : (
               <>
                  {/* Project Table */}
                  <div className="overflow-x-auto">
                     <table className="w-full bg-slate-700 rounded-lg shadow-lg">
                        <thead>
                           <tr className="bg-slate-600 text-gray-200 text-left">
                              <th className="py-3 px-4 font-medium">Sl No</th>
                              <th className="py-3 px-4 font-medium">Project Name</th>
                              <th className="py-3 px-4 font-medium">Start Date</th>
                              <th className="py-3 px-4 font-medium">End Date</th>
                              <th className="py-3 px-4 font-medium">Completion %</th>
                              <th className="py-3 px-4 font-medium">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {projectList.map((element, index) => (
                              <tr
                                 key={index}
                                 className="border-t border-slate-600 hover:bg-slate-600 transition-colors duration-200"
                              >
                                 <td className="py-3 px-4 text-gray-300">
                                    {page * itemsPerPage + index + 1}
                                 </td>
                                 <td className="py-3 px-4 text-gray-300">
                                    {element.project_name || "Unnamed Project"}
                                 </td>
                                 <td className="py-3 px-4 text-gray-300">
                                    {element.start_date
                                       ? new Date(element.start_date).toLocaleDateString()
                                       : "N/A"}
                                 </td>
                                 <td className="py-3 px-4 text-gray-300">
                                    {element.end_date
                                       ? new Date(element.end_date).toLocaleDateString()
                                       : "N/A"}
                                 </td>
                                 <td className="py-3 px-4 text-gray-300">
                                    <div className="flex items-center">
                                       <div className="w-24 bg-slate-600 rounded-full h-2">
                                          <div
                                             className={`bg-gradient-to-r from-green-400 to-teal-400 h-2 rounded-full transition-all duration-500 w-[${ element.completion_per }%]`}
                                          />
                                       </div>
                                       <span className="ml-2">{element.completion_per}%</span>
                                    </div>
                                 </td>
                                 <td className="py-3 px-4">
                                    <button
                                       onClick={() => {
                                          setDetailId(element._id)
                                          setEstimateOn(true)
                                       }}
                                       className="bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-1 px-3 rounded-lg hover:from-green-500 hover:to-teal-500 transition-colors duration-300"
                                       disabled={loading}
                                    >
                                       View Details
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>

                  {/* Pagination */}
                  {totalPages >= 1 && (
                     <div className="mt-6 flex justify-center items-center gap-4">
                        <button
                           onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                           disabled={page === 0 || loading}
                           className="px-4 py-2 bg-slate-600 text-white rounded-lg disabled:opacity-50 hover:bg-slate-500 transition-colors duration-200"
                        >
                           Previous
                        </button>
                        <span className="text-gray-300">
                           Page {page + 1} of {totalPages}
                        </span>
                        <button
                           onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                           disabled={page === totalPages - 1 || loading}
                           className="px-4 py-2 bg-slate-600 text-white rounded-lg disabled:opacity-50 hover:bg-slate-500 transition-colors duration-200"
                        >
                           Next
                        </button>
                     </div>
                  )}
               </>
            )}
         </div>
         <StockManagement />
         <ProjectEstimationDetails
            estimateOn={estimateOn}
            setEstimateOn={setEstimateOn}
            onSuccess={fetchprojectWithCompletionPer}
            projectId={detailId}
         />

      </div>
   );
}

export default SiteDashboard;