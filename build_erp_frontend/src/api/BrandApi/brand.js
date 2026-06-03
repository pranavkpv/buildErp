import { toast } from "react-toastify";
import adminAxios from "../../axios/adminAxios";
// --------------- add brand --------------- //
export const postBrand = async (input) => {
    const response = await adminAxios.post(`/brand`, input);
    return response.data;
};
// --------------- brand list --------------- //
export const getbrandList = async (input) => {
    const response = await adminAxios.get(`/brand`, { params: input });
    return response.data;
};
// --------------- Delete barnd --------------- //
export const deleteBrandData = async (_id) => {
    const response = await adminAxios.patch(`/brand/${_id}`);
    return response.data;
};
// --------------- edit brand --------------- //
export const putBrandData = async (input) => {
    const { _id, brand_name } = input;
    const response = await adminAxios.put(`/brand/${_id}`, { brand_name });
    return response.data;
};
