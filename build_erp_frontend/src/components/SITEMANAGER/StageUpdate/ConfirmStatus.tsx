import Loading from "../../../components/Loading";
import { changeStatusStage } from "../../../api/Sitemanager/stageStatus";
import type React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { socket } from "../../../api/socket";


type status = {
  statusEnable: boolean;
  editStageId: string;
  newProgress: number;
  setStatusEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
  onstatusSuccess: (projectId: string) => void;
  selectedProjectId: string;
};

function ConfirmStatus({
  statusEnable,
  editStageId,
  newProgress,
  setStatusEnable,
  onSuccess,
  onstatusSuccess,
  selectedProjectId,
}: status) {
  if (!statusEnable) return null;

  const [date, setDate] = useState("");
  const [loadOn, setLoadOn] = useState(false)

  const confirmStageStatus = async () => {
    setLoadOn(true)
    const response = await changeStatusStage(editStageId, newProgress, date);
    setLoadOn(false)
    if (response.success) {
      socket.emit("userAddNotificationEventTrigger")
      toast.success(response.message);
      setStatusEnable(false);
      onSuccess();
      onstatusSuccess(selectedProjectId);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6">
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-gray-700/50">
          <h2 className="text-xl font-bold text-gray-100 mb-6 text-center">
            Confirm Stage Status
          </h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="statusDate" className="block text-sm font-medium text-gray-200 mb-1">
                Status Changed Date
              </label>
              <input
                id="statusDate"
                type="date"
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                placeholder="Select status changed date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <p className="text-gray-200 text-sm font-medium text-center">
              Do you want to change the stage progress to <span className="capitalize font-semibold text-teal-400">{newProgress}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
                onClick={() => setStatusEnable(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-teal-500/90 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
                onClick={confirmStageStatus}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <Loading loadOn={loadOn} />
    </>
  );
}

export default ConfirmStatus;