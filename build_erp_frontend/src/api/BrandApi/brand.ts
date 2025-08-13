import { toast } from "react-toastify";
import axioInstance from "../../axios/authAxios";
import type { brandInput } from "../../ApiInterface/BrandApiInterface";
import type { listingInput } from "../../ApiInterface/CommonApiInterface";

// --------------- add brand --------------- //

export const postBrand = async (input:brandInput) => {
   try {
      const response = await axioInstance.post(`/admin/brand`,input);
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

// --------------- brand list --------------- //

export const getbrandList = async (input:listingInput) => {
   try {
      const response = await axioInstance.get(`/admin/brand`, { params: input });
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

export const putBrandData = async (input:brandInput) => {
   try {
      const {_id,brand_name} = input
      const response = await axioInstance.put(`/admin/brand/${ _id }`, { brand_name });
      return response.data
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
}