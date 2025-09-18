import userAxios from "../axios/userAxios"

export const getUserWalletHistoryApi = async(page:number,search:string)=>{
 const response = await userAxios.get('/wallet',{params:{page,search}})
 return response.data
}