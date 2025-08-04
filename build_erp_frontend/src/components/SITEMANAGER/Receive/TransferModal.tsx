import { getProjectBaseTransferAPI } from "../../../api/Sitemanager/transfer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type materialData = {
   sl: number;
   material_id: string;
   material_name: string;
   brand_name: string;
   unit_name: string;
   quantity: number;
   unit_rate: number;
};

export type Transfer = {
   _id: string;
   from_project_id: string;
   fromproject_name: string;
   to_project_id: string;
   toproject_name: string;
   transfer_id: string;
   description: string;
   date: string;
   materialDetails: materialData[];
   finalAmount: number;
};

type prop = {
   projectId: string;
   date: string;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   open: boolean;
   setTransferId: React.Dispatch<React.SetStateAction<string[]>>;
   transferId: string[];
   setMaterials: React.Dispatch<React.SetStateAction<materialData[]>>;
};

function TransferModal({ projectId, date, setOpen, open, setTransferId, transferId, setMaterials }: prop) {
   if (!open) return null;

   const [transferData, setTransferData] = useState<Transfer[]>([]);

   const fetchTransferData = async () => {
      const response = await getProjectBaseTransferAPI(projectId, date);
      if (response.success) {
         setTransferData(response.data);
      } else {
         toast.error(response.message);
      }
   };

   useEffect(() => {
      fetchTransferData();
   }, [projectId, date]);

   const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const [date] = dateString.split("T");
      const [year, month, day] = date.split("-");
      return `${ day }-${ month }-${ year }`;
   };

   const handleSelectTransfer = (transfer: Transfer) => {
      if (transferId.includes(transfer._id)) {
         setTransferId(transferId.filter((id) => id !== transfer._id));
         setMaterials((prev) =>
            prev.filter((material) => !transfer.materialDetails.some((m) => m.material_id === material.material_id))
         );
      } else {
         setTransferId([...transferId, transfer._id]);
         setMaterials((prev) => [
            ...prev,
            ...transfer.materialDetails.map((m, index) => ({
               ...m,
               sl: prev.length + index + 1,
            })),
         ]);
      }
   };

   return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 w-full">
         <div className="bg-gray-800 rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Transfer List</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-700/50">
               <table className="min-w-full text-sm text-left bg-gray-800/50">
                  <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
                     <tr>
                        <th className="px-6 py-4 w-[5%]">Select</th>
                        <th className="px-6 py-4 w-[10%]">SL NO</th>
                        <th className="px-6 py-4 w-[20%]">Date</th>
                        <th className="px-6 py-4 w-[25%]">From Project</th>
                        <th className="px-6 py-4 w-[20%]">TransferId</th>
                        <th className="px-6 py-4 w-[15%]">Net Amount</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                     {transferData.length === 0 ? (
                        <tr>
                           <td colSpan={7} className="text-center py-8 text-gray-400 text-sm font-medium">
                              No transfer records available.
                           </td>
                        </tr>
                     ) : (
                        transferData.map((element, index) => (
                           <tr key={element._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                              <td className="px-6 py-4 text-center">
                                 <input placeholder="select"
                                    type="checkbox"
                                    checked={transferId.includes(element._id)}
                                    onChange={() => handleSelectTransfer(element)}
                                    className="h-4 w-4 text-teal-500 focus:ring-teal-400 border-gray-600 rounded"
                                 />
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-200 text-center">{index + 1}</td>
                              <td className="px-6 py-4 text-gray-100">{formatDate(element.date)}</td>
                              <td className="px-6 py-4 text-gray-100">{element.fromproject_name}</td>
                              <td className="px-6 py-4 text-gray-100">{element.transfer_id}</td>
                              <td className="px-6 py-4 text-gray-100">₹{element.finalAmount}</td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
               <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
               >

                  Add
               </button>
            </div>
         </div>
      </div>
   );
}

export default TransferModal;