import { toast } from "react-toastify";
import axioInstance from "../axio";

// --------------- add brand --------------- //

export const postBrand = async (brand_name: string) => {
   try {
      const response = await axioInstance.post(`/admin/brand`, {
         brand_name,
      });
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

// --------------- brand list --------------- //

export const getbrandList = async (page: number, search: string) => {
   try {
      const response = await axioInstance.get(`/admin/brand`, { params: { page, search } });
      return response.data
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
}

// --------------- Delete barnd --------------- //

export const deleteBrandData = async (_id: string) => {
   try {
      const response = await axioInstance.delete(`/admin/brand/${ _id }`);
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

// --------------- edit brand --------------- //

export const putBrandData = async (_id: string, brand_name: string) => {
   try {
      const response = await axioInstance.put(`/admin/brand/${ _id }`, { brand_name });
      return response.data
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
}