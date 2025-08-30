import type { ReceiveData } from "../../components/SITEMANAGER/Receive/ApproveReceive";
import siteAxios from "../../axios/SitemanagerAxioInterceptor"

type materialData = {
      material_id: string;
      quantity: number;
      unit_rate: number;
};

export const getReceiveDataAPI = async (search: string, page: number) => {
      const response = await siteAxios.get(`/receive`, { params: { search, page } })
      return response.data
}

export const saveReceiveAPI = async (project_id: string, date: string, description: string, materialDetails: materialData[], transferId: string[]) => {
      const response = await siteAxios.post(`/receive`, { project_id, date, description, materialDetails, transferId })
      return response.data
}

export const updateReceiveAPI = async (editId: string, project_id: string, date: string, description: string, materialDetails: materialData[], transferId: string[]) => {
      const response = await siteAxios.put(`/receive/${ editId }`, { project_id, date, description, materialDetails, transferId })
      return response.data
}

export const deleteReceiveAPI = async (deleteId: string) => {
      const response = await siteAxios.delete(`/receive/${ deleteId }`)
      return response.data
}

export const ApproveReceiveAPI = async (_id: string, approveData: ReceiveData) => {
      const response = await siteAxios.patch(`/receive/${ _id }`, { data: { approveData } })
      return response.data

}