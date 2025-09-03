import { fetchBrandCorrespondingMaterial, fetchUniqueMaterial, fetchUnitCorrespondingMaterial, fetchUnitRate } from "../../../api/Admin/material";
import AppContext from "../../../Context/AppContext";
import React, { useContext, useEffect, useState } from "react";

type listMaterail = {
  sl: number;
  material_name: string;
  brand_name: string;
  unit_name: string;
  unit_rate: number;
  material_id: string;
  quantity: number;
};

interface Props {
  editrow: listMaterail[];
}

function EditSpecMaterial({ editrow }: Props) {
  const { editMaterialEnable, setEditMaterialEnable, setEditLabourEnable, setEditMaterialDetails } = useContext(AppContext);
  if (!editMaterialEnable) return null;

  const [material, setMaterial] = useState<string[]>([]);
  const [brandOptions, setBrandOptions] = useState<{ [key: number]: string[] }>({});
  const [unitOptions, setUnitOptions] = useState<{ [key: number]: string[] }>({});
  const [row, setRow] = useState<listMaterail[]>(editrow);
  const [errors, setErrors] = useState<{ [key: string]: { [key: string]: string } }>({});

  const fetchMaterial = async () => {
    const materialList = await fetchUniqueMaterial();
    setMaterial(materialList.data);
  };

  const initializeRowBrandsAndUnits = async (rows: listMaterail[]) => {
    const updatedRows = await Promise.all(
      rows.map(async (row, idx) => {
        if (row.material_name) {
          const brandData = await fetchBrandCorrespondingMaterial(row.material_name);
          const unitData = await fetchUnitCorrespondingMaterial(row.material_name);

          setBrandOptions((prev) => ({ ...prev, [idx]: brandData.data || [] }));
          setUnitOptions((prev) => ({ ...prev, [idx]: unitData.data || [] }));
        }
        return { ...row };
      })
    );
    setRow(updatedRows);

    // fetch unit rate for rows
    updatedRows.forEach((row, idx) => {
      if (row.material_name && row.brand_name && row.unit_name) {
        unitRateFetch(idx);
      }
    });
  };

  useEffect(() => {
    fetchMaterial();
    if (editrow.length > 0) {
      initializeRowBrandsAndUnits(editrow);
    } else {
      setRow([{ sl: 1, material_name: "", brand_name: "", unit_name: "", unit_rate: 0, material_id: "", quantity: 0 }]);
    }
  }, [editrow]);

  const giveBrandAndUnit = async (idx: number, value: string) => {
    const brandData = await fetchBrandCorrespondingMaterial(value);
    const unitData = await fetchUnitCorrespondingMaterial(value);

    const newRow = [...row];
    newRow[idx].material_name = value;
    newRow[idx].brand_name = "";
    newRow[idx].unit_name = "";
    newRow[idx].unit_rate = 0;
    newRow[idx].material_id = "";
    setRow(newRow);

    setBrandOptions((prev) => ({ ...prev, [idx]: brandData.data || [] }));
    setUnitOptions((prev) => ({ ...prev, [idx]: unitData.data || [] }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[idx];
      return newErrors;
    });
  };

  const unitRateFetch = async (index: number) => {
    if (!row[index].material_name || !row[index].brand_name || !row[index].unit_name) return;
    try {
      const response = await fetchUnitRate(
        row[index].material_name,
        row[index].unit_name,
        row[index].brand_name
      );

      const newRow = [...row];
      newRow[index].unit_rate = response.data?.unit_rate ?? 0;
      newRow[index].material_id = response.data?.material_id ?? "";
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

  const setMaterialData = async () => {
    const x = row.map((element) => ({
      material_id: element.material_id,
      quantity: element.quantity,
      unit_rate: element.unit_rate,
    }));
    setEditMaterialDetails(x);
  };

  const handleNext = async () => {
    if (validateForm()) {
      await setMaterialData();
      setEditMaterialEnable(false);
      setEditLabourEnable(true);
    }
  };

  const calculateNetAmount = () => {
    return row.reduce((sum, item) => sum + item.quantity * item.unit_rate, 0).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/90 rounded-2xl p-6 sm:p-8 max-w-5xl w-full mx-4 border border-gray-700/50 shadow-2xl">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">Edit Material Details</h1>
        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <table className="min-w-full text-sm bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">SL No</th>
                <th className="px-6 py-4 text-left">Material Name</th>
                <th className="px-6 py-4 text-left">Brand Name</th>
                <th className="px-6 py-4 text-left">Unit Name</th>
                <th className="px-6 py-4 text-left">Quantity</th>
                <th className="px-6 py-4 text-left">Unit Rate</th>
                <th className="px-6 py-4 text-left">Total</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {row.map((element, idx) => (
                <tr key={idx} className="hover:bg-gray-700/50 transition-colors duration-150">
                  <td className="px-6 py-4 text-gray-200">{element.sl}</td>
                  <td className="px-6 py-4">
                    <select
                      aria-label="Select material"
                      value={element.material_name}
                      onChange={(e) => giveBrandAndUnit(idx, e.target.value)}
                      className={`w-full px-4 py-2 bg-gray-800/50 border ${
                        errors[idx]?.material_name ? "border-red-500" : "border-gray-600"
                      } rounded-lg text-gray-100 text-sm`}
                    >
                      <option value="">Select Material</option>
                      {material.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {errors[idx]?.material_name && <p className="mt-1 text-red-500 text-xs">{errors[idx].material_name}</p>}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      aria-label="Select brand"
                      value={element.brand_name}
                      onChange={(e) => {
                        const newRow = [...row];
                        newRow[idx].brand_name = e.target.value;
                        newRow[idx].unit_name = "";
                        newRow[idx].unit_rate = 0;
                        newRow[idx].material_id = "";
                        setRow(newRow);
                        unitRateFetch(idx);
                      }}
                      className={`w-full px-4 py-2 bg-gray-800/50 border ${
                        errors[idx]?.brand_name ? "border-red-500" : "border-gray-600"
                      } rounded-lg text-gray-100 text-sm`}
                    >
                      <option value="">Select Brand</option>
                      {brandOptions[idx]?.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {errors[idx]?.brand_name && <p className="mt-1 text-red-500 text-xs">{errors[idx].brand_name}</p>}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      aria-label="Select unit"
                      value={element.unit_name}
                      onChange={(e) => {
                        const newRow = [...row];
                        newRow[idx].unit_name = e.target.value;
                        setRow(newRow);
                        unitRateFetch(idx);
                      }}
                      className={`w-full px-4 py-2 bg-gray-800/50 border ${
                        errors[idx]?.unit_name ? "border-red-500" : "border-gray-600"
                      } rounded-lg text-gray-100 text-sm`}
                    >
                      <option value="">Select Unit</option>
                      {unitOptions[idx]?.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {errors[idx]?.unit_name && <p className="mt-1 text-red-500 text-xs">{errors[idx].unit_name}</p>}
                  </td>

                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={element.quantity || ""}
                      placeholder="Enter quantity"
                      onChange={(e) => {
                        const newRow = [...row];
                        newRow[idx].quantity = Number(e.target.value);
                        setRow(newRow);
                      }}
                      className={`w-full px-4 py-2 bg-gray-800/50 border ${
                        errors[idx]?.quantity ? "border-red-500" : "border-gray-600"
                      } rounded-lg text-gray-100 text-sm`}
                    />
                    {errors[idx]?.quantity && <p className="mt-1 text-red-500 text-xs">{errors[idx].quantity}</p>}
                  </td>

                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={element.unit_rate || ""}
                      placeholder="Unit rate"
                      readOnly
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm"
                    />
                  </td>

                  <td className="px-6 py-4 text-gray-200">{(element.quantity * element.unit_rate).toFixed(2)}</td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        const newRow = row.filter((_, i) => i !== idx);
                        setRow(newRow.map((item, i) => ({ ...item, sl: i + 1 })));
                        setErrors({});
                      }}
                      className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
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

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            onClick={() => {
              const newRow = [
                ...row,
                {
                  sl: row.length + 1,
                  material_name: "",
                  brand_name: "",
                  unit_name: "",
                  unit_rate: 0,
                  material_id: "",
                  quantity: 0,
                },
              ];
              setRow(newRow);
            }}
            className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-lg"
          >
            + Add Material
          </button>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setEditMaterialEnable(false)} className="w-full sm:w-auto bg-gray-600 text-white px-6 py-3 rounded-lg">
              Cancel
            </button>
            <button onClick={handleNext} className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-lg">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSpecMaterial;
