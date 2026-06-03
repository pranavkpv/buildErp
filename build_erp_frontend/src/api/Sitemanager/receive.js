import siteAxios from "../../axios/SitemanagerAxioInterceptor";
export const getReceiveDataAPI = async (search, page) => {
    const response = await siteAxios.get(`/receive`, { params: { search, page } });
    return response.data;
};
export const saveReceiveAPI = async (project_id, date, description, materialDetails, transferId) => {
    const response = await siteAxios.post(`/receive`, { project_id, date, description, materialDetails, transferId });
    return response.data;
};
export const updateReceiveAPI = async (editId, project_id, date, description, materialDetails, transferId) => {
    const response = await siteAxios.put(`/receive/${editId}`, { project_id, date, description, materialDetails, transferId });
    return response.data;
};
export const deleteReceiveAPI = async (deleteId) => {
    const response = await siteAxios.delete(`/receive/${deleteId}`);
    return response.data;
};
export const ApproveReceiveAPI = async (_id, approveData) => {
    const response = await siteAxios.patch(`/receive/${_id}`, { data: { approveData } });
    return response.data;
};
