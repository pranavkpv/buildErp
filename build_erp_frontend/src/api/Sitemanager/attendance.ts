import { toast } from "react-toastify";
import siteAxios from "../../axios/SitemanagerAxioInterceptor"

type rowData = {
      labour_type: string;
      wage: number;
      number: number;
      total: number;
};

// ---------------- Take Attendance ---------------- //

export const takeAttendanceAPI = async (
      selectedProject: string,
      selectedDate: string,
      row: rowData[]
) => {
      const response = await siteAxios.post("/attendance", {
            selectedProject,
            selectedDate,
            row,
      });
      return response.data;

};

// ---------------- Fetch Attendance with Pagination & Search ---------------- //

export const fetchAttendanceAPI = async (search: string, page: number) => {
      const response = await siteAxios.get("/attendance", {
            params: { search, page },
      });
      return response.data;
};

// ---------------- Delete Attendance ---------------- //

export const DeleteAttendanceAPI = async (deleteId: string) => {
      const response = await siteAxios.delete(`/attendance/${ deleteId }`);
      return response.data;
};

// ---------------- Approve Attendance ---------------- //

export const approveAttendanceAPI = async (approveId: string) => {
      const response = await siteAxios.put(`/attendance/${ approveId }`);
      return response.data;
};

// ---------------- Get Attendance by ID (for Edit) ---------------- //

export const getAttendanceBYIdAPI = async (editId: string) => {
      const response = await siteAxios.get(`/editfetchattendance/${ editId }`);
      return response.data
};

// ---------------- Edit Attendance ---------------- //

export const editAttendanceAPI = async (
      editId: string,
      selectedProject: string,
      selectedDate: string,
      row: rowData[]
) => {
      const response = await siteAxios.put("/editAttendance", {
            editId,
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
