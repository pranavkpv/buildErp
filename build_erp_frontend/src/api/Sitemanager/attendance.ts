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
   try {
      const response = await siteAxios.post("/attendance", {
         selectedProject,
         selectedDate,
         row,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Fetch Attendance with Pagination & Search ---------------- //

export const fetchAttendanceAPI = async (search: string, page: number) => {
   try {
      const response = await siteAxios.get("/attendance", {
         params: { search, page },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Delete Attendance ---------------- //

export const DeleteAttendanceAPI = async (deleteId: string) => {
   try {
      const response = await siteAxios.delete(`/attendance/${deleteId}`);
      return response.data;
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
};

// ---------------- Approve Attendance ---------------- //

export const approveAttendanceAPI = async (approveId: string) => {
   try {
      const response = await siteAxios.put(`/attendance/${approveId}`);
      return response.data;
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
};

// ---------------- Get Attendance by ID (for Edit) ---------------- //

export const getAttendanceBYIdAPI = async (editId: string) => {
   try {
      const response = await siteAxios.get(`/editfetchattendance/${editId}`);
      return response.data;
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
};

// ---------------- Edit Attendance ---------------- //

export const editAttendanceAPI = async (
   editId: string,
   selectedProject: string,
   selectedDate: string,
   row: rowData[]
) => {
   try {
      const response = await siteAxios.put("/editAttendance", {
         editId,
         selectedProject,
         selectedDate,
         row,
      });
      return response.data;
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
};


export const labourDataFetchInsitemanager =  async () => {
   try {
      const response = await siteAxios.get('/fetchlabour');
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};
