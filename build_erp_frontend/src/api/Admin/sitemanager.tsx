import { toast } from "react-toastify";
import axioInstance from "../../api/axio";

// ---------------- Add Site Manager ---------------- //

export const postSitemanager = async (username: string, email: string) => {
   try {
      const response = await axioInstance.post(`/admin/sitemanager`, {
         username,
         email,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Delete Site Manager ---------------- //

export const deleteSitemanagerData = async (_id: string) => {
   try {
      const response = await axioInstance.delete(`/admin/sitemanager/${_id}`);
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Edit Site Manager ---------------- //

export const editSitemanagerData = async (_id: string, username: string, email: string) => {
   try {
      const response = await axioInstance.put(`/admin/sitemanager/${_id}`, {
         username,
         email,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Fetch Site Manager List ---------------- //

export const fetchSitemanager = async (page: number, search: string) => {
   try {
      const response = await axioInstance.get(`/admin/sitemanager`, {
         params: { page, search },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};
