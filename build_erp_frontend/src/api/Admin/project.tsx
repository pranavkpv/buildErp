import { toast } from "react-toastify";
import axioInstance from "../../api/axio";

// ---------------- Fetch Users for Project Assignment ---------------- //

export const fetchUser = async () => {
   try {
      const response = await axioInstance.get(`/admin/addproject`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Add New Project ---------------- //

export const postProject = async (
   project_name: string,
   user_id: string,
   address: string,
   mobile_number: string,
   email: string,
   area: number,
   description: string
) => {
   try {
      const response = await axioInstance.post(`/admin/project`, {
         project_name,
         user_id,
         address,
         mobile_number,
         email,
         area,
         description,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Delete Project ---------------- //

export const deleteProjectData = async (_id: string) => {
   try {
      const response = await axioInstance.delete(`/admin/project/${ _id }`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Edit Project ---------------- //

export const putProject = async (
   _id: string,
   project_name: string,
   user_id: string,
   address: string,
   mobile_number: string,
   email: string,
   area: number,
   description: string
) => {
   try {
      const response = await axioInstance.put(`/admin/project/${ _id }`, {
         project_name,
         user_id,
         address,
         mobile_number,
         email,
         area,
         description,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Project List with Pagination & Search ---------------- //

export const projectListData = async (page: number, search: string) => {
   try {
      const response = await axioInstance.get(`/admin/project`, {
         params: { page, search },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Change Project Status ---------------- //

export const pustStatusChange = async (_id: string, status: string) => {
   try {
      const response = await axioInstance.put(`/admin/status/${ _id }`, { status });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Get All Projects ---------------- //

export const getProject = async () => {
   try {
      const response = await axioInstance.get('/admin/getproject');
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};
