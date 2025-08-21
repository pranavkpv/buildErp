import { toast } from "react-toastify";
import siteAxios from "../../axios/SitemanagerAxioInterceptor"
import type { changePasswordInterface } from "ApiInterface/sitemanager.interface";

// ---------------- Change Site Manager Password ---------------- //

export const changePassword = async (
   input: changePasswordInterface
) => {
   const { _id, password, changedpassword } = input
   const response = await siteAxios.put(`/changepass/${ _id }`, {
      password,
      changedpassword,
   });
   return response.data;
};

// ---------------- Site Manager Logout ---------------- //

export const logoutSitemanager = async () => {
      const response = await siteAxios.post(`/logout`, {}, { withCredentials: true });
      return response.data;
};

// ---------------- Get Site Manager's Projects ---------------- //

export const getSitemanagersProject = async (user: string) => {
      const response = await siteAxios.get(`/siteproject/${ user }`);
      return response.data;
};


export const fetchProjectBySitemanager = async () => {
      const response = await siteAxios.get(`/chatProject`);
      return response.data;
}


export const fetchMessagesApiInSitemanager = async (sitemanagerId: string | null) => {
      const response = await siteAxios.get(`chats/${ sitemanagerId }`)
      return response.data
}