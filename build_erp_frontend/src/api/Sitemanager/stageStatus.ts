import { toast } from "react-toastify";
import siteAxios from "../../axios/SitemanagerAxioInterceptor"


// ---------------- Change Stage Progress Status ---------------- //

export const changeStatusStage = async (
   stageId: string,
   newProgress: number,
   date: string
) => {
   try {
      const response = await siteAxios.put(`/status/${stageId}`, {
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

      const response = await siteAxios.put("/upload", formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });

      return response.data;
   } catch (error: any) {
     toast.error(error.response.data.message)
   }
};
