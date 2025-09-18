import { getUserTransferDataAPI } from "../../api/Sitemanager/transfer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TransferAction from "./SubprofileCompponent/TransferAction";

type MaterialData = {
  sl: number;
  material_id: string;
  material_name: string;
  brand_name: string;
  unit_name: string;
  quantity: number;
  unit_rate: number;
};

export type Transfer = {
  _id: string;
  from_project_id: string;
  fromproject_name: string;
  to_project_id: string;
  toproject_name: string;
  transfer_id: string;
  description: string;
  date: string;
  materialDetails: MaterialData[];
  finalAmount: number;
};

function Transfer() {
  const [transferData, setTransferData] = useState<Transfer[]>([]);
  const [actionEnable, setActionEnable] = useState(false);
  const [actionData, setActionData] = useState<Transfer | undefined>();

  const fetchTransferData = async () => {
    try {
      const response = await getUserTransferDataAPI();
      if (response.success) {
        setTransferData(response.data);
      } else {
        toast.error(response.message || "Error occurred while fetching transfer data");
      }
    } catch (error) {
      toast.error("Failed to fetch transfer data");
    }
  };

  useEffect(() => {
    fetchTransferData();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided";
    const [date] = dateString.split("T");
    const [year, month, day] = date.split("-");
    return `${ day }-${ month }-${ year }`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Transfer Request List
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                <tr>
                  <th className="px-4 py-3.5 w-16">SL No</th>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-4 py-3.5">From Project</th>
                  <th className="px-4 py-3.5">To Project</th>
                  <th className="px-4 py-3.5">Transfer ID</th>
                  <th className="px-4 py-3.5 w-32">Net Amount</th>
                  <th className="px-4 py-3.5 w-40 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transferData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-8 text-gray-500 text-sm font-medium"
                    >
                      No transfer records available.
                    </td>
                  </tr>
                ) : (
                  transferData.map((element, index) => (
                    <tr
                      key={element._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3.5 text-gray-800 font-medium text-center w-16">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3.5 text-gray-800">
                        {formatDate(element.date)}
                      </td>
                      <td className="px-4 py-3.5 text-gray-800">
                        {element.fromproject_name}
                      </td>
                      <td className="px-4 py-3.5 text-gray-800">
                        {element.toproject_name}
                      </td>
                      <td className="px-4 py-3.5 text-gray-800">
                        {element.transfer_id}
                      </td>
                      <td className="px-4 py-3.5 text-gray-800 w-32">
                        ₹{element.finalAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5 text-center w-40">
                        <button
                          type="button"
                          className="px-3 py-1.5 bg-teal-50 text-teal-600 rounded-md text-sm font-medium 
                            hover:bg-teal-100 hover:text-teal-800 
                            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 
                            transition-all duration-200"
                          aria-label={`View actions for transfer ${ element.transfer_id }`}
                          onClick={() => {
                            setActionData(element);
                            setActionEnable(true);
                          }}
                        >
                          View Actions
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <TransferAction
          actionData={actionData}
          actionEnable={actionEnable}
          onActionSuccess={fetchTransferData}
          setActionEnable={setActionEnable}
        />
      </div>
    </div>
  );
}

export default Transfer;