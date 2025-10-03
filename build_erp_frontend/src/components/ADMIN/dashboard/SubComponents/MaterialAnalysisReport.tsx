import { downloadPDF } from "../../../../api/downloadPDF";

type reportData = {
   project_name: string;
   budgeted_cost: number;
   actual_expense: number;
};

type prop = {
   Data: reportData[]
   total: number[]
   setMaterialPage: React.Dispatch<React.SetStateAction<number>>
   materialPage: number
   heading: string
}

function MaterialLabourAnalysis({ Data, total, setMaterialPage, materialPage, heading }: prop) {
   return (
      <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl shadow-lg border border-slate-700/50">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white border-b border-slate-600 pb-3 tracking-tight">
               {heading}
            </h2>
         </div>
         <div className="flex justify-end mb-4">
            <button
               onClick={() => downloadPDF(Data)}
               className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-200"
            >
               Download PDF
            </button>
         </div>
         <div className="overflow-x-auto">
            {Data.length === 0 ? (
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
                     {Data.map((element, index) => {
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
                  onClick={() => setMaterialPage((prev) => Math.max(prev - 1, 0))}
                  disabled={materialPage === 0}
                  className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  Previous
               </button>
               {total.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => setMaterialPage(index)}
                     className={`px-3 py-1 rounded-md transition-colors duration-200 ${ materialPage === index
                        ? "bg-teal-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-teal-500 hover:text-white"
                        }`}
                  >
                     {index + 1}
                  </button>
               ))}
               <button
                  onClick={() => setMaterialPage((prev) => Math.min(prev + 1, total.length - 1))}
                  disabled={materialPage === total.length - 1}
                  className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  Next
               </button>
            </div>
         )}
      </div>
   )
}

export default MaterialLabourAnalysis