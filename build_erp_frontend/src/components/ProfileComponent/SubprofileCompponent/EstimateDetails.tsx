import { getAdditionEstimationApi, getEstimationApi, getLabourEstimationApi, getmaterialEstimationApi } from "../../../api/Estimation";
import { useEffect, useState } from "react";
import RejectModal from "./RejectModal";
import ReasonModal from "./ReasonModal";
import ApproveModal from "./ApproveModal";
import { getStageInUser } from "../../../api/auth";
import { toast } from "react-toastify";
import { getExpectedImageApi } from "../../../api/project";

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

type StageData = {
   _id: string;
   stage_name: string;
   start_date: string;
   end_date: string;
   stage_amount: number;
   progress: number;
   status_date: string;
};

type imageData = {
   image: string
   title: string
}

function EstimationDetails({ estimateOn, setEstimateOn, projectId, onSuccess }: prop) {
   if (!estimateOn) return null

   const [specData, setSpecData] = useState<specs[]>([])
   const [specmaterial, setSpecmaterial] = useState<materialSpec[]>([])
   const [specLabour, setSpecLabour] = useState<labourSpec[]>([])
   const [specAddition, setSpecAddition] = useState<additionSpec[]>([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)
   const [image, setImage] = useState<imageData[]>([])
   const [rejectOn, setRejectOn] = useState(false)
   const [approveOn, setApproveOn] = useState(false)
   const [reasonOn, setReasonOn] = useState(false)
   const [stage, setStage] = useState<StageData[]>([])

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

   const fetchStage = async (): Promise<void> => {
      const response = await getStageInUser(projectId);
      if (response.success) {
         setStage(response.data);
      } else {
         toast.error(response.message)
      }
   };

   const fetchExpectedImage = async () => {
      const response = await getExpectedImageApi(projectId)
      if (response.success) {
         setImage(response.data)
      } else {
         toast.error(response.message)
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
            fetchAdditionalEstimation(),
            fetchStage(),
            fetchExpectedImage()
         ])
         setLoading(false)
      }
      fetchAllData()
   }, [projectId])

   if (loading) {
      return (
         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
               <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <p className="text-lg font-semibold text-gray-800">Loading estimation data...</p>
               </div>
            </div>
         </div>
      )
   }

   if (error) {
      return (
         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
               <div className="flex items-center space-x-3 mb-6">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-semibold text-red-600">{error}</p>
               </div>
               <button
                  onClick={() => setEstimateOn(false)}
                  className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200 font-medium"
               >
                  Close
               </button>
            </div>
         </div>
      )
   }

   return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
         <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
               <h1 className="text-3xl font-bold text-gray-900">Estimation Details</h1>
               <button
                  type="button"
                  onClick={() => setEstimateOn(false)}
                  className="text-gray-500 hover:text-gray-700 transition duration-200"
                  aria-label="Close"
               >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
               </button>
            </div>

            {/* Specification Details */}
            <section className="mb-8">
               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Specification Details</h2>
               <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full bg-white">
                     <thead className="bg-indigo-50">
                        <tr>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sl No</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Specification</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Unit Rate</th>
                        </tr>
                     </thead>
                     <tbody>
                        {specData.length > 0 ? (
                           specData.map((element, index) => (
                              <tr key={element._id} className="border-t border-gray-200 hover:bg-gray-50">
                                 <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                                 <td className="px-6 py-4 text-sm text-gray-600">{element.spec_name}</td>
                                 <td className="px-6 py-4 text-sm text-gray-600">{element.quantity}</td>
                                 <td className="px-6 py-4 text-sm text-gray-600">₹{element.unit_rate.toFixed(2)}</td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 text-center">
                                 No specification data available
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </section>

            {/* Material Details */}
            <section className="mb-8">
               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Used Materials</h2>
               <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full bg-white">
                     <thead className="bg-indigo-50">
                        <tr>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sl No</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Material Name</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Brand Name</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Unit Name</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Unit Rate</th>
                        </tr>
                     </thead>
                     <tbody>
                        {specmaterial.length > 0 ? (
                           specmaterial.map((element, index) => (
                              <tr key={element._id} className="border-t border-gray-200 hover:bg-gray-50">
                                 <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                                 <td className="px-6 py-4 text-sm text-gray-600">{element.material_name}</td>
                                 <td className="px-6 py-4 text-sm text-gray-600">{element.brand_name}</td>
                                 <td className="px-6 py-4 text-sm text-gray-600">{element.unit_name}</td>
                                 <td className="px-6 py-4 text-sm text-gray-600">{element.quantity}</td>
                                 <td className="px-6 py-4 text-sm text-gray-600">₹{element.unit_rate.toFixed(2)}</td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan={6} className="px-6 py-4 text-sm text-gray-500 text-center">
                                 No material data available
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </section>

            {/* Labour Details */}
            <section className="mb-8">
               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Used Labour</h2>
               <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full bg-white">
                     <thead className="bg-indigo-50">
                        <tr>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sl No</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Labour Name</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Number of Labour</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Daily Wage</th>
                        </tr>
                     </thead>
                     <tbody>
                        {specLabour.length > 0 ? (
                           specLabour.map((element, index) => (
                              <tr key={element._id} className="border-t border-gray-200 hover:bg-gray-50">
                                 <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                                 <td className="px-6 py-4 text-sm text-gray-600">{element.labour_name}</td>
                                 <td className="px-6 py-4 text-sm text-gray-600">{element.numberoflabour}</td>
                                 <td className="px-6 py-4 text-sm text-gray-600">₹{element.daily_wage.toFixed(2)}</td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 text-center">
                                 No labour data available
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </section>

            {/* Stage Details */}
            <section className="mb-8">
               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Stages</h2>
               <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full bg-white">
                     <thead className="bg-indigo-50">
                        <tr>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sl No</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stage Name</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Start Date</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">End Date</th>
                           <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stage Amount</th>
                        </tr>
                     </thead>
                     <tbody>
                        {stage.length > 0 ? (
                           stage.map((element, index) => (
                              <tr key={element._id} className="border-t border-gray-200 hover:bg-gray-50">
                                 <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                                 <td className="px-6 py-4 text-sm text-gray-600">{element.stage_name}</td>
                                 <td className="px-6 py-4 text-sm text-gray-600">
                                    {element.start_date.split("T")[0].split('-').reverse().join('-')}
                                 </td>
                                 <td className="px-6 py-4 text-sm text-gray-600">
                                    {element.end_date.split("T")[0].split('-').reverse().join('-')}
                                 </td>
                                 <td className="px-6 py-4 text-sm text-gray-600">₹{element.stage_amount.toFixed(2)}</td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
                                 No stage data available
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </section>

            {/* Image Gallery */}
            <section className="mb-8">
               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Images</h2>
               {image.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                     {image.map((element, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                           <img
                              src={element.image}
                              alt={element.title}
                              className="w-full h-48 object-cover"
                              onError={(e) => {
                                 e.currentTarget.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
                              }}
                           />
                           <div className="p-4">
                              <p className="text-sm font-medium text-gray-700">{element.title}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <p className="text-sm text-gray-500">No images available</p>
               )}
            </section>

            {/* Financial Summary */}
            <section className="mb-8 p-6 bg-indigo-50 rounded-lg">
               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Financial Summary</h2>
               <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-700">
                     Additional Amount: ₹
                     {specAddition.length > 0
                        ? specAddition
                           .reduce((sum, num) => sum + (num.additionalExpense_amount + num.profit_amount), 0)
                           .toFixed(2)
                        : "0.00"}
                  </p>
                  <p className="text-lg font-medium text-gray-700">
                     Expected Budgeted Amount: ₹
                     {(specmaterial.reduce((sum, num) => sum + (num.quantity * num.unit_rate), 0) +
                        specLabour.reduce((sum, num) => sum + (num.daily_wage * num.numberoflabour), 0) +
                        specAddition.reduce((sum, num) => sum + (num.additionalExpense_amount + num.profit_amount), 0))
                        .toFixed(2)}
                  </p>
               </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
               {specData.length > 0 && specData[0].approvalStatus === false ? (
                  <>
                     <button
                        onClick={() => setEstimateOn(false)}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200 font-medium"
                     >
                        Cancel
                     </button>
                     <button
                        onClick={() => setRejectOn(true)}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 font-medium"
                     >
                        Reject
                     </button>
                     <button
                        onClick={() => setApproveOn(true)}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 font-medium"
                     >
                        Approve
                     </button>
                  </>
               ) : (
                  <button
                     onClick={() => setEstimateOn(false)}
                     className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200 font-medium"
                  >
                     Close
                  </button>
               )}
            </div>

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