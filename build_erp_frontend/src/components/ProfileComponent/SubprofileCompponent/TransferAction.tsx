import { useState } from "react";
import type { Transfer } from "../Transfer";
import ApproveTransfer from "./ApproveTransfer";
import RejectTransfer from "./RejectTransfer";

type EditProps = {
  actionEnable: boolean;
  setActionEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onActionSuccess: () => void;
  actionData: Transfer | undefined;
};

function TransferAction({ actionEnable, setActionEnable, onActionSuccess, actionData }: EditProps) {
  if (!actionEnable) return null;

  const [approveEnable, setApproveEnable] = useState(false);
  const [rejectEnable, setRejectEnable] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-5xl mx-4 p-6 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2
          id="modal-title"
          className="text-2xl font-semibold text-gray-800 mb-6 tracking-tight"
        >
          Transfer Details
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Project
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-gray-800 text-sm">
                {actionData?.toproject_name || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-gray-800 text-sm">
                {actionData?.date
                  ? new Date(actionData.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).split("/").join("-")
                  : "Not provided"}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-gray-800 text-sm">
                {actionData?.description || "No description provided"}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                <tr>
                  <th className="px-4 py-3.5 w-16">SL No</th>
                  <th className="px-4 py-3.5">Material</th>
                  <th className="px-4 py-3.5">Brand</th>
                  <th className="px-4 py-3.5">Unit</th>
                  <th className="px-4 py-3.5 w-24">Quantity</th>
                  <th className="px-4 py-3.5 w-24">Unit Rate</th>
                  <th className="px-4 py-3.5 w-24">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {actionData?.materialDetails.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-8 text-gray-500 text-sm font-medium"
                    >
                      No materials available.
                    </td>
                  </tr>
                ) : (
                  actionData?.materialDetails.map((element, idx) => (
                    <tr
                      key={element.sl}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3.5 text-gray-800 font-medium w-16">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3.5 text-gray-800">
                        {element.material_name}
                      </td>
                      <td className="px-4 py-3.5 text-gray-800">
                        {element.brand_name}
                      </td>
                      <td className="px-4 py-3.5 text-gray-800">
                        {element.unit_name}
                      </td>
                      <td className="px-4 py-3.5 text-gray-800 w-24">
                        {element.quantity}
                      </td>
                      <td className="px-4 py-3.5 text-gray-800 w-24">
                        ₹{element.unit_rate.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5 text-gray-800 w-24">
                        ₹{(element.quantity * element.unit_rate).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-gray-800 font-semibold text-sm">
              Total Amount: ₹{actionData?.finalAmount.toLocaleString() || "0.00"}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setActionEnable(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium 
                  hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 
                  focus:ring-offset-2 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setRejectEnable(true)}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-md text-sm font-medium 
                  hover:bg-red-200 hover:text-red-700 focus:outline-none focus:ring-2 
                  focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => setApproveEnable(true)}
                className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm font-medium 
                  hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 
                  focus:ring-offset-2 transition-all duration-200"
              >
                Approve
              </button>
            </div>
          </div>
        </form>

        <ApproveTransfer
          approveData={actionData}
          approveEnable={approveEnable}
          approveId={actionData?._id}
          onApproveSuccess={onActionSuccess}
          setApproveEnable={setApproveEnable}
          setActionEnable={setActionEnable}
        />
        <RejectTransfer
          onRejectSuccess={onActionSuccess}
          rejectEnable={rejectEnable}
          rejectId={actionData?._id}
          setRejectEnable={setRejectEnable}
          setActionEnable={setActionEnable}
        />
      </div>
    </div>
  );
}

export default TransferAction;