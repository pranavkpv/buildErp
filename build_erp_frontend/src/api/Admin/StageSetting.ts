import { toast } from "react-toastify";
import adminAxios from "../../axios/adminAxios"
import type { stageSaveInterface } from "ApiInterface/stageApi.interface";



// ---------------- Fetch Project Budget ---------------- //

export const fetchBugetAPI = async (projectId: string) => {
   const response = await adminAxios.get(`/fetchbudget/${ projectId }`);
   return response.data;
};

// ---------------- Save Stages ---------------- //

export const stageSaveAPI = async (
   input: stageSaveInterface
) => {
   const response = await adminAxios.post("/saveStage", {
      data: input,
   });
   return response.data;
};

// ---------------- Fetch Stage Data with Pagination & Search ---------------- //

export const fetchStageDataAPI = async (search: string, page: number) => {
      const response = await adminAxios.get("/fetchstage", {
         params: { search, page },
      });
      return response.data;
};

// ---------------- Delete Stage ---------------- //

export const stageDeleteAPI = async (deleteId: string) => {
   const response = await adminAxios.delete(`/stageDelete/${ deleteId }`);
   return response.data;
};

// ---------------- Edit Stage ---------------- //

export const editStageAPI = async (
   input: stageSaveInterface
) => {
   const { stages, projectId, startDate, endDate, cost } = input
   const response = await adminAxios.put(`/editStage/${ projectId }`, {
      stages,
      startDate,
      endDate,
      cost,
   });
   return response.data;
};


export const getStageInAdmin = async (projectId: string) => {
   const response = await adminAxios.get(`/stageFetch/${ projectId }`);
   return response.data;
};

