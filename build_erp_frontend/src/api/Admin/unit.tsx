import { toast } from "react-toastify";
import axioInstance from "../../api/axio";

// ---------------- Add New Unit ---------------- //

export const postUnit = async (unit_name: string, short_name: string) => {
   try {
      const response = await axioInstance.post(`/admin/unit`, {
         unit_name,
         short_name,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Delete Unit ---------------- //

export const deleteUnitData = async (_id: string) => {
   try {
      const response = await axioInstance.delete(`/admin/unit/${_id}`);
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Edit Unit ---------------- //

export const editUnitData = async (_id: string, unit_name: string, short_name: string) => {
   try {
      const response = await axioInstance.put(`/admin/unit/${_id}`, {
         unit_name,
         short_name,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- List Units with Pagination & Search ---------------- //

export const getUnit = async (page: number, search: string) => {
   try {
      const response = await axioInstance.get(`/admin/unit`, {
         params: { page, search },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Fetch All Units ---------------- //

export const fetchUnitData = async () => {
   try {
      const response = await axioInstance.get('/admin/getUnit');
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};
