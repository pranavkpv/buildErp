import { getAdditionEstimationApi, getEstimationApi, getLabourEstimationApi, getmaterialEstimationApi } from "../../../api/Estimation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RejectModal from "./RejectModal";
import ReasonModal from "./ReasonModal";
import ApproveModal from "./ApproveModal";

interface prop {
   estimateOn: boolean
   setEstimateOn: React.Dispatch<React.SetStateAction<boolean>>;
   projectId: string
   onSuccess: () => void
}

interface specs {
   _id: string
   spec_name: string
   quantity: number
   unit_rate: number
   approvalStatus: boolean
}

interface materialSpec {
   _id: string
   material_name: string
   brand_name: string
   unit_name: string
   quantity: number
   unit_rate: number
}

interface labourSpec {
   _id: string
   labour_name: string
   numberoflabour: number
   daily_wage: number
}

interface additionSpec {
   additionalExpense_per: number
   additionalExpense_amount: number
   profit_per: number
   profit_amount: number
}

function EstimationDetails({ estimateOn, setEstimateOn, projectId, onSuccess }: prop) {
   if (!estimateOn) return null

   const [specData, setSpecData] = useState<specs[]>([])
   const [specmaterial, setSpecmaterial] = useState<materialSpec[]>([])
   const [specLabour, setSpecLabour] = useState<labourSpec[]>([])
   const [specAddition, setSpecAddition] = useState<additionSpec[]>([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   const [rejectOn, setRejectOn] = useState(false)
   const [approveOn, setApproveOn] = useState(false)
   const [reasonOn, setReasonOn] = useState(false)

   const fetchEstimation = async () => {
      const response = await getEstimationApi(projectId)
      if (response.success) {
         setSpecData(response.data)
      } else {
         throw new Error(response.message)
      }
   }

   const fetchmaterialEstimation = async () => {
      const response = await getmaterialEstimationApi(projectId)
      if (response.success) {
         setSpecmaterial(response.data)
      } else {
         throw new Error(response.message)
      }
   }

   const fetchLabourEstimation = async () => {
      const response = await getLabourEstimationApi(projectId)
      if (response.success) {
         setSpecLabour(response.data)
      } else {
         throw new Error(response.message)
      }
   }

   const fetchAdditionalEstimation = async () => {
      const response = await getAdditionEstimationApi(projectId)
      if (response.success) {
         setSpecAddition(response.data)
      } else {
         throw new Error(response.message)
      }
   }

   useEffect(() => {
      const fetchAllData = async () => {
         setLoading(true)
         setError(null)
         await Promise.all([
            fetchEstimation(),
            fetchmaterialEstimation(),
            fetchLabourEstimation(),
            fetchAdditionalEstimation()
         ])
         setLoading(false)
      }
      fetchAllData()
   }, [projectId])

   if (loading) {
      return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
               <p className="text-lg font-medium text-gray-800">Loading estimation data...</p>
            </div>
         </div>
      )
   }

   if (error) {
      return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
               <p className="text-lg font-medium text-red-600 mb-4">{error}</p>
               <button
                  onClick={() => setEstimateOn(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
               >
                  Close
               </button>
            </div>
         </div>
      )
   }

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Specification Details</h1>
            <div className="overflow-x-auto mb-6">
               <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                     <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sl No</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Specification</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Unit Rate</th>
                     </tr>
                  </thead>
                  <tbody>
                     {specData.length > 0 ? (
                        specData.map((element, index) => (
                           <tr key={element._id} className="border-t border-gray-200">
                              <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{element.spec_name}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{element.quantity}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{element.unit_rate}</td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={4} className="px-4 py-2 text-sm text-gray-600 text-center">
                              No specification data available
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">Used Materials</h1>
            <div className="overflow-x-auto mb-6">
               <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                     <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sl No</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Material Name</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Brand Name</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Unit Name</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Unit Rate</th>
                     </tr>
                  </thead>
                  <tbody>
                     {specmaterial.length > 0 ? (
                        specmaterial.map((element, index) => (
                           <tr key={element._id} className="border-t border-gray-200">
                              <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{element.material_name}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{element.brand_name}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{element.unit_name}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{element.quantity}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{element.unit_rate}</td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={6} className="px-4 py-2 text-sm text-gray-600 text-center">
                              No material data available
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">Used Labour</h1>
            <div className="overflow-x-auto mb-6">
               <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                     <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sl No</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Labour Name</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Number of Labour</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Daily Wage</th>
                     </tr>
                  </thead>
                  <tbody>
                     {specLabour.length > 0 ? (
                        specLabour.map((element, index) => (
                           <tr key={element._id} className="border-t border-gray-200">
                              <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{element.labour_name}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{element.numberoflabour}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{element.daily_wage}</td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={4} className="px-4 py-2 text-sm text-gray-600 text-center">
                              No labour data available
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>

            <div className="mb-6">
               <p className="text-lg font-semibold text-gray-700">
                  Additional Amount: {specAddition.length > 0 ? (
                     specAddition.reduce((sum, num) => sum + (num.additionalExpense_amount + num.profit_amount), 0)
                  ) : (
                     "No additional amount data"
                  )}
               </p>
            </div>

            {specData.length > 0 && specData[0].approvalStatus === false ? (
               <div className="flex justify-end space-x-4">
                  <button
                     onClick={() => setEstimateOn(false)}
                     className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                  >
                     Cancel
                  </button>
                  <button
                     onClick={() => setRejectOn(true)}
                     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                     Reject
                  </button>
                  <button
                     onClick={() => setApproveOn(true)}
                     className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                     Approve
                  </button>
               </div>
            ) : <button
               onClick={() => setEstimateOn(false)}
               className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
               Cancel
            </button>}

            <RejectModal
               rejectOn={rejectOn}
               setRejectOn={setRejectOn}
               setReasonOn={setReasonOn}
            />
            <ReasonModal
               reasonOn={reasonOn}
               setReasonOn={setReasonOn}
               projectId={projectId}
               onSuccess={() => {
                  onSuccess()
                  setEstimateOn(false)
               }}
            />
            <ApproveModal
               approveOn={approveOn}
               setApproveOn={setApproveOn}
               projectId={projectId}
               onSuccess={() => {
                  onSuccess()
                  setEstimateOn(false)
               }}
            />
         </div>
      </div>
   )
}

export default EstimationDetails;