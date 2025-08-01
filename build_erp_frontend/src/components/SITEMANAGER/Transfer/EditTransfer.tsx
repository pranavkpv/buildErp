import { useEffect, useState } from "react";
import { fetchBrandCorrespondingMaterial, fetchUniqueMaterial, fetchUnitCorrespondingMaterial, fetchUnitRate } from "../../../api/Admin/material";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { getSitemanagersProject } from "../../../api/Sitemanager/profile";
import type { Transfer } from "./TransferList";
import { ToProjectFetchAPI, updateTransferAPI } from "../../../api/Sitemanager/transfer";

type editProps = {
  editId: string;
  editEnable: boolean;
  setEditEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onEditSuccess: () => void;
  editData: Transfer | undefined;
};

type listMaterial = {
  sl: number;
  material_name: string;
  brand_name: string;
  unit_name: string;
  unit_rate: number;
  material_id: string;
  quantity: number;
  brands: string[];
  units: string[];
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

function EditTransfer({ editId, editEnable, setEditEnable, onEditSuccess, editData }: editProps) {
  if (!editEnable) return null;

  const [material, setMaterial] = useState<string[]>([]);
  const [fromproject, setFromProject] = useState<Project[]>([]);
  const [toproject, setToProject] = useState<Project[]>([]);
  const [row, setRow] = useState<listMaterial[]>(
    editData?.materialDetails
      ? editData.materialDetails.map((item, index) => ({
          sl: index + 1,
          material_name: item.material_name || "",
          brand_name: item.brand_name || "",
          unit_name: item.unit_name || "",
          unit_rate: item.unit_rate || 0,
          material_id: item.material_id || "",
          quantity: item.quantity || 0,
          brands: [],
          units: [],
        }))
      : []
  );
  const [fromproject_id, setFromProjectId] = useState(editData?.from_project_id || "");
  const [to_project_id, setToProjectId] = useState(editData?.to_project_id || "");
  const [transfer_id, setTransferId] = useState(editData?.transfer_id || "");
  const [date, setDate] = useState(editData?.date || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fetchMaterial = async () => {
    const materialList = await fetchUniqueMaterial();
    setMaterial(materialList.data || []);
  };

  const fetchProject = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("No access token found");
      return;
    }
    const decode: JwtPayload = jwtDecode(token);
    const response = await getSitemanagersProject(decode.userId);
    setFromProject(response.data || []);
  };

  const fetchToProject = async (fromProjectId: string) => {
    if (!fromProjectId) return;
    const response = await ToProjectFetchAPI(fromProjectId);
    if (response.success) {
      setToProject(response.data || []);
    } else {
      toast.error("Failed to fetch To Projects");
      setToProject([]);
    }
  };

  const giveBrandAndUnit = async (materialName: string, idx: number) => {
    if (row.some((item, i) => i !== idx && item.material_name === materialName)) {
      setErrors((prev) => ({ ...prev, [`material_${idx}`]: "Material already selected" }));
      return;
    }
    setErrors((prev) => ({ ...prev, [`material_${idx}`]: "" }));

    const brandData = await fetchBrandCorrespondingMaterial(materialName);
    const unitData = await fetchUnitCorrespondingMaterial(materialName);

    const newRow = [...row];
    newRow[idx] = {
      ...newRow[idx],
      material_name: materialName,
      brand_name: "",
      unit_name: "",
      unit_rate: 0,
      material_id: "",
      brands: brandData.data || [],
      units: unitData.data || [],
    };
    setRow(newRow);
  };

  const unitRateFetch = async (index: number) => {
    const { material_name, brand_name, unit_name } = row[index];
    if (!material_name || !brand_name || !unit_name) return;
    const response = await fetchUnitRate(material_name, unit_name, brand_name);
    const newRow = [...row];
    newRow[index] = {
      ...newRow[index],
      unit_rate: response.data.unit_rate || 0,
      material_id: response.data._id || "",
    };
    setRow(newRow);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fromproject_id) newErrors.fromproject = "From project is required";
    if (!to_project_id) newErrors.to_project = "To project is required";
    if (!transfer_id) newErrors.transfer = "Transfer ID is required";
    if (!date) newErrors.date = "Transfer date is required";
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

  const editTransferFun = async (e: React.FormEvent) => {
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

    const response = await updateTransferAPI(
      editId,
      fromproject_id,
      to_project_id,
      transfer_id,
      date,
      description,
      materialDetails
    );
    if (response.success) {
      toast.success(response.message);
      onEditSuccess();
      setEditEnable(false);
    } else {
      toast.error(response.message);
    }
  };

  const addMaterialRow = () => {
    setRow([
      ...row,
      {
        sl: row.length + 1,
        material_name: "",
        brand_name: "",
        unit_name: "",
        unit_rate: 0,
        material_id: "",
        quantity: 0,
        brands: [],
        units: [],
      },
    ]);
  };

  useEffect(() => {
    fetchMaterial();
    fetchProject();
    // Fetch To Projects if from_project_id exists in editData
    if (editData?.from_project_id) {
      fetchToProject(editData.from_project_id);
    }

    const fetchInitialData = async () => {
      if (editData?.materialDetails) {
        const updatedRows = await Promise.all(
          editData.materialDetails.map(async (item, index) => {
            const brandData = await fetchBrandCorrespondingMaterial(item.material_name);
            const unitData = await fetchUnitCorrespondingMaterial(item.material_name);
            return {
              sl: index + 1,
              material_name: item.material_name || "",
              brand_name: item.brand_name || "",
              unit_name: item.unit_name || "",
              unit_rate: item.unit_rate || 0,
              material_id: item.material_id || "",
              quantity: item.quantity || 0,
              brands: brandData.data || [],
              units: unitData.data || [],
            };
          })
        );
        setRow(updatedRows);
      }
    };

    fetchInitialData();
  }, [editData]);

  const totalAmount = row.reduce((sum, item) => sum + item.quantity * item.unit_rate, 0);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 w-full">
      <div className="bg-gray-800 ml-20 rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Transfer</h2>
        <form onSubmit={editTransferFun} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                aria-label="Select from project"
                value={fromproject_id}
                onChange={(e) => {
                  const selectedProjectId = e.target.value;
                  setFromProjectId(selectedProjectId);
                  fetchToProject(selectedProjectId); // Fetch To Projects when From Project changes
                }}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
              >
                <option value="">Select From Project</option>
                {fromproject.map((element) => (
                  <option key={element._id} value={element._id}>
                    {element.project_name}
                  </option>
                ))}
              </select>
              {errors.fromproject && <p className="text-red-400 text-sm mt-1">{errors.fromproject}</p>}
            </div>

            <div>
              <select
                aria-label="Select to project"
                value={to_project_id}
                onChange={(e) => setToProjectId(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
              >
                <option value="">Select To Project</option>
                {toproject.map((element) => (
                  <option key={element._id} value={element._id}>
                    {element.project_name}
                  </option>
                ))}
              </select>
              {errors.to_project && <p className="text-red-400 text-sm mt-1">{errors.to_project}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Transfer ID"
                value={transfer_id}
                onChange={(e) => setTransferId(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
              />
              {errors.transfer && <p className="text-red-400 text-sm mt-1">{errors.transfer}</p>}
            </div>
            <div>
              <input
                placeholder="Select date"
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
                          onChange={(e) => giveBrandAndUnit(e.target.value, idx)}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                        >
                          <option value="">Select Material</option>
                          {material.map((mat) => (
                            <option key={mat} value={mat}>
                              {mat}
                            </option>
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
                          {element.brands.map((br) => (
                            <option key={br} value={br}>
                              {br}
                            </option>
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
                          {element.units.map((un) => (
                            <option key={un} value={un}>
                              {un}
                            </option>
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
                            const newRow = row.filter((_, i) => i !== idx).map((item, i) => ({ ...item, sl: i + 1 }));
                            setRow(newRow);
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
            <div className="text-white font-semibold">Total Amount: ${totalAmount.toFixed(2)}</div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => setEditEnable(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200"
            >
              Save Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTransfer;