import axioInstance from "../../api/axio"
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
      const response = await axioInstance.post(`/site/receive`, { project_id, date, description, materialDetails,transferId })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}