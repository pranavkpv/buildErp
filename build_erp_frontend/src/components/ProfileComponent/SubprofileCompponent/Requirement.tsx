import { getSpecIdandName } from "../../../api/Specification";
import React, { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import RequirementContext from "../../../Context/RequirementContext";
import { toast } from "react-toastify";

interface SpecData {
  _id: string;
  spec_name: string;
}

interface ProjectData {
  _id: string;
  project_name: string;
  address: string;
  area: number;
  description: string;
  expected_image: string;
  budgeted_cost: number;
  status: "pending" | "processing" | "completed";
  estimateBy: string | null;
  estimateStatus: boolean;
  start_date: string;
  end_date: string;
}

interface Prop {
  requireOn: boolean;
  setRequireOn: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmEnable: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
}

function Requirement({ requireOn, setRequireOn, setConfirmEnable, projectId }: Prop) {
  const [specs, setSpecs] = useState<SpecData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { spec_id, setSpecId } = useContext(RequirementContext);

  useEffect(() => {
    if (requireOn) {
      const specFetch = async () => {
        setIsLoading(true);
        try {
          const response = await getSpecIdandName();
          if (response.success) {
            setSpecs(response.data);
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          toast.error("Failed to fetch requirements.");
          console.error("Error fetching specs:", error);
        } finally {
          setIsLoading(false);
        }
      };
      specFetch();
    }
  }, [requireOn]);

  const handleClose = () => {
    setRequireOn(false);
  };

  const handleSelectAll = () => {
    if (spec_id.length === specs.length) {
      setSpecId([]);
    } else {
      setSpecId(specs.map((spec) => spec._id));
    }
  };

  if (!requireOn) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative max-w-lg w-full mx-4 bg-white rounded-xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 scale-100">
        <button
          onClick={handleClose}
          aria-label="Close requirements modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6 tracking-tight">
          Select Your Requirements
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {specs.length > 0 && (
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600 text-sm sm:text-base">
                  {spec_id.length} of {specs.length} selected
                </p>
                <button
                  onClick={handleSelectAll}
                  className="text-indigo-600 hover:text-indigo-700 text-sm sm:text-base font-medium transition-colors duration-200"
                  aria-label={spec_id.length === specs.length ? "Deselect all requirements" : "Select all requirements"}
                >
                  {spec_id.length === specs.length ? "Deselect All" : "Select All"}
                </button>
              </div>
            )}
            <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {specs.length > 0 ? (
                specs.map((element) => (
                  <div
                    key={element._id}
                    className={`flex items-center gap-3 p-4 border rounded-lg transition-colors duration-200 ${
                      spec_id.includes(element._id)
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={element._id}
                      value={element._id}
                      checked={spec_id.includes(element._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSpecId([...spec_id, e.target.value]);
                        } else {
                          setSpecId(spec_id.filter((id: string) => id !== e.target.value));
                        }
                      }}
                      className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <label
                      htmlFor={element._id}
                      className="text-gray-700 text-base sm:text-lg font-medium cursor-pointer flex-1"
                    >
                      {element.spec_name}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center text-base sm:text-lg font-medium">
                  No requirements available.
                </p>
              )}
            </div>
            <div className="flex gap-4 mt-6 justify-end">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200 text-sm sm:text-base font-medium"
                aria-label="Cancel requirement selection"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setConfirmEnable(true);
                  setRequireOn(false);
                }}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 text-sm sm:text-base font-medium disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={specs.length === 0 || spec_id.length === 0}
                aria-label="Proceed to brand selection"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Requirement;