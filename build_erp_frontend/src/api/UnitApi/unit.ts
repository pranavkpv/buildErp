import { toast } from "react-toastify";
import adminAxios from "../../axios/adminAxios"
import type { unitInput } from "../../ApiInterface/UnitApiInterface";
import type { listingInput } from "../../ApiInterface/CommonApiInterface";

// ---------------- Add New Unit ---------------- //

export const postUnit = async (input: unitInput) => {
   const response = await adminAxios.post(`/unit`, input);
   return response.data;
};

// ---------------- Delete Unit ---------------- //

export const deleteUnitData = async (_id: string) => {
      const response = await adminAxios.delete(`/unit/${ _id }`);
      return response.data;
};

// ---------------- Edit Unit ---------------- //

export const editUnitData = async (input: unitInput) => {
      const { _id, unit_name, short_name } = input
      const response = await adminAxios.put(`/unit/${ _id }`, {
         unit_name,
         short_name,
      });
      return response.data;
};

// ---------------- List Units with Pagination & Search ---------------- //

export const getUnit = async (input: listingInput) => {
      const response = await adminAxios.get(`/unit`, {
         params: input,
      });
      return response.data;
};

// ---------------- Fetch All Units ---------------- //

export const fetchUnitData = async () => {
   const response = await adminAxios.get('/getUnit');
   return response.data;
};
