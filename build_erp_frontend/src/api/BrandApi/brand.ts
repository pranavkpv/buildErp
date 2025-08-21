import { toast } from "react-toastify";
import adminAxios from "../../axios/AdminAxioInterceptors"
import type { brandInput } from "../../ApiInterface/BrandApiInterface";
import type { listingInput } from "../../ApiInterface/CommonApiInterface";

// --------------- add brand --------------- //

export const postBrand = async (input: brandInput) => {
   const response = await adminAxios.post(`/brand`, input);
   return response.data
}

// --------------- brand list --------------- //

export const getbrandList = async (input: listingInput) => {
   const response = await adminAxios.get(`/brand`, { params: input });
   return response.data
}

// --------------- Delete barnd --------------- //

export const deleteBrandData = async (_id: string) => {
   const response = await adminAxios.delete(`/brand/${ _id }`);
   return response.data
}

// --------------- edit brand --------------- //

export const putBrandData = async (input: brandInput) => {
   const { _id, brand_name } = input
   const response = await adminAxios.put(`/brand/${ _id }`, { brand_name });
   return response.data
}