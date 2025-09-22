import { useEffect, useState } from "react";
import { getStageInUser } from "../../../api/auth";
import { toast } from "react-toastify";
import { getSiteAdditionEstimationApi, getSiteEstimationApi, getSiteExpectedImageApi, getSiteLabourEstimationApi, getSitematerialEstimationApi } from "../../../api/Sitemanager/dashboard";

interface prop {
   estimateOn: boolean;
   setEstimateOn: React.Dispatch<React.SetStateAction<boolean>>;
   projectId: string;
   onSuccess: () => void;
}

interface specs {
   _id: string;
   spec_name: string;
   quantity: number;
   unit_rate: number;
   approvalStatus: boolean;
}

interface materialSpec {
   _id: string;
   material_name: string;
   brand_name: string;
   unit_name: string;
   quantity: number;
   unit_rate: number;
}

interface labourSpec {
   _id: string;
   labour_name: string;
   numberoflabour: number;
   daily_wage: number;
}

interface additionSpec {
   additionalExpense_per: number;
   additionalExpense_amount: number;
   profit_per: number;
   profit_amount: number;
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
   image: string;
   title: string;
};

function ProjectEstimationDetails({ estimateOn, setEstimateOn, projectId, onSuccess }: prop) {
   if (!estimateOn) return null;

   const [specData, setSpecData] = useState<specs[]>([]);
   const [specmaterial, setSpecmaterial] = useState<materialSpec[]>([]);
   const [specLabour, setSpecLabour] = useState<labourSpec[]>([]);
   const [specAddition, setSpecAddition] = useState<additionSpec[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [image, setImage] = useState<imageData[]>([]);
   const [stage, setStage] = useState<StageData[]>([]);

   const fetchEstimation = async () => {
      const response = await getSiteEstimationApi(projectId);
      if (response.success) {
         setSpecData(response.data);
      } else {
         throw new Error(response.message);
      }
   };

   const fetchmaterialEstimation = async () => {
      const response = await getSitematerialEstimationApi(projectId);
      if (response.success) {
         setSpecmaterial(response.data);
      } else {
         throw new Error(response.message);
      }
   };

   const fetchLabourEstimation = async () => {
      const response = await getSiteLabourEstimationApi(projectId);
      if (response.success) {
         setSpecLabour(response.data);
      } else {
         throw new Error(response.message);
      }
   };

   const fetchAdditionalEstimation = async () => {
      const response = await getSiteAdditionEstimationApi(projectId);
      if (response.success) {
         setSpecAddition(response.data);
      } else {
         throw new Error(response.message);
      }
   };

   const fetchStage = async (): Promise<void> => {
      const response = await getStageInUser(projectId);
      if (response.success) {
         setStage(response.data);
      } else {
         toast.error(response.message);
      }
   };

   const fetchExpectedImage = async () => {
      const response = await getSiteExpectedImageApi(projectId);
      if (response.success) {
         setImage(response.data);
      } else {
         toast.error(response.message);
      }
   };

   useEffect(() => {
      const fetchAllData = async () => {
         setLoading(true);
         setError(null);
         await Promise.all([
            fetchEstimation(),
            fetchmaterialEstimation(),
            fetchLabourEstimation(),
            fetchAdditionalEstimation(),
            fetchStage(),
            fetchExpectedImage(),
         ]);
         setLoading(false);
      };
      fetchAllData();
   }, [projectId]);

   if (loading) {
      return (
         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-slate-700 rounded-xl shadow-lg max-w-md w-full p-6">
               <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
                  <p className="text-lg font-semibold text-gray-200">Loading estimation data...</p>
               </div>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-slate-700 rounded-xl shadow-lg max-w-md w-full p-6">
               <div className="flex items-center space-x-3 mb-6">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-semibold text-red-400">{error}</p>
               </div>
               <button
                  onClick={() => setEstimateOn(false)}
                  className="w-full py-2 bg-slate-600 text-gray-200 rounded-lg hover:bg-slate-500 transition duration-200 font-medium"
               >
                  Close
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
         <div className="bg-slate-700 rounded-xl shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
               <h1 className="text-3xl font-bold text-gray-100">Estimation Details</h1>
               <button
                  type="button"
                  onClick={() => setEstimateOn(false)}
                  className="text-gray-400 hover:text-gray-200 transition duration-200"
                  aria-label="Close"
               >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
               </button>
            </div>

            {/* Specification Details */}
            <section className="mb-8">
               <h2 className="text-2xl font-semibold text-gray-200 mb-4">Specification Details</h2>
               <div className="overflow-x-auto border border-slate-600 rounded-lg">
                  <table className="w-full bg-slate-800">
                     <thead>
                        <tr className="bg-slate-700 text-gray-200 text-left">
                           <th className="py-3 px-4 font-medium">Sl No</th>
                           <th className="py-3 px-4 font-medium">Specification</th>
                           <th className="py-3 px-4 font-medium">Quantity</th>
                        </tr>
                     </thead>
                     <tbody>
                        {specData.length > 0 ? (
                           specData.map((element, index) => (
                              <tr key={element._id} className="border-t border-slate-600 hover:bg-slate-700 transition-colors duration-200">
                                 <td className="py-3 px-4 text-gray-300">{index + 1}</td>
                                 <td className="py-3 px-4 text-gray-300">{element.spec_name}</td>
                                 <td className="py-3 px-4 text-gray-300">{element.quantity}</td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan={3} className="px-6 py-4 text-sm text-gray-500 text-center">
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
               <h2 className="text-2xl font-semibold text-gray-200 mb-4">Used Materials</h2>
               <div className="overflow-x-auto border border-slate-600 rounded-lg">
                  <table className="w-full bg-slate-800">
                     <thead>
                        <tr className="bg-slate-700 text-gray-200 text-left">
                           <th className="py-3 px-4 font-medium">Sl No</th>
                           <th className="py-3 px-4 font-medium">Material Name</th>
                           <th className="py-3 px-4 font-medium">Brand Name</th>
                           <th className="py-3 px-4 font-medium">Unit Name</th>
                           <th className="py-3 px-4 font-medium">Quantity</th>
                        </tr>
                     </thead>
                     <tbody>
                        {specmaterial.length > 0 ? (
                           specmaterial.map((element, index) => (
                              <tr key={element._id} className="border-t border-slate-600 hover:bg-slate-700 transition-colors duration-200">
                                 <td className="py-3 px-4 text-gray-300">{index + 1}</td>
                                 <td className="py-3 px-4 text-gray-300">{element.material_name}</td>
                                 <td className="py-3 px-4 text-gray-300">{element.brand_name}</td>
                                 <td className="py-3 px-4 text-gray-300">{element.unit_name}</td>
                                 <td className="py-3 px-4 text-gray-300">{element.quantity}</td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
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
               <h2 className="text-2xl font-semibold text-gray-200 mb-4">Used Labour</h2>
               <div className="overflow-x-auto border border-slate-600 rounded-lg">
                  <table className="w-full bg-slate-800">
                     <thead>
                        <tr className="bg-slate-700 text-gray-200 text-left">
                           <th className="py-3 px-4 font-medium">Sl No</th>
                           <th className="py-3 px-4 font-medium">Labour Name</th>
                           <th className="py-3 px-4 font-medium">Number of Labour</th>
                        </tr>
                     </thead>
                     <tbody>
                        {specLabour.length > 0 ? (
                           specLabour.map((element, index) => (
                              <tr key={element._id} className="border-t border-slate-600 hover:bg-slate-700 transition-colors duration-200">
                                 <td className="py-3 px-4 text-gray-300">{index + 1}</td>
                                 <td className="py-3 px-4 text-gray-300">{element.labour_name}</td>
                                 <td className="py-3 px-4 text-gray-300">{element.numberoflabour}</td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan={3} className="px-6 py-4 text-sm text-gray-500 text-center">
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
               <h2 className="text-2xl font-semibold text-gray-200 mb-4">Project Stages</h2>
               <div className="overflow-x-auto border border-slate-600 rounded-lg">
                  <table className="w-full bg-slate-800">
                     <thead>
                        <tr className="bg-slate-700 text-gray-200 text-left">
                           <th className="py-3 px-4 font-medium">Sl No</th>
                           <th className="py-3 px-4 font-medium">Stage Name</th>
                           <th className="py-3 px-4 font-medium">Start Date</th>
                           <th className="py-3 px-4 font-medium">End Date</th>
                        </tr>
                     </thead>
                     <tbody>
                        {stage.length > 0 ? (
                           stage.map((element, index) => (
                              <tr key={element._id} className="border-t border-slate-600 hover:bg-slate-700 transition-colors duration-200">
                                 <td className="py-3 px-4 text-gray-300">{index + 1}</td>
                                 <td className="py-3 px-4 text-gray-300">{element.stage_name}</td>
                                 <td className="py-3 px-4 text-gray-300">
                                    {element.start_date.split("T")[0].split('-').reverse().join('-')}
                                 </td>
                                 <td className="py-3 px-4 text-gray-300">
                                    {element.end_date.split("T")[0].split('-').reverse().join('-')}
                                 </td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 text-center">
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
               <h2 className="text-2xl font-semibold text-gray-200 mb-4">Project Images</h2>
               {image.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                     {image.map((element, index) => (
                        <div key={index} className="bg-slate-800 rounded-lg overflow-hidden shadow-md">
                           <img
                              src={element.image}
                              alt={element.title}
                              className="w-full h-48 object-cover"
                              onError={(e) => {
                                 e.currentTarget.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
                              }}
                           />
                           <div className="p-4">
                              <p className="text-sm font-medium text-gray-300">{element.title}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <p className="text-sm text-gray-500">No images available</p>
               )}
            </section>

            <div className="flex justify-end space-x-4">
               <button
                  onClick={() => setEstimateOn(false)}
                  className="px-6 py-2 bg-slate-600 text-gray-200 rounded-lg hover:bg-slate-500 transition duration-200 font-medium"
               >
                  Close
               </button>
            </div>
         </div>
      </div>
   );
}

export default ProjectEstimationDetails;