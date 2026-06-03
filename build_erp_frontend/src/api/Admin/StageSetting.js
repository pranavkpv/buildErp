import { toast } from "react-toastify";
import adminAxios from "../../axios/adminAxios";
// ---------------- Fetch Project Budget ---------------- //
export const fetchBugetAPI = async (projectId) => {
    const response = await adminAxios.get(`/fetchbudget/${projectId}`);
    return response.data;
};
// ---------------- Save Stages ---------------- //
export const stageSaveAPI = async (input) => {
    const response = await adminAxios.post("/saveStage", {
        data: input,
    });
    return response.data;
};
// ---------------- Fetch Stage Data with Pagination & Search ---------------- //
export const fetchStageDataAPI = async (search, page) => {
    const response = await adminAxios.get("/fetchstage", {
        params: { search, page },
    });
    return response.data;
};
// ---------------- Delete Stage ---------------- //
export const stageDeleteAPI = async (deleteId) => {
    const response = await adminAxios.delete(`/stageDelete/${deleteId}`);
    return response.data;
};
// ---------------- Edit Stage ---------------- //
export const editStageAPI = async (input) => {
    const { stages, projectId, startDate, endDate, cost } = input;
    const response = await adminAxios.put(`/editStage/${projectId}`, {
        stages,
        startDate,
        endDate,
        cost,
    });
    return response.data;
};
export const getStageInAdmin = async (projectId) => {
    const response = await adminAxios.get(`/stageFetch/${projectId}`);
    return response.data;
};
export const getStageForVerifyPayApi = async (search, page) => {
    const response = await adminAxios.get(`/stageForverify`, { params: { search, page } });
    return response.data;
};
export const verifyPaymentApi = async (stageId) => {
    const response = await adminAxios.patch(`/verifyPay/${stageId}`);
    return response.data;
};
