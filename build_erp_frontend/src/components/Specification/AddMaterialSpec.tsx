import { fetchBrandCorrespondingMaterial, fetchUniqueMaterial, fetchUnitCorrespondingMaterial, fetchUnitRate } from "../../api/Admin/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Brand {
  _id: string;
  brand_name: string;
}

interface Unit {
  _id: string;
  unit_name: string;
}

interface Material {
  material_name: string;
  category_id: string;
  brand_id: string;
  unit_id: string;
  unit_rate: number;
  brandDetails: Brand;
  unitDetails: Unit;
}

interface Row {
  sl: number;
  materialId:string
  materialname: string;
  brand: string;
  unit: string;
  quantity: number;
  unitprice: number;
  total: number;
}

interface AddMaterialProp {
  setMatAddEnable: React.Dispatch<React.SetStateAction<boolean>>;
  addMatEnable: boolean;
  setSpecMaterial: React.Dispatch<React.SetStateAction<Row[]>>;
  setAddLabEnable: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddMaterialSpec({
  setMatAddEnable,
  addMatEnable,
  setSpecMaterial,
  setAddLabEnable,
}: AddMaterialProp) {
  const [materialData, setMaterialData] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [finalAmount, setFinalAmount] = useState(0);
  const [unitList, setUnitList] = useState<string[]>([]);
  const [brandList, setBrandList] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const data = await fetchUniqueMaterial();
      setMaterialData(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch materials.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const total = rows.reduce((sum, item) => sum + item.total, 0);
    setFinalAmount(total);
  }, [rows]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        sl: rows.length + 1,
        materialId:"",
        materialname: "",
        brand: "",
        unit: "",
        quantity: 0,
        unitprice: 0,
        total: 0,
      },
    ]);
  };

  const fetchUnitAndBrand = async (material: string) => {
  
    const unitData = await fetchUnitCorrespondingMaterial(material);
    const brandData = await fetchBrandCorrespondingMaterial(material);
 
    setUnitList(unitData);
    setBrandList(brandData);
  };

  const fetchAndSetUnitRate = async (material: string, unit: string, brand: string, index: number) => {
    const rate = await fetchUnitRate(material, unit, brand);
    const updatedRows = [...rows];
    updatedRows[index].unitprice = rate.unit_rate;
    updatedRows[index].total = rate.unit_rate * updatedRows[index].quantity;
    updatedRows[index].materialId = rate._id
    setRows(updatedRows);
  };

  const handleNext = () => {
    if (rows.length === 0 || rows.some((row) => !row.materialname || row.quantity <= 0)) {
      toast.error("Please fill all fields properly.");
      return;
    }
    setSpecMaterial(rows);
    setMatAddEnable(false);
    setAddLabEnable(true);
    setRows([])
  };

  if (!addMatEnable) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="add-material-title"
    >
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-4xl p-6 sm:p-8 space-y-6 border border-gray-700/50">
        <h2
          id="add-material-title"
          className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4"
        >
          Add Materials
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 rounded-lg">
            <thead>
              <tr className="bg-gray-700 text-gray-200">
                <th className="p-3 text-left">SL NO</th>
                <th className="p-3 text-left">Material Name</th>
                <th className="p-3 text-left">Brand</th>
                <th className="p-3 text-left">Unit</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Unit Price</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.sl} className="border-b border-gray-700">
                  <td className="p-3 text-gray-200">{row.sl}</td>

                  <td className="p-3">
                    <select aria-label="selectbrand"
                      onChange={(e) => {
                        const value = e.target.value;
                        fetchUnitAndBrand(value);
                        const updatedRows = [...rows];
                        updatedRows[index].materialname = value;
                        setRows(updatedRows);
                      }}
                      value={row.materialname}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100"
                    >
                      <option value="">material</option>
                      {materialData.map((element) => (
                        <option key={element} value={element}>{element}</option>
                      ))}
                    </select>
                  </td>

                  <td className="p-3">
                    <select aria-label="selectbrand"
                      value={row.brand}
                      onChange={(e) => {
                        const value = e.target.value;
                        const updatedRows = [...rows];
                        for(let char of rows){
                          if(char.materialname == updatedRows[index].materialname && char.brand==value){
                            let newRow = rows.filter((element,i)=>i!=index)
                            setRows(newRow)
                            toast.error("material already exist")
                            return
                          }
                        }
                        updatedRows[index].brand = value;
                        setRows(updatedRows);
                        fetchAndSetUnitRate(row.materialname, row.unit, value, index);
                      }}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100"
                    >
                      <option value="">brand</option>
                      {brandList.map((element) => (
                        <option key={element} value={element}>{element}</option>
                      ))}
                    </select>
                  </td>

                  <td className="p-3">
                    <select aria-label="selectUnit"
                      value={row.unit}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const value = e.target.value;
                        const updatedRows = [...rows];
                        updatedRows[index].unit = value;
                        setRows(updatedRows);
                        fetchAndSetUnitRate(row.materialname, value, row.brand, index);
                      }}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100"
                    >
                      <option value="">unit</option>
                      {unitList.map((element) => (
                        <option key={element} value={element}>{element}</option>
                      ))}
                    </select>
                  </td>

                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      value={row.quantity}
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].quantity = Number(e.target.value);
                        updatedRows[index].total = updatedRows[index].unitprice * updatedRows[index].quantity;
                        setRows(updatedRows);
                      }}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100"
                      placeholder="Quantity"
                    />
                  </td>

                  <td className="p-3 text-gray-200">
                    <input
                      type="text"
                      value={row.unitprice}
                      readOnly
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].unitprice = Number(e.target.value);
                        updatedRows[index].total = updatedRows[index].quantity * updatedRows[index].unitprice;
                        setRows(updatedRows);
                      }}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100"
                      placeholder="Unit rate"
                    />
                  </td>

                  <td className="p-3 text-gray-200">{row.total}</td>

                  <td className="p-3">
                    <button
                      onClick={() => {
                        const updatedRows = rows.filter((_, i) => i !== index);
                        setRows(updatedRows);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-gray-200 text-lg">Net Amount: ₹{finalAmount.toFixed(2)}</p>

        <div className="flex justify-between pt-4">
          <button
            onClick={addRow}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            + Add Material
          </button>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                setMatAddEnable(false);
                setRows([]);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMaterialSpec;
