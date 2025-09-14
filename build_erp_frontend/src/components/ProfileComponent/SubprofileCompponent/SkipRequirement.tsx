import { adminRequireApi } from "../../../api/requirement";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { useState } from "react";

type ProjectData = {
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
};

interface Prop {
  skipOn: boolean;
  setSkipOn: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

function SkipRequirement({ skipOn, setSkipOn, projectId, setIsSubmitted }: Prop) {
  const [isLoading, setIsLoading] = useState(false);

  if (!skipOn) return null;

  const handleAdminRequired = async () => {
    setIsLoading(true);
    try {
      const response = await adminRequireApi(projectId);
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          setSkipOn(false);
          setIsSubmitted(false)
        },3000)
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to process default estimation.");
      console.error("Error in adminRequireApi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="skip-requirement-title"
    >
      <div className="relative max-w-lg w-full mx-4 bg-white rounded-xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 scale-100">
        <button
          onClick={() => setSkipOn(false)}
          aria-label="Close default estimation modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
        <h3
          id="skip-requirement-title"
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center tracking-tight"
        >
          Confirm Default Estimation
        </h3>
        <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed mb-6 text-center">
          Are you sure you want to use default features for this project’s estimation? This will bypass custom requirement selection.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setSkipOn(false)}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200 text-sm sm:text-base font-medium disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            aria-label="Cancel default estimation"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleAdminRequired}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 text-sm sm:text-base font-medium disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            aria-label="Confirm default estimation"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white inline-block"></div>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkipRequirement;