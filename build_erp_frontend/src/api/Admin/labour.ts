import { toast } from "react-toastify";
import axioInstance from "../../axios/authAxios";

// ---------------- Add Labour ---------------- //

export const postLabour = async (labour_type: string, daily_wage: number) => {
   try {
      const response = await axioInstance.post(`/admin/labour`, { labour_type, daily_wage });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Delete Labour ---------------- //

export const deleteLabourData = async (labourId: string) => {
   try {
      const response = await axioInstance.delete(`/admin/labour/${ labourId }`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Edit Labour ---------------- //

export const putLabour = async (_id: string, labour_type: string, daily_wage: number) => {
   try {
      const response = await axioInstance.put(`/admin/labour/${ _id }`, { labour_type, daily_wage });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Labour List with Pagination & Search ---------------- //

export const getLabour = async (page: number, search: string) => {
   try {
      const response = await axioInstance.get(`/admin/labour`, { params: { page, search } });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Fetch All Labour ---------------- //

export const labourDataFetch = async () => {
   try {
      const response = await axioInstance.get('/admin/fetchlabour');
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Get Single Labour ---------------- //

export const getLabourData = async (_id: string) => {
   try {
      const response = await axioInstance.get(`/admin/getLabour/${ _id }`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};
