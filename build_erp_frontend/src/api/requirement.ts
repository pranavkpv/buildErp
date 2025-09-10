import type { requirementSaveInterface } from 'ApiInterface/requirement.interface';
import userAxios from '../axios/userAxios'

export const saveRequirement = async (input: requirementSaveInterface) => {
   const response = await userAxios.post(`/addRequirement`, { input });
   return response.data
}

export const adminRequireApi = async(projectId:string)=>{
   const response = await userAxios.patch(`/addRequirement/${projectId}`)
   return response.data
}