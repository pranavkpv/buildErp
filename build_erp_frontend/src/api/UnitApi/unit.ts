import { toast } from "react-toastify";
import adminAxios from "../../axios/AdminAxioInterceptors"
import type { unitInput } from "../../ApiInterface/UnitApiInterface";
import type { listingInput } from "../../ApiInterface/CommonApiInterface";

// ---------------- Add New Unit ---------------- //

export const postUnit = async (input: unitInput) => {
   try {
      const response = await adminAxios.post(`/unit`, input);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Delete Unit ---------------- //

export const deleteUnitData = async (_id: string) => {
   try {
      const response = await adminAxios.delete(`/unit/${ _id }`);
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Edit Unit ---------------- //

export const editUnitData = async (input: unitInput) => {
   try {
      const { _id, unit_name, short_name } = input
      const response = await adminAxios.put(`/unit/${ _id }`, {
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
      const response = await adminAxios.get(`/unit`, {
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
      const response = await adminAxios.get('/getUnit');
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};
