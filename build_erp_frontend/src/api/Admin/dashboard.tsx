import axioInstance from "../../api/axio"


//admin logout
export const adminLogout = async()=>{
   const response = await axioInstance.post(`/admin/logout`,{},{ withCredentials: true })
   return response.data
}