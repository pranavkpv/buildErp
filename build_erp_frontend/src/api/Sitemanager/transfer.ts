import type { Transfer } from "../../components/SITEMANAGER/Transfer/ApproveTransfer";
import siteAxios from "../../axios/SitemanagerAxioInterceptor"
import { toast } from "react-toastify"


type materialData = {
   material_id: string;
   quantity: number;
   unit_rate: number;
};

export const getTransferDataAPI = async (search: string, page: number) => {
   try {
      const response = await siteAxios.get(`/transfer`, { params: { search, page } })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const ToProjectFetchAPI = async (_id: string) => {
   try {
      const response = await siteAxios.get(`/toProject/${ _id }`)
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const saveTransferApI = async (from_project_id: string, to_project_id: string, transfer_id: string, date: string, description: string, materialDetails: materialData[]) => {
   try {
      const response = await siteAxios.post(`/transfer`, { from_project_id, to_project_id, transfer_id, date, description, materialDetails })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const updateTransferAPI = async (_id: string, from_project_id: string, to_project_id: string, transfer_id: string, date: string, description: string, materialDetails: materialData[]) => {
   try {
      const response = await siteAxios.put(`/transfer/${ _id }`, { from_project_id, to_project_id, transfer_id, date, description, materialDetails })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const deleteTransferAPI = async (_id: string) => {
   try {
      const response = await siteAxios.delete(`/transfer/${ _id }`)
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const ApproveTransferAPI = async (_id: string, data: Transfer) => {
   try {
      const response = await siteAxios.patch(`/transfer/${ _id }`, { data })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const getProjectBaseTransferAPI = async (_id: string, date: string) => {
   try {
      const response = await siteAxios.get(`/receiveTransfer/${ _id }`, { params: { date } })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}