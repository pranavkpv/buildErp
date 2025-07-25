import { fetchBrandCorrespondingMaterial, fetchUniqueMaterial, fetchUnitCorrespondingMaterial, fetchUnitRate } from "../../../api/Admin/material"
import AppContext from "../../../Context/AppContext"
import React, { useContext, useEffect, useState } from "react"

type listMaterail = {
   sl: number
   material_name: string
   brand_name: string
   unit_name: string
   unit_rate: number
   material_id: string
   quantity: number
}

interface Props {
   editrow: listMaterail[];
}

function EditSpecMaterial({ editrow }: Props) {
   console.log(editrow)
   const { editMaterialEnable, setEditMaterialEnable, setEditLabourEnable, setEditMaterialDetails } = useContext(AppContext)
   if (!editMaterialEnable) return null

   const [material, setMaterial] = useState<string[]>([])
   const [brand, setBrand] = useState<string[]>([])
   const [unit, setUnit] = useState<string[]>([])
   const [index, setIndex] = useState(0)
   const [row, setRow] = useState<listMaterail[]>(editrow)

   const fetchMaterial = async () => {
      const materialList = await fetchUniqueMaterial()
      setMaterial(materialList)
   }

   useEffect(() => {
      fetchMaterial()
      if (editrow.length > 0) {
         setRow(editrow)
      } else {
         setRow([{ sl: 1, material_name: "", brand_name: "", unit_name: "", unit_rate: 0, material_id: "", quantity: 0 }])
      }
   }, [editrow])

   const giveBrandAndUnit = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const brandData = await fetchBrandCorrespondingMaterial(e.target.value)
      const unitData = await fetchUnitCorrespondingMaterial(e.target.value)
      const newRow = [...row]
      newRow[index].material_name = e.target.value
      newRow[index].brand_name = ""
      newRow[index].unit_name = ""
      newRow[index].unit_rate = 0
      newRow[index].material_id = ""
      setRow(newRow)
      setBrand(brandData)
      setUnit(unitData)
   }

   const unitRateFetch = async (index: number) => {
      if (row[index].material_name === "" || row[index].brand_name === "" || row[index].unit_name === "") return
      const response = await fetchUnitRate(row[index].material_name, row[index].unit_name, row[index].brand_name)
      const newRow = [...row]
      newRow[index].unit_rate = response.unit_rate
      newRow[index].material_id = response._id
      setRow(newRow)
   }

   const setMaterialData = async () => {
      const x = row.map(element => ({
         material_id: element.material_id,
         quantity: element.quantity,
         unit_rate: element.unit_rate
      }))
      setEditMaterialDetails(x)
   }

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
                                 onChange={(e) => {
                                    setIndex(idx)
                                    giveBrandAndUnit(e)
                                 }}
                                 className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                              >
                                 <option value="">Select Material</option>
                                 {material.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                 ))}
                              </select>
                           </td>
                           <td className="px-6 py-4">
                              <select
                                 aria-label="Select brand"
                                 value={element.brand_name}
                                 onChange={(e) => {
                                    const newRow = [...row]
                                    newRow[idx].brand_name = e.target.value
                                    setRow(newRow)
                                    unitRateFetch(idx)
                                 }}
                                 className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                              >
                                 <option value="">Select Brand</option>
                                 {brand.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                 ))}
                              </select>
                           </td>
                           <td className="px-6 py-4">
                              <select
                                 aria-label="Select unit"
                                 value={element.unit_name}
                                 onChange={(e) => {
                                    const newRow = [...row]
                                    newRow[idx].unit_name = e.target.value
                                    setRow(newRow)
                                    unitRateFetch(idx)
                                 }}
                                 className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                              >
                                 <option value="">Select Unit</option>
                                 {unit.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                 ))}
                              </select>
                           </td>
                           <td className="px-6 py-4">
                              <input
                                 type="number"
                                 value={element.quantity || ""}
                                 placeholder="Enter quantity"
                                 onChange={(e) => {
                                    const newRow = [...row]
                                    newRow[idx].quantity = Number(e.target.value)
                                    setRow(newRow)
                                 }}
                                 className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                              />
                           </td>
                           <td className="px-6 py-4">
                              <input
                                 type="number"
                                 value={element.unit_rate || ""}
                                 placeholder="Unit rate"
                                 readOnly
                                 className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none transition-all duration-200"
                              />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
               <button
                  onClick={() => {
                     const newRow = [...row, {
                        sl: row.length + 1,
                        material_name: "",
                        brand_name: "",
                        unit_name: "",
                        unit_rate: 0,
                        material_id: "",
                        quantity: 0
                     }]
                     setRow(newRow)
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
               >
                  + Add Material
               </button>
               <div className="flex flex-col sm:flex-row gap-4">
                  <button
                     onClick={() => setEditMaterialEnable(false)}
                     className="w-full sm:w-auto bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
                  >
                     Cancel
                  </button>
                  <button
                     onClick={async () => {
                        await setMaterialData()
                        setEditMaterialEnable(false)
                        setEditLabourEnable(true)
                     }}
                     className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
                  >
                     Next
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default EditSpecMaterial