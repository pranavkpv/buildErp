import { toast } from "react-toastify";
import axioInstance from "../../api/axio";

// ---------------- Site Manager Login ---------------- //

export const SiteManagerLoginAPI = async (email: string, password: string) => {
   try {
      const response = await axioInstance.post(
         "/site/login",
         { email, password },
         { withCredentials: true }
      );
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};
