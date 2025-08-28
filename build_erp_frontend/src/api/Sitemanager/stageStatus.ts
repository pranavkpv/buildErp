import { toast } from "react-toastify";
import siteAxios from "../../axios/SitemanagerAxioInterceptor"


// ---------------- Change Stage Progress Status ---------------- //

export const changeStatusStage = async (
   stageId: string,
   newProgress: number,
   date: string
) => {
      const response = await siteAxios.put(`/status/${stageId}`, {
         newProgress,
         date,
      });
      return response.data;
};

// ---------------- Upload Image for a Stage ---------------- //

export const uploadImageAPI = async (
   uploadStageId: string,
   date: string,
   inputImage: File[]
) => {
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
};

export const getStageInSitemanager = async(_id:string) =>{
    const response = await siteAxios.get(`/siteStage/${_id}`)
    return response.data
}
