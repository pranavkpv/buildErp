import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSitemanagersProject } from "../../../api/Sitemanager/profile";

import TransferModal from "./TransferModal";
import { updateReceiveAPI } from "../../../api/Sitemanager/receive";
import Loading from "../../../components/Loading";

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

type ReceiveData = {
  _id: string;
  project_id: string;
  Toproject_name: string;
  description: string;
  date: string;
  transferDetails: any[];
  materialData: listMaterial[];
  finalAmount: number;
};

type EditReceiveProps = {
  editId: string;
  editEnable: boolean;
  setEditEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onEditSuccess: () => void;
  editData?: ReceiveData;
};

function EditReceive({ editId, editEnable, setEditEnable, onEditSuccess, editData }: EditReceiveProps) {
  if (!editEnable || !editData) return null;
  const [row, setRow] = useState<listMaterial[]>(editData.materialData || []);
  const [project_id, setProjectId] = useState(editData.project_id || "");
  const [date, setDate] = useState(editData.date || "");
  const [description, setDescription] = useState(editData.description || "");
  const [project, setProject] = useState<Project[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const [transferId, setTransferId] = useState<string[]>(editData.transferDetails.map((t) => t._id) || []);
  const [loadOn, setLoadOn] = useState(false)

  const fetchProject = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("No access token found");
      return;
    }
    const response = await getSitemanagersProject();
    if (response.success) {
      setProject(response.data);
    } else {
      toast.error("Error fetching projects");
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const validateShowButton = () => {
    const newErrors: { [key: string]: string } = {};
    if (!project_id) newErrors.project = "Please select a project";
    if (!date) newErrors.date = "Please select a date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShowTransferList = () => {
    if (!validateShowButton()) {
      toast.error("Please fill project name and date");
      return;
    }
    setOpen(true);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!project_id) newErrors.project = "Project is required";
    if (!date) newErrors.date = "Purchase date is required";
    if (row.length === 0) newErrors.materials = "At least one material is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateReceive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      if (row.length === 0) {
        toast.error("Please add at least one material before saving", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error("Please fill all required fields");
      }
      return;
    }

    const materialDetails = row.map((element) => ({
      material_id: element.material_id,
      quantity: element.quantity,
      unit_rate: element.unit_rate,
    }));
    setLoadOn(true)
    const response = await updateReceiveAPI(editId, project_id, date, description, materialDetails, transferId);
    setLoadOn(false)
    if (response.success) {
      toast.success(response.message);
      setEditEnable(false);
      onEditSuccess();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 w-full">
      <div className="bg-gray-800 ml-20 rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Purchase</h2>
        <form onSubmit={handleUpdateReceive} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                aria-label="Select project"
                value={project_id}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
              >
                <option value={editData.project_id}>{editData.Toproject_name}</option>
                {project.map((element) => (
                  <option key={element._id} value={element._id}>
                    {element.project_name}
                  </option>
                ))}
              </select>
              {errors.project && <p className="text-red-400 text-sm mt-1">{errors.project}</p>}
            </div>
            <div>
              <input
                placeholder="Select date"
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
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
            <div>
              <button
                type="button"
                onClick={handleShowTransferList}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200"
              >
                Show Transfer List
              </button>
            </div>
          </div>
          <TransferModal
            projectId={project_id}
            date={date}
            setOpen={setOpen}
            open={open}
            setTransferId={setTransferId}
            transferId={transferId}
            setMaterials={setRow}
          />
          <Loading loadOn={loadOn} />
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {row.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-gray-400 text-sm font-medium">
                      No materials added. Select a transfer to populate materials.
                    </td>
                  </tr>
                ) : (
                  row.map((element, idx) => (
                    <tr key={element.sl} className="hover:bg-gray-700 transition-colors duration-150">
                      <td className="px-8 py-4 font-medium text-gray-200 w-[80px]">{idx + 1}</td>
                      <td className="px-8 py-4 w-[600px]">
                        <select
                          aria-label="Select material"
                          value={element.material_name}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                          disabled
                        >
                          <option value={element.material_id}>{element.material_name}</option>
                        </select>
                        {errors[`material_${ idx }`] && (
                          <p className="text-red-400 text-sm mt-1">{errors[`material_${ idx }`]}</p>
                        )}
                      </td>
                      <td className="px-8 py-4 w-[600px]">
                        <select
                          aria-label="Select brand"
                          value={element.brand_name}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                          disabled
                        >
                          <option value={element.brand_name}>{element.brand_name}</option>
                        </select>
                        {errors[`brand_${ idx }`] && (
                          <p className="text-red-400 text-sm mt-1">{errors[`brand_${ idx }`]}</p>
                        )}
                      </td>
                      <td className="px-8 py-4 w-[600px]">
                        <select
                          aria-label="Select unit"
                          value={element.unit_name}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                          disabled
                        >
                          <option value={element.unit_name}>{element.unit_name}</option>
                        </select>
                        {errors[`unit_${ idx }`] && (
                          <p className="text-red-400 text-sm mt-1">{errors[`unit_${ idx }`]}</p>
                        )}
                      </td>
                      <td className="px-8 py-4 w-[300px]">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={element.quantity || ""}
                          placeholder="Quantity"
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                          disabled
                        />
                        {errors[`quantity_${ idx }`] && (
                          <p className="text-red-400 text-sm mt-1">{errors[`quantity_${ idx }`]}</p>
                        )}
                      </td>
                      <td className="px-8 py-4 w-[500px]">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={element.unit_rate || ""}
                          placeholder="Unit Rate"
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                          disabled
                        />
                      </td>
                      <td className="px-8 py-4 text-gray-200 w-[150px]">
                        {(element.quantity * element.unit_rate).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {errors.materials && <p className="text-red-400 text-sm mt-2">{errors.materials}</p>}
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
              Update Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditReceive;