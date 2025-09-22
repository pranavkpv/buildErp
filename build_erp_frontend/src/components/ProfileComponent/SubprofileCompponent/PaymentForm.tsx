import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { payFromWalletApi, stagePayApi } from "../../../api/User/Stage";
import { toast } from "react-toastify";
import type { FormEvent } from "react";
import { X } from "lucide-react";

type StageData = {
  _id: string;
  stage_name: string;
  start_date: string;
  end_date: string;
  stage_amount: number;
  progress: number;
  status_date: string;
};

interface Prop {
  checkData: StageData | undefined;
  checkOn: boolean;
  setCheckOn: React.Dispatch<React.SetStateAction<boolean>>;
}

function PaymentForm({ checkData, checkOn, setCheckOn }: Prop) {
  if (!checkOn || !checkData) return null;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not initialized");
      return;
    }

    try {
      const response = await stagePayApi(checkData._id, checkData.stage_amount);
      if (response.success) {
        window.location.href = response.data;
      } else {
        toast.error(response.message || "Failed to initiate payment");
      }
    } catch (error) {
      toast.error("An error occurred during payment");
    }
  };

  const payFromWalletFun = async () => {
    const response = await payFromWalletApi(checkData._id, checkData.stage_amount)
    if (response.success) {
      toast.success(response.message)
      setCheckOn(false)
    } else {
      toast.error(response.message)
      setCheckOn(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setCheckOn(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close payment form"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Form Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Payment for {checkData.stage_name}
        </h2>
        <p className="text-gray-600 mb-6">
          Amount: ₹{checkData.stage_amount.toLocaleString()}
        </p>

        {/* Payment Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-label={`Payment form for ${ checkData.stage_name }`}
        >

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                payFromWalletFun()
              }}
              className="flex items-center justify-center px-5 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 transition-all duration-200 text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Pay ₹${ checkData.stage_amount.toLocaleString() } for ${ checkData.stage_name } from wallet`}
            >
              Pay From Wallet
            </button>
            <button
              type="submit"
              disabled={!stripe}
              className="flex items-center justify-center px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 transition-all duration-200 text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Pay ₹${ checkData.stage_amount.toLocaleString() } for ${ checkData.stage_name } using Stripe`}
            >
              Pay Using Stripe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;