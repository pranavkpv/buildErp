import axioInstance from "../../api/axio"

export const fetChEstimation = async (search:string,page:number) => {
   const response = await axioInstance("/admin/fetchEstimation",{params:{search,page}})
   return response.data
}

export const RemoveEstimation = async (_id: string) => {
   const response = await axioInstance.delete("/admin/deleteEstimation", { data: { _id: _id } })
   return response.data
}

export const uploadEstimatImageAPI = async (uploadProjectId: string, file: File | null) => {
   if (!file) return
   const formData = new FormData()
   formData.append("image", file)
   formData.append("_id",uploadProjectId)
   const response = await axioInstance.post("/admin/uploadEstimated",formData,{
      headers:{
         "Content-Type":"multipart/form-data"
      }
   })
   return response.data
}