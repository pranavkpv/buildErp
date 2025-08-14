import { toast } from "react-toastify";
import siteAxios from "../../axios/SitemanagerAxioInterceptor"

// ---------------- Site Manager Login ---------------- //

export const SiteManagerLoginAPI = async (email: string, password: string) => {
   try {
      const response = await siteAxios.post(
         "/login",
         { email, password },
         { withCredentials: true }
      );
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};
