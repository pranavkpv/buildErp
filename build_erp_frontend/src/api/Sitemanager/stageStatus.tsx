import { toast } from "react-toastify";
import axioInstance from "../../api/axio";

// ---------------- Fetch Stages for a Project ---------------- //

export const getStage = async (projectId: string) => {
   try {
      const response = await axioInstance.get(`/site/stageFetch/${projectId}`);
      return response.data;
   } catch (error: any) {
     toast.error(error.response.data.message)
   }
};

// ---------------- Change Stage Progress Status ---------------- //

export const changeStatusStage = async (
   stageId: string,
   newProgress: number,
   date: string
) => {
   try {
      const response = await axioInstance.put(`/site/status/${stageId}`, {
         newProgress,
         date,
      });
      return response.data;
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
};

// ---------------- Upload Image for a Stage ---------------- //

export const uploadImageAPI = async (
   uploadStageId: string,
   date: string,
   inputImage: File[]
) => {
   try {
      if (!inputImage || inputImage.length === 0) return;

      const formData = new FormData();
      formData.append("_id", uploadStageId);
      formData.append("date", date);

      inputImage.forEach((file) => {
         formData.append("image", file);
      });

      const response = await axioInstance.put("/site/upload", formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });

      return response.data;
   } catch (error: any) {
     toast.error(error.response.data.message)
   }
};
