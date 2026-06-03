import siteAxios from "../../axios/SitemanagerAxioInterceptor";
import userAxios from "../../axios/userAxios";
export const getTransferDataAPI = async (search, page) => {
    const response = await siteAxios.get(`/transfer`, { params: { search, page } });
    return response.data;
};
export const ToProjectFetchAPI = async (_id) => {
    const response = await siteAxios.get(`/toProject/${_id}`);
    return response.data;
};
export const saveTransferApI = async (from_project_id, to_project_id, transfer_id, date, description, materialDetails) => {
    const response = await siteAxios.post(`/transfer`, { from_project_id, to_project_id, transfer_id, date, description, materialDetails });
    return response.data;
};
export const updateTransferAPI = async (_id, from_project_id, to_project_id, transfer_id, date, description, materialDetails) => {
    const response = await siteAxios.put(`/transfer/${_id}`, { from_project_id, to_project_id, transfer_id, date, description, materialDetails });
    return response.data;
};
export const deleteTransferAPI = async (_id) => {
    const response = await siteAxios.delete(`/transfer/${_id}`);
    return response.data;
};
export const ApproveTransferAPI = async (_id, data) => {
    const response = await userAxios.patch(`/transfer/${_id}`, { data });
    return response.data;
};
export const getProjectBaseTransferAPI = async (_id, date) => {
    const response = await siteAxios.get(`/receiveTransfer/${_id}`, { params: { date } });
    return response.data;
};
export const fetchFullStockApi = async (projectId) => {
    const response = await siteAxios.get(`/fetchstockList/${projectId}`);
    return response.data;
};
export const getUserTransferDataAPI = async () => {
    const response = await userAxios.get(`/transfer`);
    return response.data;
};
export const rejectTransferApi = async (rejectId) => {
    const response = await userAxios.patch(`/rejectTransfer/${rejectId}`);
    return response.data;
};
export const getLastTransferId = async () => {
    const response = await siteAxios.get(`/transferId`);
    return response.data;
};
