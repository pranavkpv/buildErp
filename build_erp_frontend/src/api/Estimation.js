import userAxios from "../axios/userAxios";
import adminAxios from "../axios/adminAxios";
// ---------------- Save Estimation ---------------- //
export const EstimationSave = async (projectId, row) => {
    const response = await adminAxios.post("/saveEstimation", {
        projectId,
        row,
    });
    return response.data;
};
// --------------- send Estimation data  --------------- //
export const SendEstimationApi = async (_id) => {
    const response = await adminAxios.patch(`/sendEstimation/${_id}`);
    return response.data;
};
// --------------- Update the Estimated data --------------- //
export const EstimationUpdate = async (projectId, row) => {
    const response = await adminAxios.post("/updateEstimation", { projectId, row });
    return response.data;
};
// --------------- Estimation data getch with search and pagination --------------- //
export const fetChEstimation = async (search, page) => {
    const response = await adminAxios("/fetchEstimation", { params: { search, page } });
    return response.data;
};
// --------------- Upload Estimated Image --------------- //
export const uploadEstimatImageAPI = async (uploadProjectId, file) => {
    if (!file)
        return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("_id", uploadProjectId);
    const response = await adminAxios.post("/uploadEstimated", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};
// --------------- Fetch existing estimation data in edit --------------- //
export const fetchExistEstimation = async (projectId) => {
    const response = await adminAxios.get(`/fetchExistEstimation/${projectId}`);
    return response.data;
};
export const getEstimationApi = async (projectId) => {
    const response = await userAxios.get(`/getEstimation/${projectId}`);
    return response.data;
};
export const getmaterialEstimationApi = async (projectId) => {
    const response = await userAxios.get(`/getMaterialEstimation/${projectId}`);
    return response.data;
};
export const getLabourEstimationApi = async (projectId) => {
    const response = await userAxios.get(`/getLabourEstimation/${projectId}`);
    return response.data;
};
export const getAdditionEstimationApi = async (projectId) => {
    const response = await userAxios.get(`/getAdditionEstimation/${projectId}`);
    return response.data;
};
export const RejectEstimationApi = async (input) => {
    const { reason, projectId } = input;
    const response = await userAxios.patch(`/rejectEstimation/${projectId}`, { reason });
    return response.data;
};
export const ApproveEstimationApi = async (projectId) => {
    const response = await userAxios.patch(`/approveEstimation/${projectId}`);
    return response.data;
};
export const uploadProjectImageAPI = async (projectId, estimatedImages) => {
    const formData = new FormData();
    estimatedImages.forEach((item, index) => {
        formData.append(`images[${index}][title]`, item.title);
        if (item.file) {
            formData.append(`images[${index}][file]`, item.file);
        }
    });
    const response = await adminAxios.patch(`/uploadEstimateImage/${projectId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
};
export const uploadProjectImageUserAPI = async (projectId, estimatedImages) => {
    const formData = new FormData();
    estimatedImages.forEach((item, index) => {
        formData.append(`images[${index}][title]`, item.title);
        if (item.file) {
            formData.append(`images[${index}][file]`, item.file);
        }
    });
    console.log("Jaoooo", projectId);
    const response = await userAxios.patch(`/uploadEstimateImage/${projectId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
};
export const getEstimationImageApi = async (projectId) => {
    const response = await adminAxios.get(`/EstimationImage/${projectId}`);
    return response.data;
};
