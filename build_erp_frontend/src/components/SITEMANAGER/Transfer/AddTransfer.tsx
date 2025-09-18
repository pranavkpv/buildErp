import { getSitemanagersProject } from "../../../api/Sitemanager/profile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchFullStockApi, saveTransferApI, ToProjectFetchAPI } from "../../../api/Sitemanager/transfer";

type SetAdd = {
  addEnable: boolean;
  setAddEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onAddSuccess: () => void;
};

type ListMaterial = {
  sl: number;
  material_name: string;
  brand_name: string;
  unit_name: string;
  unit_rate: number;
  material_id: string;
  stock: number;
  quantity: number;
  select: boolean;
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

function AddTransfer({ addEnable, setAddEnable, onAddSuccess }: SetAdd) {
  if (!addEnable) return null;

  const [row, setRow] = useState<ListMaterial[]>([]);
  const [fromProjectId, setFromProjectId] = useState("");
  const [toProjectId, setToProjectId] = useState("");
  const [transferId, setTransferId] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [fromProject, setFromProject] = useState<Project[]>([]);
  const [toProject, setToProject] = useState<Project[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fetchProject = async () => {
    try {
      const response = await getSitemanagersProject();
      if (response.success) {
        setFromProject(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fromProjectId) newErrors.project = "From Project is required";
    if (!toProjectId) newErrors.toProject = "To Project is required";
    if (!transferId) newErrors.invoice = "Transfer ID is required";
    if (!date) newErrors.date = "Transfer date is required";
    if (row.length === 0) newErrors.materials = "At least one material is required";
    row.forEach((item, idx) => {
      if (!item.material_name) newErrors[`material_${idx}`] = "Material is required";
      if (!item.brand_name) newErrors[`brand_${idx}`] = "Brand is required";
      if (!item.unit_name) newErrors[`unit_${idx}`] = "Unit is required";
      if (!item.quantity || item.quantity <= 0)
        newErrors[`quantity_${idx}`] = "Valid quantity is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendRequestFun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    const materialDetails = row
      .filter((element) => element.select)
      .map((element) => ({
        material_id: element.material_id,
        quantity: element.quantity,
        unit_rate: element.unit_rate,
      }));

    try {
      const response = await saveTransferApI(
        fromProjectId,
        toProjectId,
        transferId,
        date,
        description,
        materialDetails
      );
      if (response.success) {
        toast.success(response.message);
        setAddEnable(false);
        onAddSuccess();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to save transfer");
    }
  };

  const fetchToProject = async (projectId: string) => {
    try {
      const response = await ToProjectFetchAPI(projectId);
      if (response.success) {
        setToProject(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch target projects");
    }
  };

  const fetchStock = async (projectId: string) => {
    try {
      const response = await fetchFullStockApi(projectId);
      if (response.success) {
        setRow(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch stock");
    }
  };

  const totalAmount = row
    .filter((element) => element.select)
    .reduce((sum, item) => sum + item.quantity * item.unit_rate, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="bg-gray-900 rounded-lg shadow-xl w-full max-w-5xl mx-4 p-6 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2
          id="modal-title"
          className="text-2xl font-semibold text-gray-100 mb-6 tracking-tight"
        >
          Add Material Transfer
        </h2>
        <form onSubmit={sendRequestFun} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="from-project"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                From Project
              </label>
              <select
                id="from-project"
                aria-label="Select From project"
                value={fromProjectId}
                onChange={(e) => {
                  setFromProjectId(e.target.value);
                  fetchToProject(e.target.value);
                  fetchStock(e.target.value);
                }}
                className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm"
              >
                <option value="">Select Project</option>
                {fromProject.map((element) => (
                  <option key={element._id} value={element._id}>
                    {element.project_name}
                  </option>
                ))}
              </select>
              {errors.project && (
                <p className="text-red-400 text-sm mt-1">{errors.project}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="to-project"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                To Project
              </label>
              <select
                id="to-project"
                aria-label="Select To project"
                value={toProjectId}
                onChange={(e) => setToProjectId(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm"
              >
                <option value="">Select Project</option>
                {toProject.map((element) => (
                  <option key={element._id} value={element._id}>
                    {element.project_name}
                  </option>
                ))}
              </select>
              {errors.toProject && (
                <p className="text-red-400 text-sm mt-1">{errors.toProject}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="transfer-id"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Transfer ID
              </label>
              <input
                id="transfer-id"
                type="text"
                placeholder="Enter Transfer ID"
                value={transferId}
                onChange={(e) => setTransferId(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm"
              />
              {errors.invoice && (
                <p className="text-red-400 text-sm mt-1">{errors.invoice}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Transfer Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm"
              />
              {errors.date && (
                <p className="text-red-400 text-sm mt-1">{errors.date}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Description
              </label>
              <input
                id="description"
                type="text"
                placeholder="Enter description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-800 shadow-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-900/80 text-gray-300 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3.5 w-16">SL No</th>
                  <th className="px-4 py-3.5">Material</th>
                  <th className="px-4 py-3.5">Brand</th>
                  <th className="px-4 py-3.5">Unit</th>
                  <th className="px-4 py-3.5">Stock</th>
                  <th className="px-4 py-3.5 w-32">Quantity</th>
                  <th className="px-4 py-3.5 w-32">Unit Rate</th>
                  <th className="px-4 py-3.5 w-24">Total</th>
                  <th className="px-4 py-3.5 w-16 text-center">Select</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {row.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="text-center py-8 text-gray-400 text-sm font-medium"
                    >
                      No materials available. Select a project to load stock.
                    </td>
                  </tr>
                ) : (
                  row.map((element, idx) => (
                    <tr
                      key={element.material_id}
                      className="hover:bg-gray-800/50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3.5 text-gray-100 w-16">{idx+1}</td>
                      <td className="px-4 py-3.5 text-gray-100">
                        {element.material_name}
                        {errors[`material_${idx}`] && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors[`material_${idx}`]}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-gray-100">
                        {element.brand_name}
                        {errors[`brand_${idx}`] && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors[`brand_${idx}`]}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-gray-100">
                        {element.unit_name}
                        {errors[`unit_${idx}`] && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors[`unit_${idx}`]}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-gray-100">{element.stock}</td>
                      <td className="px-4 py-3.5 w-32">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={element.quantity || ""}
                          placeholder="Qty"
                          onChange={(e) => {
                            const newRow = [...row];
                            newRow[idx].quantity = Number(e.target.value);
                            setRow(newRow);
                          }}
                          className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm"
                        />
                        {errors[`quantity_${idx}`] && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors[`quantity_${idx}`]}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3.5 w-32">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={element.unit_rate || ""}
                          placeholder="Rate"
                          onChange={(e) => {
                            const newRow = [...row];
                            newRow[idx].unit_rate = Number(e.target.value);
                            setRow(newRow);
                          }}
                          className="w-full px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3.5 text-gray-100 w-24">
                        {(element.quantity * element.unit_rate).toFixed(2) || 0}
                      </td>
                      <td className="px-4 py-3.5 text-center w-16">
                        <input
                        aria-label="select stock"
                          type="checkbox"
                          checked={element.select}
                          onChange={() => {
                            const newRow = [...row];
                            newRow[idx].select = !newRow[idx].select;
                            setRow(newRow);
                          }}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-800"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {errors.materials && (
              <p className="text-red-400 text-sm mt-2">{errors.materials}</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-gray-100 font-semibold text-sm">
              Total Amount: ₹{totalAmount.toFixed(2)}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setAddEnable(false)}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md text-sm font-medium 
                hover:bg-gray-600 hover:text-indigo-300 transition-all duration-200 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium 
                hover:bg-indigo-700 transition-all duration-200 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransfer;