import userAxios from "../axios/userAxios";
import adminAxios from "../axios/adminAxios"
import type { estimatedImage, estimationSaveInterface, reasonInterface } from "ApiInterface/estimation.interface";


// ---------------- Save Estimation ---------------- //

export const EstimationSave = async (projectId: string, row: estimationSaveInterface[]) => {
   const response = await adminAxios.post("/saveEstimation", {
      projectId,
      row,
   });
   return response.data;
};

// --------------- send Estimation data  --------------- //

export const SendEstimationApi = async (_id: string) => {
   const response = await adminAxios.patch(`/sendEstimation/${ _id }`)
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

export const getEstimationApi = async (projectId: string) => {
   const response = await userAxios.get(`/getEstimation/${ projectId }`);
   return response.data
}

export const getmaterialEstimationApi = async (projectId: string) => {
   const response = await userAxios.get(`/getMaterialEstimation/${ projectId }`)
   return response.data
}

export const getLabourEstimationApi = async (projectId: string) => {
   const response = await userAxios.get(`/getLabourEstimation/${ projectId }`)
   return response.data
}

export const getAdditionEstimationApi = async (projectId: string) => {
   const response = await userAxios.get(`/getAdditionEstimation/${ projectId }`)
   return response.data
}

export const RejectEstimationApi = async (input: reasonInterface) => {
   const { reason, projectId } = input
   const response = await userAxios.patch(`/rejectEstimation/${ projectId }`, { reason })
   return response.data
}

export const ApproveEstimationApi = async (projectId: string) => {
   const response = await userAxios.patch(`/approveEstimation/${ projectId }`)
   return response.data
}

export const uploadProjectImageAPI = async (projectId: string, estimatedImages: estimatedImage[]) => {
   const formData = new FormData();
   estimatedImages.forEach((item, index) => {
      formData.append(`images[${ index }][title]`, item.title);
      if (item.file) {
         formData.append(`images[${ index }][file]`, item.file);
      }
   });

   const response = await adminAxios.patch(`/uploadEstimateImage/${ projectId }`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
   });

   return response.data;
};


export const uploadProjectImageUserAPI = async (projectId: string, estimatedImages: estimatedImage[]) => {
   const formData = new FormData();
   estimatedImages.forEach((item, index) => {
      formData.append(`images[${ index }][title]`, item.title);
      if (item.file) {
         formData.append(`images[${ index }][file]`, item.file);
      }
   });

   const response = await userAxios.patch(`/uploadEstimateImage/${ projectId }`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
   });

   return response.data;
};


