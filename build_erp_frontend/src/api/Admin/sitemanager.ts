import { toast } from "react-toastify";
import adminAxios from "../../axios/AdminAxioInterceptors"

// ---------------- Add Site Manager ---------------- //

export const postSitemanager = async (username: string, email: string) => {
   try {
      const response = await adminAxios.post(`/sitemanager`, {
         username,
         email,
      });
      return response.data;
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
};

// ---------------- Delete Site Manager ---------------- //

export const deleteSitemanagerData = async (_id: string) => {
   try {
      const response = await adminAxios.delete(`/sitemanager/${_id}`);
      return response.data;
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
};

// ---------------- Edit Site Manager ---------------- //

export const editSitemanagerData = async (_id: string, username: string, email: string) => {
   try {
      const response = await adminAxios.put(`/sitemanager/${_id}`, {
         username,
         email,
      });
      return response.data;
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
};

// ---------------- Fetch Site Manager List ---------------- //

export const fetchSitemanager = async (page: number, search: string) => {
   try {
      const response = await adminAxios.get(`/sitemanager`, {
         params: { page, search },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};
