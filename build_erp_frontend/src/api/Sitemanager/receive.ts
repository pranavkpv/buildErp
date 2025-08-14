import type { ReceiveData } from "../../components/SITEMANAGER/Receive/ApproveReceive";
import siteAxios from "../../axios/SitemanagerAxioInterceptor"
import { toast } from "react-toastify"

type materialData = {
   material_id: string;
   quantity: number;
   unit_rate: number;
};

export const getReceiveDataAPI = async (search: string, page: number) => {
   try {
      const response = await siteAxios.get(`/receive`, { params: { search, page } })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const saveReceiveAPI = async (project_id: string, date: string, description: string, materialDetails: materialData[], transferId: string[]) => {
   try {
      const response = await siteAxios.post(`/receive`, { project_id, date, description, materialDetails, transferId })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const updateReceiveAPI = async (editId: string, project_id: string, date: string, description: string, materialDetails: materialData[], transferId: string[]) => {
   try {
      const response = await siteAxios.put(`/receive/${ editId }`, { project_id, date, description, materialDetails, transferId })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const deleteReceiveAPI = async (deleteId: string) => {
   try {
      const response = await siteAxios.delete(`/receive/${ deleteId }`)
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const ApproveReceiveAPI = async(_id:string,approveData:ReceiveData) => {
   try {
      const response = await siteAxios.patch(`/receive/${_id}`,{data:{approveData}})
      return response.data
   } catch (error:any) {
      toast.error(error.response.data.message)
   }
}