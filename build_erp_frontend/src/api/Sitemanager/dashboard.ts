import siteAxios from "../../axios/SitemanagerAxioInterceptor"
import type { listingInput } from "ApiInterface/CommonApiInterface";
import authAxios from "../../axios/commonAxios"

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

export const fetchStockApi = async (projectId: string, material: string, page: number) => {
      const response = await siteAxios.get('/stock', { params: { projectId, material, page } })
      return response.data
}

export const getSiteEstimationApi = async (projectId: string) => {
   const response = await siteAxios.get(`/getEstimation/${ projectId }`);
   return response.data
}

export const getSitematerialEstimationApi = async (projectId: string) => {
   const response = await siteAxios.get(`/getMaterialEstimation/${ projectId }`)
   return response.data
}

export const getSiteLabourEstimationApi = async (projectId: string) => {
   const response = await siteAxios.get(`/getLabourEstimation/${ projectId }`)
   return response.data
}


export const getSiteAdditionEstimationApi = async (projectId: string) => {
   const response = await siteAxios.get(`/getAdditionEstimation/${ projectId }`)
   return response.data
}

export const getSiteExpectedImageApi = async (projectId: string) => {
   const response = await siteAxios.get(`/expectImage/${ projectId }`)
   return response.data
}

