import adminAxios from "../../axios/adminAxios";
// ---------------- Add New Unit ---------------- //
export const postUnit = async (input) => {
    const response = await adminAxios.post(`/unit`, input);
    return response.data;
};
// ---------------- Delete Unit ---------------- //
export const deleteUnitData = async (_id) => {
    const response = await adminAxios.patch(`/unit/${_id}`);
    return response.data;
};
// ---------------- Edit Unit ---------------- //
export const editUnitData = async (input) => {
    const { _id, unit_name, short_name } = input;
    const response = await adminAxios.put(`/unit/${_id}`, {
        unit_name,
        short_name,
    });
    return response.data;
};
// ---------------- List Units with Pagination & Search ---------------- //
export const getUnit = async (input) => {
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
