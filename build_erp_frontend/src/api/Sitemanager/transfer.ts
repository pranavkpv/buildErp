
import type { Transfer } from "../../components/SITEMANAGER/Transfer/TransferList";
import siteAxios from "../../axios/SitemanagerAxioInterceptor"
import userAxios from "../../axios/userAxios";



type materialData = {
      material_id: string;
      quantity: number;
      unit_rate: number;
};

export const getTransferDataAPI = async (search: string, page: number) => {
      const response = await siteAxios.get(`/transfer`, { params: { search, page } })
      return response.data
}

export const ToProjectFetchAPI = async (_id: string) => {
      const response = await siteAxios.get(`/toProject/${ _id }`)
      return response.data
}

export const saveTransferApI = async (from_project_id: string, to_project_id: string, transfer_id: string, date: string, description: string, materialDetails: materialData[]) => {
      const response = await siteAxios.post(`/transfer`, { from_project_id, to_project_id, transfer_id, date, description, materialDetails })
      return response.data
}

export const updateTransferAPI = async (_id: string, from_project_id: string, to_project_id: string, transfer_id: string, date: string, description: string, materialDetails: materialData[]) => {

      const response = await siteAxios.put(`/transfer/${ _id }`, { from_project_id, to_project_id, transfer_id, date, description, materialDetails })
      return response.data

}

export const deleteTransferAPI = async (_id: string) => {

      const response = await siteAxios.delete(`/transfer/${ _id }`)
      return response.data

}

export const ApproveTransferAPI = async (_id: string, data: Transfer) => {

      const response = await userAxios.patch(`/transfer/${ _id }`, { data })
      return response.data

}

export const getProjectBaseTransferAPI = async (_id: string, date: string) => {
      const response = await siteAxios.get(`/receiveTransfer/${ _id }`, { params: { date } })
      return response.data

}

export const fetchFullStockApi = async (projectId: string) => {
      const response = await siteAxios.get(`/fetchstockList/${ projectId }`)
      return response.data
}

export const getUserTransferDataAPI = async () => {
      const response = await userAxios.get(`/transfer`)
      return response.data
}

export const rejectTransferApi = async (rejectId:string) => {
      const response = await userAxios.patch(`/rejectTransfer/${rejectId}`)
      return response.data
}