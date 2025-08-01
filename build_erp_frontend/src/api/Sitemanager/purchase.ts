import axioInstance from "../../api/axio"
import { toast } from "react-toastify"


type materialData = {
   material_id: string;
   quantity: number;
   unit_rate: number;
};

// ---------------- Fetch all purchase data ---------------- //
export const getPurchaseDataAPI = async (search: string, page: number) => {
   try {
      const response = await axioInstance.get("/site/purchase", { params: { search, page } })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const savePurchaseAPI = async (project_id: string, invoice_number: string, date: string, description: string, materialDetails: materialData[]) => {
   try {
      const response = await axioInstance.post("/site/purchase", { project_id, invoice_number, date, description, materialDetails })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}


export const updatePurchaseAPI = async (_id: string, project_id: string, invoice_number: string, date: string, description: string, materialDetails: materialData[]) => {
   try {
      const response = await axioInstance.put(`/site/purchase/${ _id }`, { project_id, invoice_number, date, description, materialDetails })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const deletePurchaseAPI = async (_id: string) => {
   try {
      const response = await axioInstance.delete(`/site/purchase/${ _id }`)
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

export const ApprovePurchaseAPI = async (_id: string) => {
   try {
      const response = await axioInstance.patch(`/site/purchase/${ _id }`)
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}