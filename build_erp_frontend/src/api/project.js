import adminAxios from '../axios/adminAxios';
import authAxios from '../axios/commonAxios';
import userAxios from '../axios/userAxios';
export const getProjectidandname = async () => {
    const response = await adminAxios.get('/getprojectAddSitemanagerProject');
    return response.data;
};
export const getProjectAll = async () => {
    const response = await adminAxios.get("/getAllproject");
    return response.data;
};
// ---------------- Fetch Users for Project Assignment ---------------- //
export const fetchUser = async () => {
    const response = await adminAxios.get(`/addproject`);
    return response.data;
};
// ---------------- Add New Project ---------------- //
export const postProject = async (input) => {
    const response = await userAxios.post(`/project`, input);
    return response.data;
};
// ---------------- Delete Project ---------------- //
export const deleteProjectData = async (_id) => {
    const response = await adminAxios.delete(`/project/${_id}`);
    return response.data;
};
// ---------------- Edit Project ---------------- //
export const putProject = async (input) => {
    const { _id, project_name, type, user_id, address, mobile_number, email, area, description, latitude, longitude, cost, floor } = input;
    const response = await adminAxios.put(`/project/${_id}`, {
        project_name,
        type,
        user_id,
        address,
        mobile_number,
        email,
        area,
        description,
        latitude,
        longitude, cost, floor
    });
    return response.data;
};
// ---------------- Project List with Pagination & Search ---------------- //
export const projectListData = async (page, search) => {
    const response = await adminAxios.get(`/project`, {
        params: { page, search },
    });
    return response.data;
};
// ---------------- Change Project Status ---------------- //
export const pustStatusChange = async (_id, status) => {
    const response = await adminAxios.put(`/status/${_id}`, { status });
    return response.data;
};
export const fetchStatusandCountApi = async () => {
    const response = await authAxios.get('/projectstatuscount');
    return response.data;
};
export const getPendingAllProject = async () => {
    const response = await adminAxios.get('/pendingProjects');
    return response.data;
};
export const getExpectedImageApi = async (projectId) => {
    const response = await userAxios.get(`/expectImage/${projectId}`);
    return response.data;
};
