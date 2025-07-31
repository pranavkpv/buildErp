import { toast } from "react-toastify";
import axioInstance from "../axio";

type stageData = {
   stage_name: string;
   start_date: string;
   end_date: string;
   stage_percentage: number;
   stage_amount: number;
};

// ---------------- Fetch Project Budget ---------------- //

export const fetchBugetAPI = async (projectId: string) => {
   try {
      const response = await axioInstance.get(`/admin/fetchbudget/${projectId}`);
      return response.data;
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
};

// ---------------- Save Stages ---------------- //

export const stageSaveAPI = async (
   stages: stageData[],
   projectId: string,
   startDate: string,
   endDate: string,
   cost: number
) => {
   try {
      const response = await axioInstance.post("/admin/saveStage", {
         data: { stages, projectId, startDate, endDate, cost },
      });
      return response.data;
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
};

// ---------------- Fetch Stage Data with Pagination & Search ---------------- //

export const fetchStageDataAPI = async (search: string, page: number) => {
   try {
      const response = await axioInstance.get("/admin/fetchstage", {
         params: { search, page },
      });
      return response.data;
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
};

// ---------------- Delete Stage ---------------- //

export const stageDeleteAPI = async (deleteId: string) => {
   try {
      const response = await axioInstance.post("/admin/stageDelete", { deleteId });
      return response.data;
   } catch (error: any) {
       toast.error(error.response.data.message)
   }
};

// ---------------- Edit Stage ---------------- //

export const editStageAPI = async (
   stages: stageData[],
   projectId: string,
   startDate: string,
   endDate: string,
   cost: number
) => {
   try {
      const response = await axioInstance.put(`/admin/editStage/${projectId}`, {
         stages,
         startDate,
         endDate,
         cost,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};
