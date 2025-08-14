import { toast } from "react-toastify";
import userAxios from "../../axios/UserAxioInterceptors";
import authAxios from "../../axios/authAxios"

// ---------------- Fetch User Projects ---------------- //

export const fetchUserProjectAPI = async (user: string) => {
   try {
      const response = await userAxios.get(`/fetchuserproject/${ user }`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch user projects");
   }
};

// ---------------- Fetch Projects by Status ---------------- //

export const fetchStatusBaseProject = async (
   status: string,
   searchItem: string,
   selectedArea: number,
   page: number
) => {
   try {
      const response = await userAxios.get(`/fetchstatusbaseproject/${ status }`, {
         params: { searchItem, selectedArea, page }
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch status-based projects");
   }
};

export const fetchSitemanagerApI = async () => {
   try {
      const response = await userAxios.get(`/fetchatList`)
      return response.data
   } catch (error: any) {
      toast.error(error.response?.data?.message);
   }
}


export const fetchMessagesApi = async (sitemanagerId: string | null) => {
   try {
      const response = await userAxios.get(`chats/${ sitemanagerId }`)
      return response.data
   } catch (error: any) {
      toast.error(error.response?.data?.message);
   }
}


export const getAllProjectInUserSideApi = async () => {
   try {
      const response = await authAxios.get(`/projectListUser`)
      return response.data
   } catch (error: any) {
      toast.error(error.response?.data?.message);
   }
}