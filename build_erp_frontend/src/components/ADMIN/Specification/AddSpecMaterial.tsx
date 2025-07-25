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

function AddSpecMaterial() {
  const { AddMaterialEnable, setAddMaterialEnable, setAddLabourEnable, setMaterialDetails } = useContext(AppContext);
  if (!AddMaterialEnable) return null;

  const [material, setMaterial] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [unit, setUnit] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [row, setRow] = useState<listMaterail[]>([]);

  const fetchMaterial = async () => {
    const materialList = await fetchUniqueMaterial();
    setMaterial(materialList);
  };

  useEffect(() => {
    fetchMaterial();
  }, []);

  const giveBrandAndUnit = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandData = await fetchBrandCorrespondingMaterial(e.target.value);
    const unitData = await fetchUnitCorrespondingMaterial(e.target.value);
    const newRow = [...row];
    newRow[index].material_name = e.target.value;
    setRow(newRow);
    setBrand(brandData);
    setUnit(unitData);
  };

  const unitRateFetch = async (index: number) => {
    if (row[index].material_name === "" || row[index].brand_name === "" || row[index].unit_name === "") return;
    const response = await fetchUnitRate(row[index].material_name, row[index].unit_name, row[index].brand_name);
    const newRow = [...row];
    newRow[index].unit_rate = response.unit_rate;
    newRow[index].material_id = response._id;
    setRow(newRow);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/90 border border-gray-700/50 rounded-2xl p-6 sm:p-8 max-w-4xl w-full mx-4 shadow-2xl">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">Add Material Details</h1>
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
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {row.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-sm font-medium">
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
                        onChange={(e) => {
                          setIndex(idx);
                          giveBrandAndUnit(e);
                        }}
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium"
                      >
                        <option value="" className="text-gray-400">Select Material</option>
                        {material.map((mat) => (
                          <option key={mat} value={mat} className="text-gray-100">{mat}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        aria-label="Select brand"
                        value={element.brand_name}
                        onChange={(e) => {
                          const newRow = [...row];
                          newRow[idx].brand_name = e.target.value;
                          setRow(newRow);
                          unitRateFetch(idx);
                        }}
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium"
                      >
                        <option value="" className="text-gray-400">Select Brand</option>
                        {brand.map((br) => (
                          <option key={br} value={br} className="text-gray-100">{br}</option>
                        ))}
                      </select>
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
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium"
                      >
                        <option value="" className="text-gray-400">Select Unit</option>
                        {unit.map((un) => (
                          <option key={un} value={un} className="text-gray-100">{un}</option>
                        ))}
                      </select>
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
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={element.unit_rate || ""}
                        placeholder="Unit Rate"
                        onChange={(e) => {
                          const newRow = [...row];
                          newRow[idx].unit_rate = Number(e.target.value);
                          setRow(newRow);
                        }}
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          const newRow = row.filter((_, i) => i !== idx);
                          setRow(newRow.map((item, i) => ({ ...item, sl: i + 1 })));
                        }}
                        className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Delete material ${element.material_name || "row"}`}
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
        <div className="flex justify-between mt-6 gap-3">
          <button
            onClick={() => {
              const newRow = [...row, { sl: row.length + 1, material_name: "", brand_name: "", unit_name: "", unit_rate: 0, material_id: "", quantity: 0 }];
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
              onClick={() => {
                setAddMaterialEnable(false);
                setAddLabourEnable(true);
                const x = row.map((element) => ({
                  material_id: element.material_id,
                  quantity: element.quantity,
                  unit_rate: element.unit_rate,
                }));
                setMaterialDetails(x);
              }}
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