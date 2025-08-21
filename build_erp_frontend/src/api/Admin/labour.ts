import { toast } from "react-toastify";
import adminAxios from "../../axios/AdminAxioInterceptors"
import type { addLabourInterface, editLabourInterface } from "ApiInterface/labour.interface";
import type { listingInput } from "ApiInterface/CommonApiInterface";

// ---------------- Add Labour ---------------- //

export const postLabour = async (input: addLabourInterface) => {
   const response = await adminAxios.post(`/labour`, input);
   return response.data;
};

// ---------------- Delete Labour ---------------- //

export const deleteLabourData = async (labourId: string) => {
   const response = await adminAxios.delete(`/labour/${ labourId }`);
   return response.data;
};

// ---------------- Edit Labour ---------------- //

export const putLabour = async (input: editLabourInterface) => {
   const { _id, labour_type, daily_wage } = input
   const response = await adminAxios.put(`/labour/${ _id }`, { labour_type, daily_wage });
   return response.data;
};

// ---------------- Labour List with Pagination & Search ---------------- //

export const getLabour = async (input: listingInput) => {
   const response = await adminAxios.get(`/labour`, { params: input });
   return response.data;
};

// ---------------- Fetch All Labour ---------------- //

export const labourDataFetch = async () => {
   const response = await adminAxios.get('/fetchlabour');
   return response.data;
};

// ---------------- Get Single Labour ---------------- //

export const getLabourData = async (_id: string) => {
      const response = await adminAxios.get(`/getLabour/${ _id }`);
      return response.data;
};
