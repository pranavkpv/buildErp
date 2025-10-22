import { toast } from "react-toastify";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { SendEstimationApi } from "../../../api/Estimation";
import Loading from "../../../components/Loading";
import { useState } from "react";

type prop = {
  projectId: string;
  setSendEnable: React.Dispatch<React.SetStateAction<boolean>>;
  sendEnable: boolean;
  onSendSuccess: () => void;
};

function SendEstimation({
  sendEnable,
  setSendEnable,
  projectId,
  onSendSuccess,
}: prop) {
  const [loadOn, setLoadOn] = useState(false);

  const sendEstimation = async () => {
    setLoadOn(true);
    const resultData = await SendEstimationApi(projectId);
    setLoadOn(false);
    if (resultData.success) {
      toast.success(resultData.message);
      setSendEnable(false);
      onSendSuccess();
    } else {
      toast.error(resultData.message);
    }
  };

  if (!sendEnable) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4">
        <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 text-center border border-gray-700/50">
          <div className="flex justify-center mb-4">
            <ExclamationTriangleIcon className="h-16 w-16 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-500 mb-3">Confirm Send</h2>
          <p className="text-gray-300 mb-6">
            Are you sure you want to send this estimation data?
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setSendEnable(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold"
              disabled={loadOn}
            >
              Cancel
            </button>
            <button
              onClick={sendEstimation}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
              disabled={loadOn}
            >
              Send
            </button>
          </div>

          {loadOn && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SendEstimation;
