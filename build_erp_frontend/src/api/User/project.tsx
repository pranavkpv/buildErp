import axioInstance from "../../api/axio"

export const fetchUserProjectAPI = async (user:string)=>{
   const result = await axioInstance.get(`/fetchuserproject/${user}`)
   return result.data
}

export const fetchStatusBaseProject = async (status:string,searchItem:string,selectedArea:number,page:number)=>{
   const result = await axioInstance.get(`/fetchstatusbaseproject/${status}`,{params:{searchItem,selectedArea,page}})
   return result.data
}