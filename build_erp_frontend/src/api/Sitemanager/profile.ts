import { toast } from "react-toastify";
import siteAxios from "../../axios/SitemanagerAxioInterceptor"

// ---------------- Change Site Manager Password ---------------- //

export const changePassword = async (
   _id: string,
   password: string,
   changedpassword: string
) => {
   try {
      const response = await siteAxios.put(`/changepass/${ _id }`, {
         password,
         changedpassword,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Site Manager Logout ---------------- //

export const logoutSitemanager = async () => {
   try {
      const response = await siteAxios.post(`/logout`, {}, { withCredentials: true });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Get Site Manager's Projects ---------------- //

export const getSitemanagersProject = async (user: string) => {
   try {
      const response = await siteAxios.get(`/siteproject/${ user }`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};


export const fetchProjectBySitemanager = async () => {
   try {
      const response = await siteAxios.get(`/chatProject`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}


export const fetchMessagesApiInSitemanager =  async (sitemanagerId: string | null) => {
   try {
      const response = await siteAxios.get(`chats/${ sitemanagerId }`)
      return response.data
   } catch (error: any) {
      toast.error(error.response?.data?.message);
   }
}