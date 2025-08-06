import { fetchBudgetAndActual } from "../../../../api/Admin/dashboard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type reportData = {
   project_name: string;
   budgeted_cost: number;
   actual_expense: number;
};

function BudgetVsActual() {
   const [data, setData] = useState<reportData[]>([]);
   const [total, setTotal] = useState<number[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [page, setPage] = useState(0);
   const [search, setSearch] = useState("");

   const fetchBugetAndActual = async () => {
      const response = await fetchBudgetAndActual(search, page);
      if (response.success) {
         setData(response.data);
         let sample = [];
         for (let i = 0; i < response.totalPage; i++) {
            sample.push(0);
         }
         setTotal(sample);
         setIsLoading(false)
      } else {
         toast.error(response.message);
      }
   };

   useEffect(() => {
      fetchBugetAndActual();
   }, [search, page]);

   return (
      <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl shadow-lg border border-slate-700/50">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white border-b border-slate-600 pb-3 tracking-tight">
               Budget vs Actual Report
            </h2>
            <div className="relative">
               <input
                  type="text"
                  placeholder="Search project name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 py-2 px-4 pl-10 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
               />
               <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
               </svg>
            </div>
         </div>

         <div className="overflow-x-auto">
            {isLoading ? (
               <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
                  <p className="mt-2 text-slate-400">Loading data...</p>
               </div>
            ) : data.length === 0 ? (
               <div className="text-center py-12 text-slate-400">
                  <p className="text-lg font-medium">No data available</p>
                  <p className="text-sm">Please check back later or add new projects.</p>
               </div>
            ) : (
               <table className="w-full border-collapse">
                  <thead>
                     <tr className="bg-slate-800/70 text-slate-300 uppercase text-xs font-semibold tracking-wider">
                        <th className="py-4 px-6 text-left">SL No</th>
                        <th className="py-4 px-6 text-left">Project Name</th>
                        <th className="py-4 px-6 text-right">Budgeted Cost</th>
                        <th className="py-4 px-6 text-right">Actual Expense</th>
                        <th className="py-4 px-6 text-right">Variance</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                     {data.map((element, index) => {
                        const variance = element.budgeted_cost - element.actual_expense;
                        return (
                           <tr
                              key={index}
                              className="hover:bg-slate-700/50 transition-colors duration-150"
                           >
                              <td className="py-4 px-6 text-slate-400">{index + 1}</td>
                              <td className="py-4 px-6 text-white font-medium">{element.project_name}</td>
                              <td className="py-4 px-6 text-right text-white">
                                 ₹{element.budgeted_cost.toLocaleString()}
                              </td>
                              <td className="py-4 px-6 text-right text-white">
                                 ₹{element.actual_expense.toLocaleString()}
                              </td>
                              <td
                                 className={`py-4 px-6 text-right font-medium ${ variance >= 0 ? "text-orange-400" : "text-red-400"
                                    }`}
                              >
                                 ₹{Math.abs(variance).toLocaleString()}{" "}
                                 {variance >= 0 ? "(Under)" : "(Over)"}
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            )}
         </div>

         {total.length >= 1 && (
            <div className="mt-6 flex justify-center gap-2">
               <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                  className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  Previous
               </button>
               {total.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => setPage(index)}
                     className={`px-3 py-1 rounded-md transition-colors duration-200 ${ page === index
                        ? "bg-teal-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-teal-500 hover:text-white"
                        }`}
                  >
                     {index + 1}
                  </button>
               ))}
               <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, total.length - 1))}
                  disabled={page === total.length - 1}
                  className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  Next
               </button>
            </div>
         )}
      </div>
   );
}

export default BudgetVsActual;