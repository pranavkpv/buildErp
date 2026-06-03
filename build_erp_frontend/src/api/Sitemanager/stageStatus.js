import { toast } from "react-toastify";
import siteAxios from "../../axios/SitemanagerAxioInterceptor";
// ---------------- Change Stage Progress Status ---------------- //
export const changeStatusStage = async (stageId, newProgress, date) => {
    const response = await siteAxios.put(`/status/${stageId}`, {
        newProgress,
        date,
    });
    return response.data;
};
// ---------------- Upload Image for a Stage ---------------- //
export const uploadImageAPI = async (uploadStageId, date, inputImage) => {
    if (!inputImage || inputImage.length === 0)
        return;
    const formData = new FormData();
    formData.append("_id", uploadStageId);
    formData.append("date", date);
    inputImage.forEach((file) => {
        formData.append("image", file);
    });
    const response = await siteAxios.put("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
export const getStageInSitemanager = async (_id) => {
    const response = await siteAxios.get(`/siteStage/${_id}`);
    return response.data;
};
