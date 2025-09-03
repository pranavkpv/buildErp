import type { AddBannerInterface, editBannerInterface } from "ApiInterface/banner.interface";
import adminAxios from "../axios/adminAxios"
import type { listingInput } from "../ApiInterface/CommonApiInterface";
import userAxios from "../axios/userAxios";
import authAxios from "../axios/commonAxios"

export const addBannerApi = async (input: AddBannerInterface) => {
   const { title, subtitle, file } = input
   if (!file) return
   const formData = new FormData()
   formData.append("image", file)
   formData.append("title", title)
   formData.append("subtitle", subtitle)
   const response = await adminAxios.post("/addBanner", formData, {
      headers: {
         "Content-Type": "multipart/form-data"
      }
   })
   return response.data
}

export const fetchBannerApi = async (input: listingInput) => {
   const response = await adminAxios.get("/banner", { params: input })
   return response.data
}


export const editBannerApi = async (input: editBannerInterface) => {
   const { id, title, subtitle, file } = input
   const formData = new FormData()
   formData.append("image", file?file:"")
   formData.append("title", title)
   formData.append("subtitle", subtitle)
   const response = await adminAxios.put(`/banner/${ id }`, formData, {
      headers: {
         "Content-Type": "multipart/form-data"
      }
   })
   return response.data
}

export const deleteBannerDataApi = async(id:string) => {
   const response = await adminAxios.delete(`/banner/${id}`)
   return response.data
}

export const fetchAllBannerApi = async() => {
   const response = await authAxios.get(`/banner`)
   return response.data
}