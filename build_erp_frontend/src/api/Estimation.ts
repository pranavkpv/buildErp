import adminAxios from "../axios/adminAxios"
import type { estimationSaveInterface } from "ApiInterface/estimation.interface";


// ---------------- Save Estimation ---------------- //

export const EstimationSave = async (projectId: string, row: estimationSaveInterface[]) => {
   const response = await adminAxios.post("/saveEstimation", {
      projectId,
      row,
   });
   return response.data;
};

// --------------- Remove Estimation data  --------------- //

export const RemoveEstimation = async (_id: string) => {
   const response = await adminAxios.delete(`/deleteEstimation/${ _id }`)
   return response.data
}

// --------------- Update the Estimated data --------------- //

export const EstimationUpdate = async (projectId: string, row: estimationSaveInterface[]) => {
   const response = await adminAxios.post("/updateEstimation", { projectId, row })
   return response.data
}

// --------------- Estimation data getch with search and pagination --------------- //

export const fetChEstimation = async (search: string, page: number) => {
   const response = await adminAxios("/fetchEstimation", { params: { search, page } })
   return response.data
}



// --------------- Upload Estimated Image --------------- //

export const uploadEstimatImageAPI = async (uploadProjectId: string, file: File | null) => {
      if (!file) return
      const formData = new FormData()
      formData.append("image", file)
      formData.append("_id", uploadProjectId)
      const response = await adminAxios.post("/uploadEstimated", formData, {
         headers: {
            "Content-Type": "multipart/form-data"
         }
      })
      return response.data
}

// --------------- Fetch existing estimation data in edit --------------- //

export const fetchExistEstimation = async (projectId: string) => {
      const response = await adminAxios.get(`/fetchExistEstimation/${ projectId }`)
      return response.data
}

