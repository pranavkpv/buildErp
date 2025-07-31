import { jwtDecode } from "jwt-decode";
import { fetchBrandCorrespondingMaterial, fetchUniqueMaterial, fetchUnitCorrespondingMaterial, fetchUnitRate } from "../../../api/Admin/material";
import { getSitemanagersProject } from "../../../api/Sitemanager/profile";
import { savePurchaseAPI } from "../../../api/Sitemanager/purchase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type setAdd = {
   addEnable: boolean;
   setAddEnable: React.Dispatch<React.SetStateAction<boolean>>;
   onAddSuccess: () => void;
};

type listMaterial = {
   sl: number;
   material_name: string;
   brand_name: string;
   unit_name: string;
   unit_rate: number;
   material_id: string;
   quantity: number;
};

type Project = {
   _id: string;
   project_name: string;
};

type JwtPayload = {
   userId: string;
   iat: number;
   exp: number;
};

function AddPurchase({ addEnable, setAddEnable, onAddSuccess }: setAdd) {
   if (!addEnable) return null;

   const [material, setMaterial] = useState<string[]>([]);
   const [brand, setBrand] = useState<string[]>([]);
   const [unit, setUnit] = useState<string[]>([]);
   const [index, setIndex] = useState(0);
   const [row, setRow] = useState<listMaterial[]>([]);
   const [project_id, setProjectId] = useState("");
   const [invoice_number, setInvoice] = useState("");
   const [date, setDate] = useState("");
   const [description, setDescription] = useState("");
   const [project, setProject] = useState<Project[]>([]);
   const [errors, setErrors] = useState<{ [key: string]: string }>({});

   const fetchMaterial = async () => {
      const materialList = await fetchUniqueMaterial();
      setMaterial(materialList.data);
   };

   const fetchProject = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
         toast.error("No access token found");
         return;
      }
      const decode: JwtPayload = jwtDecode(token);
      const response = await getSitemanagersProject(decode.userId);
      setProject(response.data);
   };

   useEffect(() => {
      fetchMaterial();
      fetchProject();
   }, []);

   const giveBrandAndUnit = async (e: React.ChangeEvent<HTMLSelectElement>, idx: number) => {
      const selectedMaterial = e.target.value;
      if (row.some((item, i) => i !== idx && item.material_name === selectedMaterial)) {
         setErrors((prev) => ({ ...prev, [`material_${idx}`]: "Material already selected" }));
         return;
      }
      setErrors((prev) => ({ ...prev, [`material_${idx}`]: "" }));
      
      const brandData = await fetchBrandCorrespondingMaterial(selectedMaterial);
      const unitData = await fetchUnitCorrespondingMaterial(selectedMaterial);
      const newRow = [...row];
      newRow[idx].material_name = selectedMaterial;
      newRow[idx].brand_name = "";
      newRow[idx].unit_name = "";
      newRow[idx].unit_rate = 0;
      setRow(newRow);
      setBrand(brandData.data);
      setUnit(unitData.data);
   };

   const unitRateFetch = async (index: number) => {
      const { material_name, brand_name, unit_name } = row[index];
      if (!material_name || !brand_name || !unit_name) return;
      const response = await fetchUnitRate(material_name, unit_name, brand_name);
      const newRow = [...row];
      newRow[index].unit_rate = response.data.unit_rate;
      newRow[index].material_id = response.data._id;
      setRow(newRow);
   };

   const validateForm = () => {
      const newErrors: { [key: string]: string } = {};
      if (!project_id) newErrors.project = "Project is required";
      if (!invoice_number) newErrors.invoice = "Invoice number is required";
      if (!date) newErrors.date = "Purchase date is required";
      if (row.length === 0) newErrors.materials = "At least one material is required";
      row.forEach((item, idx) => {
         if (!item.material_name) newErrors[`material_${idx}`] = "Material is required";
         if (!item.brand_name) newErrors[`brand_${idx}`] = "Brand is required";
         if (!item.unit_name) newErrors[`unit_${idx}`] = "Unit is required";
         if (!item.quantity || item.quantity <= 0) newErrors[`quantity_${idx}`] = "Valid quantity is required";
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const addPurchaseFun = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) {
         toast.error("Please fill all required fields");
         return;
      }

      const materialDetails = row.map((element) => ({
         material_id: element.material_id,
         quantity: element.quantity,
         unit_rate: element.unit_rate,
      }));

      const response = await savePurchaseAPI(project_id, invoice_number, date, description, materialDetails);
      if (response.success) {
         toast.success(response.message);
         setAddEnable(false);
         onAddSuccess();
      } else {
         toast.error(response.message);
      }
   };

   const addMaterialRow = () => {
      setRow([...row, {
         sl: row.length + 1,
         material_name: "",
         brand_name: "",
         unit_name: "",
         unit_rate: 0,
         material_id: "",
         quantity: 0,
      }]);
   };

   const totalAmount = row.reduce((sum, item) => sum + (item.quantity * item.unit_rate), 0);

   return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 w-ful">
         <div className="bg-gray-800 ml-20  rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Add Purchase</h2>
            <form onSubmit={addPurchaseFun} className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <select
                        aria-label="Select project"
                        value={project_id}
                        onChange={(e) => setProjectId(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                     >
                        <option value="">Select Project</option>
                        {project.map((element) => (
                           <option key={element._id} value={element._id}>{element.project_name}</option>
                        ))}
                     </select>
                     {errors.project && <p className="text-red-400 text-sm mt-1">{errors.project}</p>}
                  </div>
                  <div>
                     <input
                        type="text"
                        placeholder="Invoice Number"
                        value={invoice_number}
                        onChange={(e) => setInvoice(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                     />
                     {errors.invoice && <p className="text-red-400 text-sm mt-1">{errors.invoice}</p>}
                  </div>
                  <div>
                     <input placeholder="select date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                     />
                     {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
                  </div>
                  <div>
                     <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                     />
                  </div>
               </div>

               <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left">
                     <thead className="bg-gray-700 text-gray-200 uppercase text-xs font-semibold">
                        <tr>
                           <th className="px-8 py-4 w-[80px]">SL No</th>
                           <th className="px-8 py-4 w-[500px]">Material</th>
                           <th className="px-8 py-4 w-[500px]">Brand</th>
                           <th className="px-8 py-4 w-[550px]">Unit</th>
                           <th className="px-8 py-4 w-[500px]">Quantity</th>
                           <th className="px-8 py-4 w-[500px]">Unit Rate</th>
                           <th className="px-8 py-4 w-[500px]">Total</th>
                           <th className="px-8 py-4 w-[100px] text-center">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-700">
                        {row.length === 0 ? (
                           <tr>
                              <td colSpan={8} className="text-center py-12 text-gray-400 text-sm font-medium">
                                 No materials added. Click "Add Material" to start.
                              </td>
                           </tr>
                        ) : (
                           row.map((element, idx) => (
                              <tr key={element.sl} className="hover:bg-gray-700 transition-colors duration-150">
                                 <td className="px-8 py-4 font-medium text-gray-200 w-[80px]">{element.sl}</td>
                                 <td className="px-8 py-4 w-[600px]">
                                    <select
                                       aria-label="Select material"
                                       value={element.material_name}
                                       onChange={(e) => {
                                          setIndex(idx);
                                          giveBrandAndUnit(e, idx);
                                       }}
                                       className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                                    >
                                       <option value="">Select Material</option>
                                       {material.map((mat) => (
                                          <option key={mat} value={mat}>{mat}</option>
                                       ))}
                                    </select>
                                    {errors[`material_${idx}`] && (
                                       <p className="text-red-400 text-sm mt-1">{errors[`material_${idx}`]}</p>
                                    )}
                                 </td>
                                 <td className="px-8 py-4 w-[600px]">
                                    <select
                                       aria-label="Select brand"
                                       value={element.brand_name}
                                       onChange={(e) => {
                                          const newRow = [...row];
                                          newRow[idx].brand_name = e.target.value;
                                          setRow(newRow);
                                          unitRateFetch(idx);
                                       }}
                                       className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                                    >
                                       <option value="">Select Brand</option>
                                       {brand.map((br) => (
                                          <option key={br} value={br}>{br}</option>
                                       ))}
                                    </select>
                                    {errors[`brand_${idx}`] && (
                                       <p className="text-red-400 text-sm mt-1">{errors[`brand_${idx}`]}</p>
                                    )}
                                 </td>
                                 <td className="px-8 py-4 w-[600px]">
                                    <select
                                       aria-label="Select unit"
                                       value={element.unit_name}
                                       onChange={(e) => {
                                          const newRow = [...row];
                                          newRow[idx].unit_name = e.target.value;
                                          setRow(newRow);
                                          unitRateFetch(idx);
                                       }}
                                       className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                                    >
                                       <option value="">Select Unit</option>
                                       {unit.map((un) => (
                                          <option key={un} value={un}>{un}</option>
                                       ))}
                                    </select>
                                    {errors[`unit_${idx}`] && (
                                       <p className="text-red-400 text-sm mt-1">{errors[`unit_${idx}`]}</p>
                                    )}
                                 </td>
                                 <td className="px-8 py-4 w-[300px]">
                                    <input
                                       type="number"
                                       min="0"
                                       step="0.01"
                                       value={element.quantity || ""}
                                       placeholder="Quantity"
                                       onChange={(e) => {
                                          const newRow = [...row];
                                          newRow[idx].quantity = Number(e.target.value);
                                          setRow(newRow);
                                       }}
                                       className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                                    />
                                    {errors[`quantity_${idx}`] && (
                                       <p className="text-red-400 text-sm mt-1">{errors[`quantity_${idx}`]}</p>
                                    )}
                                 </td>
                                 <td className="px-8 py-4 w-[500px]">
                                    <input
                                       type="number"
                                       min="0"
                                       step="0.01"
                                       value={element.unit_rate || ""}
                                       placeholder="Unit Rate"
                                       onChange={(e) => {
                                          const newRow = [...row];
                                          newRow[idx].unit_rate = Number(e.target.value);
                                          setRow(newRow);
                                       }}
                                       className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                                    />
                                 </td>
                                 <td className="px-8 py-4 text-gray-200 w-[150px]">
                                    {(element.quantity * element.unit_rate).toFixed(2)}
                                 </td>
                                 <td className="px-8 py-4 text-center w-[100px]">
                                    <button
                                       type="button"
                                       onClick={() => {
                                          const newRow = row.filter((_, i) => i !== idx);
                                          setRow(newRow.map((item, i) => ({ ...item, sl: i + 1 })));
                                       }}
                                       className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600 transition-all duration-200"
                                       aria-label={`Delete material ${element.material_name || "row"}`}
                                    >
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             d="M6 18L18 6M6 6l12 12"
                                          />
                                       </svg>
                                    </button>
                                 </td>
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>
                  {errors.materials && <p className="text-red-400 text-sm mt-2">{errors.materials}</p>}
               </div>

               <div className="flex justify-between items-center mt-4">
                  <div>
                     <button
                        type="button"
                        onClick={addMaterialRow}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200"
                     >
                        + Add Material
                     </button>
                  </div>
                  <div className="text-white font-semibold">
                     Total Amount: ${totalAmount.toFixed(2)}
                  </div>
               </div>

               <div className="flex justify-end space-x-4 mt-6">
                  <button
                     type="button"
                     onClick={() => setAddEnable(false)}
                     className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200"
                  >
                     Save Purchase
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default AddPurchase;