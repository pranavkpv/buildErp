import { toast } from "react-toastify";
import axioInstance from "../../axios/authAxios";
import type { unitInput } from "../../ApiInterface/UnitApiInterface";
import type { listingInput } from "../../ApiInterface/CommonApiInterface";

// ---------------- Add New Unit ---------------- //

export const postUnit = async (input: unitInput) => {
   try {
      const response = await axioInstance.post(`/admin/unit`, input);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Delete Unit ---------------- //

export const deleteUnitData = async (_id: string) => {
   try {
      const response = await axioInstance.delete(`/admin/unit/${ _id }`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Edit Unit ---------------- //

export const editUnitData = async (input: unitInput) => {
   try {
      const { _id, unit_name, short_name } = input
      const response = await axioInstance.put(`/admin/unit/${ _id }`, {
         unit_name,
         short_name,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- List Units with Pagination & Search ---------------- //

export const getUnit = async (input:listingInput) => {
   try {
      const response = await axioInstance.get(`/admin/unit`, {
         params:input,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Fetch All Units ---------------- //

export const fetchUnitData = async () => {
   try {
      const response = await axioInstance.get('/admin/getUnit');
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};
