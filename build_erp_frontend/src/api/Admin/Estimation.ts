import { toast } from "react-toastify"
import axioInstance from "../axio"


type rowData = {
   spec_id: string
   spec_name: string,
   unitrate: number,
   quantity: number,
   total: number
}

// --------------- Estimation data getch with search and pagination --------------- //

export const fetChEstimation = async (search: string, page: number) => {
   try {
      const response = await axioInstance("/admin/fetchEstimation", { params: { search, page } })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

// --------------- Remove Estimation data  --------------- //

export const RemoveEstimation = async (_id: string) => {
   try {
      const response = await axioInstance.delete(`/admin/deleteEstimation/${ _id }`)
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

// --------------- Upload Estimated Image --------------- //

export const uploadEstimatImageAPI = async (uploadProjectId: string, file: File | null) => {
   try {
      if (!file) return
      const formData = new FormData()
      formData.append("image", file)
      formData.append("_id", uploadProjectId)
      const response = await axioInstance.post("/admin/uploadEstimated", formData, {
         headers: {
            "Content-Type": "multipart/form-data"
         }
      })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

// --------------- Fetch existing estimation data in edit --------------- //

export const fetchExistEstimation = async (projectId: string) => {
   try {
      const response = await axioInstance.get(`/admin/fetchExistEstimation/${ projectId }`)
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}

// --------------- Update the Estimated data --------------- //

export const EstimationUpdate = async (projectId: string, row: rowData[]) => {
   try {
      const response = await axioInstance.post("/admin/updateEstimation", { projectId, row })
      return response.data
   } catch (error: any) {
      toast.error(error.response.data.message)
   }
}