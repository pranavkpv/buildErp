import { useContext, useEffect, useState } from "react";
import AppContext from "../../../Context/AppContext";
import { labourDataFetch } from "../../../api/Admin/labour";

type labourData = {
  sl: number;
  labour_type: string;
  quantity: number;
  daily_wage: number;
};

type labourDetails = {
  _id: string;
  labour_type: string;
  daily_wage: number;
};

function AddLabourSpec() {
  const { setLabourDetails, AddLabourEnable, setAddLabourEnable, setAddAdditionalEnable } = useContext(AppContext);
  if (!AddLabourEnable) return null;

  const [row, setRow] = useState<labourData[]>([]);
  const [labour, setLabour] = useState<labourDetails[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: { [key: string]: string } }>({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const fetchLabour = async () => {
    const response = await labourDataFetch();
    setLabour(response.data);
  };

  useEffect(() => {
    fetchLabour();
    setRow([{ sl: 1, labour_type: "", quantity: 0, daily_wage: 0 }]);
  }, []);

  const checkForDuplicate = (idx: number, labourType: string) => {
    return row.some((item, i) => {
      if (i === idx) return false; // Skip the current row
      return item.labour_type === labourType && labourType !== "";
    });
  };

  const fetchWage = async (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const labourId = e.target.value;
    const lab = labour.find(element => element._id === labourId);
    if (lab) {
      const isDuplicate = checkForDuplicate(index, lab.labour_type);
      if (isDuplicate) {
        setPopupMessage(`The labour type "${lab.labour_type}" is already added.`);
        setShowPopup(true);
        const newRow = [...row];
        newRow[index].labour_type = "";
        newRow[index].daily_wage = 0;
        setRow(newRow);
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[index];
          return newErrors;
        });
        return;
      }
      const newRow = [...row];
      newRow[index].labour_type = lab.labour_type;
      newRow[index].daily_wage = lab.daily_wage;
      setRow(newRow);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: { [key: string]: string } } = {};
    let isValid = true;

    row.forEach((element, idx) => {
      const rowErrors: { [key: string]: string } = {};

      if (!element.labour_type) {
        rowErrors.labour_type = "Labour type is required";
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

  const calculateFinalAmount = () => {
    return row.reduce((sum, item) => sum + (item.quantity * item.daily_wage), 0).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/90 border border-gray-700/50 rounded-2xl p-6 sm:p-8 max-w-3xl w-full mx-4 shadow-2xl">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">Add Labour Details</h1>
        {showPopup && (
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 border border-gray-700/50 shadow-xl">
              <h2 className="text-lg font-semibold text-gray-100 mb-4">Duplicate Labour Type</h2>
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
                <th className="px-6 py-4">Labour Type</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Daily Wage</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {row.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400 text-sm font-medium">
                    No labour added. Click "Add Labour" to start.
                  </td>
                </tr>
              ) : (
                row.map((element, idx) => (
                  <tr key={element.sl} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-200">{element.sl}</td>
                    <td className="px-6 py-4">
                      <select
                        aria-label="Select labour type"
                        value={labour.find(l => l.labour_type === element.labour_type)?._id || ""}
                        onChange={(e) => fetchWage(idx, e)}
                        className={`w-full px-4 py-2 bg-gray-800/50 border ${
                          errors[idx]?.labour_type ? "border-red-500" : "border-gray-600"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-100 text-sm font-medium`}
                      >
                        <option value="" className="text-gray-400">Select Labour Type</option>
                        {labour.map((item) => (
                          <option key={item._id} value={item._id} className="text-gray-100">
                            {item.labour_type}
                          </option>
                        ))}
                      </select>
                      {errors[idx]?.labour_type && (
                        <p className="mt-1 text-red-500 text-xs">{errors[idx].labour_type}</p>
                      )}
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
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors[idx]?.quantity;
                            return newErrors;
                          });
                        }}
                        className={`w-full px-4 py-2 bg-gray-800/50 border ${
                          errors[idx]?.quantity ? "border-red-500" : "border-gray-600"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium`}
                      />
                      {errors[idx]?.quantity && (
                        <p className="mt-1 text-red-500 text-xs">{errors[idx].quantity}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-200">{element.daily_wage.toFixed(2)}</td>
                    <td className="px-6 py-4 text-gray-200">{(element.quantity * element.daily_wage).toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          const newRow = row.filter((_, i) => i !== idx);
                          setRow(newRow.map((item, i) => ({ ...item, sl: i + 1 })));
                          setErrors({});
                        }}
                        className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Delete labour ${element.labour_type || "row"}`}
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
              Final Amount: <span className="text-teal-400">₹{calculateFinalAmount()}</span>
            </p>
          </div>
        )}
        <div className="flex justify-between mt-6 gap-3">
          <button
            onClick={() => {
              const newRow = [...row, { sl: row.length + 1, labour_type: "", quantity: 0, daily_wage: 0 }];
              setRow(newRow);
            }}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
          >
            + Add Labour
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => setAddLabourEnable(false)}
              className="px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-200 font-semibold text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (validateForm()) {
                  const data = row.map(item => {
                    const lab = labour.find(l => l.labour_type === item.labour_type);
                    return {
                      labour_id: lab?._id || "",
                      numberoflabour: item.quantity,
                      daily_wage: item.daily_wage,
                    };
                  });
                  setLabourDetails(data);
                  setAddLabourEnable(false);
                  setAddAdditionalEnable(true);
                }
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

export default AddLabourSpec;