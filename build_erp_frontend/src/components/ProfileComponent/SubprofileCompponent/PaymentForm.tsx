import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { stagePayApi } from "../../../api/User/Stage";
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
  checkOn:boolean
  setCheckOn: React.Dispatch<React.SetStateAction<boolean>>;
}

function PaymentForm({ checkData,checkOn,setCheckOn}: Prop) {
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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      aria-label={`Payment form for ${checkData.stage_name}`}
    >
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setCheckOn(false)}
          className="flex items-center px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200 text-sm sm:text-base font-medium"
          aria-label="Cancel payment"
        >
          <X className="w-5 h-5 mr-2" />
          Cancel
        </button>
         <button
          type="button"
          className="flex items-center px-5 py-2.5 bg-teal-500/90 text-white rounded-lg hover:bg-teal-600 focus:ring-4 focus:ring-teal-200 transition-all duration-200 text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Pay ₹${checkData.stage_amount.toLocaleString()} for ${checkData.stage_name}`}
        >
          Pay From Wallet ₹{checkData.stage_amount.toLocaleString()}
        </button>
        <button
          type="submit"
          disabled={!stripe}
          className="flex items-center px-5 py-2.5 bg-teal-500/90 text-white rounded-lg hover:bg-teal-600 focus:ring-4 focus:ring-teal-200 transition-all duration-200 text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Pay ₹${checkData.stage_amount.toLocaleString()} for ${checkData.stage_name}`}
        >
          Pay Using Stripe ₹{checkData.stage_amount.toLocaleString()}
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;