import axioInstance from "../../api/axio"

export const getStage = async (projectId:string)=>{
   const response = await axioInstance.get("/site/stageFetch",{params:{project_id:projectId}})
   return response.data
}

export const changeStatusStage = async (stageId:string,newStatus:string,date:string)=>{
   const response = await axioInstance.put("/site/status",{stageId,newStatus,date})
   return response.data
}