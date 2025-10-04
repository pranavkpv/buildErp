import { toast } from "react-toastify";
import { ApproveTransferAPI } from "../../../api/Sitemanager/transfer";
import type { Transfer } from "../Transfer";

type ApproveProp = {
  approveId: string | undefined;
  onApproveSuccess: () => void;
  setApproveEnable: React.Dispatch<React.SetStateAction<boolean>>;
  approveEnable: boolean;
  approveData: Transfer | undefined;
  setActionEnable: React.Dispatch<React.SetStateAction<boolean>>;
};

function ApproveTransfer({ approveId, setApproveEnable, approveEnable, onApproveSuccess, approveData,setActionEnable }: ApproveProp) {
  if (!approveEnable || !approveId || !approveData) return null;

  const approveFun = async (approveId: string) => {
    try {
      const response = await ApproveTransferAPI(approveId, approveData);
      if (response.success) {
        toast.success(response.message);
        setApproveEnable(false);
        setActionEnable(false)
        onApproveSuccess();
      } else {
        toast.error(response.message || "Failed to approve transfer");
      }
    } catch (error) {
      toast.error("An error occurred while approving the transfer");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2
          id="modal-title"
          className="text-xl font-semibold text-gray-800 mb-4 text-center tracking-tight"
        >
          Confirm Approve Transfer
        </h2>
        <div className="space-y-6">
          <p className="text-gray-600 text-sm font-medium text-center">
            Are you sure you want to approve this transfer?
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium 
                hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 
                focus:ring-offset-2 transition-all duration-200"
              onClick={() => setApproveEnable(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm font-medium 
                hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 
                focus:ring-offset-2 transition-all duration-200"
              onClick={() => approveFun(approveId)}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApproveTransfer;