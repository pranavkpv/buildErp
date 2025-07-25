import axioInstance from "../../api/axio"


type rowData = {
   spec_id: string
   spec_name: string,
   unitrate: number,
   quantity: number,
   total: number
}


export const fetChEstimation = async (search:string,page:number) => {
   const response = await axioInstance("/admin/fetchEstimation",{params:{search,page}})
   return response.data
}

export const RemoveEstimation = async (_id: string) => {
   const response = await axioInstance.delete(`/admin/deleteEstimation/${_id}`)
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


export const fetchExistEstimation = async(projectId:string)=>{
   const response = await axioInstance.get(`/admin/fetchExistEstimation/${projectId}`)
   return response.data
}

export const EstimationUpdate = async(projectId:string,row:rowData[]) =>{
   const response = await axioInstance.post("/admin/updateEstimation",{projectId,row})
   return response.data
}