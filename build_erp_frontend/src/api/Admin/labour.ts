import { toast } from "react-toastify";
import adminAxios from "../../axios/AdminAxioInterceptors"
import type { addLabourInterface } from "ApiInterface/labour.interface";

// ---------------- Add Labour ---------------- //

export const postLabour = async (input:addLabourInterface) => {
   const response = await adminAxios.post(`/labour`, input);
   return response.data;
};

// ---------------- Delete Labour ---------------- //

export const deleteLabourData = async (labourId: string) => {
   try {
      const response = await adminAxios.delete(`/labour/${ labourId }`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Edit Labour ---------------- //

export const putLabour = async (_id: string, labour_type: string, daily_wage: number) => {
   try {
      const response = await adminAxios.put(`/labour/${ _id }`, { labour_type, daily_wage });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Labour List with Pagination & Search ---------------- //

export const getLabour = async (page: number, search: string) => {
   try {
      const response = await adminAxios.get(`/labour`, { params: { page, search } });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Fetch All Labour ---------------- //

export const labourDataFetch = async () => {
   try {
      const response = await adminAxios.get('/fetchlabour');
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Get Single Labour ---------------- //

export const getLabourData = async (_id: string) => {
   try {
      const response = await adminAxios.get(`/getLabour/${ _id }`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};
