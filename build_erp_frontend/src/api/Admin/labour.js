import { toast } from "react-toastify";
import adminAxios from "../../axios/adminAxios";
// ---------------- Add Labour ---------------- //
export const postLabour = async (input) => {
    const response = await adminAxios.post(`/labour`, input);
    return response.data;
};
// ---------------- Delete Labour ---------------- //
export const deleteLabourData = async (labourId) => {
    const response = await adminAxios.patch(`/labour/${labourId}`);
    return response.data;
};
// ---------------- Edit Labour ---------------- //
export const putLabour = async (input) => {
    const { _id, labour_type, daily_wage } = input;
    const response = await adminAxios.put(`/labour/${_id}`, { labour_type, daily_wage });
    return response.data;
};
// ---------------- Labour List with Pagination & Search ---------------- //
export const getLabour = async (input) => {
    const response = await adminAxios.get(`/labour`, { params: input });
    return response.data;
};
// ---------------- Fetch All Labour ---------------- //
export const labourDataFetch = async () => {
    const response = await adminAxios.get('/fetchlabour');
    return response.data;
};
// ---------------- Get Single Labour ---------------- //
export const getLabourData = async (_id) => {
    const response = await adminAxios.get(`/getLabour/${_id}`);
    return response.data;
};
