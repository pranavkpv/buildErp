import { toast } from "react-toastify";
import adminAxios from "../../axios/AdminAxioInterceptors"

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
      const response = await adminAxios.get(`/fetchbudget/${projectId}`);
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
      const response = await adminAxios.post("/saveStage", {
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
      const response = await adminAxios.get("/fetchstage", {
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
      const response = await adminAxios.post("/stageDelete", { deleteId });
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
      const response = await adminAxios.put(`/editStage/${projectId}`, {
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


export const getStageInAdmin =  async (projectId: string) => {
   try {
 
      const response = await adminAxios.get(`/stageFetch/${projectId}`);
      return response.data;
   } catch (error: any) {
     toast.error(error.response.data.message)
   }
};

