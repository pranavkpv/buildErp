import axioInstance from "../../api/axio"

export const fetchUserProjectAPI = async (user:string)=>{
   const result = await axioInstance.get("/fetchuserproject",{params:{userId:user}})
   return result.data
}