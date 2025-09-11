import { toast } from "react-toastify";
import siteAxios from "../../axios/SitemanagerAxioInterceptor"
import type { listingInput } from "ApiInterface/CommonApiInterface";

// ---------------- Site Manager Login ---------------- //

export const SiteManagerLoginAPI = async (email: string, password: string) => {
      const response = await siteAxios.post(
            "/login",
            { email, password },
            { withCredentials: true }
      );
      return response.data;
};

export const getProjectWithCompletionRateApi = async (input: listingInput) => {
      const response = await siteAxios.get('/projectWithCompletion', { params: input })
      return response.data
}
