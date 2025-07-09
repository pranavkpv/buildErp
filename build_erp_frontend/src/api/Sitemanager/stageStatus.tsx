import axioInstance from "../../api/axio"

export const getStage = async (projectId: string) => {
   const response = await axioInstance.get("/site/stageFetch", { params: { project_id: projectId } })
   return response.data
}

export const changeStatusStage = async (stageId: string, newProgress: number, date: string) => {
   const response = await axioInstance.put("/site/status", { stageId, newProgress, date })
   return response.data
}

export const uploadImageAPI = async (uploadStageId: string, date: string, inputImage: File[]) => {
   if (!inputImage) return
   const formData = new FormData()
   formData.append("_id", uploadStageId)
   formData.append("date", date)
   inputImage.forEach((file) => {
      formData.append("image", file); 
   });
   console.log(formData)

   const response = await axioInstance.put("/site/upload", formData, {
      headers: {
         "Content-Type": "multipart/form-data"
      }
   })
   return response.data
}