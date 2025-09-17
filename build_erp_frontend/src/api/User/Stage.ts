import userAxios from "../../axios/userAxios"

export const stagePayApi = async (stageId:string,stageAmount:number) => {
   const response = await userAxios.post('/create-payment-intent', { stageId,stageAmount })
   return response.data
}