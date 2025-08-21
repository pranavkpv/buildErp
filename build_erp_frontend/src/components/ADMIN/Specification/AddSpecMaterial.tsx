import { fetchBrandCorrespondingMaterial, fetchUniqueMaterial, fetchUnitCorrespondingMaterial, fetchUnitRate } from "../../../api/Admin/material";
import AppContext from "../../../Context/AppContext";
import  { useContext, useEffect, useState } from "react";

type listMaterail = {
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

function AddSpecMaterial() {
  const { AddMaterialEnable, setAddMaterialEnable, setAddLabourEnable, setMaterialDetails } = useContext(AppContext);
  if (!AddMaterialEnable) return null;

  const [material, setMaterial] = useState<string[]>([]);
  const [row, setRow] = useState<listMaterail[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: { [key: string]: string } }>({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const fetchMaterial = async () => {
    const materialList = await fetchUniqueMaterial();
    setMaterial(materialList.data);
  };

  useEffect(() => {
    fetchMaterial();
  }, []);

  const checkForDuplicate = (idx: number, newMaterial: string, newBrand: string, newUnit: string) => {
    return row.some((item, i) => {
      if (i === idx) return false; // Skip the current row
      return (
        item.material_name === newMaterial &&
        item.brand_name === newBrand &&
        item.unit_name === newUnit &&
        newMaterial !== "" &&
        newBrand !== "" &&
        newUnit !== ""
      );
    });
  };

  const giveBrandAndUnit = async (materialValue: string, idx: number) => {
    // Check for duplicate material before updating
    if (materialValue && row[idx].brand_name && row[idx].unit_name) {
      const isDuplicate = checkForDuplicate(idx, materialValue, row[idx].brand_name, row[idx].unit_name);
      if (isDuplicate) {
        setPopupMessage(`The combination of ${ materialValue }, ${ row[idx].brand_name }, and ${ row[idx].unit_name } is already added.`);
        setShowPopup(true);
        const newRow = [...row];
        newRow[idx].material_name = "";
        newRow[idx].brands = [];
        newRow[idx].units = [];
        setRow(newRow);
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[idx];
          return newErrors;
        });
        return;
      }
    }

    const brandData = await fetchBrandCorrespondingMaterial(materialValue);
    const unitData = await fetchUnitCorrespondingMaterial(materialValue);
    const newRow = [...row];
    newRow[idx] = {
      ...newRow[idx],
      material_name: materialValue,
      brand_name: "",
      unit_name: "",
      unit_rate: 0,
      material_id: "",
      brands: brandData.data || [],
      units: unitData.data || [],
    };
    setRow(newRow);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[idx];
      return newErrors;
    });
  };

  const unitRateFetch = async (index: number) => {
    const { material_name, brand_name, unit_name } = row[index];
    if (!material_name || !brand_name || !unit_name) return;

    // Check for duplicate before fetching unit rate
    const isDuplicate = checkForDuplicate(index, material_name, brand_name, unit_name);
    if (isDuplicate) {
      setPopupMessage(`The combination of ${ material_name }, ${ brand_name }, and ${ unit_name } is already added.`);
      setShowPopup(true);
      const newRow = [...row];
      newRow[index].unit_name = "";
      newRow[index].unit_rate = 0;
      newRow[index].material_id = "";
      setRow(newRow);
      return;
    }

    try {
      const response = await fetchUnitRate(material_name, unit_name, brand_name);
      const newRow = [...row];
      newRow[index].unit_rate = response.data.unit_rate || 0;
      newRow[index].material_id = response.data._id || "";
      setRow(newRow);
    } catch (error) {
      console.error("Error fetching unit rate:", error);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: { [key: string]: string } } = {};
    let isValid = true;

    row.forEach((element, idx) => {
      const rowErrors: { [key: string]: string } = {};

      if (!element.material_name) {
        rowErrors.material_name = "Material is required";
        isValid = false;
      }
      if (!element.brand_name) {
        rowErrors.brand_name = "Brand is required";
        isValid = false;
      }
      if (!element.unit_name) {
        rowErrors.unit_name = "Unit is required";
        isValid = false;
      }
      if (!element.quantity || element.quantity <= 0) {
        rowErrors.quantity = "Quantity must be greater than 0";
        isValid = false;
      }

      if (Object.keys(rowErrors).length > 0) {
        newErrors[idx] = rowErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      setAddMaterialEnable(false);
      setAddLabourEnable(true);
      const x = row.map((element) => ({
        material_id: element.material_id,
        quantity: element.quantity,
        unit_rate: element.unit_rate,
      }));
      setMaterialDetails(x);
    }
  };

  const calculateNetAmount = () => {
    return row.reduce((sum, item) => sum + (item.quantity * item.unit_rate), 0).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/90 border border-gray-700/50 rounded-2xl p-6 sm:p-8 max-w-6xl w-full mx-4 shadow-2xl">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">Add Material Details</h1>
        {showPopup && (
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 border border-gray-700/50 shadow-xl">
              <h2 className="text-lg font-semibold text-gray-100 mb-4">Duplicate Material</h2>
              <p className="text-gray-300 text-sm mb-6">{popupMessage}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">SL No</th>
                <th className="px-6 py-4">Material Name</th>
                <th className="px-6 py-4">Brand Name</th>
                <th className="px-6 py-4">Unit Name</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Unit Rate</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {row.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400 text-sm font-medium">
                    No materials added. Click "Add Material" to start.
                  </td>
                </tr>
              ) : (
                row.map((element, idx) => (
                  <tr key={element.sl} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-200">{element.sl}</td>
                    <td className="px-6 py-4">
                      <select
                        aria-label="Select material"
                        value={element.material_name}
                        onChange={(e) => giveBrandAndUnit(e.target.value, idx)}
                        className={`w-full px-4 py-2 bg-gray-800/50 border ${ errors[idx]?.material_name ? "border-red-500" : "border-gray-600"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium`}
                      >
                        <option value="" className="text-gray-400">Select Material</option>
                        {material.map((mat) => (
                          <option key={mat} value={mat} className="text-gray-100">{mat}</option>
                        ))}
                      </select>
                      {errors[idx]?.material_name && (
                        <p className="mt-1 text-red-500 text-xs">{errors[idx].material_name}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        aria-label="Select brand"
                        value={element.brand_name}
                        onChange={(e) => {
                          const newRow = [...row];
                          const newBrand = e.target.value;
                          if (newRow[idx].material_name && newBrand && newRow[idx].unit_name) {
                            const isDuplicate = checkForDuplicate(idx, newRow[idx].material_name, newBrand, newRow[idx].unit_name);
                            if (isDuplicate) {
                              setPopupMessage(`The combination of ${ newRow[idx].material_name }, ${ newBrand }, and ${ newRow[idx].unit_name } is already added.`);
                              setShowPopup(true);
                              newRow[idx].brand_name = "";
                              newRow[idx].unit_name = "";
                              newRow[idx].unit_rate = 0;
                              newRow[idx].material_id = "";
                              setRow(newRow);
                              return;
                            }
                          }
                          newRow[idx].brand_name = newBrand;
                          newRow[idx].unit_name = "";
                          newRow[idx].unit_rate = 0;
                          newRow[idx].material_id = "";
                          setRow(newRow);
                          unitRateFetch(idx);
                        }}
                        className={`w-full px-4 py-2 bg-gray-800/50 border ${ errors[idx]?.brand_name ? "border-red-500" : "border-gray-600"
                          } rounde
d-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium`}
                      >
                        <option value="" className="text-gray-400">Select Brand</option>
                        {element.brands.map((br) => (
                          <option key={br} value={br} className="text-gray-100">{br}</option>
                        ))}
                      </select>
                      {errors[idx]?.brand_name && (
                        <p className="mt-1 text-red-500 text-xs">{errors[idx].brand_name}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        aria-label="Select unit"
                        value={element.unit_name}
                        onChange={(e) => {
                          const newRow = [...row];
                          const newUnit = e.target.value;
                          if (newRow[idx].material_name && newRow[idx].brand_name && newUnit) {
                            const isDuplicate = checkForDuplicate(idx, newRow[idx].material_name, newRow[idx].brand_name, newUnit);
                            if (isDuplicate) {
                              setPopupMessage(`The combination of ${ newRow[idx].material_name }, ${ newRow[idx].brand_name }, and ${ newUnit } is already added.`);
                              setShowPopup(true);
                              newRow[idx].unit_name = "";
                              newRow[idx].unit_rate = 0;
                              newRow[idx].material_id = "";
                              setRow(newRow);
                              return;
                            }
                          }
                          newRow[idx].unit_name = newUnit;
                          setRow(newRow);
                          unitRateFetch(idx);
                        }}
                        className={`w-full px-4 py-2 bg-gray-800/50 border ${ errors[idx]?.unit_name ? "border-red-500" : "border-gray-600"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium`}
                      >
                        <option value="" className="text-gray-400">Select Unit</option>
                        {element.units.map((un) => (
                          <option key={un} value={un} className="text-gray-100">{un}</option>
                        ))}
                      </select>
                      {errors[idx]?.unit_name && (
                        <p className="mt-1 text-red-500 text-xs">{errors[idx].unit_name}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={element.quantity || ""}
                        placeholder="Quantity"
                        onChange={(e) => {
                          const newRow = [...row];
                          newRow[idx].quantity = Number(e.target.value);
                          setRow(newRow);
                        }}
                        className={`w-full px-4 py-2 bg-gray-800/50 border ${ errors[idx]?.quantity ? "border-red-500" : "border-gray-600"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium`}
                      />
                      {errors[idx]?.quantity && (
                        <p className="mt-1 text-red-500 text-xs">{errors[idx].quantity}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={element.unit_rate || ""}
                        placeholder="Unit Rate"
                        readOnly
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm font-medium"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {(element.quantity * element.unit_rate).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          const newRow = row.filter((_, i) => i !== idx);
                          setRow(newRow.map((item, i) => ({ ...item, sl: i + 1 })));
                          setErrors({});
                        }}
                        className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Delete material ${ element.material_name || "row" }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {row.length > 0 && (
          <div className="mt-4 text-right">
            <p className="text-gray-200 text-sm font-semibold">
              Net Amount: <span className="text-teal-400">₹{calculateNetAmount()}</span>
            </p>
          </div>
        )}
        <div className="flex justify-between mt-6 gap-3">
          <button
            onClick={() => {
              const newRow = [...row, { sl: row.length + 1, material_name: "", brand_name: "", unit_name: "", unit_rate: 0, material_id: "", quantity: 0, brands: [], units: [] }];
              setRow(newRow);
            }}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
          >
            + Add Material
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => setAddMaterialEnable(false)}
              className="px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-200 font-semibold text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSpecMaterial;