import { toast } from "react-toastify";
import axioInstance from "../../api/axio";

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
      const response = await axioInstance.post("/site/attendance", {
         selectedProject,
         selectedDate,
         row,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Fetch Attendance with Pagination & Search ---------------- //

export const fetchAttendanceAPI = async (search: string, page: number) => {
   try {
      const response = await axioInstance.get("/site/attendance", {
         params: { search, page },
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Delete Attendance ---------------- //

export const DeleteAttendanceAPI = async (deleteId: string) => {
   try {
      const response = await axioInstance.delete(`/site/attendance/${deleteId}`);
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Approve Attendance ---------------- //

export const approveAttendanceAPI = async (approveId: string) => {
   try {
      const response = await axioInstance.put(`/site/attendance/${approveId}`);
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};

// ---------------- Get Attendance by ID (for Edit) ---------------- //

export const getAttendanceBYIdAPI = async (editId: string) => {
   try {
      const response = await axioInstance.get(`/site/editfetchattendance/${editId}`);
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
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
      const response = await axioInstance.put("/site/editAttendance", {
         editId,
         selectedProject,
         selectedDate,
         row,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.message);
   }
};
