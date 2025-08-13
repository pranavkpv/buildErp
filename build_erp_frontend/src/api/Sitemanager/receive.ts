import type { ReceiveData } from "../../components/SITEMANAGER/Receive/ApproveReceive";
import axioInstance from "../../axios/authAxios"
import { toast } from "react-toastify"

type materialData = {
   material_id: string;
   quantity: number;
   unit_rate: number;
};

export const getReceiveDataAPI = async (search: string, page: number) => {
   try {
      const response = await axioInstance.get(`/site/receive`, { params: { search, page } })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const saveReceiveAPI = async (project_id: string, date: string, description: string, materialDetails: materialData[], transferId: string[]) => {
   try {
      const response = await axioInstance.post(`/site/receive`, { project_id, date, description, materialDetails, transferId })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const updateReceiveAPI = async (editId: string, project_id: string, date: string, description: string, materialDetails: materialData[], transferId: string[]) => {
   try {
      const response = await axioInstance.put(`/site/receive/${ editId }`, { project_id, date, description, materialDetails, transferId })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const deleteReceiveAPI = async (deleteId: string) => {
   try {
      const response = await axioInstance.delete(`/site/receive/${ deleteId }`)
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const ApproveReceiveAPI = async(_id:string,approveData:ReceiveData) => {
   try {
      const response = await axioInstance.patch(`/site/receive/${_id}`,{data:{approveData}})
      return response.data
   } catch (error:any) {
      toast.error(error.response.data.message)
   }
}