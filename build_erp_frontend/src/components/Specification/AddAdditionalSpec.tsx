import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { SaveSpec } from "../../api/Admin/Spec";

interface Row {
  sl: number;
  materialId: string
  materialname: string;
  brand: string;
  unit: string;
  quantity: number;
  unitprice: number;
  total: number;
}

interface LabourRow {
  sl: number;
  labour: string;
  numberof_labour: number;
  salary: number;
  total: number;
}

interface AdditionalProp {
  setAdditionalEnable: React.Dispatch<React.SetStateAction<boolean>>;
  additionalEnable: boolean;
  netAmount: number;
  specMaterial: Row[];
  specLabour: LabourRow[];
  specId: string
  specname: string
  specUnit: string
  specDescription: string
  onaddSucess: () => void
  setSpecMaterial: React.Dispatch<React.SetStateAction<Row[]>>;
  setSpecLabour: React.Dispatch<React.SetStateAction<LabourRow[]>>;

}



function AddAdditionalSpec({
  setAdditionalEnable,
  additionalEnable,
  netAmount,
  specMaterial,
  specLabour,
  specId,
  specname,
  specUnit,
  specDescription,
  onaddSucess,
  setSpecMaterial,
  setSpecLabour
}: AdditionalProp) {
  const [additionalExpensePer, setAdditionalExpensePer] = useState(0);
  const [profitPer, setProfitPer] = useState(0);
  const [additionalAmount, setAdditionalAmount] = useState(0);
  const [profitAmount, setProfitAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(netAmount);
  const [error, setError] = useState("");

  useEffect(() => {
    setAdditionalAmount(Math.ceil((netAmount * additionalExpensePer) / 100));
    setProfitAmount(Math.ceil((netAmount * profitPer) / 100));
  }, [netAmount, additionalExpensePer, profitPer]);

  useEffect(() => {
    setFinalAmount(netAmount + additionalAmount + profitAmount);
  }, [netAmount, additionalAmount, profitAmount]);

  const handleSave = async () => {
    if (additionalExpensePer < 0 || profitPer < 0) {
      setError("Percentages cannot be negative.");
      return;
    }
    try {

      let materialDetails = []
      let labourDetails = []
      for (let char of specMaterial) {
        materialDetails.push({ material_id: char.materialId, quantity: char.quantity })
      }
      for (let char of specLabour) {
        labourDetails.push({ labour_id: char.labour, numberoflabour: char.numberof_labour })
      }

      const response = await SaveSpec(
        specId, specname, specUnit, specDescription,
        materialDetails,
        labourDetails,
        additionalExpensePer,
        profitPer,
      );
      if (response.success) {
        toast.success("Specification saved successfully.");
        setAdditionalEnable(false);
        setAdditionalExpensePer(0);
        setProfitPer(0);
        setError("");
        onaddSucess();
        setSpecMaterial([])
        setSpecLabour([])
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err)
      toast.error("Failed to save specification.");
    }
  };

  if (!additionalEnable) return null;

  return (
    <div
     style={{ marginTop: "130px" }}
      className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-2 "

      aria-labelledby="add-additional-title"
    >
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 space-y-3 border border-gray-700/50">
        <h2
          id="add-additional-title"
          className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4"
        >
          Specification Summary
        </h2>
        <div>
          <label htmlFor="netAmount" className="block text-sm font-medium text-gray-200 mb-1">
            Net Amount
          </label>
          <input
            id="netAmount"
            type="number"
            value={netAmount}
            readOnly
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 text-sm"
          />
        </div>
        <div>
          <label htmlFor="additionalExpensePer" className="block text-sm font-medium text-gray-200 mb-1">
            Additional Expense (%)
          </label>
          <input
            id="additionalExpensePer"
            type="number"
            min="0"
            value={additionalExpensePer}
            onChange={(e) => setAdditionalExpensePer(Number(e.target.value))}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            placeholder="Enter additional expense %"
          />
        </div>
        <div>
          <label htmlFor="additionalAmount" className="block text-sm font-medium text-gray-200 mb-1">
            Additional Expense Amount
          </label>
          <input
            id="additionalAmount"
            type="number"
            value={additionalAmount}
            readOnly
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 text-sm"
          />
        </div>
        <div>
          <label htmlFor="profitPer" className="block text-sm font-medium text-gray-200 mb-1">
            Profit (%)
          </label>
          <input
            id="profitPer"
            type="number"
            min="0"
            value={profitPer}
            onChange={(e) => setProfitPer(Number(e.target.value))}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            placeholder="Enter profit %"

          />
        </div>
        <div>
          <label htmlFor="profitAmount" className="block text-sm font-medium text-gray-200 mb-1">
            Profit Amount
          </label>
          <input
            id="profitAmount"
            type="number"
            value={profitAmount}
            readOnly
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 text-sm"
          />
        </div>
        <div>
          <label htmlFor="finalAmount" className="block text-sm font-medium text-gray-200 mb-1">
            Final Amount
          </label>
          <input
            id="finalAmount"
            type="number"
            value={finalAmount}
            readOnly
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 text-sm"
          />
        </div>
        {error && (
          <p id="additional-error" className="text-red-400 text-sm">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              setAdditionalEnable(false);
              setAdditionalExpensePer(0);
              setProfitPer(0);
              setError("");
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAdditionalSpec;