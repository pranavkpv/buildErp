import adminAxios from "../../axios/adminAxios";
// --------------- add sitemanager to project --------------- //
export const postSitemanagerToProject = async (siteManager_id, selectedproject) => {
    const response = await adminAxios.post(`/addToSite`, {
        siteManager_id,
        selectedproject
    });
    return response.data;
};
//--------------- Delete sitemanager in particular project --------------- //
export const deleteSitemanagerToProject = async (_id, sitemanager_id) => {
    console.log(_id);
    const response = await adminAxios.delete(`/addToSite/${_id}/${sitemanager_id}`);
    return response.data;
};
// --------------- list of add sitemanager to project --------------- //
export const listOfsitemanager = async (page, search) => {
    const response = await adminAxios.get(`/addToSite`, { params: { page, search } });
    return response.data;
};
