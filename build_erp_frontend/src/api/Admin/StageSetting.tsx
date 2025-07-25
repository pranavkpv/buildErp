import axioInstance from "../../api/axio"


type stageData={ stage_name: string; start_date: string; end_date: string; stage_percentage: number; stage_amount: number }


export const fetchBugetAPI = async(projectId:string)=>{
   const response = await axioInstance.get(`/admin/fetchbudget/${projectId}`)
   return response.data
}

export const stageSaveAPI = async(stages:stageData[],projectId:string,startDate:string,endDate:string,cost:number) =>{
   const response = await axioInstance.post("/admin/saveStage",{data:{stages,projectId,startDate,endDate,cost}})
   return response.data
}

export const fetchStageDataAPI = async(search:string,page:number)=>{
   const response = await axioInstance.get("/admin/fetchstage",{params:{search,page}})
   return response.data
}

export const StageDelete  = async(deleteId:string)=>{
   const datas = await axioInstance.post("/admin/stageDelete",{deleteId})
   return datas.data
}

export const EditStageAPI = async(stages:stageData[], projectId:string, startDate:string, endDate:string, cost:number)=>{
   const response = await axioInstance.put(`/admin/editStage/${projectId}`,{stages,startDate,endDate,cost})
   return response.data
}