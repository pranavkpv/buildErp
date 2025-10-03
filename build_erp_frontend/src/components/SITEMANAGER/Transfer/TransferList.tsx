import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddTransfer from "./AddTransfer";
import EditTransfer from "./EditTransfer";
import { deleteTransferAPI, getTransferDataAPI } from "../../../api/Sitemanager/transfer";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableAddButton from "../../../components/ReUsableComponents/ReUsableAddButton";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";
import ReUsableSearch from "../../../components/ReUsableComponents/ReUsableSearch";
import Loading from "../../../components/Loading";





type materialData = {
   sl: number
   material_id: string
   material_name: string
   brand_name: string
   unit_name: string
   quantity: number
   unit_rate: number
};

export type Transfer = {
   _id: string
   from_project_id: string
   fromproject_name: string
   to_project_id: string
   toproject_name: string
   transfer_id: string
   description: string
   date: string
   materialDetails: materialData[]
   finalAmount: number
};

function TransferList() {
   const [transferData, setTransferData] = useState<Transfer[]>([]);
   const [search, setSearch] = useState("");
   const [page, setPage] = useState(0);
   const [totalpage, setTotalpage] = useState(0);
   const itemsPerPage = 5;

   // Add
   const [addEnable, setAddEnable] = useState(false);

   // Delete
   const [deleteId, setDeleteId] = useState("");
   const [deleteEnable, setDeleteEnable] = useState(false);


   // Edit
   const [editId, setEditId] = useState("");
   const [editEnable, setEditEnable] = useState(false);
   const [editData, setEditData] = useState<Transfer>()
   const [loadOn, setLoadOn] = useState(false)



   const fetchTransferData = async () => {
      setLoadOn(true)
      const response = await getTransferDataAPI(search, page);
      setLoadOn(false)
      if (response.success) {
         setTransferData(response.data.data);
         setTotalpage(response.data.totalPage);
      } else {
         toast.error("Error occurred while fetching purchase data");
      }
   };

   useEffect(() => {
      const debounce = setTimeout(() => {
         fetchTransferData();
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
               <h1 className="text-2xl font-bold text-gray-100">Transfer List</h1>
               <div className="flex w-full sm:w-auto gap-4">
                  <ReUsableSearch search={search} setSearch={setSearch} item="Project name" />
                  <ReUsableAddButton addFuntion={() => setAddEnable(true)} item="Transfer" />
               </div>
            </div>
            <Loading loadOn={loadOn} />
            <div className="overflow-x-auto rounded-xl border border-gray-700/50">
               <table className="min-w-full text-sm text-left bg-gray-800/50">
                  <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
                     <tr>
                        <th className="px-6 py-4 w-[10%]">SL NO</th>
                        <th className="px-6 py-4 w-[20%]">Date</th>
                        <th className="px-6 py-4 w-[25%]">From Project</th>
                        <th className="px-6 py-4 w-[25%]">To Project</th>
                        <th className="px-6 py-4 w-[20%]">TransferId</th>
                        <th className="px-6 py-4 w-[15%]">Net Amount</th>
                        <th className="px-6 py-4 w-[20%] text-center">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                     {transferData.length === 0 ? (
                        <tr>
                           <td colSpan={6} className="text-center py-8 text-gray-400 text-sm font-medium">
                              No purchase records available. Click "Add Purchase" to create one.
                           </td>
                        </tr>
                     ) : (
                        transferData.map((element, index) => (
                           <tr key={element._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                              <td className="px-6 py-4 font-medium text-gray-200 text-center">{index + 1 + page * itemsPerPage}</td>
                              <td className="px-6 py-4 text-gray-100">{formatDate(element.date)}</td>
                              <td className="px-6 py-4 text-gray-100">{element.fromproject_name}</td>
                              <td className="px-6 py-4 text-gray-100">{element.toproject_name}</td>
                              <td className="px-6 py-4 text-gray-100">{element.transfer_id}</td>
                              <td className="px-6 py-4 text-gray-100">₹{element.finalAmount.toLocaleString()}</td>
                              <td className="px-6 py-4 text-center flex justify-center gap-2">
                                 <button
                                    type="button"
                                    className="text-teal-400 hover:text-teal-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                                    aria-label={`Edit purchase for ${ element.fromproject_name }`}
                                    onClick={() => {
                                       setEditId(element._id);
                                       const updatedElement = {
                                          ...element,
                                          date: element.date.split("T")[0],
                                          materialDetails: element.materialDetails.map((item, i) => ({
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
                                    aria-label={`Delete purchase for ${ element.fromproject_name }`}
                                    onClick={() => {
                                       setDeleteId(element._id);
                                       setDeleteEnable(true);
                                    }}
                                 >
                                    <TrashIcon className="h-5 w-5" />
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
            <AddTransfer addEnable={addEnable} setAddEnable={setAddEnable} onAddSuccess={fetchTransferData} />

            <ReUsableDeleteModal deleteId={deleteId} onDeleteSuccess={fetchTransferData} setEnable={setDeleteEnable} enable={deleteEnable}
               api={deleteTransferAPI} deleteItem="Transfer" />

            <EditTransfer editId={editId} editEnable={editEnable} setEditEnable={setEditEnable} onEditSuccess={fetchTransferData} editData={editData} />

         </div>
      </div>
   );
}

export default TransferList
