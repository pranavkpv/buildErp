import { toast } from "react-toastify";
import siteAxios from "../../axios/SitemanagerAxioInterceptor";
// ---------------- Take Attendance ---------------- //
export const takeAttendanceAPI = async (selectedProject, selectedDate, row) => {
    const response = await siteAxios.post("/attendance", {
        selectedProject,
        selectedDate,
        row,
    });
    return response.data;
};
// ---------------- Fetch Attendance with Pagination & Search ---------------- //
export const fetchAttendanceAPI = async (search, page) => {
    const response = await siteAxios.get("/attendance", {
        params: { search, page },
    });
    return response.data;
};
// ---------------- Delete Attendance ---------------- //
export const DeleteAttendanceAPI = async (deleteId) => {
    const response = await siteAxios.delete(`/attendance/${deleteId}`);
    return response.data;
};
// ---------------- Approve Attendance ---------------- //
export const approveAttendanceAPI = async (approveId) => {
    const response = await siteAxios.put(`/attendance/${approveId}`);
    return response.data;
};
// ---------------- Get Attendance by ID (for Edit) ---------------- //
export const getAttendanceBYIdAPI = async (editId) => {
    const response = await siteAxios.get(`/editfetchattendance/${editId}`);
    return response.data;
};
// ---------------- Edit Attendance ---------------- //
export const editAttendanceAPI = async (editId, selectedProject, selectedDate, row) => {
    const response = await siteAxios.put(`/editAttendance/${editId}`, {
        selectedProject,
        selectedDate,
        row,
    });
    return response.data;
};
export const labourDataFetchInsitemanager = async () => {
    const response = await siteAxios.get('/fetchlabour');
    return response.data;
};
