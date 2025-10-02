import Loading from "../../../components/Loading";
import { verifyPaymentApi } from "../../../api/Admin/StageSetting";
import { toast } from "react-toastify";
import { useState } from "react";

interface Prop {
  verifyOn: boolean;
  setVerifyOn: React.Dispatch<React.SetStateAction<boolean>>;
  verifyStage: string;
  onSuccess: () => Promise<void>
}

function VerifyModal({ verifyOn, setVerifyOn, verifyStage, onSuccess }: Prop) {
  if (!verifyOn) return null;

  const [loadOn, setLoadOn] = useState(false)


  const verifyPaymentFun = async () => {
    try {
      setLoadOn(true)
      const response = await verifyPaymentApi(verifyStage);
      setLoadOn(false)
      if (response.success) {
        toast.success(response.message);
        setVerifyOn(false);
        onSuccess()
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to verify payment");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm transition-opacity duration-300">
        <div
          className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md mx-4 p-6 transform transition-all duration-300 scale-100 sm:scale-105"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <h2
            id="modal-title"
            className="text-xl font-semibold text-gray-100 mb-4"
          >
            Confirm Payment Verification
          </h2>

          <p className="text-gray-300 text-sm mb-6">
            Are you sure you want to verify the payment for stage{" "}?
          </p>

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md text-sm font-medium
              hover:bg-gray-600 hover:text-indigo-300 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              onClick={() => setVerifyOn(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium
              hover:bg-indigo-700 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              onClick={verifyPaymentFun}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
      <Loading loadOn={loadOn} />
    </>
  );
}

export default VerifyModal;