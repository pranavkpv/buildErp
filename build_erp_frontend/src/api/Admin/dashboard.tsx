import axioInstance from "../../api/axio"


export const adminLoginAPI = async(username:string,password:string)=>{
   const response = await axioInstance.post("/admin/login",
        {
          username,
          password,
        }, {
        withCredentials: true
      }
      );
      return response.data
} 

//admin logout
export const adminLogout = async()=>{
   const response = await axioInstance.post(`/admin/logout`,{},{ withCredentials: true })
   return response.data
}