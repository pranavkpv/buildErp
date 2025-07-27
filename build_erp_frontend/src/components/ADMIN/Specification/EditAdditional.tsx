import { toast } from "react-toastify"
import { SaveSpec, UpdateSpec } from "../../../api/Admin/Spec"
import AppContext from "../../../Context/AppContext"
import React, { useContext, useEffect, useState } from "react"
type prop = {
   fetchSpecList: () => void
}

function EditAdditionalSpec({ fetchSpecList }: prop) {
   const {
      editId,
      editSpec_id,
      editSpec_name,
      editSpec_unit,
      editDescription,
      editAdditionalEnable,
      setEditAdditionalEnable,
      editlabourDetails,
      editMaterialDetails,
      editadditionalExpense_per,
      seteditadditionalExpense_per,
      editprofit_per,
      seteditprofit_per
   } = useContext(AppContext)
   if (!editAdditionalEnable) return null

   const [final, setFinal] = useState(0)

   useEffect(() => {
      const labourSum = editlabourDetails.reduce((sum, item) => sum + (item.daily_wage * item.numberoflabour), 0)
      const materialSum = editMaterialDetails.reduce((sum, item) => sum + (item.quantity * item.unit_rate), 0)
      setFinal(labourSum + materialSum)
   }, [editlabourDetails, editMaterialDetails])

   const SaveSpecData = async (e: React.FormEvent) => {
      e.preventDefault()
      const Response = await UpdateSpec(
         editId,
         editSpec_id,
         editSpec_name,
         editSpec_unit,
         editDescription,
         editMaterialDetails,
         editlabourDetails,
         editadditionalExpense_per,
         editprofit_per
      )
      if (Response.success) {
         toast.success(Response.message)
         setEditAdditionalEnable(false)
         fetchSpecList()
      } else {
         toast.error(Response.message)
      }
   }

   return (
      <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
         <div className="bg-gray-800/90 rounded-2xl p-6 sm:p-8 max-w-lg w-full mx-4 border border-gray-700/50 shadow-2xl">
            <h1 className="text-2xl font-semibold text-gray-100 mb-6">Add Additional Expenses</h1>
            <form onSubmit={SaveSpecData} className="space-y-4">
               <div>
                  <label htmlFor="finalAmount" className="block text-sm font-medium text-gray-300 mb-1">
                     Final Amount
                  </label>
                  <input
                     id="finalAmount"
                     type="text"
                     value={final.toFixed(2)}
                     readOnly
                     placeholder="Final Amount"
                     className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                  />
               </div>
               <div>
                  <label htmlFor="additionalExpensePer" className="block text-sm font-medium text-gray-300 mb-1">
                     Additional Expense (%)
                  </label>
                  <input
                     id="additionalExpensePer"
                     type="number"
                     placeholder="Enter additional expense percentage"
                     value={editadditionalExpense_per || ""}
                     onChange={(e) => seteditadditionalExpense_per(Number(e.target.value))}
                     className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                  />
               </div>
               <div>
                  <label htmlFor="additionalExpenseAmount" className="block text-sm font-medium text-gray-300 mb-1">
                     Additional Expense Amount
                  </label>
                  <input
                     id="additionalExpenseAmount"
                     type="text"
                     value={(final * (editadditionalExpense_per / 100)).toFixed(2)}
                     readOnly
                     placeholder="Additional expense amount"
                     className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                  />
               </div>
               <div>
                  <label htmlFor="profitPer" className="block text-sm font-medium text-gray-300 mb-1">
                     Profit (%)
                  </label>
                  <input
                     id="profitPer"
                     type="number"
                     placeholder="Enter profit percentage"
                     value={editprofit_per || ""}
                     onChange={(e) => seteditprofit_per(Number(e.target.value))}
                     className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                  />
               </div>
               <div>
                  <label htmlFor="profitAmount" className="block text-sm font-medium text-gray-300 mb-1">
                     Profit Amount
                  </label>
                  <input
                     id="profitAmount"
                     type="text"
                     value={(final * (editprofit_per / 100)).toFixed(2)}
                     readOnly
                     placeholder="Profit amount"
                     className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                  />
               </div>
               <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                  <button
                     type="button"
                     onClick={() => setEditAdditionalEnable(false)}
                     className="w-full sm:w-auto bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
                  >
                     Save
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default EditAdditionalSpec