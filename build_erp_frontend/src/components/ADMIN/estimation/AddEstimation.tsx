import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import {  getSpec, sumOfLabourFun, sumOfMaterialFun } from "../../../api/Specification";
import { getPendingAllProject, getProjectAll } from "../../../api/project";
import { EstimationSave } from "../../../api/Estimation";

type rowData = {
  spec_id: string;
  spec_name: string;
  unitrate: number;
  quantity: number;
  total: number;
};

interface materialDetails {
  material_id: string;
  quantity: number;
}

interface labourDetails {
  labour_id: string;
  numberoflabour: number;
}

interface Specification {
  _id: string;
  spec_id: string;
  spec_name: string;
  spec_unit: string;
  description: string;
  materialDetails: materialDetails[];
  labourDetails: labourDetails[];
  additionalExpense_per: number;
  profit_per: number;
}

type addProps = {
  addEnable: boolean;
  setAddEnable: React.Dispatch<React.SetStateAction<boolean>>;
  anAddSuccess: () => void;
  projectIds: string[];
};

type Project = {
  _id: string;
  project_name: string;
};

function AddEstimation({ addEnable, setAddEnable, anAddSuccess, projectIds }: addProps) {
  if (!addEnable) return null;

  const [project, setProject] = useState<Project[]>([]);
  const [spec, setSpec] = useState<Specification[]>([]);
  const [row, setRow] = useState<rowData[]>([]);
  const [finalAmount, setFinalAmount] = useState(0);
  const [projectId, setProjectId] = useState("");

  const fetchProject = async () => {
    const response = await getPendingAllProject();
    setProject(response.data);
  };

  const fetchSpec = async () => {
    const response = await getSpec();
    setSpec(response.data);
  };

  async function fetchSumOfMat(materialDetails: { material_id: string; quantity: number }[]): Promise<number> {
    const data = await sumOfMaterialFun(materialDetails);
    return data.data;
  }

  async function fetSumOfLabour(labourDetails: { labour_id: string; numberoflabour: number }[]) {
    const data = await sumOfLabourFun(labourDetails);
    return data.data;
  }

  const findSpecRate = async (
    materialDetails: { material_id: string; quantity: number }[],
    labourDetails: { labour_id: string; numberoflabour: number }[],
    additionalExpense_per: number,
    profit_per: number,
    index: number,
    specId: string,
    specname: string
  ) => {
    for (let element of row) {
      if (element.spec_id === specId && row[index].spec_id !== specId) {
        toast.error("Specification already selected in another row");
        return;
      }
    }
    const sumOfMaterial = await fetchSumOfMat(materialDetails);
    const sumOfLabour = await fetSumOfLabour(labourDetails);
    const sum = sumOfMaterial + sumOfLabour;
    const finalAmount = sum + (sum * additionalExpense_per) / 100 + (sum + (sum * additionalExpense_per) / 100) * (profit_per / 100);
    const updateRow = [...row];
    updateRow[index].unitrate = finalAmount;
    updateRow[index].spec_id = specId;
    updateRow[index].spec_name = specname;
    updateRow[index].total = updateRow[index].unitrate * updateRow[index].quantity || 0;
    setRow(updateRow);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    fetchSpec();
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let char of row) {
      sum += char.total;
    }
    setFinalAmount(sum);
  }, [row]);

  const SaveEstimation = async () => {
    // Validation: Check if projectId is selected
    if (!projectId) {
      toast.error("Please select a project.");
      return;
    }

    // Validation: Check for duplicate spec_id
    const specIds = row.map((r) => r.spec_id);
    const uniqueSpecIds = new Set(specIds);
    if (uniqueSpecIds.size !== specIds.length) {
      toast.error("Duplicate specification IDs detected. Each row must have a unique specification.");
      return;
    }

  
    if (row.some((r) => r.total === 0)) {
      toast.error("All specification rows must have a total greater than 0.");
      return;
    }


    if (row.some((r) => r.spec_id === "")) {
      toast.error("Please select a specification ID for all rows.");
      return;
    }
      const response = await EstimationSave(projectId, row);
      if (response.success) {
        toast.success(response.message);
        setAddEnable(false);
        anAddSuccess();
      } else {
        toast.error(response.message);
      }
      
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-gray-700/50">
        <h1 className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4">
          Add Estimation
        </h1>

        <div className="grid grid-cols-1 gap-6 mb-6">
          {/* Project Selection */}
          <div>
            <label htmlFor="projectSelect" className="block text-sm font-medium text-gray-200 mb-1">
              Project
            </label>
            <select
              id="projectSelect"
              aria-label="Select a project"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
              onChange={(e) => {
                if (projectIds.includes(e.target.value)) {
                  toast.error("Project already exists");
                  e.target.value = "";
                  return;
                }
                setProjectId(e.target.value);
              }}
              value={projectId}
            >
              <option value="">Select Project</option>
              {project.map((element) => (
                <option key={element._id} value={element._id}>
                  {element.project_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Specification Rows Section */}
        <div className="mb-4 pt-4 border-t border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-100">Specification Details</h3>
            <button
              onClick={() => {
                setRow([...row, { spec_id: "", spec_name: "", unitrate: 0, quantity: 0, total: 0 }]);
              }}
              type="button"
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2"
            >
              <PlusCircleIcon className="h-5 w-5" /> Add Specification Row
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-700/50">
            <table className="min-w-full text-sm text-left bg-gray-800/50">
              <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Spec ID</th>
                  <th className="px-6 py-4">Spec Name</th>
                  <th className="px-6 py-4">Unit Rate</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {row.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400 text-sm font-medium">
                      Click "Add Specification Row" to add specifications.
                    </td>
                  </tr>
                ) : (
                  row.map((element, index) => (
                    <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <select
                          aria-label="Select a specification"
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                          onChange={(e) => {
                            const x = spec.find((item) => item.spec_id === e.target.value);
                            if (x) {
                              findSpecRate(
                                x.materialDetails,
                                x.labourDetails,
                                x.additionalExpense_per || 0,
                                x.profit_per || 0,
                                index,
                                x.spec_id,
                                x.spec_name
                              );
                            }
                          }}
                          value={element.spec_id}
                        >
                          <option value="">Select Spec ID</option>
                          {spec.map((item) => (
                            <option key={item.spec_id} value={item.spec_id}>
                              {item.spec_id}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 text-sm"
                          value={element.spec_name}
                          readOnly
                          placeholder="Spec Name"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 text-sm"
                          value={element.unitrate === 0 ? "" : element.unitrate}
                          placeholder="Unit Rate"
                          readOnly
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                          placeholder="Enter quantity"
                          onChange={(e) => {
                            const updateRow = [...row];
                            updateRow[index].quantity = Number(e.target.value);
                            updateRow[index].total = updateRow[index].unitrate * updateRow[index].quantity;
                            setRow(updateRow);
                          }}
                          value={element.quantity === 0 ? "" : element.quantity}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 text-sm"
                          value={element.total === 0 ? "" : element.total}
                          placeholder="Total"
                          readOnly
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                          aria-label="Delete specification row"
                          onClick={() => {
                            const updateRow = row.filter((_, itemIndex) => {
                              return itemIndex !== index;
                            });
                            setRow(updateRow);
                          }}
                        >
                          <MinusCircleIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final Amount and Buttons */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-700">
          <p className="text-lg font-semibold text-gray-100">Final Amount: ₹{finalAmount.toLocaleString()}</p>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
              onClick={() => setAddEnable(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={SaveEstimation}
              className="bg-teal-500/90 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
            >
              Save Estimation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEstimation;