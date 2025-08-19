import { toast } from "react-toastify";
import AppContext from "../../../Context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { SaveSpec } from "../../../api/Specification";

type prop = {
  fetchSpecList: () => void;
};

function AddAdditionalSpec({ fetchSpecList }: prop) {
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const labourSum = labourDetails.reduce((sum, item) => sum + item.daily_wage * item.numberoflabour, 0);
    const materialSum = materialDetails.reduce((sum, item) => sum + item.quantity * item.unit_rate, 0);
    setFinal(labourSum + materialSum);
  }, [labourDetails, materialDetails]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    if (additionalExpense_per < 0) {
      newErrors.additionalExpense_per = "Additional expense percentage cannot be negative";
      isValid = false;
    }
    if (profit_per < 0) {
      newErrors.profit_per = "Profit percentage cannot be negative";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculateNetAmount = () => {
    const additionalExpenseAmount = final * (additionalExpense_per || 0) / 100;
    const profitAmount = final * (profit_per || 0) / 100;
    return (final + additionalExpenseAmount + profitAmount).toFixed(2);
  };

  const SaveSpecData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const specSave = await SaveSpec(spec_id, spec_name, spec_unit, description, materialDetails, labourDetails, additionalExpense_per, profit_per);
    if (specSave.success) {
      toast.success(specSave.message);
      setAddAdditionalEnable(false);
      fetchSpecList();
    } else {
      toast.error(specSave.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/90 border border-gray-700/50 rounded-2xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">Add Additional Expenses</h1>
        <form onSubmit={SaveSpecData} className="space-y-5">
          <div>
            <label htmlFor="finalAmount" className="block text-sm font-medium text-gray-200 mb-1">Final Amount</label>
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
            <label htmlFor="additionalExpensePer" className="block text-sm font-medium text-gray-200 mb-1">Additional Expense Percentage</label>
            <input
              id="additionalExpensePer"
              type="number"
              placeholder="Enter additional expense percentage"
              value={additionalExpense_per || ""}
              onChange={(e) => {
                setAdditionalExpense(Number(e.target.value));
                setErrors((prev) => ({ ...prev, additionalExpense_per: "" }));
              }}
              className={`w-full px-4 py-3 bg-gray-800/50 border ${
                errors.additionalExpense_per ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium`}
            />
            {errors.additionalExpense_per && (
              <p className="mt-1 text-red-500 text-xs">{errors.additionalExpense_per}</p>
            )}
          </div>
          <div>
            <label htmlFor="additionalExpenseAmount" className="block text-sm font-medium text-gray-200 mb-1">Additional Expense Amount</label>
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
            <label htmlFor="profitPer" className="block text-sm font-medium text-gray-200 mb-1">Profit Percentage</label>
            <input
              id="profitPer"
              type="number"
              placeholder="Enter profit percentage"
              value={profit_per || ""}
              onChange={(e) => {
                setProfit(Number(e.target.value));
                setErrors((prev) => ({ ...prev, profit_per: "" }));
              }}
              className={`w-full px-4 py-3 bg-gray-800/50 border ${
                errors.profit_per ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium`}
            />
            {errors.profit_per && (
              <p className="mt-1 text-red-500 text-xs">{errors.profit_per}</p>
            )}
          </div>
          <div>
            <label htmlFor="profitAmount" className="block text-sm font-medium text-gray-200 mb-1">Profit Amount</label>
            <input
              id="profitAmount"
              type="text"
              value={(final * (profit_per || 0) / 100).toFixed(2)}
              readOnly
              placeholder="Profit amount"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400 text-sm font-medium cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="netAmount" className="block text-sm font-medium text-gray-200 mb-1">Net Amount</label>
            <input
              id="netAmount"
              type="text"
              value={calculateNetAmount()}
              readOnly
              placeholder="Net Amount"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-teal-400 text-sm font-medium cursor-not-allowed"
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