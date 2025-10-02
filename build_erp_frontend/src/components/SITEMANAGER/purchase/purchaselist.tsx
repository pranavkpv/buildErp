import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PencilIcon, TrashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import AddPurchase from "./AddPurchase";
import { ApprovePurchaseAPI, deletePurchaseAPI, getPurchaseDataAPI } from "../../../api/Sitemanager/purchase";
import EditPurchase from "./EditPurchase";
import ReUsableDeleteModal from "../../../components/ReUsableComponents/ReUsableDeleteModal";
import ReUsableApproveModal from "../../../components/ReUsableComponents/ReUsableApproveModal";
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

export type Purchase = {
   _id: string
   project_id: string;
   project_name: string;
   invoice_number: number;
   date: string;
   description: string;
   materialDetails: materialData[];
   finalAmount: number;
};

function PurchaseList() {
   const [purchaseData, setPurchaseData] = useState<Purchase[]>([]);
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
   const [approveData, setApproveData] = useState<Purchase>()

   // Edit
   const [editId, setEditId] = useState("");
   const [editEnable, setEditEnable] = useState(false);
   const [editData, setEditData] = useState<Purchase>()

   const [highInvoice, setHighInvoice] = useState(0)
   const [loadOn, setLoadOn] = useState(false)

   const fetchPurchaseData = async () => {
      setLoadOn(true)
      const response = await getPurchaseDataAPI(search, page);
      setLoadOn(false)
      if (response.success) {
         setPurchaseData(response.data.data);
         setTotalpage(response.data.totalPage);
      } else {
         toast.error("Error occurred while fetching purchase data");
      }
   };

   useEffect(() => {
      const debounce = setTimeout(() => {
         fetchPurchaseData();
      }, 500)
      return () => {
         clearTimeout(debounce)
      }
   }, [search, page]);

   useEffect(() => {
      let maximumInvoice = purchaseData.reduce((max: number, element: Purchase) => {
         if (element.invoice_number > max) {
            max = element.invoice_number
         }
         return max
      }, 0)
      setHighInvoice(maximumInvoice)
   }, [])

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
                  <ReUsableAddButton addFuntion={() => setAddEnable(true)} item="Purchase" />
               </div>
               <Loading loadOn={loadOn} />
            </div>


            <div className="overflow-x-auto rounded-xl border border-gray-700/50">
               <table className="min-w-full text-sm text-left bg-gray-800/50">
                  <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
                     <tr>
                        <th className="px-6 py-4 w-[10%]">SL NO</th>
                        <th className="px-6 py-4 w-[20%]">Date</th>
                        <th className="px-6 py-4 w-[25%]">Project Name</th>
                        <th className="px-6 py-4 w-[20%]">Invoice No</th>
                        <th className="px-6 py-4 w-[15%]">Net Amount</th>
                        <th className="px-6 py-4 w-[20%] text-center">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                     {purchaseData.length === 0 ? (
                        <tr>
                           <td colSpan={6} className="text-center py-8 text-gray-400 text-sm font-medium">
                              No purchase records available. Click "Add Purchase" to create one.
                           </td>
                        </tr>
                     ) : (
                        purchaseData.map((element, index) => (
                           <tr key={element.invoice_number} className="hover:bg-gray-700/50 transition-colors duration-150">
                              <td className="px-6 py-4 font-medium text-gray-200 text-center">{index + 1 + page * itemsPerPage}</td>
                              <td className="px-6 py-4 text-gray-100">{formatDate(element.date)}</td>
                              <td className="px-6 py-4 text-gray-100">{element.project_name}</td>
                              <td className="px-6 py-4 text-gray-100">{element.invoice_number}</td>
                              <td className="px-6 py-4 text-gray-100">₹{element.finalAmount.toLocaleString()}</td>
                              <td className="px-6 py-4 text-center flex justify-center gap-2">
                                 <button
                                    type="button"
                                    className="text-teal-400 hover:text-teal-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                                    aria-label={`Edit purchase for ${ element.project_name }`}
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
                                    aria-label={`Delete purchase for ${ element.project_name }`}
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
                                    aria-label={`Approve purchase for ${ element.project_name }`}
                                    onClick={() => {
                                       setApproveId(element._id);
                                       setApproveEnable(true);
                                       const updatedElement = {
                                          ...element,
                                          date: element.date.split("T")[0],
                                          materialDetails: element.materialDetails.map((item, i) => ({
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
            <AddPurchase addEnable={addEnable} setAddEnable={setAddEnable} onAddSuccess={fetchPurchaseData} />

            <ReUsableDeleteModal deleteId={deleteId} onDeleteSuccess={fetchPurchaseData} setEnable={setDeleteEnable} enable={deleteEnable}
               api={deletePurchaseAPI} deleteItem="Purchase" />

            <ReUsableApproveModal approveId={approveId} setApproveEnable={setApproveEnable} approveEnable={approveEnable} onApproveSuccess={fetchPurchaseData}
               approveData={approveData} api={ApprovePurchaseAPI} approveItem="Purchase" />

            <EditPurchase editId={editId} editEnable={editEnable} setEditEnable={setEditEnable} onEditSuccess={fetchPurchaseData} editData={editData} />

         </div>
      </div>
   );
}

export default PurchaseList
