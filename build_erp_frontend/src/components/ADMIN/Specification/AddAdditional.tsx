import { SaveSpec } from "../../../api/Admin/Spec";
import AppContext from "../../../Context/AppContext";
import React, { useContext, useEffect, useState } from "react";

function AddAdditionalSpec() {
  const {
    spec_id,
    spec_name,
    spec_unit,
    description,
    AddAdditionalEnable,
    setAddAdditionalEnable,
    labourDetails,
    materialDetails,
    additionalExpense_per,
    setAdditionalExpense,
    profit_per,
    setProfit,
  } = useContext(AppContext);

  if (!AddAdditionalEnable) return null;

  const [final, setFinal] = useState(0);

  useEffect(() => {
    const labourSum = labourDetails.reduce((sum, item) => sum + item.daily_wage * item.numberoflabour, 0);
    const materialSum = materialDetails.reduce((sum, item) => sum + item.quantity * item.unit_rate, 0);
    setFinal(labourSum + materialSum);
  }, [labourDetails, materialDetails]);

  const SaveSpecData = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    await SaveSpec(spec_id, spec_name, spec_unit, description, materialDetails, labourDetails, additionalExpense_per, profit_per);
    setAddAdditionalEnable(false); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/90 border border-gray-700/50 rounded-2xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">Add Additional Expenses</h1>
        <form onSubmit={SaveSpecData} className="space-y-5">
          <div>
            <label htmlFor="finalAmount" className="sr-only">Final Amount</label>
            <input
              id="finalAmount"
              type="text"
              value={final.toFixed(2)}
              readOnly
              placeholder="Final Amount"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400 text-sm font-medium cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="additionalExpensePer" className="sr-only">Additional Expense Percentage</label>
            <input
              id="additionalExpensePer"
              type="number"
              placeholder="Enter additional expense percentage"
              value={additionalExpense_per || ""}
              onChange={(e) => setAdditionalExpense(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
            />
          </div>
          <div>
            <label htmlFor="additionalExpenseAmount" className="sr-only">Additional Expense Amount</label>
            <input
              id="additionalExpenseAmount"
              type="text"
              value={(final * (additionalExpense_per || 0) / 100).toFixed(2)}
              readOnly
              placeholder="Additional expense amount"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400 text-sm font-medium cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="profitPer" className="sr-only">Profit Percentage</label>
            <input
              id="profitPer"
              type="number"
              placeholder="Enter profit percentage"
              value={profit_per || ""}
              onChange={(e) => setProfit(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
            />
          </div>
          <div>
            <label htmlFor="profitAmount" className="sr-only">Profit Amount</label>
            <input
              id="profitAmount"
              type="text"
              value={(final * (profit_per || 0) / 100).toFixed(2)}
              readOnly
              placeholder="Profit amount"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400 text-sm font-medium cursor-not-allowed"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setAddAdditionalEnable(false)}
              className="px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-200 font-semibold text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAdditionalSpec;