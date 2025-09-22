import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getStageForVerifyPayApi } from "../../../api/Admin/StageSetting";
import VerifyModal from "./VerifyModal";
import ReUsablePagination from "../../../components/ReUsableComponents/ReUsablePagination";

interface StageData {
  _id: string;  // stage _id
  project_name: string;
  stage_name: string;
  stage_amount: number;
  payment_status: string
  payment_date: Date;
}

function VerifyPayment() {
  const [stage, setStage] = useState<StageData[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState<number[]>([]);

  const [verifyOn, setVerifyOn] = useState(false)
  const [verifyStage, setVerifyStage] = useState("")

  const fetchStageForVerifyPay = async () => {
    try {
      const response = await getStageForVerifyPayApi(search, page);
      console.log(response)
      if (response.success) {
        setStage(response.data.data);
        const pages = Array.from({ length: response.data.totalPage }, (_, i) => i);
        setTotalPage(pages);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch payment data");
    }
  };

  useEffect(() => {
    fetchStageForVerifyPay();
  }, [page, search]);



  const renderAction = (item: StageData) => {
    const buttonText =
      item.payment_status === "completed"
        ? "Verify"
        : item.payment_status === "pending"
          ? "Pending to Payment"
          : "Verified";

    const buttonColors: Record<string, string> = {
      Verify: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
      "Pending to Payment": "bg-gray-600",
      Verified: "bg-green-600",
    };

    const isDisabled = item.payment_status !== "completed";

    return (
      <td className="px-4 py-3 whitespace-nowrap text-sm">
        <button
          disabled={isDisabled}
          className={`w-full px-4 py-2 text-white rounded-md text-sm font-medium transition-all duration-200 
            ${ buttonColors[buttonText] } 
            disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900`}
          onClick={() => {
            if (item.payment_status === "completed") {
              setVerifyOn(true)
              setVerifyStage(item._id)
            }
          }}
        >
          {buttonText}
        </button>
      </td>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-semibold text-gray-100 tracking-tight">
            Payment Verification
          </h1>
          <div className="w-full sm:w-80">
            <label htmlFor="search" className="sr-only">
              Search project
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by project name"
              className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg border border-gray-800 shadow-lg">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-900/80">
              <tr>
                {[
                  "SL NO",
                  "Project Name",
                  "Stage Name",
                  "Stage Amount",
                  "Date",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-4 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {stage.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-400 text-sm"
                  >
                    No payment data found.
                  </td>
                </tr>
              ) : (
                stage.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-800/50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3.5 text-gray-100 text-sm">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3.5 text-gray-100 text-sm">
                      {item.project_name}
                    </td>
                    <td className="px-4 py-3.5 text-gray-100 text-sm">
                      {item.stage_name}
                    </td>
                    <td className="px-4 py-3.5 text-gray-100 text-sm">
                      ₹{item.stage_amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 text-gray-100 text-sm">
                      {new Date(item.payment_date)
                        .toISOString()
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </td>
                    {renderAction(item)}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {totalPage.length > 0 && (
            <ReUsablePagination page={page} setPage={setPage} totalPage={totalPage.length} />
          )}
        </div>
      </div>
      <VerifyModal
        verifyOn={verifyOn}
        setVerifyOn={setVerifyOn}
        verifyStage={verifyStage}
        onSuccess={fetchStageForVerifyPay}
      />
    </div>
  );
}

export default VerifyPayment;