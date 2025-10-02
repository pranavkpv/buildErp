import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { putLabour } from "../../../api/Admin/labour";
import type { labourData } from "ApiInterface/labour.interface";
import Loading from "../../../components/Loading";

type labourProps = {
  editData: labourData
  editEnable: boolean;
  setEditEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccessEdit: () => void;
};

function LabourEdit({
  editEnable,
  setEditEnable,
  editData,
  onSuccessEdit,
}: labourProps) {
  const [labourData, setLabour] = useState(editData.labour_type);
  const [wageData, setWage] = useState(editData.daily_wage);
  const labourRef = useRef<HTMLParagraphElement>(null);
  const [loadOn, setLoadOn] = useState(false)


  // Update local state when props change (when a different item is selected for edit)
  useEffect(() => {
    setLabour(editData.labour_type);
    setWage(editData.daily_wage);
  }, [editData.labour_type, editData.daily_wage]);

  const editLabour = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation
    if (labourData.trim() === "") {
      if (labourRef.current) labourRef.current.innerText = "Labour type is required.";
      return;
    } else {
      if (labourRef.current) labourRef.current.innerText = "";
    }

    if (wageData <= 0) {
      toast.warning("Daily wage must be a positive number.");
      return;
    }
    setLoadOn(true)
    const _id = editData._id
    const labour_type = labourData
    const daily_wage = wageData
    const data = await putLabour({ _id, labour_type, daily_wage })
    setLoadOn(false)
    if (data.success) {
      toast.success(data.message);
      setEditEnable(false);
      onSuccessEdit();
    } else {
      toast.error(data.message);
    }
  };

  if (!editEnable) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4">
            Edit Labour
          </h2>
          <form onSubmit={editLabour} className="space-y-6">
            <div>
              <label htmlFor="labourType" className="block text-sm font-medium text-gray-200 mb-1">
                Labour Type
              </label>
              <input
                id="labourType"
                type="text"
                placeholder="Enter labour type"
                value={labourData}
                onChange={(e) => setLabour(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
              />
              <p ref={labourRef} className="text-red-400 text-sm mt-1"></p>
            </div>

            <div>
              <label htmlFor="dailyWage" className="block text-sm font-medium text-gray-200 mb-1">
                Daily Wage
              </label>
              <input
                id="dailyWage"
                type="number"
                value={wageData}
                placeholder="Enter daily wage"
                onChange={(e) => setWage(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
              />
              {/* You might want a ref for wage validation too if needed */}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setEditEnable(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <Loading loadOn={loadOn} />
    </>
  );
}

export default LabourEdit;