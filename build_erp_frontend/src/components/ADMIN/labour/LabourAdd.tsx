import { postLabour } from "../../../api/Admin/labour";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

type addLabourData = {
  addEnable: boolean;
  setAddEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onsuccessAdd: () => void;
};

function LabourAdd({ addEnable, setAddEnable, onsuccessAdd }: addLabourData) {
  const [labour, setLabour] = useState("");
  const [wage, setWage] = useState(0); // Initialize with 0 or a sensible default
  const labourRef = useRef<HTMLParagraphElement>(null);
  const wageRef = useRef<HTMLParagraphElement>(null); // Ref for wage validation message

  const addLabour = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    // Validate labour type
    if (labour.trim() === "") {
      if (labourRef.current) labourRef.current.innerText = "Labour type is required.";
      hasError = true;
    } else {
      if (labourRef.current) labourRef.current.innerText = "";
    }

    // Validate daily wage
    if (wage <= 0) {
      if (wageRef.current) wageRef.current.innerText = "Daily wage must be greater than 0.";
      hasError = true;
    } else {
      if (wageRef.current) wageRef.current.innerText = "";
    }

    if (hasError) {
      return;
    }

    try {
      const labour_type = labour
      const daily_wage = wage
      const data = await postLabour(labour_type, daily_wage)
      if (data.success) {
        toast.success(data.message);
        setAddEnable(false);
        onsuccessAdd();
        setLabour("");
        setWage(0);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error("Failed to add labour:", error);
      toast.error("Failed to add labour. Please try again.");
    }
  };

  if (!addEnable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4">
          Add New Labour Type
        </h2>
        <form onSubmit={addLabour} className="space-y-6">
          <div>
            <label htmlFor="labourType" className="block text-sm font-medium text-gray-200 mb-1">
              Labour Type
            </label>
            <input
              id="labourType"
              type="text"
              placeholder="Enter labour type"
              value={labour} // Controlled component
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
              placeholder="Enter daily wage"
              value={wage === 0 ? "" : wage} // Display empty string if wage is 0 for better UX
              onChange={(e) => setWage(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            />
            <p ref={wageRef} className="text-red-400 text-sm mt-1"></p>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => {
                setAddEnable(false);
                setLabour(""); // Clear fields on cancel
                setWage(0);
                if (labourRef.current) labourRef.current.innerText = ""; // Clear validation messages
                if (wageRef.current) wageRef.current.innerText = "";
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
            >
              Add Labour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LabourAdd;