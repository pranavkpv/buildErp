import { toast } from "react-toastify";
import axioInstance from "../../api/axio";

// ---------------- Change Site Manager Password ---------------- //

export const changePassword = async (
   _id: string,
   password: string,
   changedpassword: string
) => {
   try {
      const response = await axioInstance.put(`/site/changepass/${_id}`, {
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
      const response = await axioInstance.post(`/site/logout`, {}, { withCredentials: true });
      return response.data;
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
};

// ---------------- Get Site Manager's Projects ---------------- //

export const getSitemanagersProject = async (user: string) => {
   try {
      const response = await axioInstance.get(`/site/siteproject/${user}`);
      return response.data;
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
};
