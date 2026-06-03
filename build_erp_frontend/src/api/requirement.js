import userAxios from '../axios/userAxios';
export const saveRequirement = async (input) => {
    const response = await userAxios.post(`/addRequirement`, { input });
    return response.data;
};
export const adminRequireApi = async (projectId) => {
    const response = await userAxios.patch(`/addRequirement/${projectId}`);
    return response.data;
};
