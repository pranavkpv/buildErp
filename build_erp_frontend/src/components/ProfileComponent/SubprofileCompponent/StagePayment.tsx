import { useEffect, useState } from "react";
import { getStageInUser } from "../../../api/auth";
import { toast } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

type StageData = {
  _id: string;
  stage_name: string;
  start_date: string;
  end_date: string;
  stage_amount: number;
  progress: number;
  paymentStatus: string;
  status_date: string;
};

interface Prop {
  stagePayOn: boolean;
  setStagePayOn: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
}

function StagePayment({ stagePayOn, setStagePayOn, projectId }: Prop) {
  if (!stagePayOn) return null;

  const [stage, setStage] = useState<StageData[]>([]);
  const [checkOn, setCheckOn] = useState(false);
  const [checkData, setCheckData] = useState<StageData | undefined>();

  // Initialize Stripe
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const fetchStage = async (projectId: string): Promise<void> => {
    try {
      const response = await getStageInUser(projectId);
      if (response.success) {
        setStage(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch stages");
    }
  };

  useEffect(() => {
    fetchStage(projectId);
  }, [projectId]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const buttonColors: Record<string, string> = {
    Paid: "bg-green-100 text-green-700 border-green-300 hover:bg-green-200",
    Verified: "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200",
    Pay: "bg-indigo-100 text-indigo-700 border-indigo-300 hover:bg-indigo-200",
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-4xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Stage Payment Details
        </h2>

        <div
          className="max-h-[60vh] overflow-y-auto overflow-x-auto rounded-lg border border-gray-200"
          role="region"
          aria-label="Stage payment table"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50 sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider"
                >
                  SL No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider"
                >
                  Stage Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider"
                >
                  Start Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider"
                >
                  End Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stage.length > 0 ? (
                stage.map((element, index) => {
                  const isDisabled =
                    new Date(element.end_date) <=
                      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) &&
                    element.paymentStatus === "pending"
                      ? false
                      : true;

                  const buttonText =
                    element.paymentStatus === "completed"
                      ? "Paid"
                      : element.paymentStatus === "verified"
                      ? "Verified"
                      : "Pay";

                  return (
                    <tr key={element._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {element.stage_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(element.start_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(element.end_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        ₹{element.stage_amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => {
                            setCheckData(element);
                            setCheckOn(true);
                          }}
                          disabled={isDisabled}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${buttonColors[buttonText]} disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {buttonText}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No stages found for this project.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setStagePayOn(false)}
            className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200 text-sm font-medium"
          >
            Cancel
          </button>
        </div>

        {checkOn && checkData && (
          <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4 sm:p-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Payment for {checkData.stage_name}
              </h3>
              <Elements stripe={stripePromise}>
                <PaymentForm
                  checkData={checkData}
                  checkOn ={checkOn}
                  setCheckOn={setCheckOn}
                />
              </Elements>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StagePayment;