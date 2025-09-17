import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { stagePayApi } from "../../../api/User/Stage";
import type { FormEvent } from "react";

type StageData = {
   _id: string;
   stage_name: string;
   start_date: string;
   end_date: string;
   stage_amount: number;
   progress: number;
   status_date: string;
};
interface prop {
   checkData: StageData | undefined
}
function PaymentForm({ checkData }: prop) {
   if (!checkData) return
   const stripe = useStripe()
   const elements = useElements()
   const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
         const response  = await stagePayApi(checkData._id,checkData.stage_amount)
         window.location.href=response.data
   };
   return (
      <>
         <form onSubmit={handleSubmit}>
            <button type="submit" disabled={!stripe}>pay {checkData.stage_amount}</button>
         </form>
      </>
   )
}

export default PaymentForm