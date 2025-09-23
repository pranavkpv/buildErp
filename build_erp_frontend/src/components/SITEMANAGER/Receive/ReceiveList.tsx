import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PencilIcon, TrashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { ApproveReceiveAPI, deleteReceiveAPI, getReceiveDataAPI } from "../../../api/Sitemanager/receive";
import AddReceive from "./AddReceive";
import EditReceive from "./EditReceive";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableApproveModal from "../../../components/ReUsableComponents/ReUsableApproveModal";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";



type materialData = {
   sl: number
   material_id: string
   material_name: string
   brand_name: string
   unit_name: string
   quantity: number
   unit_rate: number
};
type transferData = {
   _id: string
   transfer_id: string
   from_project_id: string
   from_project_name: string
   date: string
   materialDetails: materialData[]
}

export type ReceiveData = {
   _id: string
   project_id: string;
   Toproject_name: string;
   description: string;
   date: string;
   transferDetails: transferData[]
   materialData: materialData[];
   finalAmount: number;
};

function ReceiveList() {
   const [receiveData, setReceiveData] = useState<ReceiveData[]>([]);
   const [search, setSearch] = useState("");
   const [page, setPage] = useState(0);
   const [totalpage, setTotalpage] = useState(0);
   const itemsPerPage = 5;

   // Add
   const [addEnable, setAddEnable] = useState(false);

   // Delete
   const [deleteId, setDeleteId] = useState("");
   const [deleteEnable, setDeleteEnable] = useState(false);

   // Approve
   const [approveId, setApproveId] = useState("");
   const [approveEnable, setApproveEnable] = useState(false);
   const [approveData, setApproveData] = useState<ReceiveData>()

   // Edit
   const [editId, setEditId] = useState("");
   const [editEnable, setEditEnable] = useState(false);
   const [editData, setEditData] = useState<ReceiveData>()



   const fetchRecieveData = async () => {
      const response = await getReceiveDataAPI(search, page);
      if (response.success) {
         setReceiveData(response.data.data);
         setTotalpage(response.data.totalPage);
      } else {
         toast.error("Error occurred while fetching receive data");
      }
   };

   useEffect(() => {
      const debounce = setTimeout(() => {
         fetchRecieveData();
      }, 500)
      return () => {
         clearTimeout(debounce)
      }
   }, [search, page]);

   const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const [date] = dateString.split("T");
      const [year, month, day] = date.split("-");
      return `${ day }-${ month }-${ year }`;
   };

   return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
         <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
               <h1 className="text-2xl font-bold text-gray-100">Purchase List</h1>
               <div className="flex w-full sm:w-auto gap-4">
                  <ReUsableSearch search={search} setSearch={setSearch} item="Project name" />

                  <ReUsableAddButton addFuntion={() => setAddEnable(true)} item="Receive" />
               </div>
            </div>


            <div className="overflow-x-auto rounded-xl border border-gray-700/50">
               <table className="min-w-full text-sm text-left bg-gray-800/50">
                  <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
                     <tr>
                        <th className="px-6 py-4 w-[10%]">SL NO</th>
                        <th className="px-6 py-4 w-[20%]">Date</th>
                        <th className="px-6 py-4 w-[25%]">Project Name</th>
                        <th className="px-6 py-4 w-[15%]">Net Amount</th>
                        <th className="px-6 py-4 w-[20%] text-center">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                     {receiveData.length === 0 ? (
                        <tr>
                           <td colSpan={6} className="text-center py-8 text-gray-400 text-sm font-medium">
                              No purchase records available. Click "Add Purchase" to create one.
                           </td>
                        </tr>
                     ) : (
                        receiveData.map((element, index) => (
                           <tr key={element._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                              <td className="px-6 py-4 font-medium text-gray-200 text-center">{index + 1 + page * itemsPerPage}</td>
                              <td className="px-6 py-4 text-gray-100">{formatDate(element.date)}</td>
                              <td className="px-6 py-4 text-gray-100">{element.Toproject_name}</td>
                              <td className="px-6 py-4 text-gray-100">₹{element.finalAmount.toLocaleString()}</td>
                              <td className="px-6 py-4 text-center flex justify-center gap-2">
                                 <button
                                    type="button"
                                    className="text-teal-400 hover:text-teal-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                                    aria-label={`Edit purchase for ${ element.Toproject_name }`}
                                    onClick={() => {

                                       setEditId(element._id);
                                       const updatedElement = {
                                          ...element,
                                          date: element.date.split("T")[0],
                                          materialDetails: element.materialData.map((item, i) => ({
                                             ...item,
                                             sl: i + 1,
                                          })),
                                       };
                                       setEditData(updatedElement);
                                       setEditEnable(true);

                                    }}
                                 >
                                    <PencilIcon className="h-5 w-5" />
                                 </button>
                                 <button
                                    type="button"
                                    className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                                    aria-label={`Delete purchase for ${ element.Toproject_name }`}
                                    onClick={() => {
                                       setDeleteId(element._id);
                                       setDeleteEnable(true);
                                    }}
                                 >
                                    <TrashIcon className="h-5 w-5" />
                                 </button>
                                 <button
                                    type="button"
                                    className="text-green-400 hover:text-green-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                                    aria-label={`Approve purchase for ${ element.Toproject_name }`}
                                    onClick={() => {
                                       setApproveId(element._id);
                                       setApproveEnable(true);
                                       const updatedElement = {
                                          ...element,
                                          date: element.date.split("T")[0],
                                          materialDetails: element.materialData.map((item, i) => ({
                                             ...item,
                                             sl: i + 1,
                                          })),
                                       };
                                       setApproveData(updatedElement)
                                    }}
                                 >
                                    <CheckCircleIcon className="h-5 w-5" />
                                 </button>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>

            {totalpage >= 1 && (
               <ReUsablePagination page={page} setPage={setPage} totalPage={totalpage} />
            )}
            <AddReceive addEnable={addEnable} setAddEnable={setAddEnable} onAddSuccess={fetchRecieveData} />

            <ReUsableDeleteModal deleteId={deleteId} onDeleteSuccess={fetchRecieveData} setEnable={setDeleteEnable} enable={deleteEnable}
               api={deleteReceiveAPI} deleteItem="Receive" />

            <ReUsableApproveModal approveId={approveId} setApproveEnable={setApproveEnable} approveEnable={approveEnable} onApproveSuccess={fetchRecieveData}
               approveData={approveData} api={ApproveReceiveAPI} approveItem="Material Receive" />

            <EditReceive editId={editId} editEnable={editEnable} setEditEnable={setEditEnable} onEditSuccess={fetchRecieveData} editData={editData} />

         </div>
      </div>
   );
}

export default ReceiveList
