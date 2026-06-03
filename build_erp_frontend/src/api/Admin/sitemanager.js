import adminAxios from "../../axios/adminAxios";
// ---------------- Add Site Manager ---------------- //
export const postSitemanager = async (username, email) => {
    const response = await adminAxios.post(`/sitemanager`, {
        username,
        email,
    });
    return response.data;
};
// ---------------- Delete Site Manager ---------------- //
export const deleteSitemanagerData = async (_id) => {
    const response = await adminAxios.delete(`/sitemanager/${_id}`);
    return response.data;
};
// ---------------- Edit Site Manager ---------------- //
export const editSitemanagerData = async (_id, username, email) => {
    const response = await adminAxios.put(`/sitemanager/${_id}`, {
        username,
        email,
    });
    return response.data;
};
// ---------------- Fetch Site Manager List ---------------- //
export const fetchSitemanager = async (page, search) => {
    const response = await adminAxios.get(`/sitemanager`, {
        params: { page, search },
    });
    return response.data;
};
